---
sidebar_position: 110
---

# Deploy Pull Requests

To review a Pull Request, it can be helpful to deploy it temporarily. Both, the infrastructure and the application itself must be prepared for this kind of deployment. This article shows, how to deplot Pull Requests into a Kubernetes Cluster.

:::note

This guide assumes, that you want to deploy a containerized application build from a Pull Request into a Kubernetes cluster for review. We only focus on the application. Existing infrastructure will be re-used and there won't be a dedicated infrastructure deployment for the Pull Request in this guide.

:::

## Prerequisites

- Container Registry
- Kubernetes Cluster
  - Ingress Controller deployed (e.g. NGINX)
  - IP address attached to the Ingress Controller
  - Access to the Container Registry
- Helm Chart for the application
- Access to DNS provider and rights to add records

## Preparations

### Environment

#### DNS

Find a domain pattern for your Pull Requests. If your application is usually available at `example.com` and the Pull Request with the ID **4711** should be available at `4711.pr.example.com`, make sure to allow both rules in your DNS by adding the following records.

| Type | Name | Value
| - | - | - |
| A | `example.com` | `10.20.30.40` |
| A | `*.pr.example.com` | `10.20.30.40` |

In the example above, both DNS records point to the same IP address, which indicates that both, the production environment and the deployed Pull Requests are hosted in the same cluster. In a real-world scenario, you might want to host them in separate clusters and point the two DNS records to different IP addresses.

### Helm Chart

The Helm Chart should also be prepared for multiple types of deployment. It's recommended to use the same Chart for all kind of deployments, including Pull Request and Production deployments.

#### Values

In most cases, there are two properties of your deployment, that you want to make configurable: The **container image** that gets deployed and the **host name** (domain) where the application will be available at. For the host name, it is common to split it up into the core domain, an optional prefix (like `*.pr` in our example) and an optional suffix.

An according values file in your Helm Chart could look like this:

```yaml title="values.yaml"
image:
  repository: "repo.io/example"
  tag: "latest"

ingress:
  domain:
    base: "example.com"
    prefix: ""
    suffix: ""
```

In case you need to use compound values at multiple places in your Helm Chart, it is recommended to define them in a helpers file. Check out our [Helm Best Practices](/docs-internal/devops/helm#use-helper-files-to-construct-variables), to learn more.

```tpl title="_helpers.tpl"
{{- define "ingress.hostName" -}}
{{- .Values.ingress.domain.prefix }}{{ if ne .Values.ingress.domain.prefix "" }}.{{ end }}{{- .Values.ingress.domain.base }}{{- .Values.ingress.domain.suffix }}
{{- end }}
```

#### Ingress

The Ingress resource configures the Ingress controller to listen on specific host names and then route traffic to a Kubernetes Service. For our deployed Pull Request, we want to configure the Ingress to listen on the Pull Request specific host name (e.g. `1.pr.example.com`). The Helm Chart should be configured in a way, that it uses the compound host name.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: example
spec:
  rules:
  - host: {{ include "ingress.hostName" . }}
    http :
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: example
            port:
              name: http
```

If you use TLS, make sure to also add it to the `tls` section of your Ingress resource.

```yaml
spec:
  tls:
    - secretName: example-ingress-tls
      hosts:
      - {{ include "ingress.hostName" . }}
```

#### Pods

To allow pods to pull the very specific container image that gets specified for this release (like the one that has been built for the Pull Request), we should make sure to use the Helm variables in the Pod definition.

```yaml
spec:
  containers:
  - name: example
    image: {{ .Values.image.repository }}:{{ .Values.image.tag }}
```

## Pipeline

Once the Helm Chart is prepared for flexible deployments, we can start to build a pipeline that we can run whenever a Pull Request should be reviewed by deploying it into a cluster.

### Steps

In the pipeline, we need to make sure that we **Build and push the container images(s)** to a Container Registry that is available to the cluster and then **install the Helm Chart** into that cluster with the updated values for the Pull Request to deploy. Afterwards, it would be nice to **post the review URL as a comment** to the Pull Request.

#### Build and Push the container image(s)

Make sure to build a container image with the version of your code of the Pull Request you want to review and tag it accordingly. In this example, we use the `pr-4711` tag for a Pull Request with the ID 4711.

```bash
docker build -t repo.io/example:pr-<PULL_REQUEST_ID> ...
```

Once the container is built, push it to a registry, that the target cluster has access to. This can be the same Container Registry that all your other containers use or a dedicated one just for test builds.

```bash
docker push repo.io/example:pr-<PULL_REQUEST_ID>
```

#### Install the Helm Chart

Now that the Pull Request's version of the application is containerized and the container is pushed to a Container Registry, we can kick-off the deployment by installing the Helm Chart and overwriting the variables with values that match the Pull Request.

```bash
helm upgrade pr-<PULL_REQUEST_ID> <YOUR_CHART> \
  --install \
  --namespace pr-<PULL_REQUEST_ID> \
  --create-namespace \
  --wait \
  --set image.tag=pr-<PULL_REQUEST_ID> \
  --set ingress.domain.prefix=<PULL_REQUEST_ID>.pr
```

#### Post the review URL as a Pull Request comments

It's a nice touch to post the URL to the freshly deployed Pull Request to the comments, so that Developers and Testers can access it easily. As this depends on the DevOps service you use, this guide just mentions it as an idea.

*You can find a working sample for GitHub Actions below.*

### Trigger

Triggering the pipeline is an important step. It is very likely, that you don't want to deploy every single Pull Request but rather want to be able to run the pipeline manually when needed.

For this, you need to come up with an event, that triggers the pipeline. Like the Post the review URL step earlier, these triggers highly depend on the DevOps service, you use. In many cases, this trigger can either be a comment with a specific string like `/deploy` in it or a **label** that gets attached to the Pull Request. To avoid typing mistakes, a label is preferred, if your systems supports it.

*You can find a working sample for GitHub Actions below.*

### Cleanup

To avoid that the deployed Pull Request lived beyond the lifetime of the actual pull request, we need to clean up the resources, once the Pull Request gets closed.

Uninstall the Helm Chart.

```bash
helm delete pr-<PULL_REQUEST_ID>
```

Delete the Kubernetes Namespace.

```bash
kubectl delete pr-<PULL_REQUEST_ID>
```

This cleanup proccess also needs a trigger. If your DevOps system supports triggering a pipeline on closing a Pull Request, you should use this as a trigger for these steps.

## Examples

### GitHub Actions

Github Actions supports both, triggering a workflow when a Pull Request has been labeled and triggering another one when a Pull Request has been closed.

We will create two workflows:

- The `deploy_pull_request.yaml` workflow deploys a Pull Request when the `deploy` label has been added
- The `cleanup_pull_request.yaml` workglow deletes the deployed resources when a Pull Request gets closed

#### Triggers

GitHub Actions support a lot of [events that can trigger workflows](https://docs.github.com/en/actions/reference/events-that-trigger-workflows). One of these is the `pull_request` event, than can be filtered by the type of Pull Request event that occurred. The ones we are interested in are `labeled` to trigger the deployment workflow and `closed` to trigger the cleanup workflow.

By default, GitHub repositories don't come with a label that we can use for triggering the deployment. It is worth adding one (either for the repository or the whole organization) called `deploy`.

![Add Labels to GitHub](/img/docs-internal/devops/addGitHubLabel.png)

To create a workflow that only gets triggered when a Pull Request gets labeled with the `deploy` label, use the code below.

```yaml
on:
  pull_request:
    types: [labeled]

jobs:
  deploy-pr:
    name: 'Deploy Pull Request'
    runs-on: ubuntu-latest
    if: ${{ github.event.label.name == 'deploy' }}
```

#### Deployment pipeline

```yaml title=".github/workflows/deploy_pull_request.yaml"
name: 'Deploy Pull Request'
on:
  pull_request:
    types: [labeled]

jobs:
  deploy-pr:
    name: 'Deploy Pull Request'
    runs-on: ubuntu-latest
    if: ${{ github.event.label.name == 'deploy' }}

    steps:
    - name: Checkout
      uses: actions/checkout@v2

    - name: Docker Login
      run: docker login ...

    - name: Build Docker image
      run: docker build --tag repo.io/example:pr-${{ github.event.pull_request.number }} ...

    - name: Push Docker image
      run: docker push  --all repo.io/example

    - name: Kubernetes Login
      run: ...

    - name: Install Helm Chart
      working-directory: env/helm
      run: |
        helm upgrade pr-${{ github.event.pull_request.number }} <YOUR_CHART> \
          --install \
          --namespace pr-${{ github.event.pull_request.number }} \
          --create-namespace \
          --wait \
          --set image.tag=pr-${{ github.event.pull_request.number }} \
          --set ingress.domain.prefix=${{ github.event.pull_request.number }}.pr

    - name: Post comment to Pull Request
      uses: unsplash/comment-on-pr@master
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      with:
        msg: "Your Pull Request Deployment is ready for review at https://..."
        check_for_duplicate_msg: true
```

#### Cleanup pipeline

```yaml title=".github/workflows/cleanup_pull_request.yaml"
name: 'Cleanup Pull Request'
on:
  pull_request:
    types: [closed]

jobs:
  cleanup-pr:
    name: 'Cleanup Pull Request'
    runs-on: ubuntu-latest
    continue-on-error: true

    steps:
    - name: Kubernetes Login
      run: ...

    - name: Delete Helm Chart
      run: helm delete pr-${{ github.event.pull_request.number }} --namespace pr-${{ github.event.pull_request.number }}

    - name: Delete Namespace
      if: always()
      run: kubectl namespace delete pr-${{ github.event.pull_request.number }}
```

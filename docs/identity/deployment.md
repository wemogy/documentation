---
sidebar_position: 3
---

# Deployment

The project is designed to be deployed as containers. We currently only support deployments into a Kubernetes cluster. We highly recommend using our [Helm Chart](https://github.com/wemogy/identity/tree/main/env/helm) for deploying into Kubernetes.

## Kubernetes

### Prerequisites

- Kubernetes Cluster
  - [NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/) installed
  - [Cert Manager](https://cert-manager.io/docs/installation/kubernetes/) installed
  - Access to our private Container Registry
- Helm installed
- A PostgreSQL server with two databases
  - Database for identity management (e.g. called `ory_kratos`)
  - Database for OAuth management (e.g. called `ory_hydra`)
- A custom domain `auth.` on your domain with eiter
  - OPTION A: **A** record pointing to the IP Address of your Ingress Controller
  - OPTION B: **CNAME** record pointing to `identity.<YOUR_TENANT_NAME>.wemogy.cloud` (when running in wemogy Cloud)

#### Optional: Push the container images into your Container Registry

As the official wemogy Container Registy is private at the moment, you will need to gain access, pull the images and then push them into your own registry. You can use the script below, to do this.

```bash
LATEST_TAG=0.7.0
REGISTRY=<LOGIN_SERVER_FOR_YOUR_REGISTY>

docker pull wemogycloudacr.azurecr.io/wemogy-identity-public:$LATEST_TAG
docker pull wemogycloudacr.azurecr.io/wemogy-identity-admin:$LATEST_TAG

docker tag wemogycloudacr.azurecr.io/wemogy-identity-admin:$LATEST_TAG $REGISTRY/wemogy-identity-public:$LATEST_TAG
docker tag wemogycloudacr.azurecr.io/wemogy-identity-admin:$LATEST_TAG $REGISTRY/wemogy-identity-admin:$LATEST_TAG

docker push $REGISTRY/wemogy-identity-public:$LATEST_TAG
docker push $REGISTRY/wemogy-identity-admin:$LATEST_TAG
```

### Install via Helm

Add the Helm repository

```bash
helm repo add wemogy https://wemogy.github.io/helm/charts
```

Install the Helm Chart

```bash
helm upgrade --install wemogy-identity wemogy/identity \
  --namespace wemogy-identity \
  --create-namespace \
  --set 'config.tenant.name=<YOUR_TENANT_NAME>' \ # Example: contoso
  --set 'config.tenant.domain.core=<YOUR_DOMAIN>' \ # Example: contoso.com
  --set 'config.urls.redirect.base=<APP_URL_THAT_HOSTS_YOUR_LOGIN>' \ # Example: https://app.contoso.com
  --set 'config.cors.allowedOrigins=<APP_URL_THAT_HOSTS_YOUR_LOGIN>' \ # Example: https://app.contoso.com
  --set 'config.secrets.signingKey=<RANDOM_STRING>' \ # Example: a5428!b6123
  --set 'config.secrets.salt=<RANDOM_STRING>' \ # Example: a5428!b6123
  --set 'config.email.smtpConnectionUri=<SMTP_CONNECTION>' \ # Example: smtps://name:password@smtp.sendgrid.net:465
  --set 'config.email.fromAddress=<SENDER_ADDRESS>' \ # Example: it@wemogy.com
  --set 'ingress.wemogyCloud=false' \ # When not running on wemogy Cloud
  --set 'ingress.certManagerEmail=<YOUR_EMAIL>' \ # Example: it@contoso.com
  --set 'kratos.databaseConnectionString=<IDENTITY_DATABASE_CONNECTION_STRING>' \ # Example: postgresql://psqladmin@demopostgres:PASSWORD@demopostgres.postgres.database.azure.com/ory_kratos
  --set 'hydra.databaseConnectionString=<OAUTH_DATABASE_CONNECTION_STRING>' # Example: postgres://psqladmin@demopostgres:PASSWORD@demopostgres.postgres.database.azure.com/ory_hydra
```

:::caution Warning

Please note, that the two PostgreSQL connection strings are different. The one for Identity (Kratos) starts with **postgresql://** whereas the one for OAuth (Hydra) starts with **postgres://...**.

:::

### Access the Admin Endpoint

During the setup phase, it is likely, that you need access to the Admin Endpoint to create clients for example. When not running in wemogy Cloud, the Admin Endpoint is not exposed externally. To temporatily forward the endpoint to your machine, you can run the following command.

```bash
kubectl port-forward svc/wemogy-identity-server-admin 8080:80 -n wemogy-identity
```

The Admin Endpoint will be available at `http://localhost:8080/` then.

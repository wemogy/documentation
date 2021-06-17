---
sidebar_position: 3
---

# Using Configuration

Once configuration with YAML files has been [properly set up](/docs-internal/configuration/adding-configuration), we can start to configure applications with them and add this configuration to different deployments and Infrastructure as Code technologies like Terrafrom.

For this article, we assume that the configuration we want to apply looks like this:

```yaml title="config.yaml"
name:
  first: Max
  last: Mustermann
```

## Helm

When using Helm, there are two ways of setting configuration. One is by providing all configuration details to the Helm Values that can be found in the `values.yaml` file. This file might contain more settings and values than just the configuration, but our Helm Charts should be authored in a way, that each configuration value is also available as a Helm Value.

Let's assume, the Helm Chart's values file looks like this:

```yaml title="values.yaml"
image: nginx
tag: latest
config:
  name:
    first: Max
    last: Mustermann
```

In this case, we can override the default settings in the `config` object by passing single values.

```bash
helm install my-app may-app --set config.name.first=John --set config.name.lase=Doe
```

Another approach is passing a whole configuration file into a Helm deployment and override the Helm Values with them. Let's say, we have an existing `config.yaml` file with the content that we want to use as the Helm value `config`. In this case, we can pass the whole file content into the `config` value.

```bash
helm install my-app may-app --set-file config=config.yaml
```

### Terraform

When deploying Helm Charts with Terraform, the configuration can also be passed as a single file or by setting specific values. Please see the sample blow for details.

```hcl title="helm.tf"
resource "helm_release" "example" {
  name       = "my-release"
  repository = "https://..."
  chart      = "nginx"
  version    = "latest"

  set {
    name  = "config"
    value = "${file("config.yaml")}"
  }

  # or

  set {
    name  = "config.name.first"
    value = "John"
  }
}

```

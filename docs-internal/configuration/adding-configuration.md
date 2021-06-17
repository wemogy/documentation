---
sidebar_position: 2
---

# Adding Configuration

This article explains how to build applications, that can be configured with configuration files. It covers the implementation aspects in our most common frameworks as well as packaging the applications with Helm.

## Add Configuration to Helm

When working with Helm, the application should be configurable through Helm Values. Besides, we want to make it possible to pass configuration files into a Helm deployment to use these instead of the Values content.

### Include in Helm Values

When building Helm Charts, we want to make sure, that the whole YAML configuration is also part of the Helm Values. Let's say, we have a Configuration like this:

```yaml title="config.yaml"
name:
  first: Max
  last: Mustermann
```

Then the Helm Values should contain this configuration (besides its other values):

```yaml title="values.yaml"
image: nginx
tag: latest
config:
  name:
    first: Max
    last: Mustermann
```

As you can see, the full configuration is now part of the Helm Values and can be accessed within Helm templates via `{{ .Values.config }}`.

### Transform to proper YAML

As mentioned above, we want to also allow users to pass full configuration files into the Helm Chart instead of filling out every single line in the Helm Values. As files content is handled as `string` and Values content is handled as `map` in Helm, we need to create a little helper to create a proper YAML out of it, that we can use in a `ConfigMap`.

```yaml title="_helpers.tpl"
{{- define "config" -}}
{{- if typeIs "string" .Values.config }}
{{ .Values.config }}
{{- else}}
{{ .Values.config | toYaml }}
{{- end }}
{{- end }}
```

### Include in Templates

Now we can create a `ConfigMap` that uses the configuration as its content.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: config
data:
  config.yaml: |
{{- include "config" . | indent 4 }}
```

To mount the configuration into a `Pod`, add the `ConfigMap` as a Volume and mount it into one or multiple containers.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: app
  labels:
    name: app
spec:
  containers:
  - name: app
    image: nginx
    resources:
      limits:
        memory: "128Mi"
        cpu: "500m"
      volumeMounts:
      - name: config
        mountPath: /etc/config
        readOnly: true
    volumes:
    - name: config
      configMap:
        name: config
```

Take a look at the [Using Configuration docs](/docs-internal/configuration/using-configuration) to learn how to pass configuration files to Helm or use configuration with Terraform.

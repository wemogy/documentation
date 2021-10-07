---
sidebar_position: 20
---

# Helm

Helm is the de-facto package manager for Kubernetes and bundles multiple Kubernetes resources into one deployable Helm Chart.

## Best practices

### Use Helper Files to construct variables

You can generate Chart-wide variables in the `_helpers.tpl` file. Sometimes, a value you want to use within your Helm Chart is constructed from multiple values.

Let's say, we want to define a domain, where the user can *optionally* add prefix and suffix. For this, you might have created values as shown below.

```yaml title="values.yaml"
ingress:
  domain:
    base: "example.com"
    prefix: ""
    suffix: ""
```

So the final hostname to pass into your `Ingress` resource should be `prefix` + `.` (only if prefix was set) + `base` + `suffix`. As you might want to use this hostname at multiple different places in your Helm Chart, it would be nice to generate it as a variable at one central place.

This central place should be the `templates/_helpers.tpl` file. Here you can store variables and execute any kind of Helm logic.

```tpl title="_helpers.tpl"
{{- define "ingress.hostName" -}}
{{- .Values.ingress.domain.prefix }}{{ if ne .Values.ingress.domain.prefix "" }}.{{ end }}{{- .Values.ingress.domain.base }}{{- .Values.ingress.domain.suffix }}
{{- end }}
```

You can use these variables as shown below.

```yaml
spec:
  rules:
  - host: {{ include "ingress.hostName" . }}
```

### Use Variables and Built-in Objects in Values

Sometimes, you want to use [built-in objects](https://helm.sh/docs/chart_template_guide/builtin_objects/) or re-use other values in your `values.yaml` files. Unfortunately, when using templates in values, they won't get resolved.

Let's say, you want to set an image tag equal to the chart version with the following values.

```yaml title="values.yaml"
image:
  repository: 'registry.io/exampe'
  tag: '{{ .Chart.AppVersion }}'
```

If you now just use `{{ .Values.image.tag }}` in your templates, the resolved content would literally be "*{{ .Chart.AppVersion }}*". To ensure, that this string also gets fed into the templating engine of Helm, we need to use the `tpl` function.

```yaml
{{ tpl .Values.example . }}
```

So the correct usage of the value from the example above would be:

```yaml
contianers:
- name: example
  image: {{ .Values.image.repository }}:{{ tpl .Values.image.tag . }}
```

Whenever the `tpl` function does not find a templated string but just a regular one like "latest" or "1.0.0", it will just output these strings. So don't worry, if someone is replacing the tempalted string with a regular one in the values.

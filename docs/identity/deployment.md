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
- A PostgreSQL database server with [databases for the tenant](internal/MULTI_TENANCY.md)
- A custom domain with a CNAME Record `auth.` on your domain pointing to `identity.<YOUR_TENANT_NAME>.wemogy.cloud`

### Install via Helm

Add the Helm repositoy

```bash
helm repo add wemogy https://wemogy.github.io/helm/charts
```

Install the Helm Chart

```bash
helm upgrade --install wemogy-identity env/helm/wemogy-identity \
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
  --set 'ingress.certManagerEmail=<YOUR_EMAIL>' # Example: it@contoso.com
```

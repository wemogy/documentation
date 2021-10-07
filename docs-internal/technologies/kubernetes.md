# Kubernetes

## Troubleshooting

### Pods

Get pod details:

```bash
kubectl describe pod <pod_name>
```

Get logs from a pod container

```bash
kubectl logs <pod_name> -c <container_name>
```

### Deployments

Get deployments

```bash
kubectl get deployment
```

### Ingress controller

Get ingress controller details

```bash
kubectl describe ing <ingress_name>
```

Get certificate requests

```bash
kubectl get certificaterequests
```

Get details of certificate request

```bash
kubectl describe certificaterequest <certificaterequest>
```

# Environments

Steps are executed in Environments, which usually translate to different types of VM sizes or Kubernetes Node Pools. When self-hosting, you need to create environments on your own and need to register them in the central environment registry.

## Defining Environments

## Kubernetes

When hosting in Kubernetes, Environments are controlled via [Taints and Tolerations](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/). To add Nodes to an environment, add a Taint to it.

```bash
kubectl taint nodes node1 wemogy-media-environment=<ENVIRONMENT_NAME>:NoSchedule
```

Each Steps will be scheduled as a [Kubernetes Job](https://kubernetes.io/docs/concepts/workloads/controllers/job/), which gets the following tolerations to find a matching Environment.

```yaml
tolerations:
- key: "wemogy-media-environment"
  operator: "Equal"
  value: "<ENVIRONMENT_NAME>"
  effect: "NoSchedule"
```

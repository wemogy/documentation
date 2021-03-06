# Environments

Steps are executed in Environments, which usually translate to different types of VM sizes or Kubernetes Node Pools. When self-hosting, you need to create environments on your own and need to register them in the central environment registry.

## Defining Environments

To define the available environments, you have to modify the `environments.yaml` file that gets mounted into the API Service. For each environment, you can define multiple pools that accept workloads that target a certain environment.

:::info

Having a default environment is mandatory. You will need to make sure to always have one environment with `name: default`.

:::

```yaml title="environments.yaml"
environments:
  - name: default
    stepResources:
      cpu: 250
      memory: 512
    pools:
      - name: worker-default
        preferred: true
      - name: worker-default-secondary
  - name: video
    stepResources:
      cpu: 500
      memory: 1024
    pools:
      - name: worker-gpu
```

## Kubernetes

When hosting in Kubernetes, Environments are controlled via [Taints and Tolerations](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/) and [Node affinty](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#affinity-and-anti-affinity). To add Nodes to an environment, add a Label to it.

```bash
kubectllabel nodes node1 wemogy-media-environment=<ENVIRONMENT_NAME>
```

If you additionally want to ensure, that only Step Processors are scheduled to specific nodes, add a Taint to these nodes.

```bash
kubectl taint nodes node1 wemogy-media-environment=<ENVIRONMENT_NAME>:NoSchedule
```

Each Steps will be scheduled as a [Kubernetes Job](https://kubernetes.io/docs/concepts/workloads/controllers/job/), which gets the following tolerations and affinities to find a matching Environment.

```yaml
tolerations:
- key: "wemogy-media-environment"
  operator: "Equal"
  value: "<ENVIRONMENT_NAME>"
  effect: "NoSchedule"
  
affinity:
  nodeAffinity:
    preferredDuringSchedulingIgnoredDuringExecution:
    - weight: 10 # or 1, if pool has referred: false
      preference:
        matchExpressions:
        - key: wemogy-media-environment
          operator: In
          values:
          - <ENVIRONMENT_NAME>
```

The environemnt can be set for each step in the workflow. When no environment is specified, the `default` environment will be used to schedule a step.

```yaml
jobs:
  - id: job1
    steps:
      - id: step1
        env: video # <- Define environment here
```

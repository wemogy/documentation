# Environments

Steps are executed in Environments, which usually translate to different types of VM sizes or Kubernetes Node Pools. When self-hosting, you need to create environments on your own and need to register them in the central environment registry.

## Defining Environments

To define the available environments, you have to modify the `environments.yaml` file that gets mounted into the API Service. For each environment, you can define multiple pools that accept workloads that target a certain environment.

:::info

Having a `default` environment is mandatory.

:::

```yaml title="environments.yaml"
environments:
  - name: default
    pools:
      - name: worker-default
      - name: worker-default-secondary
  - name: video
    pools:
      - name: workder-gpu
```

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

The environemnt can be set for each step in the workflow. When no environment is specified, the `default` environment will be used to schedule a step.

```yaml
jobs:
  - id: job1
    steps:
      - id: step1
        env: defaul # <- Define environment here
```

# Actions

We use GitHub Actions for our CI/CD pipelines and repository automations. To increase code re-use, we have created our own Actions for the most common tasks. These Actions can be used across multiple wemogy projects.

Currently, in GitHub all Actions that can be used across repositories, have to be stored in public repositories. Anyways, some of the actions we build can be used in other projects by other companies you can find them in the [Public](#public) list. Others only make sense in wemogy internal or customer scenarios. These Actions are listed under [Internal](#internal).

## Public

### Next Version

GitHub Action to determine the semantic version for the next release based on existing GitHub Releases.

**[GitHub](https://github.com/wemogy/next-version-action)**

## Internal

### Terraform

A GitHub Action that connects to a remote Terraform backend in Azure, applies or plans the changes and outputs the Terraform Output variables.

**[GitHub](https://github.com/wemogy/terraform-action)**

### AKS Login

A GitHub Action that authenticates against an AKS cluster

**[GitHub](https://github.com/wemogy/aks-login-action)**

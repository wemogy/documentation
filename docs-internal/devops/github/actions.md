# Actions

We use GitHub Actions for our CI/CD pipelines and repository automations. To increase code re-use, we have created our own Actions for the most common tasks. These Actions can be used across multiple wemogy projects.

Currently, in GitHub all Actions that can be used across repositories, have to be stored in public repositories. Anyways, some of the actions we build can be used in other projects by other companies you can find them in the [Public](#public) list. Others only make sense in wemogy internal or customer scenarios. These Actions are listed under [Internal](#internal).

## wemogy Actions

### Public

#### Next Version

GitHub Action to determine the semantic version for the next release based on existing GitHub Releases.

**[GitHub](https://github.com/wemogy/next-version-action)**

### Internal

#### Terraform

A GitHub Action that connects to a remote Terraform backend in Azure, applies or plans the changes and outputs the Terraform Output variables.

**[GitHub](https://github.com/wemogy/terraform-action)**

#### AKS Login

A GitHub Action that authenticates against an AKS cluster

**[GitHub](https://github.com/wemogy/aks-login-action)**

## Best practises

### Only build what has changed

Especially when using mono repos, it is recommended to only build the code that has actually changed. This can be nicely done with the [Path Changes Filter Action](https://github.com/dorny/paths-filter), which can determine folders that contain changes. These folders can be used to create a [matrix build](https://docs.github.com/en/actions/learn-github-actions/managing-complex-workflows#using-a-build-matrix).

```yaml
jobs:
  changes:
    runs-on: ubuntu-latest
    outputs:
      folders: ${{ steps.filter.outputs.changes }}
    steps:
    - uses: dorny/paths-filter@v2
      id: filter
      with:
        filters: |
          folder1: 'src/fodler1/**'
          folder2: 'src/fodler2/**'

  build:
    needs: changes
    strategy:
      matrix:
        # Parse JSON array containing names of all filters matching any of changed files
        # e.g. ['package1', 'package2'] if both package folders contains changes
        package: ${{ fromJSON(needs.changes.outputs.packages) }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - ...
```

If this workflow is used to check a Pull Request, it is recommended, to add a final step after the matrix build as a fan-in step. Because we can't determine which steps will be executed in the matrix, it does not make sense to use their status as a required one for a Pull Request. So we add a final fan-in step, which then can be used as a required status check for the Pull Request.

```yaml
# ...

  final:
    name: Pull Request Check successful
    needs: build
    runs-on: ubuntu-latest
    steps:
      - run: echo "Done."    
```


![Add Labels to GitHub](/img/docs-internal/devops/github/actions/addGithubStatusCheck.jpg)

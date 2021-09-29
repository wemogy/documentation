---
sidebar_position: 1
---

# Branching and Releases

## Libraries

For libraries and tools where we need to **maintain multiple versions simultaneously**, we use the branching model shown below. This model helps us to support users of older versions as well as users of the latest version. If a critical bugfix or hotfix has to be made, it can be merged and cherrypicked into both, the most recent and also older version, that might be out there and are still supported by us.

![Branching strategy](/img/docs-internal/conventions/branching.jpg)

- Our primary branch is called `main` and never ~~`master`~~
- We use [Semantic Versioning](https://semver.org/) (`breaking.feature.patch`)
- We don't prepend `v` to our version numbers
- We use mono repos (Frontend + Backend + Environment Infrastructure) in one repository

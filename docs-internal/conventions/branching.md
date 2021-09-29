---
sidebar_position: 1
---

# Branching and Releases

- Our primary branch is called `main` and never ~~`master`~~
- We use [Semantic Versioning](https://semver.org/) (`major.minor.patch`) for libraries
  - Increase the `patch` part, when adding minor changes or bugfixes
  - Increase the `minor` part, when adding new features
  - Increase the `major` part, when introducing breaking changes
- We don't prepend `v` to our version numbers
- We use mono repos (Frontend + Backend + Environment Infrastructure) in one repository

## Libraries

For libraries and tools where we need to **maintain multiple versions simultaneously**, we use the branching model shown below. This model helps us to support users of older versions as well as users of the latest version. If a critical bugfix or hotfix has to be made, it can be merged and cherrypicked into both, the most recent and also older version, that might be out there and are still supported by us.

![Branching strategy](/img/docs-internal/conventions/branching-libs.jpg)

## Applications and customer projects

For applications that we publish (for us or our customers), **we use continuos integrations or scheduled releases and there is no need to support multiple versions at the same time**. There is only one currently released version at a time. What we do need here though is a Staging environment to test release candidates and let customers approve the changes. This is why we use the branching model below for applications and customer project.

![Branching strategy](/img/docs-internal/conventions/branching-apps.jpg)

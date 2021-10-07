---
sidebar_position: 1
---

# Overview

We make all our services configurable through configuration files. These files are in the YAML format and get passed to the application, which then configures itself according to the configuration file's content.

When using Docker Containers, the configuration files get mounted into the container. When using Kubernetes, the configuration files will be stored as a `ConfigMap` and mounted into the `Pod`. When using Helm, configuration can either be part of the Helm Values or be passed as a file.

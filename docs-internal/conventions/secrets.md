---
sidebar_position: 3
---

# Secrets

We never check-in any secrets into Git repositories.


:::danger Important

Connection strings and other secret values should never be part of your source code or committed into your repository!

:::

## For development

- [Using Secretes in .NET](/docs-internal/conventions/languages/dotnet#Secrets)

## In CI/CD pipelines

When you are using secrets in your unit test projects, you need to specify the secret values in github secrets. In order to do that, go in the settings section of the repository and select on the left side the `Secrets` section. Use the `New repository secret` button to create a new secret. The name of the secret must not match the name in the `appsettings.json` file.

After that you need to set an environment variable in the build pipeline. In order to do that open the `.yaml`file of the pipeline and add to the build step, where the secret is used the environment variable. Replace the `:` with two underscores `__`.

```yaml
- name: Test
  run: dotnet test --no-build --verbosity normal
  env:
    RedisCache__ConnectionString: ${{ secrets.REDIS_CONNECTION_STRING }}
```

---
sidebar_position: 1
---

# Secrets

:::danger Important

Connection strings and other secret values should never be part of your source code or committed into your repository!

:::

## Adding a new secret

All secrets should be declared in the `appsettings.json` file. For could resources you can create nested objects in the `appsettings.json` file. A sample `appsettings.json` file:

```json
{
  "AzureBlobStorage": {
    "ConnectionString": ""
  }
}
```

The secrets for development should be stored in the `appsettings.Development.json` file which is ignored by git.

```json
{
  "AzureBlobStorage": {
    "ConnectionString": "connection_string_here"
  }
}
```

To get it work, make sure, that both files are set to `CopyToOutputDirectory` in the `.csproj` file.

```xml
<ItemGroup>
  <None Update="appsettings.json">
    <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
  </None>
  <None Update="appsettings.Development.json">
    <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
  </None>
</ItemGroup>
```

## Using the secret

The secrets from the `appsettings.json` file will be available via the `IConfiguration` in the dependency injection.

For that you need to register it in your `Startup.cs` file.

```csharp
using Wemogy.Core.Configuration;

// Adds the configuration to DI and returns it to use it in the ConfigureServices function
var configuration = services.AddConfiguration();

var connectionString = configuration["AzureBlobStorage:ConnectionString"];
```

After that you are able to use it in your services and controllers:

```csharp
public class AwesomeService {
  public AwesomeService(IConfiguration configuration){
    var connectionString = configuration["AzureBlobStorage:ConnectionString"];
  }
}
```

## Using the secret the pipeline

When you are using secrets in your unit test projects, you need to specify the secret values in github secrets. In order to do that, go in the settings section of the repository and select on the left side the `Secrets` section. Use the `New repository secret` button to create a new secret. The name of the secret must not match the name in the `appsettings.json` file.

After that you need to set an environment variable in the build pipeline. In order to do that open the `.yaml`file of the pipeline and add to the build step, where the secret is used the environment variable. Please the `:` with two underscores `__`.

```yaml
- name: Test
  run: dotnet test --no-build --verbosity normal
  working-directory: ${{ steps.get-folder-name.outputs.folderName }}
  env:
    RedisCache__ConnectionString: ${{ secrets.REDIS_CONNECTION_STRING }}
```

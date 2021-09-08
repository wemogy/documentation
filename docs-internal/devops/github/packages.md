---
sidebar_label: "Packages"
---

# GitHub Packages

We publish our internally used packages link NuGet or NPM packages to the GitHub Packages feed and consume it from there.

## Publish packages

### NuGet

To prepare a NuGet package for publishing, we need to ensure that the NuGet package includes all the required information. We usually define NuGet properties in the `.csproj` file.

1. `IsPackable` is set to `true`
1. `PackageId` is included
1. `RepositoryUrl` has been added and points to the GitHub repository to publish into

Below, you can find a valid example.

```xml title="Wemogy.Demo.csproj"
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>netstandard2.1</TargetFramework>
    <IsPackable>true</IsPackable>
  </PropertyGroup>

  <PropertyGroup>
    <PackageId>Wemogy.Demo</PackageId>
    <Authors>wemogy GmbH</Authors>
    <Company>wemogy GmbH</Company>
    <PackageDescription>Demo project</PackageDescription>
    <PackageTags>wemogy,form,generator,formgenerator</PackageTags>
    <RepositoryUrl>https://github.com/wemogy/demo</RepositoryUrl>
  </PropertyGroup>
</Project>

```

Once the package is packed, we can push it to the GitHub packages registry.

```bash
dotnet nuget push MyPackage.nupkg \
  --skip-duplicate \
  --source https://nuget.pkg.github.com/wemogy \
  --api-key <YOUR_GITHUB_TOKEN>
```

:::info

When running in GitHub Actions, you can use `${{ secrets.GITHUB_TOKEN }}` for `<YOUR_GITHUB_TOKEN>` as long as you push the package to the same repository the Action gets executed in. Take a look at [Secrets for consuming and publishing packages](http://localhost:3000/docs-internal/devops/github/actions#secrets-for-consuming-and-publishing-packages) for more details.

:::

### NPM

To prepare a NPM package for publishing, we need to ensure that the package includes all the required information in the `package.json` file.

1. `name` is set and includes the  `@wemogy/` prefix
1. `repository` has been added and points to the GitHub repository to publish into

Below, you can find an example.

```json title="package.json"
{
  "name": "@wemogy/demo",
  "repository": "https://github.com/wemogy/demo",

  // ...
}
```

Once the package is packed, we can push it to the GitHub packages registry.

```bash
npm login --scope=@wemogy --registry=https://npm.pkg.github.com

npm publish
```

When running in GitHub Actions, you don't need to use `npm login` but can use the `setup-node` Action instead.

```yaml
steps:
  - name: Setup Node.js
    uses: actions/setup-node@v2
    with:
      node-version: 12
      registry-url: https://npm.pkg.github.com/

  - name: Publish NPM package
    run: npm publish
    env:
      NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Take a look at [Secrets for consuming and publishing packages](http://localhost:3000/docs-internal/devops/github/actions#secrets-for-consuming-and-publishing-packages) for more details.

## Consume packages

To consume packages hosted on GitHub packages, we need to authenticate first. Please take a look at [Private Registries](/docs-internal/conventions/private-registries) for more details on how to get access and how to configure your system.

# NuGet

When creating NuGet packages, we make our lives a lot easier by using [NuGetizer](https://github.com/devlooped/nugetizer) instead of the default packaging tools that come with the .NET CLI. Especially as by default, [project references don't get included when running dotnet pack](https://github.com/NuGet/Home/issues/3891), which is an open issue from 2006 which is still not resolved. There are some hacky workarounds for this, but NuGetizer makes this a lot easier.


## Build a package with NuGetizer

So in each project that belongs to a NuGet package, we simply add the NuGetizer NuGet package by running the following command.

```bash
dotnet add package NuGetizer
```

Next, we need to make sure, that the `.csproj` file includes the needed information to create a NuGet package. Set `IsPackable` and include a `PropertyGroup` for NuGet details like shown below. Make sure to include the correct `RepositoryUrl` to make GitHub Packages work!

```xml title=".csproj"
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>netstandard2.1</TargetFramework>
    <IsPackable>true</IsPackable>
  </PropertyGroup>

  <PropertyGroup>
    <PackageId>Wemogy.Demo</PackageId>
    <Authors>wemogy GmbH</Authors>
    <Company>wemogy GmbH</Company>
    <PackageDescription>wemogy.Demo SDK</PackageDescription>
    <PackageTags>wemogy,demo</PackageTags>
    <RepositoryUrl>https://github.com/wemogy/demo</RepositoryUrl>
  </PropertyGroup>

  <!-- ... -->
</Project>
```

Now the package can be built as ususal using the `dotnet pack` command.

## Inspect package contents

If you want to inspect the contents of a NuGet package before actually packing it, NuGetizer brings a handy inspection tool.

For this, make sure, the NuGetize tool is installed on your machine.

```bash
dotnet tool install -g dotnet-nugetize
```

Then run the following command inside of the project you want to inspect.

```bash
nugetize
```

The output should look similar to this:

```
Package: Wemogy.NugetizerDemo.1.0.0.nupkg
        /Users/robinmanuelthiel/Source/wemogy/nugetizer-demo/src/Wemogy.NugetizerDemo.Package/bin/Wemogy.NugetizerDemo.nuspec
    Authors      : wemogy GmbH
    Description  : Package Description
    RepositoryUrl: https://github.com/wemogy/nugetizer-demo
    Version      : 1.0.0
  Dependencies:
    netstandard2.1
      Newtonsoft.Json, 13.0.1
  Contents:
    /lib/
      netstandard2.1/
        Wemogy.NugetizerDemo.Core.dll
        Wemogy.NugetizerDemo.Core.pdb
        Wemogy.NugetizerDemo.Package.dll
        Wemogy.NugetizerDemo.Package.pdb
```

---
sidebar_position: 99
---

# Troubleshooting

## CSC : warning SA0001: XML comment analysis is disabled due to project configuration

```
CSC : warning SA0001: XML comment analysis is disabled due to project configuration
```

This happens, when roslyn analyzers like StyleCop can't process .NET XML documention for rule violtations. To remediate this, add the following XML Documentation section to the `.csproj` file.

```xml
<PropertyGroup>
  <GenerateDocumentationFile>true</GenerateDocumentationFile>
  <NoWarn>$(NoWarn);1591</NoWarn>
</PropertyGroup>
```

:::note

This should not happen, if you have generated the .NET project from the [wemogy yeoman template](https://github.com/wemogy/generator-wemogy), as these template already include the XML Documentation section. Please always generate new projects from these teplates.

:::

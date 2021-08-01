# Coding Style

## General

## .NET

### StyleCop

- [Customizing Rules](https://github.com/DotNetAnalyzers/StyleCopAnalyzers/blob/master/documentation/Configuration.md)
- [Default Ruleset](https://github.com/DotNetAnalyzers/StyleCopAnalyzers/blob/master/StyleCop.Analyzers/StyleCop.Analyzers.CodeFixes/rulesets/StyleCopAnalyzersDefault.ruleset)

#### Rules to discuss:

- SA1516
- SA1311

#### How to fix

```
CSC : warning SA0001: XML comment analysis is disabled due to project configuration
```

Add XML Documentation to the .csproj file

```xml
<PropertyGroup>
  <GenerateDocumentationFile>true</GenerateDocumentationFile>
  <NoWarn>$(NoWarn);1591</NoWarn>
</PropertyGroup>
```

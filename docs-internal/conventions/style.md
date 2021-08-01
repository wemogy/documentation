# Coding Style

Unified coding style is an important instrument for readability and maintanability across the team. Unification allows other team member to review and maintain code that someone else created a lo better. This is why we decided to put energy into enforcing a unified coding style across the company.

## General rules

1. We use **Spaces**, not ~~**Tabs**~~
1. We use `lf` line-endings
1. We use the `utf-8` charset
1. All files end with an empty line
1. We remove trailing whitespaces

General (language independent) coding style is defined via [EditorConfig](https://editorconfig.org). We only use code editors, that [support EditorConfig](https://editorconfig.org/#pre-installed) natively or via Plugin.

:::info

You can find an up-to-date version of the `.editorconfig` file that we use across all projects in [our template repository](https://github.com/wemogy/template/blob/main/.editorconfig).

:::

### Rule violations

To maintain a high quality standard of our code, we should check a project and all its code changes for coding style violations. This can typically be done during a Pull Request check.

The [eclint](https://github.com/greut/eclint) linting software for EditorConfig can check and fix EditorConfig violations. Checkout the [Tools](/docs-internal/tools) section for more useful tools and installation instructions.

Check all files in a Git project for EditorConfig rule violations.

```bash
eclint check $(git ls-files)
```

Fix all EditorConfig rule violations in a Git project.

```bash
eclint fix $(git ls-files)
```

## .NET

For .NET projects, we use StyleCop to define and enforce coding style rules.

:::info

You can find an up-to-date version of the StyleCop configurations files that we use across all projects in [our template repository](https://github.com/wemogy/template).

:::

### StyleCop

- [Customizing Rules](https://github.com/DotNetAnalyzers/StyleCopAnalyzers/blob/master/documentation/Configuration.md)
- [Default Ruleset](https://github.com/DotNetAnalyzers/StyleCopAnalyzers/blob/master/StyleCop.Analyzers/StyleCop.Analyzers.CodeFixes/rulesets/StyleCopAnalyzersDefault.ruleset)


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

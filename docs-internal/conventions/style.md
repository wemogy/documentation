# Coding Style

Unified coding style is an important instrument for readability and maintanability across the team. Unification allows other team member to review and maintain code that someone else created a lo better. This is why we decided to put energy into enforcing a unified coding style across the company.

## General rules

1. We use **Spaces**, not ~~**Tabs**~~
1. We use `lf` line-endings
1. We use the `utf-8` charset
1. All files end with an empty line
1. We remove trailing whitespaces


### EditorConfig

General (language independent) coding style is defined via [EditorConfig](https://editorconfig.org). We only use code editors, that [support EditorConfig](https://editorconfig.org/#pre-installed) natively or via Plugin.

:::info

You can find an up-to-date version of the `.editorconfig` file that we use across all projects in [our template repository](https://github.com/wemogy/template/blob/main/.editorconfig).

:::

### Rule violations

To maintain a high quality standard of our code, we should check a project and all its code changes for coding style violations. This can typically be done during a Pull Request check.

The [eclint](https://github.com/greut/eclint) linting software for EditorConfig can check and fix EditorConfig violations. Checkout the [Tools](/docs-internal/tools/overview) section for more useful tools and installation instructions.

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

### StyleCop

StyleCop provides a Roslyn Analyzer extension, which checks .NET code for style vioaltions and marks them as compiler warnings or errors. At wemogy, we use a central set of rules across all our .NET projects. These rules are our own modifications based on the [Default StyleCop Ruleset](https://github.com/DotNetAnalyzers/StyleCopAnalyzers/blob/master/StyleCop.Analyzers/StyleCop.Analyzers.CodeFixes/rulesets/StyleCopAnalyzersDefault.ruleset).

:::info

You can find an up-to-date version of the StyleCop configurations files that we use across all projects in [our template repository](https://github.com/wemogy/template).

:::

We are currently still in the process of shaping these rules. Below, you can find useful resources

- [Customizing Rules](https://github.com/DotNetAnalyzers/StyleCopAnalyzers/blob/master/documentation/Configuration.md)

# Visual Studio Code

Tips, tricks and recommendations for Visual Studio Code.

## Recommended extensions

#### Highly recommended

- EditorConfig
- ESLint
- Code Spell Checker
- German - Code Spell Checker
- GitHub Pull Requests and Issues
- Prettier
- C#
- C# Extensions
- [C# XML Documentation Comments](https://marketplace.visualstudio.com/items?itemName=k--kato.docomment)
- Docker
- [HashiCorp Terraform](https://marketplace.visualstudio.com/items?itemName=HashiCorp.terraform)
- Live Share
- markdownlint
- Todo Tree
- [Visual Studio IntelliCode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode)
- [YAML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml)
- [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)

#### Nice to have

- Draw.io integration
- GitLens
- Task Explorer
- Kubernetes
- Bracket Pair Colorizer 2
- [vsc-scaffolding](https://marketplace.visualstudio.com/items?itemName=alfnielsen.vsc-scaffolding)

## Recommended settings

Most wemogy source code repositories come with a `.vscode/settings.json` file with most of our recommended settings already included. But some editor settings are user specific and might be based on personal preference like font, tab size and more.

If you don't want to dig into the details of Visual Studio Code settings and just want a set of good working details, you can orientate on the ones below. You can open the settings in JSON format by opening the command prompt (usually <kbd>CMD</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>) and selecting *Preferences: Open Settings (JSON)*.

```json title="settings.json"
{
  "editor.tabSize": 2,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[json]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  "[terraform]": {
    "editor.defaultFormatter": "hashicorp.terraform"
  },
  "[csharp]": {
    "editor.tabSize": 4,
    "editor.defaultFormatter": "ms-dotnettools.csharp"
  },

  // Spell Checker
  "cSpell.language": "en,de",
}
```

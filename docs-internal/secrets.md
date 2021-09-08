# Secrets

We never check-in any secrets into Git repositories.

:::danger Important

Connection strings and other secret values should never be part of your source code or committed into your repository!

:::

## Using secrets

### For development

- [Using Secretes in .NET](/docs-internal/conventions/languages/dotnet#Secrets)

### In CI/CD pipelines

When you are using secrets in your unit or integration test projects, you need to specify the secret values in GitHub Secrets. In order to do that, go in the settings section of the repository and select on the left side the **Secrets** section. Use the **New repository secret** button to create a new secret. The name of the secret must not match the name in the `appsettings.json` file, but we use an *Uppercase with underscores* naming convention.

After that you need to set an environment variable in the build pipeline. In order to do that open the `.yaml`file of the pipeline and add to the build step, where the secret is used the environment variable. When using the `:` in .NET, replace it with two underscores `__`.

```yaml
- name: Test
  run: dotnet test --no-build --verbosity normal
  env:
    RedisCache__ConnectionString: ${{ secrets.REDIS_CONNECTION_STRING }}
```

## Detecting secrets

We use [GitGuardian](https://gitguardian.com) for detecting secrets in our source code. Git Guardian constantly scans our repositories for accidentally checked-in secrets and holds a list of those secrets, so we can renew and invalidate them. Remember, that we don't want any secrets in our source code and repositories, so it's an absolute priority not to commit any secrets to Git.

### Detecting secrets locally

To scan a local file or repository, we can use the [GitGuardian Shield CLI](https://github.com/GitGuardian/ggshield). You can get your own API Key from the [GitGuardian dashboard](https://dashboard.gitguardian.com/workspace/133992/api).

:::info
Currently, installing the ggshield CLI via Homebrew has some issues. See [this GitHub issue](https://github.com/GitGuardian/homebrew-ggshield/issues/1) for a temporary workaround.
:::

Once the `ggshield` tool is installed on your machine, you can scan a repository, file or folder with it.

```bash
# Set your API Key
export GITGUARDIAN_API_KEY=<YOUR_API_KEY>

# San the current Git repository
ggshield scan repo .
```

### Detecting secrets in Pull Requests

Although we try to avoid checking-in secret into Git, it can happen from time to time. This is why we scan each Pull Request for newly added secrets and fail a Pull Request check, whenever a secret was found.

You can find a ready-to-use GitHub Actions workflow for this in the [template repository](https://github.com/wemogy/template/blob/main/.github/workflows/scan_secrets.yaml). Please also make sure, to add **Secret Scan** to the required status checks for the `main` branch.

![Branching strategy](/img/docs-internal/conventions/gitHubBranchPolicySecretScan.jpg)

If the **Secret Scan** status check detects a secret in a Pull Request, the Pull Request can't be merged until the secret got removed. Please check out [Removing secrets from a Pull Request](#removing-secrets-from-a-pull-request) for details.

## Removing secrets

### Removing secrets from a Pull Request

This guide assumes, that the recent changes that you made on a branch included checking in a secret. To remove a secret that has been in the repository for longer, please refer to [Removing secrets from a Git Repository](#removing-secrets-from-a-git-repository).

To remove a secret from a Pull Request, we need to soft-reset the changes to undo all commits that happed on that branch. Don't worry, your work won't be lost. This will put all modifications back to the list of uncommitted changes.

```bash
git checkout pr_branch
git reset --soft main
```

Before creating a commit, we can now remove the secret from its containing file. Afterwards, we can create a new commit without the secret.

```bash
git add -A && git commit -m "commit message goes here"
```

This keeps the history clean and free from secrets, so the branch can be merged.

:::danger important
Every secret that has been pushed to a **public** repository must be considered as compromised, even if they get removed from the Git history afterwards. This is because in public repositories there was a point in time, where attackers could have stolen the secret at the time it was in the Pull Request. Please refer to [Invalidating exposed secrets](#invalidating-exposed-secrets) for more.
:::\

### Removing secrets from a Git Repository

If a secret has made it into a permanent branch of a Git repository and can't be easily removed anymore, we need to remove it from the Git history.

:::caution Warning
Removing secrets from a Git Repository is a heavy and destructive task that should only be executed with extreme caution. Please also note, that this will re-write your Git history, which makes most references to Git commit SHAs useless.
:::

The [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/) can clean-up a repository from checked-in secrets. Refer to the [GitHub documentation for Purging a file from your repository's history](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository#purging-a-file-from-your-repositorys-history) for usage details.

Please note, that you need to temporarily **Allow force pushes** on all branches in GitHub for this to work.

## Invalidating exposed secrets

Once a secret has been exposed as part of a Pull Request against a public repo or as part of the Git History or public or private repositories, it needs to be invalidated. Invalidation makes sure, that an exposed secret is useless for attackers.

Most API Keys and Access Tokens can be re-generated, which usually includes invalidation of the old key. The correct way of invalidating a secret depends on the type of secret but in general, we need to follow these steps:

1. Invalidate the exposed secret
1. Generate a new secret
1. Update all usages of the exposed secret with the new secret

# Build and CI

::: tip Languages
[简体中文](./zh/build-and-ci)
:::

## Generator repository

| Task | Command |
|------|---------|
| Restore / build | `dotnet build MvvmAIO.R3.SourceGenerators.slnx` |
| Test | `dotnet test MvvmAIO.R3.SourceGenerators.slnx` |
| Full CI (Nuke) | From generator repo root: `dotnet run --project build/_build.csproj -- --root . --target Ci --configuration Release` |

Workflows in **MvvmAIO.R3.SourceGenerators**:

- **`dotnet.yml`** — build and test on push/PR
- **`nuget-publish.yml`** — package publish (maintainer)

## Documentation repository (this site)

| Task | Command |
|------|---------|
| Dev server | `npm run docs:dev` |
| Production build | `npm run docs:build` |
| Preview build | `npm run docs:preview` |

**GitHub Actions** (`.github/workflows/github-pages.yml`) runs `npm ci` and `npm run docs:build` on pull requests; deploys to GitHub Pages on push to **`main`**.

## SDKs

- Generator CI uses **.NET 8** (tests) and **.NET 10** (Nuke build).
- Docs CI uses **Node.js 22** only.

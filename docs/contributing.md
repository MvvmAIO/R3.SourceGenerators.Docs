# Contributing

::: tip Languages
[简体中文](/zh/contributing)
:::

## Generator changes

Work in **[MvvmAIO.R3.SourceGenerators](https://github.com/MvvmAIO/MvvmAIO.R3.SourceGenerators)**:

1. Open or reference a GitHub issue for substantive work.
2. Use **`MvvmAIO.R3.SourceGenerators.slnx`** (not a legacy `.sln` unless tooling requires it).
3. Run **Nuke `Ci`** before opening a PR.
4. Update **Verify** snapshots only when output changes intentionally.

Read **[AGENTS.md](https://github.com/MvvmAIO/MvvmAIO.R3.SourceGenerators/blob/master/AGENTS.md)** in the generator repo for conventions (SyntaxFactory style, `.Temp/` scratch, diagnostic IDs).

## Documentation changes

Work in **[R3.SourceGenerators.Docs](https://github.com/MvvmAIO/R3.SourceGenerators.Docs)**:

- English: `docs/`
- 简体中文: `docs/zh/`

When **R3SG** diagnostics or user-visible generator behavior changes, update **both** [Diagnostics reference](./diagnostics/reference.md) and the relevant generator pages in **both** locales.

## Pre-1.0

Breaking changes are still expected before **1.0.0**. Document upgrade notes in CHANGELOG and, when consumers are affected, on this site.

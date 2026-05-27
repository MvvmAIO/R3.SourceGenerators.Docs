# Samples

::: tip Languages
[简体中文](./zh/samples)
:::

Runnable demos live in a **separate repository**:

**[MvvmAIO.R3.SourceGenerators.Samples](https://github.com/MvvmAIO/MvvmAIO.R3.SourceGenerators.Samples)**

## What is included

- **WPF** — routed events with `UseWPF`
- **Avalonia** — routed and attached routed scenarios
- Examples for `FromEvents`, `FromRoutedEvents`, and `[R3Command]`

Clone the samples repo, restore packages from NuGet (or wire a local analyzer build per sample README), then open **`MvvmAIO.R3.SourceGenerators.Samples.slnx`**.

## Package version

Samples typically reference the latest **MvvmAIO.R3.SourceGenerators** on NuGet. When testing unreleased generator changes, follow the samples repo instructions for local package feed or project reference.

## Local analyzer vs NuGet

| Approach | When |
|----------|------|
| **NuGet** (default) | Running demos against published packages |
| **Local pack / feed** | Validating generator changes before release |

The [samples README](https://github.com/MvvmAIO/MvvmAIO.R3.SourceGenerators.Samples/blob/master/README.md) covers `dotnet nuget locals` refresh, restore, and wiring a local analyzer build — use that instead of duplicating steps here.

---
layout: home

hero:
  name: R3.SourceGenerators
  text: Compile-time MVVM for R3
  tagline: Observable events and ReactiveCommand from Roslyn source generators
  actions:
    - theme: brand
      text: Get started
      link: /getting-started
    - theme: alt
      text: Observable events
      link: /generators/observable-events
    - theme: alt
      text: View on GitHub
      link: https://github.com/MvvmAIO/MvvmAIO.R3.SourceGenerators

features:
  - title: Observable events
    details: FromEvents, FromEventHandlers, and routed APIs with interface-based chaining and generic constraints.
  - title: R3Command
    details: Generate ReactiveCommand properties from partial types with optional CanExecute.
  - title: Multi-Roslyn
    details: Analyzer builds for Roslyn 4.3, 4.12, and 5.x — MSBuild picks the matching analyzer folder.
---

## Stability

::: warning Pre-1.0
Until **1.0.0**, breaking changes may ship without a long deprecation window. Review the [changelog](./changelog.md) and [GitHub CHANGELOG](https://github.com/MvvmAIO/MvvmAIO.R3.SourceGenerators/blob/master/CHANGELOG.md) when upgrading.
:::

## Where to read next

| Page | Purpose |
|------|---------|
| [Getting started](./getting-started.md) | Install the NuGet package and first `FromEvents()` call |
| [Observable events](./generators/observable-events.md) | Interface pipeline, hierarchy, routed events |
| [R3Command](./generators/r3-command.md) | Command generation and signature matrix |
| [Diagnostics](./diagnostics/reference.md) | Every **R3SG** diagnostic ID |
| [Samples](./samples.md) | WPF and Avalonia demo repository |

This site is the **canonical manual** for the package — deeper than the GitHub README alone. See [About this site](./about-this-site.md).

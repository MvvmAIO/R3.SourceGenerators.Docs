# Architecture overview

::: tip Languages
[简体中文](../zh/architecture/overview)
:::

## Repositories

| Repository | Role |
|------------|------|
| [MvvmAIO.R3.SourceGenerators](https://github.com/MvvmAIO/MvvmAIO.R3.SourceGenerators) | Analyzers, tests, Nuke build |
| [MvvmAIO.R3.SourceGenerators.Samples](https://github.com/MvvmAIO/MvvmAIO.R3.SourceGenerators.Samples) | WPF + Avalonia demos (separate clone) |
| **R3.SourceGenerators.Docs** (this site) | VitePress documentation |

## Solution layout

Primary solution: **`MvvmAIO.R3.SourceGenerators.slnx`**

| Project / folder | Role |
|------------------|------|
| `MvvmAIO.R3.SourceGenerators/` | Shared generator logic (`.shproj` / `.projitems`) |
| `MvvmAIO.R3.SourceGenerators.Roslyn4031` | Roslyn **4.3.1** analyzer build |
| `MvvmAIO.R3.SourceGenerators.Roslyn4120` | Roslyn **4.12** analyzer build |
| `MvvmAIO.R3.SourceGenerators.Roslyn5000` | Roslyn **5.0** analyzer build |
| `MvvmAIO.R3.SourceGenerators.Package/` | **MvvmAIO.R3.SourceGenerators** NuGet layout |
| `MvvmAIO.R3.SourceGenerators.Tests/` | Verify snapshots + test harness |
| `build/` | Nuke `Ci`, pack, publish |

## Generators

| Generator | User API | Output |
|-----------|----------|--------|
| `ObservableEventsGenerator` | `FromEvents`, routed helpers | Internal event interfaces + `sealed` impls |
| `R3CommandGenerator` | `[R3Command]` on partial types | `ReactiveCommand*` properties |

### Observable events pipeline (summary)

1. **Post-init** bootstrap for unresolved call sites (`NullEvents`).
2. **Incremental** collection of invocation targets from user syntax.
3. **Interface pipeline**: `EventInterfaceDescriptor` hierarchy → `EventInterfaces.{kind}.g.cs` + per-type `*Impl` files.
4. **Attached routed** (Avalonia): separate extensions returning `Observable<T>`.

Static `ObservableEventsStatics` generation is **disabled**.

### R3Command pipeline (summary)

Post-init attribute registration, partial-type validation, signature matrix checks, optional `CanExecute` wiring.

## Call-site driven generation

Code is emitted when your project **calls** an entry API (`FromEvents()`, `FromRoutedEvents()`, and so on) on a concrete type. The generator records those types and emits matching interfaces and `sealed` implementations on the next build.

## Bootstrap and unresolved call sites

A small **post-init** layer provides fallback extensions (for example on `object?`) so incomplete solutions still compile. These stubs are hidden from typical IntelliSense in consuming assemblies; type-specific generated overloads win at real call sites. Types with no usable events may resolve to **`NullEvents`** until proper generation runs.

## WPF vs Avalonia

| Platform | Requirement |
|----------|-------------|
| **WPF** routed events | `<UseWPF>true</UseWPF>` in the consumer project |
| **Avalonia** routed | `RoutedEvent` metadata on event symbols; parameterless overloads use default routes |
| **Attached** routed (Avalonia) | Separate `FromAttachedRoutedEvent` APIs — **not** the interface property model |

Details: [Observable events](../generators/observable-events.md).

## Generated file layout

See the **Generated artifacts** table on [Observable events](../generators/observable-events.md). Per-type files such as `{Type}.FromEvents.g.cs` sit beside shared `EventInterfaces.*.g.cs` bundles.

## Not generated today

- **Static** observable helpers (`OBS_*` / `ObservableEventsStatics`) — disabled in current releases.
- Unsupported event delegates are skipped with **R3SG2001** / **R3SG2002** warnings.

## Source map (contributors)

| Area | Files |
|------|--------|
| Event pipeline | `ObservableEventsGenerator.cs` |
| Event syntax | `ObservableEventsSyntaxFactory.cs` |
| Bootstrap | `GeneratorBootstrapSyntaxFactory.cs` |
| Commands | `R3CommandGenerator.cs`, `R3CommandSyntaxFactory.cs` |
| Diagnostics | `Diagnostics/DiagnosticDescriptors.cs` |

See [Roslyn targeting](./roslyn-targeting.md) for analyzer selection.

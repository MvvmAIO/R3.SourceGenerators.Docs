# Getting started

::: tip Languages
[简体中文](/zh/getting-started)
:::

## Install the package

```bash
dotnet add package MvvmAIO.R3.SourceGenerators
```

The package is a **DevelopmentDependency** analyzer. Add:

```csharp
using R3.SourceGenerators;
```

Generated interfaces and implementations are **`internal`** in namespace **`R3.SourceGenerators`**.

## Partial types for R3Command

`[R3Command]` requires a **partial** declaring type. Fix **R3SG0001** by making the type `partial`.

```csharp
public partial class ShellViewModel
{
    [R3Command]
    private void Save() { }
}
```

Observable event APIs do not require partial types on the **source** type (only command generation does).

## First observable event

```csharp
public class Button : Control
{
    public event EventHandler<RoutedEventArgs>? Click;
}

// IButtonEvents (internal)
var clicks = button.FromEvents().Click;
```

See [Observable events](./generators/observable-events.md) for hierarchy, generic constraints, and routed APIs.

## WPF routed events

Enable WPF in the consumer project:

```xml
<UseWPF>true</UseWPF>
```

Then use `FromRoutedEvents()` / `FromRoutedEventHandlers()` like standard routed events.

## Avalonia

Routed events are detected when `Avalonia.Interactivity.RoutedEvent` metadata is present. Parameterless overloads use default routes (`Direct | Bubble`, `handledEventsToo: false`).

## Verify your build

```bash
dotnet build
```

Unresolved **R3SG** errors point to [Diagnostics reference](./diagnostics/reference.md).

## Next steps

| Topic | Link |
|-------|------|
| Command generation | [R3Command](./generators/r3-command.md) |
| Repository layout | [Architecture overview](./architecture/overview.md) |
| Runnable demos | [Samples](./samples.md) |

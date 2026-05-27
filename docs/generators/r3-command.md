# R3Command

::: tip Languages
[简体中文](../zh/generators/r3-command)
:::

Apply **`[R3Command]`** (`MvvmAIO.R3`) to **instance methods** on a **partial** class or struct. The generator emits a public **`ReactiveCommand`** property on the same partial type.

## Prerequisites

| Topic | Detail |
|-------|--------|
| Partial type | The declaring type must be **`partial`** — otherwise **R3SG0001** |
| Method kind | **Instance** methods only (not `static`) |
| Attribute | `MvvmAIO.R3.R3Command` or `MvvmAIO.R3.R3CommandAttribute` |
| Output | Public properties such as `SaveCommand` or a custom `CommandName` |
| CanExecute | Optional; must be `R3.Observable<bool>` or `IObservable<bool>` on the **same** partial type |

Observable event APIs do not require `partial` on the event source type — only command generation does.

## Quick start

```csharp
public partial class ShellViewModel
{
    private readonly Observable<bool> _canSave = new(true);

    [R3Command(CanExecute = nameof(_canSave))]
    private async Task Save() { /* ... */ }

    [R3Command]
    private void ExecuteBasic() { }
}
```

After build, the type gains properties like **`SaveCommand`** and **`ExecuteBasicCommand`**. Bind them in WPF or Avalonia like any `ICommand` / command property (for example `Command="{Binding SaveCommand}"`).

## How generation works

```
[R3Command] on partial method Save()
        │
        ▼
public ReactiveCommand SaveCommand { get; }
        │
        ▼
Handler wires method body (sync, async, or with argument)
```

- Default property name: **`{MethodName}Command`**
- **`CommandName = "Submit"`** → property **`Submit`**
- **`CanExecute = nameof(_field)`** → passes the observable into the `ReactiveCommand` constructor

## Method signature matrix

| Parameters | Return type | Generated property | When to use |
|------------|-------------|-------------------|-------------|
| none | `void` | `ReactiveCommand` | Simple sync command |
| one (`T`) | `void` | `ReactiveCommand<T>` | Sync with argument |
| none | `Task` | `ReactiveCommand` | Async (`ValueTask` inside handler) |
| one (`T`) | `Task` | `ReactiveCommand<T>` | Async with argument |
| none | `ValueTask` | `ReactiveCommand` | Async without result |
| one (`T`) | `ValueTask` | `ReactiveCommand<T>` | |
| one (`T`) | `Task<TResult>` | `ReactiveCommand<T, TResult>` | Async with result |
| one (`T`) | `ValueTask<TResult>` | `ReactiveCommand<T, TResult>` | |
| none | `Task<TResult>` / `ValueTask<TResult>` | — | **R3SG1001** |
| two or more parameters | any | — | **R3SG1001** |
| `static` method | any | — | **R3SG1001** |

## CanExecute

```csharp
public partial class ShellViewModel
{
    private readonly Observable<bool> _canSave = new(true);

    [R3Command(CanExecute = nameof(_canSave))]
    private async Task Save() { }
}
```

| Issue | Diagnostic |
|-------|------------|
| Member name not found | **R3SG1002** |
| Member is not `Observable<bool>` / `IObservable<bool>` | **R3SG1003** |

The `CanExecute` field or property must exist on the **same partial** type as the command method.

## Async commands

`Task` and `ValueTask` handlers are supported; the generator wraps them appropriately for `ReactiveCommand`.

```csharp
[R3Command]
private async Task ExecuteAsync()
{
    await Task.Delay(1000);
}
```

Commands that return **`Task<TResult>`** / **`ValueTask<TResult>`** require **one** parameter and produce **`ReactiveCommand<T, TResult>`**.

## Troubleshooting

| Id | Fix |
|----|-----|
| **R3SG0001** | Add `partial` to the declaring type |
| **R3SG1001** | Change method to a supported signature (see matrix) |
| **R3SG1002** | Fix `CanExecute` name or add the member |
| **R3SG1003** | Use `Observable<bool>` or `IObservable<bool>` for CanExecute |
| **R3SG1004** | Rename methods or set distinct **`CommandName`** values |

Full reference: [Diagnostics](../diagnostics/reference.md).

## Try it in the samples

[MvvmAIO.R3.SourceGenerators.Samples](https://github.com/MvvmAIO/MvvmAIO.R3.SourceGenerators.Samples) — navigation **\[R3Command] · Commands**.

The sample demonstrates sync, parameterized, and async commands:

```csharp
[MvvmAIO.R3.R3Command]
private void ExecuteBasic() { /* ... */ }

[MvvmAIO.R3.R3Command]
private void ExecuteWithParam(string message) { /* ... */ }

[MvvmAIO.R3.R3Command]
private async Task ExecuteAsync() { /* ... */ }
```

The same view model also uses **`FromEventHandlers()`** on `INotifyPropertyChanged` for property-change streams — see [Observable events](./observable-events.md).

## Further reading

- [Getting started](../getting-started.md)
- [Observable events](./observable-events.md)
- [Diagnostics reference](../diagnostics/reference.md)

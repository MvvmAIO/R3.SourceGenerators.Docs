# R3Command

::: tip Languages
[简体中文](/zh/generators/r3-command)
:::

Apply **`[R3Command]`** (`MvvmAIO.R3`) to **instance methods** on a **partial** class or struct. The generator adds a public command property backed by **`ReactiveCommand`**.

## Minimal example

```csharp
public partial class ShellViewModel
{
    private readonly Observable<bool> _canSave = new(true);

    [R3Command(CanExecute = nameof(_canSave))]
    private async Task Save() { /* ... */ }
}
```

## Method signature matrix

| Parameters | Return type | Generated property type | Notes |
|------------|-------------|-------------------------|--------|
| none | `void` | `ReactiveCommand` | Sync |
| one (`T`) | `void` | `ReactiveCommand<T>` | Sync with argument |
| none | `Task` | `ReactiveCommand` | Async; wrapped as `ValueTask` in handler |
| one (`T`) | `Task` | `ReactiveCommand<T>` | Async with argument |
| none | `ValueTask` | `ReactiveCommand` | |
| one (`T`) | `ValueTask` | `ReactiveCommand<T>` | |
| one (`T`) | `Task<TResult>` | `ReactiveCommand<T, TResult>` | |
| one (`T`) | `ValueTask<TResult>` | `ReactiveCommand<T, TResult>` | |
| none | `Task<TResult>` / `ValueTask<TResult>` | — | **Not supported** → **R3SG1001** |
| two or more parameters | any | — | **R3SG1001** |
| `static` method | any | — | **R3SG1001** |

## Attribute members

| Property | Effect |
|----------|--------|
| *(none)* | Property name `{MethodName}Command` |
| `CommandName = "Submit"` | Property name `Submit` |
| `CanExecute = nameof(_canSave)` | Must exist on the same partial type as `Observable<bool>` or `IObservable<bool>` |

## Related diagnostics

| Id | When |
|----|------|
| **R3SG0001** | Declaring type is not `partial` |
| **R3SG1001** | Unsupported method signature |
| **R3SG1002** | `CanExecute` member not found |
| **R3SG1003** | `CanExecute` type mismatch |
| **R3SG1004** | Duplicate command property name |

Full table: [Diagnostics reference](../diagnostics/reference.md).

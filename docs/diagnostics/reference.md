# Diagnostics reference

::: tip Languages
[简体中文](/zh/diagnostics/reference)
:::

Compiler messages below are defined in **`DiagnosticDescriptors.cs`** in the generator repository. **R3SG** IDs are authoritative; this table is for navigation.

## Errors

| ID | Title | When |
|----|-------|------|
| **R3SG0001** | Containing type must be partial | The type must be declared `partial` for `[R3Command]` source generation |
| **R3SG1001** | Unsupported command method signature | Method signature is not in the [R3Command matrix](../generators/r3-command.md) |
| **R3SG1002** | CanExecute member not found | `CanExecute` name does not exist on the partial type |
| **R3SG1003** | CanExecute member type mismatch | `CanExecute` must be `R3.Observable<bool>` or `IObservable<bool>` |
| **R3SG1004** | Duplicate command property name | Two methods would emit the same command property; use distinct `CommandName` |

## Warnings

| ID | Title | When |
|----|-------|------|
| **R3SG2001** | Unsupported event delegate | Event delegate is not supported for observable generation (`FromEvents`) |
| **R3SG2002** | FromEventHandlers delegate shape | Event is unsupported for `FromEventHandlers` (needs `EventHandler`, `EventHandler<T>`, or legacy `(object, T)` void delegate) |

## Message formats (compiler)

| ID | `messageFormat` |
|----|-----------------|
| R3SG0001 | The type '{0}' must be declared partial for source generation. |
| R3SG1001 | The method '{0}' signature is not supported by [R3Command]. |
| R3SG1002 | The CanExecute member '{0}' was not found on type '{1}' for method '{2}'. |
| R3SG1003 | The CanExecute member '{0}' on type '{1}' must be R3.Observable\<bool\> or System.IObservable\<bool\>, but has type '{2}'. |
| R3SG1004 | The command property '{0}' would be generated for both '{1}' and '{2}' on type '{3}'. Use distinct CommandName values. |
| R3SG2001 | The event '{0}' has an unsupported delegate signature for observable generation. |
| R3SG2002 | The event '{0}' is unsupported for FromEventHandlers (needs System.EventHandler, System.EventHandler\<T\>, or void delegate with (object, T) parameters). |

Category: **MvvmAIO.R3.SourceGenerators**

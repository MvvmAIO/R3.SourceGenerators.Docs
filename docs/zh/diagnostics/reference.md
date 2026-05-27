# 诊断参考

::: tip 语言
[English](/diagnostics/reference)
:::

以下 ID 以生成器仓库 **`DiagnosticDescriptors.cs`** 为准。**R3SG** 为权威标识。

## 错误

| ID | 标题 | 何时出现 |
|----|------|----------|
| **R3SG0001** | 类型必须为 partial | `[R3Command]` 的声明类型须为 `partial` |
| **R3SG1001** | 不支持的命令方法签名 | 不在 [R3Command 矩阵](../generators/r3-command.md) 内 |
| **R3SG1002** | 找不到 CanExecute 成员 | `CanExecute` 名称在 partial 类型上不存在 |
| **R3SG1003** | CanExecute 类型不匹配 | 须为 `R3.Observable<bool>` 或 `IObservable<bool>` |
| **R3SG1004** | 命令属性名重复 | 两个方法会生成同名属性；请使用不同 `CommandName` |

## 警告

| ID | 标题 | 何时出现 |
|----|------|----------|
| **R3SG2001** | 不支持的事件委托 | `FromEvents` 不支持的委托签名 |
| **R3SG2002** | FromEventHandlers 委托形态 | 需要 `EventHandler`、`EventHandler<T>` 或 `(object, T)` void 委托 |

## 编译器消息格式

| ID | messageFormat |
|----|----------------|
| R3SG0001 | The type '{0}' must be declared partial for source generation. |
| R3SG1001 | The method '{0}' signature is not supported by [R3Command]. |
| R3SG1002 | The CanExecute member '{0}' was not found on type '{1}' for method '{2}'. |
| R3SG1003 | The CanExecute member '{0}' on type '{1}' must be R3.Observable\<bool\> or System.IObservable\<bool\>, but has type '{2}'. |
| R3SG1004 | The command property '{0}' would be generated for both '{1}' and '{2}' on type '{3}'. Use distinct CommandName values. |
| R3SG2001 | The event '{0}' has an unsupported delegate signature for observable generation. |
| R3SG2002 | The event '{0}' is unsupported for FromEventHandlers (...). |

类别：**MvvmAIO.R3.SourceGenerators**

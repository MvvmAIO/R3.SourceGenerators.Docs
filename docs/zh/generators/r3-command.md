# R3Command

::: tip 语言
[English](/generators/r3-command)
:::

在 **partial** 类或结构体的**实例方法**上使用 **`[R3Command]`**（`MvvmAIO.R3`），生成由 **`ReactiveCommand`** 支持的公共命令属性。

## 最小示例

```csharp
public partial class ShellViewModel
{
    private readonly Observable<bool> _canSave = new(true);

    [R3Command(CanExecute = nameof(_canSave))]
    private async Task Save() { /* ... */ }
}
```

## 方法签名矩阵

| 参数 | 返回类型 | 生成的属性类型 |
|------|----------|----------------|
| 无 | `void` | `ReactiveCommand` |
| 一个 (`T`) | `void` | `ReactiveCommand<T>` |
| 无 | `Task` / `ValueTask` | `ReactiveCommand` |
| 一个 (`T`) | `Task` / `ValueTask` | `ReactiveCommand<T>` |
| 一个 (`T`) | `Task<TResult>` / `ValueTask<TResult>` | `ReactiveCommand<T, TResult>` |
| 无 | `Task<TResult>` / `ValueTask<TResult>` | 不支持 → **R3SG1001** |
| 两个及以上参数 | 任意 | **R3SG1001** |
| `static` 方法 | 任意 | **R3SG1001** |

## 特性成员

| 属性 | 效果 |
|------|------|
| 默认 | 属性名 `{方法名}Command` |
| `CommandName` | 自定义属性名 |
| `CanExecute` | 同 partial 类型上的 `Observable<bool>` 或 `IObservable<bool>` |

完整诊断表见 [诊断参考](../diagnostics/reference.md)。

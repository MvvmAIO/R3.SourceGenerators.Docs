# R3Command

::: tip 语言
[English](../../generators/r3-command)
:::

在 **partial** 类或结构体的**实例方法**上使用 **`[R3Command]`**（`MvvmAIO.R3`），生成器会在同一 partial 类型上发出公共 **`ReactiveCommand`** 属性。

## 前提

| 项 | 说明 |
|----|------|
| partial 类型 | 声明类型须为 **`partial`**，否则 **R3SG0001** |
| 方法种类 | 仅**实例**方法（非 `static`） |
| 特性 | `MvvmAIO.R3.R3Command` / `R3CommandAttribute` |
| 输出 | 如 `SaveCommand` 或自定义 `CommandName` 属性 |
| CanExecute | 可选；须为同 partial 类型上的 `Observable<bool>` 或 `IObservable<bool>` |

Observable 事件 API 不要求事件源类型为 partial，仅命令生成需要。

## 快速开始

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

构建后得到 **`SaveCommand`**、**`ExecuteBasicCommand`** 等属性，在 WPF / Avalonia 中像普通命令属性一样绑定（例如 `Command="{Binding SaveCommand}"`）。

## 生成方式

```
partial 方法上的 [R3Command]
        │
        ▼
public ReactiveCommand XxxCommand { get; }
        │
        ▼
内部连接方法体（同步 / 异步 / 带参数）
```

- 默认属性名：**`{方法名}Command`**
- **`CommandName`** → 自定义属性名
- **`CanExecute`** → 将可观察量传入 `ReactiveCommand` 构造函数

## 方法签名矩阵

| 参数 | 返回类型 | 生成的属性 | 适用场景 |
|------|----------|------------|----------|
| 无 | `void` | `ReactiveCommand` | 简单同步命令 |
| 一个 (`T`) | `void` | `ReactiveCommand<T>` | 带参同步 |
| 无 | `Task` / `ValueTask` | `ReactiveCommand` | 异步 |
| 一个 (`T`) | `Task` / `ValueTask` | `ReactiveCommand<T>` | 带参异步 |
| 一个 (`T`) | `Task<TResult>` / `ValueTask<TResult>` | `ReactiveCommand<T, TResult>` | 异步带返回值 |
| 无 | `Task<TResult>` / `ValueTask<TResult>` | — | **R3SG1001** |
| 两个及以上参数 | 任意 | — | **R3SG1001** |
| `static` 方法 | 任意 | — | **R3SG1001** |

## CanExecute

```csharp
[R3Command(CanExecute = nameof(_canSave))]
private async Task Save() { }
```

| 问题 | 诊断 |
|------|------|
| 找不到成员名 | **R3SG1002** |
| 类型不是 `Observable<bool>` / `IObservable<bool>` | **R3SG1003** |

`CanExecute` 成员须与命令方法位于**同一 partial 类型**。

## 异步命令

支持 `Task` / `ValueTask`；带 **`Task<TResult>`** 的单参数方法生成 **`ReactiveCommand<T, TResult>`**。

## 排错

| Id | 处理 |
|----|------|
| **R3SG0001** | 将类型改为 `partial` |
| **R3SG1001** | 调整为矩阵支持的签名 |
| **R3SG1002** / **R3SG1003** | 修正 CanExecute 成员名或类型 |
| **R3SG1004** | 使用不同的 **`CommandName`** |

详见 [诊断参考](../diagnostics/reference.md)。

## 在示例中试用

[MvvmAIO.R3.SourceGenerators.Samples](https://github.com/MvvmAIO/MvvmAIO.R3.SourceGenerators.Samples) — 导航 **\[R3Command] · Commands**。

示例包含同步、带参、异步命令；同一 ViewModel 亦演示 `INotifyPropertyChanged` 的 **`FromEventHandlers()`** — 见 [Observable 事件](./observable-events.md)。

## 延伸阅读

- [快速开始](../getting-started.md)
- [Observable 事件](./observable-events.md)
- [诊断参考](../diagnostics/reference.md)

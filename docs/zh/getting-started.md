# 快速开始

::: tip 语言
[English](../getting-started)
:::

## 安装包

```bash
dotnet add package MvvmAIO.R3.SourceGenerators
```

该包为 **DevelopmentDependency** 分析器。添加：

```csharp
using R3.SourceGenerators;
```

生成的接口与实现为 **`internal`**，命名空间 **`R3.SourceGenerators`**。

## R3Command 需要 partial

`[R3Command]` 要求声明类型为 **partial**。出现 **R3SG0001** 时将类型改为 `partial`。

```csharp
public partial class ShellViewModel
{
    [R3Command]
    private void Save() { }
}
```

Observable 事件 API 不要求事件源类型为 partial（仅命令生成需要）。

## 第一个 Observable 事件

```csharp
public class Button : Control
{
    public event EventHandler<RoutedEventArgs>? Click;
}

// 内部接口 IButtonEvents
var clicks = button.FromEvents().Click;
```

详见 [Observable 事件](./generators/observable-events.md)。

## WPF 路由事件

在消费项目中启用：

```xml
<UseWPF>true</UseWPF>
```

然后使用 `FromRoutedEvents()` / `FromRoutedEventHandlers()`。

## Avalonia

当存在 `Avalonia.Interactivity.RoutedEvent` 元数据时识别路由事件。无参重载默认 `Direct | Bubble`，`handledEventsToo: false`。

## 验证构建

```bash
dotnet build
```

**R3SG** 错误请参阅 [诊断参考](./diagnostics/reference.md)。

## 阅读顺序

1. **本页** — 安装、`partial`、首个 `FromEvents()`  
2. **[Observable 事件](./generators/observable-events.md)** — 主指南（接口模型、路由、`FromEventHandlers`）  
3. **[R3Command](./generators/r3-command.md)** — 命令属性  
4. **[诊断参考](./diagnostics/reference.md)** — 全部 **R3SG**  
5. **[更新日志](./changelog.md)** — 版本与升级说明  

## 下一步

| 主题 | 链接 |
|------|------|
| Observable 事件（主指南） | [Observable 事件](./generators/observable-events.md) |
| 命令生成 | [R3Command](./generators/r3-command.md) |
| 仓库结构 | [架构总览](./architecture/overview.md) |
| 可运行示例 | [示例](./samples.md) |

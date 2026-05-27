# Observable 事件

::: tip 语言
[English](/generators/observable-events)
:::

**MvvmAIO.R3.SourceGenerators** 通过 **`R3.SourceGenerators`** 中的扩展方法，将 CLR 与路由事件转为 **R3** 可观察流。流以生成 **internal 接口** 上的**属性**暴露（类似 ReactiveMarbles 的链式写法）。

## 入口 API

| API | 返回类型 | 用途 |
|-----|----------|------|
| `FromEvents()` | `I{Name}Events` | 标准 CLR 事件 → `Observable<T>` 属性 |
| `FromEventHandlers()` | `I{Name}EventHandlers` | `EventHandler` / 传统 `(object, T)` 形态 |
| `FromRoutedEvents()` | `I{Name}RoutedEvents` | WPF / Avalonia 路由事件 |
| `FromRoutedEventHandlers()` | `I{Name}RoutedEventHandlers` | 路由处理器可观察流 |
| `FromAttachedRoutedEvent(...)` | `Observable<T>` | 附加路由事件（非接口模型） |

底层使用 [Cysharp/R3](https://github.com/Cysharp/R3) 的 **`R3.Observable`**。

## 基于接口的模型（相对 v0.4.x）

旧方案为每个调用点生成扁平包装类（名称冗长）。当前方案：

| 维度 | v0.4.x（旧） | v0.5.0+（新） |
|------|--------------|---------------|
| 返回类型 | 具体包装类 | 接口 `IXxxEvents` |
| 实现 | 同上 | `sealed` 实现类 |
| 继承 | 无 | 镜像源类型层次 |
| 泛型约束 | 需大量强转 | 组合接口，一站式访问 |

```
button.FromEvents().Click
        │
        ▼
IButtonEvents FromEvents(this Button source)
        │
        ▼
ButtonEventsImpl : IButtonEvents
```

**独占事件**：子类型接口只声明本类型独有的事件名；父级已声明的事件不在子接口重复。

## 类型层次

```csharp
public class BaseSource { public event Action? BaseChanged; }
public interface INotify { event EventHandler? Notified; }
public class DerivedSource : BaseSource, INotify
{
    public event Action<int>? DerivedChanged;
    public event EventHandler? Notified { add; remove; }
}

DerivedSource d = new();
_ = d.FromEvents().BaseChanged;
_ = d.FromEvents().Notified;
_ = d.FromEvents().DerivedChanged;
```

## 泛型约束

在 `where T : Base, IFirst, ISecond` 内，`source.FromEvents()` 解析为**组合接口**，继承各约束的事件接口，无需手动强转：

```csharp
static void Run<T>(T source) where T : BaseSource, IFirst, ISecond
{
    _ = source.FromEvents().BaseChanged;
    _ = source.FromEvents().FirstChanged;
    _ = source.FromEvents().SecondChanged;
}
```

## 路由事件

```csharp
var clicks = button.FromRoutedEvents().Click;
```

Avalonia 显式路由策略：

```csharp
var pointerPressed = control
    .FromRoutedEvents(
        Avalonia.Interactivity.RoutingStrategies.Tunnel
            | Avalonia.Interactivity.RoutingStrategies.Bubble,
        handledEventsToo: true)
    .PointerPressed;
```

## 警告

不支持的委托形态会报告 **R3SG2001** / **R3SG2002**。见 [诊断](../diagnostics/reference.md)。

更多实现细节见仓库内 [设计文档](https://github.com/MvvmAIO/MvvmAIO.R3.SourceGenerators/blob/master/docs/design-interface-based-event-generation.md)。

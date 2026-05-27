# Observable 事件

::: tip 语言
[English](/generators/observable-events)
:::

**MvvmAIO.R3.SourceGenerators** 将 CLR 与路由事件转为 **R3** 可观察流。扩展方法位于 **`R3.SourceGenerators`**；每个事件对应生成 **internal 接口** 上的一个**属性** — 链式写法为 `source.FromEvents().事件名`，再用 R3 订阅。

## 前提

| 项 | 说明 |
|----|------|
| 命名空间 | `using R3.SourceGenerators;` |
| 可见性 | 生成的接口与 `sealed` 实现类均为 **`internal`**，位于 `R3.SourceGenerators` |
| 流类型 | 属性类型为 **`R3.Observable<T>`**（来自 [Cysharp/R3](https://github.com/Cysharp/R3)） |
| 何时生成代码 | 在**调用点**驱动 — 首次在某类型上编写 `FromEvents()`（或其他入口 API）时，编译器为该类型（及你用到的泛型约束组合）生成接口与实现 |

## 快速开始 — 订阅

```csharp
private readonly DemoEventSource _source = new();
private readonly IDisposable _sub;

public MyViewModel()
{
    _sub = _source.FromEvents()
        .MyActionEvent1
        .Subscribe(msg => Handle(msg));
}

public void Dispose() => _sub.Dispose();
```

1. 对源实例调用一次 **`FromEvents()`**。
2. 在返回的接口上选择事件**属性**（例如 `IButtonEvents.Click`）。
3. 对 `Observable<T>` 调用 **`.Subscribe`**（保存 `IDisposable`，在 ViewModel 销毁时释放）。

**`FromEventHandlers()`**、**`FromRoutedEvents()`**、**`FromRoutedEventHandlers()`** 使用相同的链式模型，仅接口后缀与 payload 类型不同。

## 接口模型如何工作

```
source.FromEvents().事件名
        │
        ▼
public static IXxxEvents FromEvents(this SourceType source)
        │
        ▼
sealed XxxEventsImpl : IXxxEvents   // 持有 sender，封装 Observable.FromEvent（或路由等价逻辑）
```

三个要点：

1. **每个事件一个属性** — `IXxxEvents` 上暴露与源事件同名的 `Observable<T>` 属性。
2. **`sealed` 实现类** — `{Type}EventsImpl` 保存源实例并实现各属性。
3. **层次镜像** — 接口继承关系镜像源类型的基类与接口；每一层只声明**独占事件**（父接口已声明的事件名不在子接口重复）。

### 生成物一览

编译后可能看到类似文件：

| 文件模式 | 内容 |
|----------|------|
| `EventInterfaces.FromEvents.g.cs` | 所有 `*Events` 接口及继承关系 |
| `{Type}.FromEvents.g.cs` | `FromEvents(this Type)` 扩展方法 + `{Type}EventsImpl` |
| `{Base}_IFoo_IBarEvents.g.cs` | `where T : Base, IFoo, IBar` 的组合接口与泛型 `*Impl<TSource>` |

`FromEventHandlers`、路由相关 API 有对应的 `EventInterfaces.*` 与 `{Type}.*` 文件模式。

## 选择入口 API

| API | 返回类型 | 适用场景 |
|-----|----------|----------|
| `FromEvents()` | `I{Name}Events` | `Action`、`Action<T>` 及常见 CLR 实例事件 |
| `FromEventHandlers()` | `I{Name}EventHandlers` | `EventHandler`、`EventHandler<T>` 或传统 `(object, T)` 形态 |
| `FromRoutedEvents()` | `I{Name}RoutedEvents` | WPF / Avalonia **路由**事件（接口 + 属性） |
| `FromRoutedEventHandlers()` | `I{Name}RoutedEventHandlers` | 路由事件的 handler 风格可观察流 |
| `FromAttachedRoutedEvent(...)` | 直接 `Observable<T>` | Avalonia **附加**路由 — **不**走接口属性链 |

## CLR 事件 — `FromEvents()`

### 最小示例

```csharp
public class Button : Control
{
    public event EventHandler<RoutedEventArgs>? Click;
}

var clicks = button.FromEvents().Click;
clicks.Subscribe(_ => { /* ... */ });
```

### 类型层次

单一入口可访问基类与接口上声明的事件：

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

`IDerivedSourceEvents` 继承 `IBaseSourceEvents` 与 `INotifyEvents`；`DerivedChanged` 仅在派生接口上声明。

### 仅接口的事件源

```csharp
public interface INotifyMore : INotifySomething
{
    event Action? MoreChanged;
}

static void Run(INotifyMore s)
{
    _ = s.FromEvents().SomethingChanged;
    _ = s.FromEvents().MoreChanged;
}
```

### 泛型约束

在 `where T : Base, IFirst, ISecond` 内，单次 `source.FromEvents()` 解析为继承各约束事件接口的**组合接口**，无需手动强转：

```csharp
static void Run<T>(T source) where T : BaseSource, IFirst, ISecond
{
    _ = source.FromEvents().BaseChanged;
    _ = source.FromEvents().FirstChanged;
    _ = source.FromEvents().SecondChanged;
}
```

生成器会发出如 `IBaseSource_IFirst_ISecondEvents` 及泛型 `{BaseSource_IFirst_ISecond}EventsImpl<TSource>`。

### Payload 与可空引用类型

支持 `Action`、`Action<T>`、`EventHandler<T>` 等形态；`Observable<T>` 的 **`T`** 与事件参数类型一致，包括 **NRT**（如 `string?`）。

多参数 `Action` 在适用时会以元组等形式出现在属性类型上 — 若依赖具体形状，请在项目中查看生成接口的属性类型。

## `FromEventHandlers()`

在需要 **`Observable.FromEventHandler`** 语义（及自定义 `(object, T)` 委托路径）时使用。

```csharp
_handlers
    .FromEventHandlers()
    .CounterPulse
    .Subscribe(t =>
        Log($"CounterPulse: sender={t.sender?.GetType().Name}"));

_handlers
    .FromEventHandlers()
    .PayloadChanged
    .Subscribe(args => Log($"PayloadChanged: {args}"));
```

| 对比项 | `FromEvents()` | `FromEventHandlers()` |
|--------|----------------|------------------------|
| 接口后缀 | `*Events` | `*EventHandlers` |
| 典型委托 | `Action`、`Action<T>` 等 | `EventHandler`、`EventHandler<T>`、`(object, T)` void 委托 |
| 不支持的形态 | 警告 **R3SG2001** | 警告 **R3SG2002** |

详见 [诊断参考](../diagnostics/reference.md)。

## 路由事件

路由 API 与 `FromEvents` 一样采用**接口 + 属性**模型，接口名如 `IButtonRoutedEvents`、`IButtonRoutedEventHandlers`。

### WPF

在消费项目中启用：

```xml
<UseWPF>true</UseWPF>
```

然后：

```csharp
var clicks = button.FromRoutedEvents().Click;
var clickHandlers = button.FromRoutedEventHandlers().Click;
```

### Avalonia — 默认与重载

无参调用默认 **`Direct | Bubble`**，**`handledEventsToo: false`**。

```csharp
var clicks = button.FromRoutedEvents().Click;
```

显式指定路由：

```csharp
control
    .FromRoutedEvents(
        RoutingStrategies.Tunnel | RoutingStrategies.Bubble,
        handledEventsToo: true)
    .PointerPressed
    .Subscribe(e => { /* ... */ });
```

### ViewModel 的 `Attach` 模式

控件在 XAML 中创建时，在视图传入实例后再订阅：

```csharp
public void Attach(Button primary, Button diagnostics, Panel attachedHost)
{
    _subscriptions.Add(primary
        .FromRoutedEvents()
        .Click
        .Subscribe(_ => PrimaryClickCount++));
}
```

视图销毁时释放订阅（参见 [示例](../samples.md) 中的 Avalonia 演示）。

## 附加路由事件（Avalonia）

**附加**路由辅助方法直接返回 **`Observable<T>`**，**不**经过 `I{Name}RoutedEvents`。

```csharp
attachedHost
    .FromAttachedRoutedEvent(
        Button.ClickEvent,
        RoutingStrategies.Bubble,
        handledEventsToo: false)
    .Subscribe(_ => AttachedClickCount++);
```

另有 `FromAttachedRoutedEventHandler` 用于 handler 风格的附加事件。

## 命名与可见性

| 源类型 | 生成接口（示例） |
|--------|------------------|
| 类 `Button` | `IButtonEvents`、`IButtonRoutedEvents` |
| 接口 `INotify` | `INotifyEvents`（保留 `I` 前缀） |
| 跨命名空间同名冲突 | 加命名空间前缀，如 `INamespace1_ButtonEvents` |
| 泛型约束 `where T : A, IB` | `IA_IBEvents` + `A_IBEventsImpl<TSource>` |

实现类通常为 `{Type}EventsImpl` 等，均为 **`internal`** — 日常通过扩展方法返回类型在 IntelliSense 中使用即可。

## 边界说明

| 项 | 行为 |
|----|------|
| 静态事件 / `OBS_*` | 当前版本**不生成** |
| 不支持的委托 | 警告 **R3SG2001** / **R3SG2002**，跳过该事件 |
| 无可用实例事件的类型 | 调用点可能暂时落到 bootstrap **`NullEvents`** |

## 在示例中试用

可运行演示：[MvvmAIO.R3.SourceGenerators.Samples](https://github.com/MvvmAIO/MvvmAIO.R3.SourceGenerators.Samples) — 另见 [示例](../samples.md)。

| 示例导航 | 演示内容 |
|----------|----------|
| ObservableEvents · raised events | `FromEvents()` + `Subscribe`、NRT payload |
| FromEventHandlers · EventHandler | `FromEventHandlers()` |
| ObservableEvents · inheritance | 派生类型的接口层次 |
| ObservableEvents · generic constraints | 约束组合接口 |
| Avalonia routed demo | `FromRoutedEvents`、路由重载、`FromAttachedRoutedEvent` |

## 延伸阅读

- [Roslyn 目标](../architecture/roslyn-targeting.md)
- [R3Command](./r3-command.md)
- [诊断参考](../diagnostics/reference.md)

::: info 贡献者
生成器仓库内的 [设计文档](https://github.com/MvvmAIO/MvvmAIO.R3.SourceGenerators/blob/master/docs/design-interface-based-event-generation.md) 含更细的实现笔记；用户向说明以本站为准。
:::

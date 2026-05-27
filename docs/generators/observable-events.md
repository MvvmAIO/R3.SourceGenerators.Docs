# Observable events

::: tip Languages
[简体中文](../zh/generators/observable-events)
:::

**MvvmAIO.R3.SourceGenerators** turns CLR and routed events into **R3** observables. Extension methods live in **`R3.SourceGenerators`**; each event is a **property** on a generated **internal interface** — chain `source.FromEvents().EventName` and subscribe with R3.

## Prerequisites

| Topic | Detail |
|-------|--------|
| Namespace | `using R3.SourceGenerators;` |
| Visibility | Generated interfaces and `sealed` implementations are **`internal`** in `R3.SourceGenerators` |
| Stream type | Properties are **`R3.Observable<T>`** (from [Cysharp/R3](https://github.com/Cysharp/R3)) |
| When code is emitted | The generator runs at **call sites** — the first time you write `FromEvents()` (or another entry API) on a type, it emits interfaces and implementations for that type (and for generic constraint combinations you use) |

## Quick start — subscribe

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

1. Call **`FromEvents()`** once on the source instance.
2. Pick an event **property** on the returned interface (for example `IButtonEvents.Click`).
3. Call **`.Subscribe`** on the `Observable<T>` (store `IDisposable` and dispose when the view model goes away).

The same chaining model applies to **`FromEventHandlers()`**, **`FromRoutedEvents()`**, and **`FromRoutedEventHandlers()`** — only the interface suffix and property payloads differ.

## How the interface model works

```
source.FromEvents().EventName
        │
        ▼
public static IXxxEvents FromEvents(this SourceType source)
        │
        ▼
sealed XxxEventsImpl : IXxxEvents   // holds sender, wires Observable.FromEvent (or routed equivalent)
```

Three ideas:

1. **One property per event** — `IXxxEvents` exposes `Observable<T>` properties named after the source events.
2. **`sealed` implementation** — `{Type}EventsImpl` stores the source instance and implements each property.
3. **Mirrored hierarchy** — interface inheritance follows the source type’s base classes and interfaces. Each level declares only **exclusive** events (event names already declared on a parent interface are not repeated on the child).

### Generated artifacts (overview)

After you compile, you may see files such as:

| File pattern | Contents |
|--------------|----------|
| `EventInterfaces.FromEvents.g.cs` | All `*Events` interfaces and their inheritance |
| `{Type}.FromEvents.g.cs` | `FromEvents(this Type)` extension + `{Type}EventsImpl` |
| `{Base}_IFoo_IBarEvents.g.cs` | Combined interface + generic `*Impl<TSource>` for `where T : Base, IFoo, IBar` |

Similar patterns exist for `FromEventHandlers`, `FromRoutedEvents`, and `FromRoutedEventHandlers`.

## Choosing an entry API

| API | Returns | When to use |
|-----|---------|-------------|
| `FromEvents()` | `I{Name}Events` | `Action`, `Action<T>`, and typical CLR instance events |
| `FromEventHandlers()` | `I{Name}EventHandlers` | `EventHandler`, `EventHandler<T>`, or legacy `void (object, T)` sender shapes |
| `FromRoutedEvents()` | `I{Name}RoutedEvents` | WPF or Avalonia **routed** events (interface + properties) |
| `FromRoutedEventHandlers()` | `I{Name}RoutedEventHandlers` | Routed events with handler-style observables |
| `FromAttachedRoutedEvent(...)` | `Observable<T>` directly | Avalonia **attached** routed events — **not** the interface property model |

## CLR events — `FromEvents()`

### Minimal example

```csharp
public class Button : Control
{
    public event EventHandler<RoutedEventArgs>? Click;
}

var clicks = button.FromEvents().Click;
clicks.Subscribe(_ => { /* ... */ });
```

### Type hierarchy

One entry point reaches events declared on base classes and implemented interfaces:

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

`IDerivedSourceEvents` inherits `IBaseSourceEvents` and `INotifyEvents`; `DerivedChanged` is declared only on the derived interface.

### Interface-only sources

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

### Generic constraints

Inside `where T : Base, IFirst, ISecond`, a single `source.FromEvents()` resolves to a **combined interface** that inherits all constraint event interfaces — no manual casts:

```csharp
static void Run<T>(T source) where T : BaseSource, IFirst, ISecond
{
    _ = source.FromEvents().BaseChanged;
    _ = source.FromEvents().FirstChanged;
    _ = source.FromEvents().SecondChanged;
}
```

The generator emits a name such as `IBaseSource_IFirst_ISecondEvents` and a generic `{BaseSource_IFirst_ISecond}EventsImpl<TSource>` where `TSource` satisfies the constraints.

### Payload shapes and nullable reference types

Supported CLR shapes include `Action`, `Action<T>`, and `EventHandler<T>`. The generator maps each event to an `Observable<T>` whose **`T`** matches the event argument type, including **nullable reference types** (`string?`, etc.).

Multi-parameter `Action` events surface as tuple-typed observables where applicable — inspect the generated interface property type in your project if you rely on a specific tuple shape.

## `FromEventHandlers()`

Use when you want observables backed by **`Observable.FromEventHandler`** semantics (and related paths for custom `(object, T)` delegates).

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

| Aspect | `FromEvents()` | `FromEventHandlers()` |
|--------|----------------|------------------------|
| Interface suffix | `*Events` | `*EventHandlers` |
| Typical delegates | `Action`, `Action<T>`, many CLR events | `EventHandler`, `EventHandler<T>`, `(object, T)` void delegates |
| Unsupported shapes | **R3SG2001** (warning) | **R3SG2002** (warning) |

See [Diagnostics reference](../diagnostics/reference.md) for **R3SG2001** and **R3SG2002**.

## Routed events

Routed APIs use the **same interface + property model** as `FromEvents`, with names like `IButtonRoutedEvents` and `IButtonRoutedEventHandlers`.

### WPF

Enable WPF in the consumer project:

```xml
<UseWPF>true</UseWPF>
```

Then:

```csharp
var clicks = button.FromRoutedEvents().Click;
var clickHandlers = button.FromRoutedEventHandlers().Click;
```

### Avalonia — defaults and overloads

Parameterless calls use default routing: **`Direct | Bubble`**, **`handledEventsToo: false`**.

```csharp
var clicks = button.FromRoutedEvents().Click;
```

Explicit routing:

```csharp
control
    .FromRoutedEvents(
        RoutingStrategies.Tunnel | RoutingStrategies.Bubble,
        handledEventsToo: true)
    .PointerPressed
    .Subscribe(e => { /* ... */ });
```

### ViewModel `Attach` pattern

When controls are created in XAML, subscribe after the view provides instances:

```csharp
public void Attach(Button primary, Button diagnostics, Panel attachedHost)
{
    _subscriptions.Add(primary
        .FromRoutedEvents()
        .Click
        .Subscribe(_ => PrimaryClickCount++));
}
```

Dispose subscriptions when the view is torn down (see the Avalonia sample in [Samples](../samples.md)).

## Attached routed events (Avalonia)

**Attached** routed helpers return **`Observable<T>`** directly. They do **not** go through `I{Name}RoutedEvents`.

```csharp
attachedHost
    .FromAttachedRoutedEvent(
        Button.ClickEvent,
        RoutingStrategies.Bubble,
        handledEventsToo: false)
    .Subscribe(_ => AttachedClickCount++);
```

`FromAttachedRoutedEventHandler` is available for handler-style attached events.

## Naming and visibility

| Source | Generated interface (examples) |
|--------|-------------------------------|
| Class `Button` | `IButtonEvents`, `IButtonRoutedEvents` |
| Interface `INotify` | `INotifyEvents` (keeps the `I` prefix) |
| Name clash across namespaces | Namespace prefix, e.g. `INamespace1_ButtonEvents` |
| Generic constraints `where T : A, IB` | `IA_IBEvents` + `A_IBEventsImpl<TSource>` |

Implementation classes are typically `{Type}EventsImpl`, `{Type}EventHandlersImpl`, `{Type}RoutedEventsImpl`, or `{Type}RoutedEventHandlersImpl`. All are **`internal`** — you interact through the extension method return type in IntelliSense.

## Boundaries

| Topic | Behavior |
|-------|----------|
| Static / `OBS_*` helpers | **Not generated** in current releases |
| Unsupported event delegates | Warnings **R3SG2001** / **R3SG2002**; event skipped |
| Type with no usable instance events | Call sites may resolve to bootstrap **`NullEvents`** until a matching type is generated |

## Try it in the samples

Runnable demos: [MvvmAIO.R3.SourceGenerators.Samples](https://github.com/MvvmAIO/MvvmAIO.R3.SourceGenerators.Samples) — see also [Samples](../samples.md).

| Sample navigation | Demonstrates |
|-------------------|--------------|
| ObservableEvents · raised events | `FromEvents()` + `Subscribe`, NRT payloads |
| FromEventHandlers · EventHandler | `FromEventHandlers()` |
| ObservableEvents · inheritance | Interface hierarchy on derived types |
| ObservableEvents · generic constraints | Combined constraint interfaces |
| Avalonia routed demo | `FromRoutedEvents`, routing overloads, `FromAttachedRoutedEvent` |

## Further reading

- [Roslyn targeting](../architecture/roslyn-targeting.md)
- [R3Command](./r3-command.md)
- [Diagnostics reference](../diagnostics/reference.md)

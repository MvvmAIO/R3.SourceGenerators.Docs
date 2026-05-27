# Observable events

::: tip Languages
[简体中文](/zh/generators/observable-events)
:::

**MvvmAIO.R3.SourceGenerators** turns CLR and routed events into **R3** observables via extension methods in **`R3.SourceGenerators`**. Streams are exposed as **properties** on generated **internal interfaces** (ReactiveMarbles-style chaining).

## Entry APIs

| API | Returns | Use case |
|-----|---------|----------|
| `FromEvents()` | `I{Name}Events` | Standard CLR events → `Observable<T>` properties |
| `FromEventHandlers()` | `I{Name}EventHandlers` | `EventHandler` / legacy `(object, T)` shapes |
| `FromRoutedEvents()` | `I{Name}RoutedEvents` | WPF / Avalonia routed events |
| `FromRoutedEventHandlers()` | `I{Name}RoutedEventHandlers` | Routed handler observables |
| `FromAttachedRoutedEvent(...)` | `Observable<T>` | Attached routed events (not the interface model) |

Underlying streams use **`R3.Observable`** from [Cysharp/R3](https://github.com/Cysharp/R3).

## Interface-based model

Instead of flat per-call-site wrapper classes, the generator emits:

1. **Interfaces** such as `IButtonEvents` with one property per event.
2. **`sealed` implementations** (e.g. `ButtonEventsImpl`) that subscribe to the source instance.
3. **Interface inheritance** mirroring the source type hierarchy (exclusive events per level).

```
button.FromEvents().Click
        │
        ▼
IButtonEvents FromEvents(this Button source)
        │
        ▼
ButtonEventsImpl : IButtonEvents
```

## Type hierarchy

One entry point; events from base classes and interfaces:

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

## Generic constraints

Inside `where T : Base, IFirst, ISecond`, `source.FromEvents()` resolves to a **combined interface** inheriting all constraint event interfaces — no manual casts:

```csharp
static void Run<T>(T source) where T : BaseSource, IFirst, ISecond
{
    _ = source.FromEvents().BaseChanged;
    _ = source.FromEvents().FirstChanged;
    _ = source.FromEvents().SecondChanged;
}
```

## Routed events

```csharp
var clicks = button.FromRoutedEvents().Click;
var clickHandlers = button.FromRoutedEventHandlers().Click;
```

Explicit Avalonia routing:

```csharp
var pointerPressed = control
    .FromRoutedEvents(
        Avalonia.Interactivity.RoutingStrategies.Tunnel
            | Avalonia.Interactivity.RoutingStrategies.Bubble,
        handledEventsToo: true)
    .PointerPressed;
```

**Attached** routed events:

```csharp
var childClicks = panel.FromAttachedRoutedEvent(
    Avalonia.Controls.Button.ClickEvent,
    Avalonia.Interactivity.RoutingStrategies.Bubble,
    handledEventsToo: true);
```

## Interface-only sources

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

## Warnings

Unsupported delegate shapes report **R3SG2001** or **R3SG2002**. See [Diagnostics](../diagnostics/reference.md).

## Further reading

- [Roslyn targeting](../architecture/roslyn-targeting.md)
- [R3Command](./r3-command.md)

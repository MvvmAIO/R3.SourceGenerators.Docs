# 架构总览

::: tip 语言
[English](../../architecture/overview)
:::

## 仓库

| 仓库 | 作用 |
|------|------|
| [MvvmAIO.R3.SourceGenerators](https://github.com/MvvmAIO/MvvmAIO.R3.SourceGenerators) | 分析器、测试、Nuke 构建 |
| [MvvmAIO.R3.SourceGenerators.Samples](https://github.com/MvvmAIO/MvvmAIO.R3.SourceGenerators.Samples) | WPF + Avalonia 示例 |
| **R3.SourceGenerators.Docs** | 本站（VitePress） |

## 解决方案结构

主解决方案：**`MvvmAIO.R3.SourceGenerators.slnx`**

| 路径 | 作用 |
|------|------|
| `MvvmAIO.R3.SourceGenerators/` | 共享生成器逻辑（`.shproj`） |
| `*.Roslyn4031` / `*.Roslyn4120` / `*.Roslyn5000` | 各 Roslyn 版本分析器构建 |
| `*.Package/` | NuGet 打包 |
| `*.Tests/` | Verify 快照测试 |
| `build/` | Nuke CI / 发布 |

## 生成器

| 生成器 | 用户 API | 输出 |
|--------|----------|------|
| `ObservableEventsGenerator` | `FromEvents` 等 | internal 事件接口 + `sealed` 实现 |
| `R3CommandGenerator` | `[R3Command]` | `ReactiveCommand*` 属性 |

### Observable 事件管线（概要）

1. **Post-init** 引导未解析调用点（`NullEvents`）。
2. **增量**收集语法中的调用目标。
3. **接口管线**：`EventInterfaces.{kind}.g.cs` + 每类型 `*Impl`。
4. **附加路由**（Avalonia）：独立 `Observable<T>` 扩展。

静态 `ObservableEventsStatics` **未启用**。

### R3Command 管线（概要）

Post-init 注册特性、校验 partial、签名矩阵与可选 `CanExecute`。

## 调用点驱动生成

在具体类型上**调用** `FromEvents()` 等入口 API 后，生成器为该类型（及泛型约束组合）发出接口与 `sealed` 实现。

## 引导与未解析调用点

**Post-init** 层提供回退扩展（如 `object?`），保证未完成生成时仍可编译；消费程序集中 IntelliSense 优先显示类型专用重载。无可用事件的类型可能暂时解析到 **`NullEvents`**。

## WPF 与 Avalonia

| 平台 | 要求 |
|------|------|
| **WPF** 路由 | 消费项目 `<UseWPF>true</UseWPF>` |
| **Avalonia** 路由 | `RoutedEvent` 元数据；无参重载默认路由策略 |
| **附加路由** | `FromAttachedRoutedEvent` — **非**接口属性模型 |

详见 [Observable 事件](../generators/observable-events.md)。

## 生成文件布局

见 [Observable 事件](../generators/observable-events.md) 中的「生成物一览」。

## 当前不生成

- 静态 `OBS_*` 辅助。
- 不支持的委托 → **R3SG2001** / **R3SG2002**。

## 贡献者源码索引

| 区域 | 文件 |
|------|------|
| 事件管线 | `ObservableEventsGenerator.cs` |
| 命令 | `R3CommandGenerator.cs` |
| 诊断 | `Diagnostics/DiagnosticDescriptors.cs` |

详见 [Roslyn 目标](./roslyn-targeting.md)。

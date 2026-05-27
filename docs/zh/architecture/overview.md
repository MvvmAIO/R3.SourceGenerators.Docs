# 架构总览

::: tip 语言
[English](/architecture/overview)
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

Observable 事件管线概要：Post-init 引导 → 增量收集调用点 → 接口层次与实现文件；附加路由事件为独立扩展方法。

详见 [Roslyn 目标](./roslyn-targeting.md)。

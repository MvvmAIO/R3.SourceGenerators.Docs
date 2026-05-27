---
layout: home

hero:
  name: R3.SourceGenerators
  text: 面向 R3 的编译期 MVVM
  tagline: 用 Roslyn 源生成器生成 Observable 事件与 ReactiveCommand
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/getting-started
    - theme: alt
      text: Observable 事件
      link: /zh/generators/observable-events
    - theme: alt
      text: GitHub
      link: https://github.com/MvvmAIO/MvvmAIO.R3.SourceGenerators

features:
  - title: Observable 事件
    details: FromEvents、FromEventHandlers 与路由事件 API，基于接口链式访问与泛型约束。
  - title: R3Command
    details: 在 partial 类型上从方法生成 ReactiveCommand 属性，可选 CanExecute。
  - title: 多 Roslyn 版本
    details: 为 Roslyn 4.3、4.12、5.x 分别构建分析器，由 MSBuild 自动选择。
---

## 稳定性

::: warning 1.0 之前
在发布 **1.0.0** 之前可能发生破坏性变更。升级时请查阅 [CHANGELOG](https://github.com/MvvmAIO/MvvmAIO.R3.SourceGenerators/blob/master/CHANGELOG.md)。
:::

## 推荐阅读

| 页面 | 说明 |
|------|------|
| [快速开始](./getting-started.md) | 安装 NuGet 与首个 `FromEvents()` |
| [Observable 事件](./generators/observable-events.md) | 接口管线、类型层次、路由事件 |
| [R3Command](./generators/r3-command.md) | 命令生成与签名矩阵 |
| [诊断](./diagnostics/reference.md) | 全部 **R3SG** 诊断 ID |
| [示例](./samples.md) | WPF / Avalonia 示例仓库 |

本站为包的**权威手册**，比 GitHub README 更完整。参见 [关于本站](./about-this-site.md)。

[English](/)

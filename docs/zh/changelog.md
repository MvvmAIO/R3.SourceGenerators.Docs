# 更新日志与发布

::: tip 语言
[English](../changelog)
:::

**MvvmAIO.R3.SourceGenerators** 处于 **1.0 之前**阶段，升级前请查阅发布说明。

## 权威 changelog

完整历史在**生成器仓库**：

- [GitHub 上的 CHANGELOG.md](https://github.com/MvvmAIO/MvvmAIO.R3.SourceGenerators/blob/master/CHANGELOG.md)
- [GitHub Releases](https://github.com/MvvmAIO/MvvmAIO.R3.SourceGenerators/releases)

本页仅摘要最近版本；如有出入以仓库文件为准。

## 最近版本（摘要）

### 0.6.1（2026-05-24）

- **IntelliSense**：bootstrap 回退扩展与 `NullEvents` 标记 `[EditorBrowsable(Never)]`，跨程序集补全优先显示类型专用重载。
- 与 0.6.0 **无 API/行为变更**。

### 0.6.0（2026-05-21）

- **R3Command 诊断** — `R3SG1002`–`R3SG1004`（CanExecute、重复命令名）。
- **路由事件** — `FromRoutedEvents()` / `FromRoutedEventHandlers()` 与 `FromEvents()` 对齐的接口模型。
- **内部 SyntaxFactory 迁移** — 面向用户 API 意图保持与 0.5.x 兼容。

详见仓库 CHANGELOG 中的迁移说明与完整条目。

## 文档同步

发版时可更新本摘要（可选），并同步 [贡献指南](./contributing.md#发布时文档同步) 中的页面列表。

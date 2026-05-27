# 贡献

::: tip 语言
[English](../contributing)
:::

## 生成器

在 **[MvvmAIO.R3.SourceGenerators](https://github.com/MvvmAIO/MvvmAIO.R3.SourceGenerators)** 中开发：

1. 实质性改动请先开 Issue。
2. 使用 **`MvvmAIO.R3.SourceGenerators.slnx`**。
3. PR 前运行 Nuke **`Ci`**。
4. 仅在输出有意变更时更新 Verify 快照。

请参阅仓库 **[AGENTS.md](https://github.com/MvvmAIO/MvvmAIO.R3.SourceGenerators/blob/master/AGENTS.md)**。

## 文档

在 **[R3.SourceGenerators.Docs](https://github.com/MvvmAIO/R3.SourceGenerators.Docs)** 中编辑：

- 英文：`docs/`
- 简体中文：`docs/zh/`

**R3SG** 或用户可见行为变更时，请同步更新两种语言下的诊断与相关生成器页面。

本地预览：`npm install` 后 `npm run docs:dev`（Node.js 22，使用仓库根目录 `.nvmrc`）。

## 发布时文档同步

发布新 **MvvmAIO.R3.SourceGenerators** 版本时，请同步本站（英文与 `docs/zh/`）：

| 文档路径 | 何时更新 |
|----------|----------|
| `diagnostics/reference.md` | **R3SG** 增删改 |
| `generators/observable-events.md` | 事件 / 路由 API 或生成行为 |
| `generators/r3-command.md` | `[R3Command]` 或命令诊断 |
| `getting-started.md` | 安装或前提变更 |
| `changelog.md` | 每个带日期的发布（摘要） |

权威记录：[生成器 CHANGELOG](https://github.com/MvvmAIO/MvvmAIO.R3.SourceGenerators/blob/master/CHANGELOG.md)。

## 1.0 之前

发版前仍可能有破坏性变更；请在 CHANGELOG 与本站 [更新日志](./changelog.md) 中说明升级影响。

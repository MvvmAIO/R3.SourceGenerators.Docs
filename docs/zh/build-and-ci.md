# 构建与 CI

::: tip 语言
[English](/build-and-ci)
:::

## 生成器仓库

| 任务 | 命令 |
|------|------|
| 构建 | `dotnet build MvvmAIO.R3.SourceGenerators.slnx` |
| 测试 | `dotnet test MvvmAIO.R3.SourceGenerators.slnx` |
| 完整 CI | `dotnet run --project build/... -- Ci` |

Workflow：`dotnet.yml`、`nuget-publish.yml`。

## 文档仓库（本站）

| 任务 | 命令 |
|------|------|
| 开发 | `npm run docs:dev` |
| 构建 | `npm run docs:build` |
| 预览 | `npm run docs:preview` |

GitHub Actions 在 PR 上验证构建，在 **`main`** 推送时部署 Pages。

## SDK

- 生成器：.NET 8（测试）+ .NET 10（Nuke）
- 文档：**Node.js 22**

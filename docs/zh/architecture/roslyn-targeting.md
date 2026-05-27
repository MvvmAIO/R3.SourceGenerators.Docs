# Roslyn 目标

::: tip 语言
[English](../../architecture/roslyn-targeting)
:::

## 多版本分析器

NuGet 包在 `analyzers/dotnet/` 下包含：

| 目录 | Roslyn 波段 |
|------|-------------|
| `roslyn4.3` | 4.3.x |
| `roslyn4.12` | 4.12.x |
| `roslyn5.0` | 5.0.x |

**MSBuild** 根据消费项目编译器的 Roslyn 版本自动选择，无需手动配置路径。

## 仓库内项目

每个波段对应独立项目，链接同一 `.shproj` 源。修改使用 Roslyn API 的代码时，若 API 有差异，需在相关波段上验证。

## 测试

`MvvmAIO.R3.SourceGenerators.Tests` 使用固定的 Roslyn 测试宿主（见生成器仓库测试项目引用）。

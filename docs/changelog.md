# Changelog and releases

::: tip Languages
[简体中文](./zh/changelog)
:::

**MvvmAIO.R3.SourceGenerators** is **pre-1.0**. Breaking changes may ship without a long deprecation window. Always check release notes before upgrading.

## Authoritative changelog

The full history lives in the **generator repository**:

- [CHANGELOG.md on GitHub](https://github.com/MvvmAIO/MvvmAIO.R3.SourceGenerators/blob/master/CHANGELOG.md)
- [GitHub Releases](https://github.com/MvvmAIO/MvvmAIO.R3.SourceGenerators/releases)

This page summarizes recent releases for quick orientation. When in doubt, use the GitHub files above.

## Recent releases (summary)

### 0.6.2 (2026-05-31)

- **Internal** — `ObservableEventsGenerator` split into `partial` files; removed unused pre–interface-pipeline wrapper codegen. Expanded diagnostic test coverage (`R3SG1001`, `R3SG2001`, `R3SG2002`). **No consumer API or generated-output change.** Docs: [ObservableEventsGenerator (contributors)](./architecture/observable-events-generator.md).

### 0.6.1 (2026-05-24)

- **IntelliSense polish** — bootstrap fallback extensions and `NullEvents` use `[EditorBrowsable(Never)]` so cross-assembly completion favors type-specific generated overloads.
- **No API or behavior change** from 0.6.0.

### 0.6.0 (2026-05-21)

- **R3Command diagnostics** — `R3SG1002`–`R3SG1004` for CanExecute and duplicate command names.
- **Routed events** — `FromRoutedEvents()` / `FromRoutedEventHandlers()` use the interface-based model aligned with `FromEvents()`.
- **Internal SyntaxFactory migration** — intended to preserve public call-site APIs from 0.5.x.

See the repository CHANGELOG for migration notes, obsolete wrapper types, and full detail.

## Documentation sync

When publishing a new package version, update this summary (optional) and the pages listed in [Contributing](./contributing.md#documentation-release-sync).

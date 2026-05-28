# About this site

## Canonical documentation

**This VitePress site** is the structured manual for **MvvmAIO.R3.SourceGenerators**. Use it for generator behavior, diagnostics, and architecture.

| Surface | Role |
|---------|------|
| **This site** | Authoritative consumer documentation |
| [GitHub README](https://github.com/MvvmAIO/MvvmAIO.R3.SourceGenerators/blob/master/README.md) | Landing-page overview and quick examples |
| [CHANGELOG](https://github.com/MvvmAIO/MvvmAIO.R3.SourceGenerators/blob/master/CHANGELOG.md) | Release notes and upgrade notes |
| [Design doc (repo)](https://github.com/MvvmAIO/MvvmAIO.R3.SourceGenerators/blob/master/docs/design-interface-based-event-generation.md) | Internal design notes (Chinese); user guides here are derived and may lag slightly |
| [ObservableEventsGenerator (this site)](./architecture/observable-events-generator.md) | Contributor source layout (English); [简体中文](./zh/architecture/observable-events-generator.md) |

## Tech stack

Built with **VitePress** on **Node.js** — intentionally different from the [Prism.SourceGenerators.Docs](https://mvvmaio.github.io/Prism.SourceGenerators.Docs/) stack (NuStreamDocs + .NET) for comparison and a modern default UI.

## Languages

- **English** — default
- **[简体中文](./zh/)** — same topics under `/zh/`

When generator behavior or **R3SG** diagnostics change, update the matching pages in **both** locales (or file a docs PR alongside the generator PR).

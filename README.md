# R3.SourceGenerators.Docs

Static documentation for **[MvvmAIO.R3.SourceGenerators](https://github.com/MvvmAIO/MvvmAIO.R3.SourceGenerators)**, built with **[VitePress](https://vitepress.dev/)** (Vue 3, local search, English + 简体中文).

## Live site

**https://mvvmaio.github.io/R3.SourceGenerators.Docs/**

Use **Settings → Pages** with **GitHub Actions** as the publishing source if the site is not live yet.

## Prerequisites

- **Node.js 22** (see [`.nvmrc`](.nvmrc))

## Local development

```bash
npm install
npm run docs:dev
```

Open the URL printed in the terminal (default `http://localhost:5173/R3.SourceGenerators.Docs/`).

## Build and preview

```bash
npm run docs:build
npm run docs:preview
```

Production output is written to `.vitepress/dist`.

## Repository layout

| Path | Purpose |
|------|---------|
| `docs/` | English Markdown |
| `docs/zh/` | 简体中文 Markdown |
| `.vitepress/config.mts` | Site config, `base`, i18n, sidebar |
| `.github/workflows/github-pages.yml` | CI build and GitHub Pages deploy |

## Related

| Link | Description |
|------|-------------|
| [Generator repo](https://github.com/MvvmAIO/MvvmAIO.R3.SourceGenerators) | NuGet package and source |
| [Samples](https://github.com/MvvmAIO/MvvmAIO.R3.SourceGenerators.Samples) | WPF + Avalonia demos |

## License

MIT — see [LICENSE](LICENSE).

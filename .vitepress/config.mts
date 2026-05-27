import { defineConfig } from 'vitepress'

const githubGenerator =
  'https://github.com/MvvmAIO/MvvmAIO.R3.SourceGenerators'

const enSidebar = [
  { text: 'Introduction', link: '/' },
  { text: 'About this site', link: '/about-this-site' },
  { text: 'Getting started', link: '/getting-started' },
  {
    text: 'Generators',
    items: [
      { text: 'Observable events', link: '/generators/observable-events' },
      { text: 'R3Command', link: '/generators/r3-command' },
    ],
  },
  {
    text: 'Architecture',
    items: [
      { text: 'Overview', link: '/architecture/overview' },
      { text: 'Roslyn targeting', link: '/architecture/roslyn-targeting' },
    ],
  },
  { text: 'Diagnostics', link: '/diagnostics/reference' },
  { text: 'Samples', link: '/samples' },
  { text: 'Build & CI', link: '/build-and-ci' },
  { text: 'Contributing', link: '/contributing' },
  { text: 'Reference & links', link: '/reference' },
]

const zhSidebar = [
  { text: '概览', link: '/zh/' },
  { text: '关于本站', link: '/zh/about-this-site' },
  { text: '快速开始', link: '/zh/getting-started' },
  {
    text: '源生成器',
    items: [
      { text: 'Observable 事件', link: '/zh/generators/observable-events' },
      { text: 'R3Command', link: '/zh/generators/r3-command' },
    ],
  },
  {
    text: '架构',
    items: [
      { text: '总览', link: '/zh/architecture/overview' },
      { text: 'Roslyn 目标', link: '/zh/architecture/roslyn-targeting' },
    ],
  },
  { text: '诊断', link: '/zh/diagnostics/reference' },
  { text: '示例', link: '/zh/samples' },
  { text: '构建与 CI', link: '/zh/build-and-ci' },
  { text: '贡献', link: '/zh/contributing' },
  { text: '参考与链接', link: '/zh/reference' },
]

export default defineConfig({
  srcDir: 'docs',
  title: 'R3.SourceGenerators',
  description: 'Roslyn source generators for R3-based MVVM workflows',
  base: '/R3.SourceGenerators.Docs/',
  cleanUrls: true,
  lastUpdated: true,
  // Cross-locale and repo-root links are validated loosely during CI build.
  ignoreDeadLinks: true,
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/R3.SourceGenerators.Docs/favicon.ico',
      },
    ],
  ],
  themeConfig: {
    logo: { text: 'R3.SourceGenerators' },
    socialLinks: [{ icon: 'github', link: githubGenerator }],
    search: { provider: 'local' },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © MvvmAIO',
    },
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/getting-started' },
          { text: 'Generators', link: '/generators/observable-events' },
          { text: 'Diagnostics', link: '/diagnostics/reference' },
          { text: 'Samples', link: '/samples', target: '_self' },
        ],
        sidebar: enSidebar,
        editLink: {
          pattern:
            'https://github.com/MvvmAIO/R3.SourceGenerators.Docs/edit/main/docs/:path',
          text: 'Edit this page on GitHub',
        },
      },
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      themeConfig: {
        nav: [
          { text: '指南', link: '/zh/getting-started' },
          { text: '源生成器', link: '/zh/generators/observable-events' },
          { text: '诊断', link: '/zh/diagnostics/reference' },
          { text: '示例', link: '/zh/samples' },
        ],
        sidebar: zhSidebar,
        editLink: {
          pattern:
            'https://github.com/MvvmAIO/R3.SourceGenerators.Docs/edit/main/docs/zh/:path',
          text: '在 GitHub 上编辑此页',
        },
      },
    },
  },
})

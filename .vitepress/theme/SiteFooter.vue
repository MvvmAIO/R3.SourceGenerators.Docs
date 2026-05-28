<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { commitUrl, siteMeta } from '../site-meta.shared'

const { theme, frontmatter, localeIndex } = useData()

const isZh = computed(() => localeIndex.value === 'zh')

const formattedSiteUpdated = computed(() => {
  const locale = isZh.value ? 'zh-CN' : 'en-US'
  const date = new Date(siteMeta.lastUpdated)
  if (Number.isNaN(date.getTime())) return siteMeta.lastUpdated

  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'UTC',
    timeZoneName: 'short',
  }).format(date)
})

const buildLink = computed(() => commitUrl(siteMeta.commitSha))
</script>

<template>
  <footer v-if="frontmatter.footer !== false" class="VPFooter site-footer">
    <div class="container">
      <p v-if="theme.footer?.message" class="message">
        {{ theme.footer.message }}
      </p>
      <p v-if="theme.footer?.copyright" class="copyright">
        {{ theme.footer.copyright }}
      </p>
      <p class="site-footer-meta">
        <template v-if="isZh">
          站点最后更新：<time :datetime="siteMeta.lastUpdated">{{ formattedSiteUpdated }}</time>
          <span class="sep" aria-hidden="true">·</span>
          构建
          <a
            v-if="siteMeta.commitSha"
            class="site-footer-link"
            :href="buildLink"
            target="_blank"
            rel="noreferrer"
            >{{ siteMeta.shortSha }}</a
          >
          <span v-else>{{ siteMeta.shortSha }}</span>
          <span class="sep" aria-hidden="true">·</span>
          <a
            class="site-footer-link"
            href="https://github.com/MvvmAIO/R3.SourceGenerators.Docs"
            target="_blank"
            rel="noreferrer"
            >文档仓库</a
          >
        </template>
        <template v-else>
          Site last updated:
          <time :datetime="siteMeta.lastUpdated">{{ formattedSiteUpdated }}</time>
          <span class="sep" aria-hidden="true">·</span>
          Build
          <a
            v-if="siteMeta.commitSha"
            class="site-footer-link"
            :href="buildLink"
            target="_blank"
            rel="noreferrer"
            >{{ siteMeta.shortSha }}</a
          >
          <span v-else>{{ siteMeta.shortSha }}</span>
          <span class="sep" aria-hidden="true">·</span>
          <a
            class="site-footer-link"
            href="https://github.com/MvvmAIO/R3.SourceGenerators.Docs"
            target="_blank"
            rel="noreferrer"
            >Docs repo</a
          >
        </template>
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import SiteFooter from './SiteFooter.vue'
</script>

<template>
  <DefaultTheme.Layout>
    <template #layout-bottom>
      <SiteFooter />
    </template>
  </DefaultTheme.Layout>
</template>

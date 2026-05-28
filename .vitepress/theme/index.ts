import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import SiteFooter from './SiteFooter.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Footer: SiteFooter,
} satisfies Theme

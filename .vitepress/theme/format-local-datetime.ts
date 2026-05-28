/** Fallback when `navigator` is unavailable (SSR). */
export function siteFallbackLocale(isZh: boolean): string {
  return isZh ? 'zh-CN' : 'en-US'
}

/**
 * Format an ISO timestamp in the user's locale and local time zone.
 * Omits `timeZone` so `Intl` uses the runtime default (browser local zone).
 */
export function formatLocalDateTime(
  iso: string,
  fallbackLocale: string,
): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso

  const locale =
    typeof navigator !== 'undefined' && navigator.language
      ? navigator.language
      : fallbackLocale

  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZoneName: 'short',
  }).format(date)
}

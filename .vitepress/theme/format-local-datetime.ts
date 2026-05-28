/** Fallback when `navigator` is unavailable (SSR). */
export function siteFallbackLocale(isZh: boolean): string {
  return isZh ? 'zh-CN' : 'en-US'
}

const baseFormatOptions = {
  dateStyle: 'medium',
  timeStyle: 'short',
} satisfies Intl.DateTimeFormatOptions

const extendedFormatOptions = {
  ...baseFormatOptions,
  timeZoneName: 'short',
} satisfies Intl.DateTimeFormatOptions

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

  try {
    return new Intl.DateTimeFormat(locale, extendedFormatOptions).format(date)
  } catch {
    // Node SSR (and some runtimes) reject dateStyle+timeStyle+timeZoneName together.
    return new Intl.DateTimeFormat(locale, baseFormatOptions).format(date)
  }
}

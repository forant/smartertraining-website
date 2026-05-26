export const SITE_URL = 'https://smartertraining.ai'
export const SITE_NAME = 'SmarterTraining'
export const SITE_TAGLINE = 'Training for people with real lives'
export const SITE_DESCRIPTION =
  'Adaptive indoor cycling coaching that adjusts to your fatigue, schedule, and goals — without guilt, guesswork, or rigid training blocks.'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`
export const BLOG_BASE_PATH = '/blog'

export function absoluteUrl(path: string): string {
  if (path.startsWith('http')) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

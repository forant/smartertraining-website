import type { ComponentType } from 'react'

export type CategorySlug =
  | 'adaptive-training'
  | 'time-crunched-cycling'
  | 'indoor-cycling'
  | 'recovery-fatigue'
  | 'cycling-workouts'
  | 'training-philosophy'
  | 'comparisons'

export interface FAQ {
  question: string
  answer: string
}

export interface InternalLink {
  label: string
  href: string
  description?: string
}

export interface HeroImage {
  src: string
  alt: string
  width?: number
  height?: number
}

export interface TocItem {
  id: string
  title: string
  level: 2 | 3
}

export interface PostMeta {
  slug: string
  title: string
  /** ~155 char meta description used for SEO and Open Graph. */
  description: string
  /** Longer, human-facing summary shown on cards and at the top of the article. */
  excerpt: string
  category: CategorySlug
  tags: string[]
  /** ISO-8601 date string. */
  publishedAt: string
  /** ISO-8601 date string. */
  updatedAt?: string
  author: string
  featured?: boolean
  /** Slugs of explicitly related posts; otherwise we fall back to category + tag matching. */
  relatedPosts?: string[]
  canonical?: string
  faqs?: FAQ[]
  internalLinks?: InternalLink[]
  hero?: HeroImage
  ogImage?: string
  /** Table-of-contents entries. Posts opt in by supplying the array. */
  toc?: TocItem[]
}

export interface Post extends PostMeta {
  Content: ComponentType
  /** Plain-text body, used to compute reading time. Optional; if missing we fall back to the excerpt. */
  plainText?: string
  /** Computed at module load. */
  readingTimeMinutes: number
}

export interface Category {
  slug: CategorySlug
  name: string
  /** Page H1 / SEO title. */
  title: string
  /** Meta description. */
  description: string
  /** Short positioning intro shown under the H1. */
  intro: string
  theme: string
  relatedCategories?: CategorySlug[]
}

export interface Author {
  id: string
  name: string
  bio?: string
  url?: string
}

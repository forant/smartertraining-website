import { POSTS } from '@/content/blog/posts'
import type { CategorySlug, Post } from './types'
import { estimateReadingTime } from './reading-time'

function buildPost({ meta, Content }: (typeof POSTS)[number]): Post {
  // Reading time uses excerpt + tag/title text as a rough proxy when posts do
  // not supply explicit plainText. Posts can override by adding plainText to
  // the registered entry in the future.
  const proxyText = `${meta.title} ${meta.excerpt} ${meta.tags.join(' ')}`
  return {
    ...meta,
    Content,
    readingTimeMinutes: estimateReadingTime(proxyText),
  }
}

const ALL_POSTS: Post[] = POSTS.map(buildPost).sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt)
)

export function getAllPosts(): Post[] {
  return ALL_POSTS
}

export function getPostBySlug(slug: string): Post | undefined {
  return ALL_POSTS.find((p) => p.slug === slug)
}

export function getAllPostSlugs(): string[] {
  return ALL_POSTS.map((p) => p.slug)
}

export function getPostsByCategory(category: CategorySlug): Post[] {
  return ALL_POSTS.filter((p) => p.category === category)
}

export function getFeaturedPosts(limit?: number): Post[] {
  const featured = ALL_POSTS.filter((p) => p.featured)
  return typeof limit === 'number' ? featured.slice(0, limit) : featured
}

export function getRecentPosts(limit = 6): Post[] {
  return ALL_POSTS.slice(0, limit)
}

/**
 * Resolve related posts. Explicit `relatedPosts` slugs win; we then fall back
 * to other posts in the same category, and finally tag overlap. Always returns
 * up to `limit` posts, excluding the current post.
 */
export function getRelatedPosts(post: Post, limit = 3): Post[] {
  const exclude = new Set<string>([post.slug])
  const result: Post[] = []

  if (post.relatedPosts?.length) {
    for (const slug of post.relatedPosts) {
      if (result.length >= limit) break
      if (exclude.has(slug)) continue
      const found = getPostBySlug(slug)
      if (found) {
        result.push(found)
        exclude.add(found.slug)
      }
    }
  }

  if (result.length < limit) {
    for (const p of ALL_POSTS) {
      if (result.length >= limit) break
      if (exclude.has(p.slug)) continue
      if (p.category === post.category) {
        result.push(p)
        exclude.add(p.slug)
      }
    }
  }

  if (result.length < limit) {
    const tagSet = new Set(post.tags)
    const scored = ALL_POSTS.filter((p) => !exclude.has(p.slug))
      .map((p) => ({
        post: p,
        score: p.tags.reduce((acc, t) => (tagSet.has(t) ? acc + 1 : acc), 0),
      }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)

    for (const entry of scored) {
      if (result.length >= limit) break
      result.push(entry.post)
      exclude.add(entry.post.slug)
    }
  }

  return result
}

export function formatPublishedDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

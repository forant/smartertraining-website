import type { Metadata } from 'next'
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_NAME } from './site'
import { getAuthor } from './authors'
import { getCategory } from './categories'
import type { Post } from './types'

export function postMetadata(post: Post): Metadata {
  const url = absoluteUrl(`/blog/${post.slug}`)
  const canonical = post.canonical ?? url
  const author = getAuthor(post.author)
  const category = getCategory(post.category)
  const image = post.ogImage
    ? absoluteUrl(post.ogImage)
    : post.hero?.src
      ? absoluteUrl(post.hero.src)
      : DEFAULT_OG_IMAGE

  return {
    title: `${post.title} | ${SITE_NAME}`,
    description: post.description,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.description,
      siteName: SITE_NAME,
      images: [{ url: image }],
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [author.name],
      tags: [category.name, ...post.tags],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [image],
    },
    keywords: post.tags,
  }
}

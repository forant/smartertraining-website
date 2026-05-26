import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from './site'
import { getAuthor } from './authors'
import { getCategory } from './categories'
import type { FAQ, Post } from './types'

export function articleJsonLd(post: Post) {
  const author = getAuthor(post.author)
  const category = getCategory(post.category)
  const url = absoluteUrl(`/blog/${post.slug}`)
  const image = post.ogImage
    ? absoluteUrl(post.ogImage)
    : post.hero?.src
      ? absoluteUrl(post.hero.src)
      : DEFAULT_OG_IMAGE

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': post.canonical ?? url,
    },
    headline: post.title,
    description: post.description,
    image,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    inLanguage: 'en-US',
    articleSection: category.name,
    keywords: post.tags.join(', '),
    author: {
      '@type': 'Organization',
      name: author.name,
      url: author.url ?? SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/logo-mark.png'),
      },
    },
  }
}

export interface Crumb {
  name: string
  url: string
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url.startsWith('http') ? c.url : absoluteUrl(c.url),
    })),
  }
}

export function faqJsonLd(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  }
}

export function blogJsonLd(opts: { url: string; title: string; description: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': opts.url,
    url: opts.url,
    name: opts.title,
    description: opts.description,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  }
}

export function collectionPageJsonLd(opts: {
  url: string
  title: string
  description: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': opts.url,
    url: opts.url,
    name: opts.title,
    description: opts.description,
  }
}

export function jsonLdScript(data: object): string {
  // Inline JSON-LD. We escape `</` to avoid HTML parser confusion if the
  // payload ever contained the substring.
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

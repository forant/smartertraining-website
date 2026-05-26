import Link from 'next/link'
import { Breadcrumbs } from './breadcrumbs'
import { Prose } from './prose'
import { FaqSection } from './faq'
import { RelatedPosts } from './related-posts'
import { TableOfContents } from './toc'
import { BlogCTA } from './blog-cta'
import { CATEGORIES } from '@/lib/blog/categories'
import { formatPublishedDate, getRelatedPosts } from '@/lib/blog/posts'
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  jsonLdScript,
} from '@/lib/blog/schema'
import type { Post } from '@/lib/blog/types'

export function ArticleLayout({ post }: { post: Post }) {
  const category = CATEGORIES[post.category]
  const related = getRelatedPosts(post, 3)

  const articleSchema = articleJsonLd(post)
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: category.name, url: `/blog/category/${category.slug}` },
    { name: post.title, url: `/blog/${post.slug}` },
  ])
  const faqSchema =
    post.faqs && post.faqs.length > 0 ? faqJsonLd(post.faqs) : null

  const Content = post.Content

  return (
    <main className="min-h-screen bg-background">
      <article className="mx-auto max-w-3xl px-6 py-12 sm:px-8 md:py-16">
        <Breadcrumbs
          items={[
            { label: 'Blog', href: '/blog' },
            {
              label: category.name,
              href: `/blog/category/${category.slug}`,
            },
            { label: post.title },
          ]}
        />

        <header className="mt-6 space-y-5">
          <Link
            href={`/blog/category/${category.slug}`}
            className="inline-block text-xs font-semibold uppercase tracking-wide text-primary hover:opacity-80"
          >
            {category.name}
          </Link>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-balance leading-[1.15]">
            {post.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <time dateTime={post.publishedAt}>
              {formatPublishedDate(post.publishedAt)}
            </time>
            {post.updatedAt && post.updatedAt !== post.publishedAt && (
              <>
                <span aria-hidden>·</span>
                <span>Updated {formatPublishedDate(post.updatedAt)}</span>
              </>
            )}
            <span aria-hidden>·</span>
            <span>{post.readingTimeMinutes} min read</span>
          </div>
        </header>

        {post.toc && post.toc.length > 0 && (
          <div className="mt-10">
            <TableOfContents items={post.toc} />
          </div>
        )}

        <div className="mt-10">
          <Prose>
            <Content />
          </Prose>
        </div>

        {post.internalLinks && post.internalLinks.length > 0 && (
          <section
            aria-labelledby="keep-reading-heading"
            className="mt-12 rounded-2xl border border-border bg-card p-6"
          >
            <h2
              id="keep-reading-heading"
              className="text-base font-semibold tracking-tight"
            >
              Keep reading
            </h2>
            <ul className="mt-4 space-y-3">
              {post.internalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary underline underline-offset-4 hover:opacity-80"
                  >
                    {link.label}
                  </Link>
                  {link.description && (
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {link.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {post.faqs && <FaqSection faqs={post.faqs} />}

        <BlogCTA />

        <RelatedPosts posts={related} />
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(faqSchema) }}
        />
      )}
    </main>
  )
}

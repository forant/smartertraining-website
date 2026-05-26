import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Footer } from '@/components/landing/footer'
import { Breadcrumbs } from '@/components/blog/breadcrumbs'
import { PostCard } from '@/components/blog/post-card'
import { BlogCTA } from '@/components/blog/blog-cta'
import {
  CATEGORIES,
  CATEGORY_SLUGS,
  getCategory,
} from '@/lib/blog/categories'
import { getPostsByCategory } from '@/lib/blog/posts'
import {
  breadcrumbJsonLd,
  collectionPageJsonLd,
  jsonLdScript,
} from '@/lib/blog/schema'
import { absoluteUrl, SITE_NAME } from '@/lib/blog/site'
import type { CategorySlug } from '@/lib/blog/types'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return CATEGORY_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  if (!CATEGORY_SLUGS.includes(slug as CategorySlug)) return {}
  const category = getCategory(slug as CategorySlug)
  const url = absoluteUrl(`/blog/category/${category.slug}`)
  return {
    title: `${category.title} | ${SITE_NAME}`,
    description: category.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: `${category.title} | ${SITE_NAME}`,
      description: category.description,
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.title} | ${SITE_NAME}`,
      description: category.description,
    },
  }
}

export default async function CategoryHubPage({ params }: PageProps) {
  const { slug } = await params
  if (!CATEGORY_SLUGS.includes(slug as CategorySlug)) notFound()
  const category = getCategory(slug as CategorySlug)
  const posts = getPostsByCategory(category.slug)
  const relatedCategories = (category.relatedCategories ?? []).map(
    (s) => CATEGORIES[s]
  )

  const url = absoluteUrl(`/blog/category/${category.slug}`)
  const collectionSchema = collectionPageJsonLd({
    url,
    title: `${category.title} | ${SITE_NAME}`,
    description: category.description,
  })
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: category.name, url: `/blog/category/${category.slug}` },
  ])

  return (
    <>
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 md:py-16">
          <Breadcrumbs
            items={[
              { label: 'Blog', href: '/blog' },
              { label: category.name },
            ]}
          />

          <header className="mt-6 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              Category
            </p>
            <h1 className="mt-2 text-3xl md:text-5xl font-semibold tracking-tight text-balance leading-[1.1]">
              {category.name}
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              {category.intro}
            </p>
          </header>

          <section aria-labelledby="posts-heading" className="mt-12">
            <h2 id="posts-heading" className="sr-only">
              Posts in {category.name}
            </h2>
            {posts.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((p) => (
                  <PostCard key={p.slug} post={p} showCategory={false} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-border bg-card p-8 text-center">
                <p className="text-muted-foreground">
                  No posts in this category yet. We&apos;re writing — check
                  back soon, or browse{' '}
                  <Link
                    href="/blog"
                    className="text-primary underline underline-offset-4 hover:opacity-80"
                  >
                    other categories
                  </Link>
                  .
                </p>
              </div>
            )}
          </section>

          {relatedCategories.length > 0 && (
            <section aria-labelledby="related-cats" className="mt-14">
              <h2
                id="related-cats"
                className="text-xl font-semibold tracking-tight"
              >
                Related categories
              </h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {relatedCategories.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/blog/category/${c.slug}`}
                      className="block rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
                    >
                      <div className="text-sm font-semibold text-primary">
                        {c.name}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {c.description}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <BlogCTA />
        </div>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbSchema) }}
      />
    </>
  )
}

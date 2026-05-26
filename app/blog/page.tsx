import type { Metadata } from 'next'
import { Footer } from '@/components/landing/footer'
import { Breadcrumbs } from '@/components/blog/breadcrumbs'
import { PostCard } from '@/components/blog/post-card'
import { CategoryGrid } from '@/components/blog/category-grid'
import { BlogCTA } from '@/components/blog/blog-cta'
import { getAllCategories } from '@/lib/blog/categories'
import {
  getAllPosts,
  getFeaturedPosts,
  getRecentPosts,
} from '@/lib/blog/posts'
import {
  blogJsonLd,
  breadcrumbJsonLd,
  jsonLdScript,
} from '@/lib/blog/schema'
import { absoluteUrl, SITE_NAME } from '@/lib/blog/site'

const PAGE_TITLE = 'Blog'
const PAGE_DESCRIPTION =
  'Adaptive cycling training, time-crunched workouts, recovery, and training philosophy for amateur cyclists with real lives.'

export const metadata: Metadata = {
  title: `${PAGE_TITLE} | ${SITE_NAME}`,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: absoluteUrl('/blog') },
  openGraph: {
    type: 'website',
    url: absoluteUrl('/blog'),
    title: `${PAGE_TITLE} | ${SITE_NAME}`,
    description: PAGE_DESCRIPTION,
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PAGE_TITLE} | ${SITE_NAME}`,
    description: PAGE_DESCRIPTION,
  },
}

export default function BlogIndexPage() {
  const featured = getFeaturedPosts(3)
  const recent = getRecentPosts(9)
  const categories = getAllCategories()
  const allPosts = getAllPosts()

  // If there are no featured posts, fall back to showing recent posts at the
  // top so the page is never empty in early days.
  const heroPosts = featured.length > 0 ? featured : recent.slice(0, 3)
  const heroSlugs = new Set(heroPosts.map((p) => p.slug))
  const restOfRecent = recent.filter((p) => !heroSlugs.has(p.slug))

  const indexUrl = absoluteUrl('/blog')
  const blogSchema = blogJsonLd({
    url: indexUrl,
    title: `${PAGE_TITLE} | ${SITE_NAME}`,
    description: PAGE_DESCRIPTION,
  })
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
  ])

  return (
    <>
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 md:py-16">
          <Breadcrumbs items={[{ label: 'Blog' }]} />

          <header className="mt-6 max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-balance leading-[1.1]">
              The SmarterTraining blog
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              {PAGE_DESCRIPTION}
            </p>
          </header>

          {heroPosts.length > 0 && (
            <section aria-labelledby="featured-heading" className="mt-14">
              <h2
                id="featured-heading"
                className="text-xl font-semibold tracking-tight"
              >
                Featured
              </h2>
              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {heroPosts.map((p) => (
                  <PostCard key={p.slug} post={p} />
                ))}
              </div>
            </section>
          )}

          <div className="mt-14">
            <CategoryGrid categories={categories} />
          </div>

          {restOfRecent.length > 0 && (
            <section aria-labelledby="recent-heading" className="mt-14">
              <h2
                id="recent-heading"
                className="text-xl font-semibold tracking-tight"
              >
                Recent posts
              </h2>
              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {restOfRecent.map((p) => (
                  <PostCard key={p.slug} post={p} />
                ))}
              </div>
            </section>
          )}

          {allPosts.length === 0 && (
            <section className="mt-14 rounded-2xl border border-border bg-card p-8 text-center">
              <p className="text-muted-foreground">
                New articles are on the way. Subscribe to the waitlist below to
                hear about the launch.
              </p>
            </section>
          )}

          <BlogCTA />
        </div>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbSchema) }}
      />
    </>
  )
}

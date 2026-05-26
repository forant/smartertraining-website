import Link from 'next/link'
import type { Category } from '@/lib/blog/types'

export function CategoryGrid({
  categories,
  heading = 'Browse by category',
}: {
  categories: Category[]
  heading?: string
}) {
  return (
    <section aria-labelledby="category-nav-heading">
      <h2
        id="category-nav-heading"
        className="text-xl font-semibold tracking-tight"
      >
        {heading}
      </h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/blog/category/${c.slug}`}
              className="block rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
            >
              <div className="text-sm font-semibold text-primary">{c.name}</div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {c.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

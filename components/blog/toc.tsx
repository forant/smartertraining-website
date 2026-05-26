import type { TocItem } from '@/lib/blog/types'

export function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null
  return (
    <nav
      aria-labelledby="toc-heading"
      className="rounded-2xl border border-border bg-card p-5"
    >
      <h2
        id="toc-heading"
        className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
      >
        On this page
      </h2>
      <ol className="mt-3 space-y-2 text-sm">
        {items.map((item) => (
          <li
            key={item.id}
            className={item.level === 3 ? 'pl-4' : undefined}
          >
            <a
              href={`#${item.id}`}
              className="text-foreground hover:text-primary transition-colors"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

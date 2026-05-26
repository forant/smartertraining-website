import Link from 'next/link'
import { CATEGORIES } from '@/lib/blog/categories'
import { formatPublishedDate } from '@/lib/blog/posts'
import type { Post } from '@/lib/blog/types'

export function PostCard({
  post,
  showCategory = true,
}: {
  post: Post
  showCategory?: boolean
}) {
  const category = CATEGORIES[post.category]
  return (
    <article className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md">
      {showCategory && (
        <Link
          href={`/blog/category/${category.slug}`}
          className="text-xs font-medium uppercase tracking-wide text-primary hover:opacity-80"
        >
          {category.name}
        </Link>
      )}
      <h3 className="text-lg font-semibold tracking-tight leading-snug">
        <Link
          href={`/blog/${post.slug}`}
          className="group-hover:text-primary transition-colors"
        >
          {post.title}
        </Link>
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {post.excerpt}
      </p>
      <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
        <time dateTime={post.publishedAt}>
          {formatPublishedDate(post.publishedAt)}
        </time>
        <span aria-hidden>·</span>
        <span>{post.readingTimeMinutes} min read</span>
      </div>
    </article>
  )
}

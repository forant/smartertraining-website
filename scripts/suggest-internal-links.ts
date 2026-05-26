/**
 * Suggest internal links for a post.
 *
 * Usage:
 *   pnpm blog:links <slug>
 *
 * The slug can be an existing post or a planned one — if it doesn't match an
 * existing post, you can pass --category and --title to score candidates for
 * a post you haven't written yet.
 *
 *   pnpm blog:links my-planned-slug --title "Article title" --category indoor-cycling
 *
 * Scoring:
 *   +3   same category
 *   +1   per shared tag
 *   +0.5 per shared 4+ char title/description/excerpt token (stopwords removed)
 *
 * Output includes a ready-to-paste relatedPosts + internalLinks block, plus
 * the category-hub link (always recommended).
 */
import { CATEGORIES, CATEGORY_SLUGS } from '../lib/blog/categories'
import { readPostInventory, type PostRecord } from './_lib/inventory'

const STOPWORDS = new Set([
  'the','a','an','and','or','of','to','in','on','for','with','that','this',
  'these','those','is','are','was','were','it','its','as','at','by','be',
  'from','if','but','not','so','than','then','also','about','what','why',
  'how','when','your','you','our','we','i','me','my','do','does','did',
  'have','has','had','will','would','should','could','any','some','one',
  'two','three','more','most','very','really','still','every','other',
])

function tokenize(s: string): Set<string> {
  const out = new Set<string>()
  for (const t of (s ?? '').toLowerCase().split(/[^a-z0-9]+/)) {
    if (t.length >= 4 && !STOPWORDS.has(t)) out.add(t)
  }
  return out
}

interface ScoredCandidate {
  post: PostRecord
  score: number
  reasons: string[]
}

interface Target {
  slug: string
  title: string
  description?: string
  excerpt?: string
  category?: string
  tags: string[]
  exists: boolean
}

function buildTarget(
  inventory: PostRecord[],
  slugArg: string,
  titleOverride?: string,
  categoryOverride?: string
): Target {
  const existing = inventory.find((p) => p.slug === slugArg)
  if (existing) {
    return {
      slug: existing.slug,
      title: existing.title,
      description: existing.description,
      excerpt: existing.excerpt,
      category: existing.category,
      tags: existing.tags,
      exists: true,
    }
  }
  return {
    slug: slugArg,
    title: titleOverride ?? slugArg,
    category: categoryOverride,
    tags: [],
    exists: false,
  }
}

function score(target: Target, candidate: PostRecord): ScoredCandidate {
  const reasons: string[] = []
  let total = 0

  if (target.category && candidate.category === target.category) {
    total += 3
    reasons.push('same category')
  }

  const targetTags = new Set(target.tags.map((t) => t.toLowerCase()))
  const sharedTags = candidate.tags.filter((t) =>
    targetTags.has(t.toLowerCase())
  )
  if (sharedTags.length > 0) {
    total += sharedTags.length
    reasons.push(`shared tags: ${sharedTags.join(', ')}`)
  }

  const targetTokens = new Set([
    ...tokenize(target.title),
    ...tokenize(target.description ?? ''),
    ...tokenize(target.excerpt ?? ''),
  ])
  const candTokens = new Set([
    ...tokenize(candidate.title),
    ...tokenize(candidate.description ?? ''),
    ...tokenize(candidate.excerpt ?? ''),
  ])
  let overlap = 0
  for (const t of candTokens) if (targetTokens.has(t)) overlap++
  if (overlap > 0) {
    total += overlap * 0.5
    reasons.push(`${overlap} shared topic terms`)
  }

  return { post: candidate, score: total, reasons }
}

function escapeSingle(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

function printUsage(exit = 0): never {
  console.log(`
Suggest internal links for a post.

Usage:
  pnpm blog:links <slug>
  pnpm blog:links <slug> --title "Title" --category <slug>     # for a not-yet-written post

The slug can match an existing post (uses its metadata) or be a planned slug
(pass --title / --category to seed scoring).
`)
  process.exit(exit)
}

function parseArgs(argv: string[]) {
  const args = argv.slice(2)
  if (args.length === 0 || args[0] === '-h' || args[0] === '--help')
    printUsage(args.length === 0 ? 1 : 0)
  let slug: string | undefined
  let title: string | undefined
  let category: string | undefined
  for (let i = 0; i < args.length; i++) {
    const a = args[i]
    if (a === '--title') title = args[++i]
    else if (a === '--category' || a === '-c') category = args[++i]
    else if (!slug && !a.startsWith('-')) slug = a
  }
  if (!slug) printUsage(1)
  if (
    category &&
    !(CATEGORY_SLUGS as readonly string[]).includes(category)
  ) {
    console.error(
      `Unknown category "${category}". Valid: ${CATEGORY_SLUGS.join(', ')}`
    )
    process.exit(1)
  }
  return { slug: slug as string, title, category }
}

function main() {
  const { slug, title, category } = parseArgs(process.argv)
  const inventory = readPostInventory()
  const target = buildTarget(inventory, slug, title, category)

  const candidates = inventory
    .filter((p) => p.slug !== target.slug)
    .map((p) => score(target, p))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
  const top = candidates.slice(0, 8)

  const cat = target.category
    ? CATEGORIES[target.category as keyof typeof CATEGORIES]
    : undefined

  console.log(
    `\nInternal link suggestions for: ${target.title}${target.exists ? '' : '  [planned post — not yet in registry]'}`
  )
  console.log(
    `  slug: ${target.slug}  ·  category: ${target.category ?? '(none specified)'}\n`
  )

  if (cat) {
    console.log('Category hub (always recommended):')
    console.log(
      `  ${cat.name.padEnd(28)}  /blog/category/${cat.slug}`
    )
    console.log()
  }

  if (top.length === 0) {
    console.log('(No related posts yet — when more posts exist they will appear here.)\n')
  } else {
    console.log(`Top ${top.length} related posts (by score):\n`)
    for (const c of top) {
      console.log(
        `  ${c.score.toFixed(1).padStart(4)}  ${c.post.title}`
      )
      console.log(`         /blog/${c.post.slug}  (${c.post.category})`)
      console.log(`         ${c.reasons.join('; ')}\n`)
    }
  }

  // -- Ready-to-paste block ------------------------------------------------
  console.log('---  Ready to paste into the post  ---\n')

  console.log('  relatedPosts: [')
  for (const c of top.slice(0, 3)) {
    console.log(`    '${c.post.slug}',`)
  }
  console.log('  ],\n')

  console.log('  internalLinks: [')
  if (cat) {
    console.log(
      `    { label: '${escapeSingle(cat.name)}', href: '/blog/category/${cat.slug}', description: '${escapeSingle(cat.description)}' },`
    )
  }
  for (const c of top.slice(0, 3)) {
    console.log(
      `    { label: '${escapeSingle(c.post.title)}', href: '/blog/${c.post.slug}', description: '${escapeSingle(c.post.excerpt ?? c.post.description ?? '')}' },`
    )
  }
  console.log('  ],\n')
}

main()

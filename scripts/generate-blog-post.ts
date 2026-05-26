/**
 * Scaffold a new SmarterTraining blog post.
 *
 * Usage:
 *   pnpm blog:new "Article title" --category <slug> [--tags "a,b,c"] [--slug <override>] [--dry-run]
 *
 * The script:
 *   1. Validates the category against lib/blog/categories.ts.
 *   2. Derives a slug from the title (or accepts --slug).
 *   3. Refuses to overwrite an existing post.
 *   4. Writes content/blog/posts/<slug>.tsx with a TODO-marked skeleton that
 *      follows the recommended article structure.
 *   5. Regenerates content/blog/posts/index.ts from the file list.
 *
 * Authoring happens manually after scaffolding. See prompts/blog-writer.md
 * for a prompt template if you want LLM assistance.
 */
import * as fs from 'node:fs'
import * as path from 'node:path'
import {
  CATEGORIES,
  CATEGORY_SLUGS,
} from '../lib/blog/categories'
import type { CategorySlug } from '../lib/blog/types'
import { POSTS_DIR, readPostInventory, slugify } from './_lib/inventory'
import { regenerateIndex } from './_lib/registry'

interface Args {
  title: string
  category: CategorySlug
  tags: string[]
  slug?: string
  dryRun: boolean
}

function printUsage(exitCode = 0): never {
  console.log(`
Scaffold a new SmarterTraining blog post.

Usage:
  pnpm blog:new "Article title" --category <slug> [options]

Options:
  -c, --category <slug>   Required. One of: ${CATEGORY_SLUGS.join(', ')}
  -t, --tags    "a,b,c"   Comma-separated tag list (2–6 recommended).
      --slug    <slug>    Override the auto-derived slug.
      --dry-run           Print what would be written without touching disk.
  -h, --help              This message.

Examples:
  pnpm blog:new "Why static cycling plans fail busy athletes" -c training-philosophy
  pnpm blog:new "How to use ERG mode well" -c indoor-cycling --tags "erg,smart trainer,consistency"

After scaffolding:
  1. Open the new file and replace every TODO. Keep the recommended structure.
  2. pnpm blog:links <slug>   # internal-link suggestions
  3. pnpm blog:audit <slug>   # validate before commit
`)
  process.exit(exitCode)
}

function parseArgs(argv: string[]): Args {
  const args = argv.slice(2)
  if (args.length === 0 || args[0] === '-h' || args[0] === '--help') printUsage()

  const positional: string[] = []
  let category: string | undefined
  let tagsRaw: string | undefined
  let slugOverride: string | undefined
  let dryRun = false

  for (let i = 0; i < args.length; i++) {
    const a = args[i]
    if (a === '-c' || a === '--category') category = args[++i]
    else if (a === '-t' || a === '--tags') tagsRaw = args[++i]
    else if (a === '--slug') slugOverride = args[++i]
    else if (a === '--dry-run') dryRun = true
    else if (a === '-h' || a === '--help') printUsage()
    else positional.push(a)
  }

  if (positional.length === 0) {
    console.error('Error: title is required.\n')
    printUsage(1)
  }
  if (!category) {
    console.error('Error: --category is required.\n')
    printUsage(1)
  }
  if (!(CATEGORY_SLUGS as readonly string[]).includes(category)) {
    console.error(
      `Error: unknown category "${category}". Valid: ${CATEGORY_SLUGS.join(', ')}\n`
    )
    process.exit(1)
  }

  const tags = tagsRaw
    ? tagsRaw
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : []

  return {
    title: positional.join(' '),
    category: category as CategorySlug,
    tags,
    slug: slugOverride,
    dryRun,
  }
}

function escapeSingle(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

function renderTagsArray(tags: string[]): string {
  if (tags.length === 0) return '    // TODO: add 2–6 tags\n  '
  return (
    '\n    ' +
    tags.map((t) => `'${escapeSingle(t)}'`).join(',\n    ') +
    ',\n  '
  )
}

function buildScaffold(args: {
  slug: string
  title: string
  category: CategorySlug
  tags: string[]
  today: string
}): string {
  const cat = CATEGORIES[args.category]
  const titleEsc = escapeSingle(args.title)
  const catNameEsc = escapeSingle(cat.name)
  const catDescEsc = escapeSingle(cat.description)
  const tagsBlock = renderTagsArray(args.tags)

  return `import Link from 'next/link'
import type { PostMeta, TocItem } from '@/lib/blog/types'

export const meta: PostMeta = {
  slug: '${args.slug}',
  title: '${titleEsc}',
  description:
    'TODO: 110–170 character meta description. Be specific. No keyword stuffing.',
  excerpt:
    'TODO: 1–3 sentence excerpt for cards and the article intro. Concrete, not promotional.',
  category: '${args.category}',
  tags: [${tagsBlock}],
  publishedAt: '${args.today}',
  author: 'smartertraining',
  featured: false,
  relatedPosts: [
    // TODO: 0–3 related-post slugs. Run \`pnpm blog:links ${args.slug}\` for ideas.
  ],
  internalLinks: [
    {
      label: '${catNameEsc}',
      href: '/blog/category/${args.category}',
      description: '${catDescEsc}',
    },
    // TODO: 1–4 contextual links to other categories or existing posts.
  ],
  faqs: [
    // TODO: 2–4 FAQ entries if the title is question-oriented; otherwise delete this field.
    // { question: '...', answer: '...' },
  ],
}

const TOC: TocItem[] = [
  { id: 'why-this-matters', title: 'Why this matters', level: 2 },
  { id: 'main-explanation', title: 'TODO: rename this section', level: 2 },
  { id: 'practical-guidance', title: 'Practical guidance', level: 2 },
  {
    id: 'how-smartertraining-thinks-about-this',
    title: 'How SmarterTraining thinks about this',
    level: 2,
  },
  { id: 'takeaway', title: 'Takeaway', level: 2 },
]

meta.toc = TOC

export default function Content() {
  // The <Link> import above is available for inline internal links.
  // Remove it if you do not end up using <Link> in the body.
  void Link

  return (
    <>
      <p className="lead">
        TODO: 1–2 sentence intro that names the reader's actual problem in
        plain language. Avoid generic openers.
      </p>

      {/*
       * Direct-answer box. LLM search summaries and snippets will extract this.
       * Per docs/blog-standards.md § Template Labels & Infrastructure Tone,
       * avoid generic visible labels ("Direct answer", "Key takeaway"). If a
       * short topical label genuinely helps scanning, add a
       * <p className="answer-box__label">In short</p> (or similar) above the
       * paragraph. Otherwise leave the box label-free.
       */}
      <div className="answer-box" role="note" aria-label="Key answer">
        <p>
          TODO: 2–4 sentences that directly answer the question implied by
          the title. Concrete and self-contained — this paragraph will get
          lifted into AI search summaries and snippets.
        </p>
      </div>

      <h2 id="why-this-matters">Why this matters</h2>
      <p>
        TODO: explain the practical stakes for the reader. Who is affected,
        why it is not obvious, what ignoring it costs.
      </p>

      <h2 id="main-explanation">TODO: rename this section</h2>
      <p>TODO: main explanation. Add H3 subsections if helpful.</p>

      <h2 id="practical-guidance">Practical guidance</h2>
      <ul>
        <li>TODO: concrete recommendation 1</li>
        <li>TODO: concrete recommendation 2</li>
        <li>TODO: concrete recommendation 3</li>
      </ul>

      <h2 id="how-smartertraining-thinks-about-this">
        How SmarterTraining thinks about this
      </h2>
      <p>
        TODO: briefly state the SmarterTraining point of view — adaptive,
        consistency over perfection, training for real life. Connect back to
        the article's topic. Do not overclaim product capabilities.
      </p>

      <h2 id="takeaway">Takeaway</h2>
      <p className="takeaway">
        <strong>Takeaway:</strong> TODO: one or two sentences a reader could
        repeat. Make it specific.
      </p>
    </>
  )
}
`
}

function main() {
  const args = parseArgs(process.argv)

  const slug = args.slug ?? slugify(args.title)
  if (!slug) {
    console.error(`Error: could not derive a slug from "${args.title}".`)
    process.exit(1)
  }

  const inventory = readPostInventory()
  if (inventory.some((p) => p.slug === slug)) {
    console.error(`Error: slug "${slug}" already exists.`)
    process.exit(1)
  }

  const filePath = path.join(POSTS_DIR, `${slug}.tsx`)
  if (fs.existsSync(filePath)) {
    console.error(`Error: file already exists: ${path.relative('.', filePath)}`)
    process.exit(1)
  }

  const today = new Date().toISOString().slice(0, 10)
  const scaffold = buildScaffold({
    slug,
    title: args.title,
    category: args.category,
    tags: args.tags,
    today,
  })

  if (args.dryRun) {
    console.log(`[dry-run] Would write ${path.relative('.', filePath)}`)
    console.log('[dry-run] Would regenerate content/blog/posts/index.ts')
    console.log('\n---\n' + scaffold)
    return
  }

  fs.writeFileSync(filePath, scaffold)
  const reg = regenerateIndex()

  console.log(`✓ Created ${path.relative('.', filePath)}`)
  console.log(
    `✓ Regenerated ${path.relative('.', reg.path)} (${reg.postCount} posts)`
  )
  console.log()
  console.log('Next steps:')
  console.log(
    `  1. Read docs/blog-standards.md (voice, banned phrases, structure).`
  )
  console.log(
    `  2. Open ${path.relative('.', filePath)} and replace every TODO.`
  )
  console.log(`  3. pnpm blog:links ${slug}   # internal-link suggestions`)
  console.log(`  4. pnpm blog:audit ${slug}   # validate before commit`)
  console.log()
  console.log(
    'Authoring with an LLM? Paste docs/blog-standards.md + prompts/blog-writer.md'
  )
  console.log('into the session along with the scaffold above.')
}

main()

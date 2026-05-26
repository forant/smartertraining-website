/**
 * Audit one or all SmarterTraining blog posts for SEO, structure, and
 * content-quality issues.
 *
 * Usage:
 *   pnpm blog:audit          # audit every post
 *   pnpm blog:audit <slug>   # audit a single post
 *   pnpm blog:audit --json   # machine-readable output (audits all unless slug given)
 *
 * Exit code is non-zero if any post has an ERROR-level issue, so this script
 * is safe to use as a pre-commit/CI gate.
 */
import { CATEGORY_SLUGS } from '../lib/blog/categories'
import { readPostInventory, type PostRecord } from './_lib/inventory'

type Severity = 'error' | 'warn' | 'info'
interface Issue {
  sev: Severity
  message: string
}

/*
 * Banned / discouraged phrases.
 *
 * Source of truth: docs/blog-standards.md § "Banned / Discouraged Phrases".
 * Keep this list in sync with that section. Multi-word phrases go in
 * WEAK_PHRASES (lowercase substring match); single words / short tokens that
 * have legitimate uses elsewhere go in OVERCLAIM_WORDS (word-boundary match
 * so "hack" doesn't fire on "backpack").
 */
const WEAK_PHRASES = [
  // Standards doc: Banned / Discouraged Phrases
  "in today's fast-paced world",
  'unlock your potential',
  'game changer',
  'game-changer',
  'take your training to the next level',
  'crush your goals',
  'optimize every aspect',
  'studies show',
  'science-backed',
  'elite performance secrets',
  'no excuses',
  'train harder',
  'maximum gains',
  'revolutionary ai',
  // Generic AI/SEO filler — not in the doc by name but in the same family.
  "in today's world",
  'in the world of',
  'without further ado',
  'in this article we will',
  "let's dive in",
  'look no further',
  'it is important to note',
  'at the end of the day',
  'in conclusion',
  'as we delve into',
  'delve into',
  'when it comes to',
  'unleash your potential',
  // Unsubstantiated science (Brand Voice + Medical & Safety Standards).
  'research has proven',
  'experts agree',
  'scientifically proven',
  'science has shown',
  'proven to',
]

/*
 * Single-word overclaim/hype tokens. Word-boundary match.
 *
 * Source of truth: docs/blog-standards.md § "Banned / Discouraged Phrases" +
 * § "SmarterTraining Mentions" (never oversell).
 */
const OVERCLAIM_WORDS = [
  // Standards doc.
  'hack',
  'biohack',
  'dominate',
  // Mention/overclaim family (general blog guardrails).
  'guaranteed',
  'instantly',
  'effortlessly',
  'magic',
  'revolutionary',
  'world-class',
  'the best app',
  'the only app',
  'never miss',
]

/* Risky medical/health phrases — articles must not give medical advice. */
const MEDICAL_PHRASES = [
  'cures',
  'will cure',
  'medical advice',
  'diagnose',
  'replace your doctor',
]

/*
 * Heading text we consider template-y / vague.
 *
 * Source of truth: docs/blog-standards.md § "Heading Standards" (bad examples)
 * and § "Template Labels & Infrastructure Tone".
 */
const VAGUE_HEADINGS = new Set([
  // Standards doc § Heading Standards (bad examples).
  'understanding the science',
  'important considerations',
  'maximizing results',
  'final thoughts',
  'why this matters',
  // Standards doc § Template Labels & Infrastructure Tone.
  'key insights',
  'key takeaways',
  // Common AI/SEO template headings.
  'introduction',
  'overview',
  'background',
  'conclusion',
  'summary',
  'main section',
  'the basics',
  'closing thoughts',
])

function isQuestionTitle(title: string): boolean {
  return /^(how|why|what|when|can|should|is|are|do|does|will)\b/i.test(title)
}

function checkLength(
  field: string,
  value: string | undefined,
  min: number,
  max: number,
  required = true
): Issue[] {
  const issues: Issue[] = []
  if (!value) {
    if (required)
      issues.push({ sev: 'error', message: `Missing ${field}.` })
    return issues
  }
  if (value.length < min)
    issues.push({
      sev: 'warn',
      message: `${field} is short (${value.length} chars; aim for ${min}–${max}).`,
    })
  if (value.length > max)
    issues.push({
      sev: 'warn',
      message: `${field} is long (${value.length} chars; aim for ${min}–${max}).`,
    })
  return issues
}

function countMatches(haystack: string, needle: string): number {
  if (!needle) return 0
  let count = 0
  let i = 0
  while ((i = haystack.indexOf(needle, i)) !== -1) {
    count++
    i += needle.length
  }
  return count
}

function auditPost(post: PostRecord, allSlugs: Set<string>): Issue[] {
  const issues: Issue[] = []
  const src = post.parsed.fullText
  const lcSrc = src.toLowerCase()

  // -- meta integrity -------------------------------------------------------

  if (post.fileName !== post.slug) {
    issues.push({
      sev: 'error',
      message: `Filename "${post.fileName}.tsx" does not match slug "${post.slug}".`,
    })
  }

  issues.push(...checkLength('title', post.title, 30, 80))
  issues.push(...checkLength('description', post.description, 110, 170))
  issues.push(...checkLength('excerpt', post.excerpt, 80, 320))

  if (!post.category) {
    issues.push({ sev: 'error', message: 'Missing category.' })
  } else if (!(CATEGORY_SLUGS as readonly string[]).includes(post.category)) {
    issues.push({
      sev: 'error',
      message: `Unknown category "${post.category}". Valid: ${CATEGORY_SLUGS.join(', ')}`,
    })
  }

  if (post.tags.length === 0) {
    issues.push({ sev: 'warn', message: 'No tags. Add 2–6.' })
  } else if (post.tags.length > 8) {
    issues.push({
      sev: 'warn',
      message: `Many tags (${post.tags.length}). Keep to 2–6.`,
    })
  }

  if (!post.publishedAt || !/^\d{4}-\d{2}-\d{2}$/.test(post.publishedAt)) {
    issues.push({
      sev: 'error',
      message: 'publishedAt missing or not an ISO date (YYYY-MM-DD).',
    })
  }
  if (post.updatedAt && !/^\d{4}-\d{2}-\d{2}$/.test(post.updatedAt)) {
    issues.push({
      sev: 'error',
      message: 'updatedAt is not an ISO date (YYYY-MM-DD).',
    })
  }

  // -- relatedPosts ---------------------------------------------------------

  for (const rp of post.relatedPosts) {
    if (rp === post.slug) {
      issues.push({ sev: 'error', message: `relatedPosts references itself.` })
    } else if (!allSlugs.has(rp)) {
      issues.push({
        sev: 'error',
        message: `relatedPosts: slug "${rp}" does not exist.`,
      })
    }
  }

  // -- internalLinks --------------------------------------------------------

  if (post.internalLinks.length === 0) {
    issues.push({
      sev: 'warn',
      message:
        'No internalLinks. Add at least the category hub + 1–4 contextual links.',
    })
  }
  let linksOwnCategory = false
  for (const link of post.internalLinks) {
    const href = link.href ?? ''
    if (!href) {
      issues.push({ sev: 'error', message: 'internalLinks entry has empty href.' })
      continue
    }
    if (!href.startsWith('/') && !href.startsWith('http')) {
      issues.push({
        sev: 'warn',
        message: `internalLinks href "${href}" is not absolute. Use a path starting with "/".`,
      })
      continue
    }
    if (href.startsWith('/blog/category/')) {
      const cat = href.replace('/blog/category/', '').replace(/\/$/, '')
      if (!(CATEGORY_SLUGS as readonly string[]).includes(cat)) {
        issues.push({
          sev: 'error',
          message: `internalLinks: unknown category "${cat}".`,
        })
      }
      if (cat === post.category) linksOwnCategory = true
    } else if (
      href.startsWith('/blog/') &&
      href !== '/blog' &&
      !href.startsWith('/blog/category/')
    ) {
      const targetSlug = href.replace('/blog/', '').replace(/\/$/, '')
      if (!allSlugs.has(targetSlug)) {
        issues.push({
          sev: 'error',
          message: `internalLinks: post slug "${targetSlug}" does not exist.`,
        })
      }
      if (targetSlug === post.slug) {
        issues.push({
          sev: 'error',
          message: `internalLinks references the current post.`,
        })
      }
    }
  }
  if (post.category && !linksOwnCategory) {
    issues.push({
      sev: 'warn',
      message: `Missing link to own category hub (/blog/category/${post.category}).`,
    })
  }

  // -- inline <Link href> targets ------------------------------------------
  // Catch broken hrefs in the JSX body too.
  for (const m of src.matchAll(/href="(\/blog\/[^"#?]+)"/g)) {
    const href = m[1]
    if (href.startsWith('/blog/category/')) {
      const cat = href.replace('/blog/category/', '').replace(/\/$/, '')
      if (!(CATEGORY_SLUGS as readonly string[]).includes(cat)) {
        issues.push({
          sev: 'error',
          message: `Body <Link> references unknown category "${cat}".`,
        })
      }
    } else if (
      href.startsWith('/blog/') &&
      href !== '/blog' &&
      !href.startsWith('/blog/category/')
    ) {
      const targetSlug = href.replace('/blog/', '').replace(/\/$/, '')
      if (!allSlugs.has(targetSlug)) {
        issues.push({
          sev: 'error',
          message: `Body <Link> references nonexistent post "${targetSlug}".`,
        })
      }
    }
  }

  // -- TODO markers ---------------------------------------------------------

  const todoCount = countMatches(src, 'TODO')
  if (todoCount > 0) {
    issues.push({
      sev: 'error',
      message: `${todoCount} TODO marker(s) remain — fill them in before shipping.`,
    })
  }

  // -- weak phrases / overclaim / medical -----------------------------------

  for (const phrase of WEAK_PHRASES) {
    if (lcSrc.includes(phrase)) {
      issues.push({
        sev: 'warn',
        message: `Generic/AI-sounding phrase: "${phrase}".`,
      })
    }
  }
  for (const word of OVERCLAIM_WORDS) {
    const re = new RegExp(`\\b${word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i')
    if (re.test(src)) {
      issues.push({
        sev: 'warn',
        message: `Possible product/feature overclaim: "${word}".`,
      })
    }
  }
  for (const phrase of MEDICAL_PHRASES) {
    if (lcSrc.includes(phrase)) {
      issues.push({
        sev: 'warn',
        message: `Possible medical claim: "${phrase}". Re-read for safety/caveats.`,
      })
    }
  }

  // -- direct answer / takeaway --------------------------------------------

  const hasAnswer = src.includes('answer-box') || src.includes('Direct answer')
  const hasTakeaway = src.includes('takeaway') || src.includes('Takeaway')
  if (!hasAnswer && !hasTakeaway) {
    issues.push({
      sev: 'warn',
      message:
        'No direct-answer or takeaway section detected. Add an "answer-box" near the top or a "takeaway" near the end.',
    })
  } else if (!hasAnswer) {
    issues.push({
      sev: 'info',
      message:
        'No direct-answer box detected. Question-style intros and LLM extraction benefit from one.',
    })
  }

  // -- FAQ on question-oriented titles --------------------------------------

  if (isQuestionTitle(post.title) && post.faqs.length === 0) {
    issues.push({
      sev: 'warn',
      message:
        'Title is question-oriented but no FAQs supplied. Add 2–4 FAQ entries.',
    })
  }
  if (post.faqs.length > 0) {
    for (let i = 0; i < post.faqs.length; i++) {
      const f = post.faqs[i]
      if (!f.question || f.question.trim().length < 8) {
        issues.push({
          sev: 'warn',
          message: `FAQ #${i + 1} question is empty or too short.`,
        })
      }
      if (!f.answer || f.answer.trim().length < 40) {
        issues.push({
          sev: 'warn',
          message: `FAQ #${i + 1} answer is too short — aim for 1–3 sentences.`,
        })
      }
    }
  }

  // -- headings -------------------------------------------------------------

  const h2Matches = Array.from(src.matchAll(/<h2\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g))
  const h2Ids = h2Matches.map((m) => m[1])
  const h2Texts = h2Matches.map((m) =>
    m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  )
  if (h2Ids.length < 3) {
    issues.push({
      sev: 'warn',
      message: `Only ${h2Ids.length} <h2> sections detected. Aim for 3+.`,
    })
  }
  for (const text of h2Texts) {
    const lower = text.toLowerCase()
    if (VAGUE_HEADINGS.has(lower)) {
      issues.push({
        sev: 'warn',
        message: `Vague heading: "${text}". Be more specific.`,
      })
    }
    if (lower.startsWith('todo')) {
      issues.push({
        sev: 'error',
        message: `Placeholder heading not replaced: "${text}".`,
      })
    }
  }

  // H2s without an id attribute → invisible to anchor/TOC.
  for (const m of src.matchAll(/<h2(\s[^>]*)?>/g)) {
    const attrs = m[1] ?? ''
    if (!/\sid="[^"]+"/.test(attrs)) {
      issues.push({
        sev: 'warn',
        message: 'Found an <h2> without an id attribute (breaks TOC anchors).',
      })
      break
    }
  }

  // TOC drift
  if (post.toc.length > 0) {
    const tocIds = post.toc.filter((t) => t.level === 2).map((t) => t.id)
    const h2Set = new Set(h2Ids)
    for (const id of tocIds) {
      if (!h2Set.has(id)) {
        issues.push({
          sev: 'warn',
          message: `TOC entry id "${id}" has no matching <h2 id="${id}"> in the body.`,
        })
      }
    }
  }

  // -- thin content --------------------------------------------------------

  const contentBody = extractContentReturn(src)
  let wordCount = 0
  if (contentBody) {
    const plain = contentBody
      .replace(/<[^>]+>/g, ' ')
      .replace(/\{[^}]*\}/g, ' ')
      .replace(/\s+/g, ' ')
    wordCount = plain.split(/\s+/).filter((w) => /[a-zA-Z]{2,}/.test(w)).length
    if (wordCount < 400) {
      issues.push({
        sev: 'warn',
        message: `Content seems thin (~${wordCount} words). Aim for 700–1500 for most articles.`,
      })
    }

    // Soft keyword stuffing: look for any 4+ char word appearing way too often.
    const tokenCounts = new Map<string, number>()
    for (const w of plain.toLowerCase().split(/[^a-z0-9]+/)) {
      if (w.length < 5) continue
      if (STOPWORDS.has(w)) continue
      tokenCounts.set(w, (tokenCounts.get(w) ?? 0) + 1)
    }
    const totalWords = Math.max(1, wordCount)
    for (const [w, count] of tokenCounts) {
      const ratio = count / totalWords
      if (count >= 12 && ratio > 0.025) {
        issues.push({
          sev: 'warn',
          message: `Possible keyword stuffing: "${w}" appears ${count} times (${(ratio * 100).toFixed(1)}% of words).`,
        })
      }
    }
  } else {
    issues.push({
      sev: 'info',
      message:
        'Could not locate `Content()` return body — non-standard component shape.',
    })
  }

  // -- soft CTA / brand mention --------------------------------------------

  if (!src.includes('SmarterTraining')) {
    issues.push({
      sev: 'warn',
      message:
        'No SmarterTraining mention in body. Add a "How SmarterTraining thinks about this" section as a soft CTA.',
    })
  }

  return issues
}

function extractContentReturn(src: string): string | null {
  // Find the `return ( ... )` block inside the default-exported Content fn.
  const idx = src.indexOf('export default function Content')
  if (idx === -1) return null
  const after = src.slice(idx)
  const returnIdx = after.indexOf('return (')
  if (returnIdx === -1) return null
  let depth = 0
  let start = -1
  for (let i = returnIdx; i < after.length; i++) {
    const ch = after[i]
    if (ch === '(') {
      depth++
      if (start === -1) start = i + 1
    } else if (ch === ')') {
      depth--
      if (depth === 0) return after.slice(start, i)
    }
  }
  return null
}

const STOPWORDS = new Set([
  'about', 'after', 'again', 'against', 'their', 'there', 'these', 'those',
  'which', 'while', 'where', 'because', 'before', 'between', 'during',
  'should', 'would', 'could', 'might', 'really', 'still', 'every', 'other',
  'something', 'someone', 'sometimes', 'training', 'cycling',
])

function formatIssue(i: Issue): string {
  const mark = i.sev === 'error' ? '✗' : i.sev === 'warn' ? '⚠' : 'ℹ'
  return `  ${mark} ${i.sev.toUpperCase().padEnd(5)} ${i.message}`
}

interface AuditReport {
  slug: string
  filePath: string
  issues: Issue[]
}

function main() {
  const args = process.argv.slice(2)
  if (args[0] === '-h' || args[0] === '--help') {
    console.log(`
Audit one or all SmarterTraining blog posts.

Usage:
  pnpm blog:audit          # audit every post
  pnpm blog:audit <slug>   # audit a single post
  pnpm blog:audit --json   # machine-readable output

Exit code is non-zero if any post has an ERROR-level issue.
`)
    process.exit(0)
  }
  const json = args.includes('--json')
  const target = args.find((a) => !a.startsWith('-'))

  const inventory = readPostInventory()
  const slugSet = new Set(inventory.map((p) => p.slug))

  // Detect duplicate slugs across the registry.
  const slugCounts = new Map<string, number>()
  for (const p of inventory)
    slugCounts.set(p.slug, (slugCounts.get(p.slug) ?? 0) + 1)
  const duplicateSlugs = Array.from(slugCounts.entries())
    .filter(([, n]) => n > 1)
    .map(([slug]) => slug)

  let targets = inventory
  if (target) {
    targets = inventory.filter((p) => p.slug === target)
    if (targets.length === 0) {
      console.error(`No post with slug "${target}".`)
      if (inventory.length > 0) {
        console.error('Existing slugs:')
        for (const p of inventory) console.error(`  - ${p.slug}`)
      }
      process.exit(1)
    }
  }

  const reports: AuditReport[] = targets.map((p) => ({
    slug: p.slug,
    filePath: p.parsed.filePath,
    issues: auditPost(p, slugSet),
  }))
  for (const slug of duplicateSlugs) {
    const r = reports.find((x) => x.slug === slug)
    if (r)
      r.issues.unshift({
        sev: 'error',
        message: `Duplicate slug — "${slug}" appears in more than one file.`,
      })
  }

  if (json) {
    console.log(JSON.stringify({ reports, duplicateSlugs }, null, 2))
  } else {
    for (const r of reports) {
      const errors = r.issues.filter((i) => i.sev === 'error').length
      const warns = r.issues.filter((i) => i.sev === 'warn').length
      const infos = r.issues.filter((i) => i.sev === 'info').length
      console.log(`\n${r.slug}`)
      console.log(`  ${r.filePath.replace(process.cwd() + '/', '')}`)
      if (r.issues.length === 0) {
        console.log('  ✓ All checks passed.')
        continue
      }
      const order = { error: 0, warn: 1, info: 2 } as const
      const sorted = [...r.issues].sort((a, b) => order[a.sev] - order[b.sev])
      for (const i of sorted) console.log(formatIssue(i))
      console.log(
        `  -- ${errors} error(s), ${warns} warning(s), ${infos} info`
      )
    }
  }

  const totalErrors = reports.reduce(
    (a, r) => a + r.issues.filter((i) => i.sev === 'error').length,
    0
  )
  const totalWarns = reports.reduce(
    (a, r) => a + r.issues.filter((i) => i.sev === 'warn').length,
    0
  )
  if (!json) {
    console.log(
      `\nAudited ${reports.length} post(s): ${totalErrors} error(s), ${totalWarns} warning(s).`
    )
  }
  process.exit(totalErrors > 0 ? 1 : 0)
}

main()

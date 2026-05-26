import * as fs from 'node:fs'
import * as path from 'node:path'
import { parsePostFile, type ParsedPost } from './parse-post'

export const POSTS_DIR = path.resolve(process.cwd(), 'content/blog/posts')

export interface FAQRecord {
  question: string
  answer: string
}

export interface InternalLinkRecord {
  label: string
  href: string
  description?: string
}

export interface TocItemRecord {
  id: string
  title: string
  level: number
}

export interface PostRecord {
  filePath: string
  fileName: string
  slug: string
  title: string
  description?: string
  excerpt?: string
  category?: string
  tags: string[]
  publishedAt?: string
  updatedAt?: string
  featured?: boolean
  relatedPosts: string[]
  faqs: FAQRecord[]
  internalLinks: InternalLinkRecord[]
  toc: TocItemRecord[]
  parsed: ParsedPost
}

function asStringArr(v: unknown): string[] {
  return Array.isArray(v)
    ? v.filter((x): x is string => typeof x === 'string')
    : []
}

function asObjArr<T>(v: unknown, fields: (keyof T)[]): T[] {
  if (!Array.isArray(v)) return []
  const result: T[] = []
  for (const item of v) {
    if (item && typeof item === 'object') {
      const o = item as Record<string, unknown>
      const valid = fields.some((f) => typeof o[f as string] === 'string')
      if (valid) result.push(item as T)
    }
  }
  return result
}

export function readPostInventory(): PostRecord[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.tsx'))
    .map((f) => path.join(POSTS_DIR, f))

  const records: PostRecord[] = []
  for (const file of files) {
    const parsed = parsePostFile(file)
    if (!parsed) continue
    const m = parsed.meta
    if (typeof m.slug !== 'string') continue

    records.push({
      filePath: file,
      fileName: path.basename(file, '.tsx'),
      slug: m.slug,
      title: typeof m.title === 'string' ? m.title : '',
      description: typeof m.description === 'string' ? m.description : undefined,
      excerpt: typeof m.excerpt === 'string' ? m.excerpt : undefined,
      category: typeof m.category === 'string' ? m.category : undefined,
      tags: asStringArr(m.tags),
      publishedAt:
        typeof m.publishedAt === 'string' ? m.publishedAt : undefined,
      updatedAt: typeof m.updatedAt === 'string' ? m.updatedAt : undefined,
      featured: typeof m.featured === 'boolean' ? m.featured : undefined,
      relatedPosts: asStringArr(m.relatedPosts),
      faqs: asObjArr<FAQRecord>(m.faqs, ['question', 'answer']),
      internalLinks: asObjArr<InternalLinkRecord>(m.internalLinks, [
        'label',
        'href',
      ]),
      toc: asObjArr<TocItemRecord>(m.toc, ['id', 'title']),
      parsed,
    })
  }
  return records
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/['"`’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

export function fileNameToIdent(fileName: string): string {
  const camel = fileName.replace(/-([a-z0-9])/g, (_, c: string) =>
    c.toUpperCase()
  )
  return `${camel}Post`
}

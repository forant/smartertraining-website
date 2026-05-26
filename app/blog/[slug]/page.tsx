import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Footer } from '@/components/landing/footer'
import { ArticleLayout } from '@/components/blog/article-layout'
import { getAllPostSlugs, getPostBySlug } from '@/lib/blog/posts'
import { postMetadata } from '@/lib/blog/metadata'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return postMetadata(post)
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <>
      <ArticleLayout post={post} />
      <Footer />
    </>
  )
}

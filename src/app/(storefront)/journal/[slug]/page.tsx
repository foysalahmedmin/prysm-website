import { notFound } from 'next/navigation'
import { PageShell } from '@/components/layout/page-shell'
import { services } from '@/services'

export async function generateStaticParams() {
  const posts = await services.content.listJournal()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps<'/journal/[slug]'>) {
  const { slug } = await params
  const post = await services.content.getJournalPost(slug)
  return post ? { title: post.title, description: post.excerpt } : {}
}

export default async function JournalPostPage({ params }: PageProps<'/journal/[slug]'>) {
  const { slug } = await params
  const post = await services.content.getJournalPost(slug)
  if (!post) notFound()
  return <PageShell id="journal-post" title={post.title} description={post.excerpt} />
}

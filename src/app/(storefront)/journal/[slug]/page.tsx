import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { JournalPostView } from '@/components/editorial/journal-post-view'
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

export default function JournalPostPage(props: PageProps<'/journal/[slug]'>) {
  return (
    <Suspense fallback={<div className="min-h-[60vh] animate-pulse" aria-busy="true" />}>
      <JournalPostContent {...props} />
    </Suspense>
  )
}

async function JournalPostContent({ params }: PageProps<'/journal/[slug]'>) {
  const { slug } = await params
  const [post, allPosts] = await Promise.all([
    services.content.getJournalPost(slug),
    services.content.listJournal(),
  ])

  if (!post) notFound()

  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 2)

  return <JournalPostView post={post} relatedPosts={related} />
}

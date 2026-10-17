import { describe, expect, it } from 'vitest'
import { PAGE_IDS, SiteContentSchema } from '@/domain'
import { createStaticContentService } from './content'

const content = createStaticContentService()

describe('static content service', () => {
  it('has content for every page id', async () => {
    for (const id of PAGE_IDS) {
      const page = await content.getPage(id)
      expect(page.title.length).toBeGreaterThan(0)
    }
  })

  it('serves valid site content', async () => {
    expect(SiteContentSchema.parse(await content.getSite()).nav.length).toBeGreaterThan(0)
  })

  it('serves valid home content and lookbook content', async () => {
    const home = await content.getHome()
    expect(home.hero.headline.length).toBeGreaterThan(0)
    expect(home.categories.length).toBeGreaterThan(0)

    const lookbook = await content.getLookbook()
    expect(lookbook.looks.length).toBeGreaterThan(0)
  })

  it('finds a journal post by slug or returns null', async () => {
    const posts = await content.listJournal()
    expect(posts.length).toBeGreaterThan(0)
    const post = await content.getJournalPost(posts[0]!.slug)
    expect(post?.readingMinutes).toBeGreaterThan(0)
    expect(await content.getJournalPost('nope')).toBeNull()
  })
})

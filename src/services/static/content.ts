import { faq } from '@/content/faq'
import { home } from '@/content/home'
import { journal } from '@/content/journal'
import { lookbook } from '@/content/lookbook'
import { pages } from '@/content/pages'
import { site } from '@/content/site'
import { stores } from '@/content/stores'
import type { ContentService } from '../types'

export function createStaticContentService(): ContentService {
  return {
    async getSite() {
      return site
    },
    async getPage(id) {
      return pages[id]
    },
    async listFaq() {
      return faq
    },
    async listJournal() {
      return journal
    },
    async getJournalPost(slug) {
      return journal.find((post) => post.slug === slug) ?? null
    },
    async listStores() {
      return stores
    },
    async getHome() {
      return home
    },
    async getLookbook() {
      return lookbook
    },
  }
}

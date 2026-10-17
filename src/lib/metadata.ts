import type { Metadata } from 'next'
import { brand } from '@/config/brand'
import type { PageId } from '@/domain'
import { services } from '@/services'

export async function pageMetadata(id: PageId): Promise<Metadata> {
  const page = await services.content.getPage(id)
  return {
    title: id === 'home' ? { absolute: `${brand.name} — ${brand.tagline}` } : page.title,
    description: page.description,
  }
}

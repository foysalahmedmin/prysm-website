import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from '@/components/icons'
import { pageMetadata } from '@/lib/metadata'
import { Reveal } from '@/lib/motion'
import { services } from '@/services'

export const generateMetadata = () => pageMetadata('collections')

export default async function CollectionsPage() {
  const collections = await services.catalog.listCollections()
  const collectionsWithCovers = await Promise.all(
    collections.map(async (coll) => {
      const list = await services.catalog.listProducts({ collection: coll.slug, pageSize: 1 })
      const cover = list.page.items[0]?.media[0]
      return { ...coll, cover }
    }),
  )

  return (
    <div className="page-container pt-10 pb-20 md:pt-14">
      <header className="max-w-2xl pb-10 md:pb-14">
        <h1 className="font-display text-4xl font-medium tracking-tight text-ink md:text-5xl">
          Collections
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft md:text-lg">
          Capsules built around one idea each: refraction, liquid silk and spectral lightwear.
        </p>
      </header>

      <ul className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {collectionsWithCovers.map((coll, idx) => (
          <Reveal as="li" key={coll.slug} delay={(idx % 3) * 70}>
            <Link href={`/collections/${coll.slug}`} className="group block">
              <div className="relative aspect-4/5 overflow-hidden bg-surface">
                {coll.cover ? (
                  <Image
                    src={coll.cover.src}
                    alt={coll.cover.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                ) : null}
              </div>
              <div className="flex items-start justify-between gap-4 pt-4">
                <div>
                  <h2 className="font-display text-xl font-medium tracking-tight text-ink">
                    {coll.name}
                  </h2>
                  <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{coll.description}</p>
                </div>
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="mt-1.5 shrink-0 text-ink transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>
    </div>
  )
}

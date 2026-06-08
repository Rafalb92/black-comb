import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { Media } from '@/payload-types'
import { RealizationDetail } from '@/components/sections/RealizationDetail'

export const revalidate = 3600

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const realizations = await payload.find({
    collection: 'realizations',
    where: { isActive: { equals: true } },
    limit: 100,
    depth: 0,
  })

  return realizations.docs.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'realizations',
    where: {
      and: [{ slug: { equals: slug } }, { isActive: { equals: true } }],
    },
    limit: 1,
    depth: 1,
  })

  const realization = result.docs[0]
  if (!realization) return {}

  const cover =
    typeof realization.coverImage === 'object' ? (realization.coverImage as Media) : null
  const ogImage =
    typeof realization.ogImage === 'object' && realization.ogImage !== null
      ? (realization.ogImage as Media)
      : cover

  return {
    title: realization.metaTitle || realization.title,
    description: realization.metaDescription || realization.shortDescription,
    openGraph: {
      title: realization.metaTitle || realization.title,
      description: realization.metaDescription || realization.shortDescription,
      images: ogImage?.url ? [{ url: ogImage.url }] : undefined,
    },
  }
}

export default async function RealizationPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'realizations',
    where: {
      and: [{ slug: { equals: slug } }, { isActive: { equals: true } }],
    },
    limit: 1,
    depth: 2,
  })

  const realization = result.docs[0]
  if (!realization) notFound()

  // Prev / next nawigacja
  const allActive = await payload.find({
    collection: 'realizations',
    where: { isActive: { equals: true } },
    sort: '-publishedAt',
    limit: 100,
    depth: 0,
  })

  const currentIndex = allActive.docs.findIndex((r) => r.slug === slug)
  const prev = currentIndex > 0 ? allActive.docs[currentIndex - 1] : null
  const next = currentIndex < allActive.docs.length - 1 ? allActive.docs[currentIndex + 1] : null

  return <RealizationDetail realization={realization} prev={prev} next={next} />
}

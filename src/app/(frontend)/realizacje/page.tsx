import { getPayload } from 'payload'
import config from '@payload-config'
import type { Metadata } from 'next'
import { getRealizationsList, getCategoryCounts } from '@/lib/realizations'
import { RealizationsList } from '@/components/sections/RealizationsList'
import { RealizationsHeader } from '@/components/sections/RealizationsHeader'

export const metadata: Metadata = {
  title: 'Realizacje — Black Comb',
  description:
    'Galeria realizacji barberskich Black Comb. Strzyżenie męskie, modelowanie brody, stylizacja.',
}

export const revalidate = 3600

type Props = {
  searchParams: Promise<{
    kategoria?: string
  }>
}

export default async function RealizationsListPage({ searchParams }: Props) {
  const params = await searchParams
  const category = params.kategoria

  const payload = await getPayload({ config })

  const [list, counts, homepage] = await Promise.all([
    getRealizationsList({ page: 1, category }),
    getCategoryCounts(),
    payload.findGlobal({ slug: 'homepage', depth: 0 }),
  ])

  return (
    <>
      <RealizationsHeader
        title="Realizacje"
        description={homepage?.realizationsSection?.description}
      />
      <RealizationsList key={category ?? 'all'} initialList={list} counts={counts} activeCategory={category} />
    </>
  )
}

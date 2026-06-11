import { getPayload } from 'payload'
import config from '@payload-config'
import type { Realization } from '@/payload-types'
import type { Where } from 'payload'

const ITEMS_PER_PAGE = 3

export type RealizationsListParams = {
  page?: number
  category?: string
}

export type RealizationsListResult = {
  docs: Realization[]
  totalDocs: number
  totalPages: number
  currentPage: number
  hasPrevPage: boolean
  hasNextPage: boolean
}

export async function getRealizationsList(
  params: RealizationsListParams,
): Promise<RealizationsListResult> {
  const payload = await getPayload({ config })
  const page = Math.max(1, params.page ?? 1)
  const category = params.category

  const conditions: Where[] = [{ isActive: { equals: true } }]
  if (category) {
    conditions.push({ category: { equals: category } })
  }

  const result = await payload.find({
    collection: 'realizations',
    where: { and: conditions },
    sort: '-publishedAt',
    page,
    limit: ITEMS_PER_PAGE,
    depth: 1,
  })

  return {
    docs: result.docs,
    totalDocs: result.totalDocs,
    totalPages: result.totalPages,
    currentPage: result.page ?? 1,
    hasPrevPage: result.hasPrevPage ?? false,
    hasNextPage: result.hasNextPage ?? false,
  }
}

export async function getCategoryCounts(): Promise<Record<string, number>> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'realizations',
    where: { isActive: { equals: true } },
    limit: 1000,
    depth: 0,
    select: { category: true },
  })

  const counts: Record<string, number> = {}
  for (const doc of result.docs) {
    counts[doc.category] = (counts[doc.category] ?? 0) + 1
  }
  return counts
}

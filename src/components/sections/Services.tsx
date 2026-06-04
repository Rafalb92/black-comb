'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Homepage, Service, Media } from '@/payload-types'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { Button } from '@/components/ui/button'
type Props = {
  sectionData: NonNullable<Homepage['servicesSection']>
  services: Service[]
}

function resolveImg(image: Service['image']): Media | null {
  return typeof image === 'object' && image !== null ? (image as Media) : null
}

export function Services({ sectionData, services }: Props) {
  const active = services.filter((s) => s.isActive !== false)
  const { eyebrow, title, description } = sectionData

  const [openId, setOpenId] = useState<string | number | null>(active[0]?.id ?? null)

  if (active.length === 0) return null

  const activeService = active.find((s) => s.id === openId) ?? null
  const activeImg = resolveImg(activeService?.image ?? null)

  const [activeId, setActiveId] = useState(active[0] ? String(active[0].id) : '')

  return (
    <section
      id="uslugi"
      className="scroll-mt-20 border-t border-zinc-200 bg-zinc-50 px-8 py-16 lg:py-24 lg:px-16 xl:px-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <div className="mb-8 h-px w-10 bg-zinc-300" />
          {eyebrow && (
            <span className="mb-4 block text-[0.72rem] font-semibold tracking-[0.15em] uppercase text-zinc-500">
              {eyebrow}
            </span>
          )}
          <h2 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-[#131315] sm:text-5xl">
            {title}
          </h2>
          {description && (
            <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-500 sm:text-lg">
              {description}
            </p>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">
          {/* Accordion list */}
          <Accordion
            type="single"
            collapsible
            defaultValue={activeId}
            value={activeId}
            onValueChange={(value) => setActiveId(value)}
            className="flex-1 border-none border-zinc-200"
          >
            {active.map((service) => {
              const img = resolveImg(service.image)

              return (
                <AccordionItem
                  key={service.id}
                  value={String(service.id)}
                  className="border-b border-t border-zinc-200"
                >
                  <AccordionTrigger className="py-6 hover:no-underline">
                    <div className="min-w-0 flex-1 text-left">
                      {service.isPopular && (
                        <span className="mb-2 inline-block rounded-full border border-zinc-400 px-2.5 py-0.5 text-[0.65rem] font-semibold tracking-[0.12em] uppercase text-zinc-500">
                          Polecane
                        </span>
                      )}

                      <div className="flex items-center justify-between gap-4">
                        <p className="text-xl lg:text-2xl font-bold tracking-tight text-[#131315] gap-3 flex items-center">
                          <span className="text-lg  text-muted-foreground/50">
                            [{service.order}]
                          </span>
                          {service.title}
                        </p>

                        <p className="mt-1 text-md text-zinc-500">
                          {service.priceLabel}
                          <span className="mx-2 text-zinc-400">|</span>
                          {activeId && <span className="mx-2 ">{service.durationLabel}</span>}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent>
                    {img?.url && (
                      <div className="-mx-8 mb-6 lg:hidden">
                        <div className="relative aspect-4/3 w-full overflow-hidden">
                          <Image
                            src={img.url}
                            alt={img.alt || service.title}
                            fill
                            sizes="100vw"
                            className="object-cover"
                            style={{
                              objectPosition:
                                img.focalX != null && img.focalY != null
                                  ? `${img.focalX}% ${img.focalY}%`
                                  : 'center',
                            }}
                          />
                        </div>
                      </div>
                    )}
                    {activeService && (
                      <p className=" text-sm leading-relaxed text-zinc-500">
                        {activeService.shortDescription}
                      </p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>

          {/* Desktop sticky image panel */}
          <div className="hidden lg:block lg:w-[38%] xl:w-[36%] ">
            <div className="sticky top-28">
              <div className="relative aspect-3/4 overflow-hidden rounded-3xl shadow-md">
                {activeImg?.url ? (
                  <Image
                    key={activeImg.url}
                    src={activeImg.url}
                    alt={activeImg.alt || activeService?.title || ''}
                    fill
                    loading="eager"
                    className="object-cover transition-opacity duration-500 "
                    style={{
                      objectPosition:
                        activeImg.focalX != null && activeImg.focalY != null
                          ? `${activeImg.focalX}% ${activeImg.focalY}%`
                          : 'top',
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-100">
                    <span className="text-xs uppercase tracking-widest text-zinc-400">
                      Brak zdjęcia
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Location01Icon,
  Call02Icon,
  Mail01Icon,
  Clock01Icon,
  Share01Icon,
} from '@hugeicons/core-free-icons'
import type { Homepage, SiteSetting } from '@/payload-types'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

const Map = dynamic(() => import('@/components/map').then((mod) => mod.Map), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse rounded-lg bg-zinc-100" />,
})

const schema = z.object({
  name: z.string().min(2, 'Imię i nazwisko musi mieć co najmniej 2 znaki'),
  email: z.string().email('Podaj poprawny adres e-mail'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Wiadomość musi mieć co najmniej 10 znaków'),
})

type FormValues = z.infer<typeof schema>

type Props = {
  sectionData: NonNullable<Homepage['contactSection']>
  settings: SiteSetting
}

export function Contact({ sectionData, settings }: Props) {
  const { eyebrow, title, description, formCtaLabel, mapZoom } = sectionData
  const { address, coordinates, phone, email, openingHours, social } = settings

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', phone: '', message: '' },
  })

  const { isSubmitting } = form.formState

  async function onSubmit(_values: FormValues) {
    await new Promise((resolve) => setTimeout(resolve, 1400))
    form.reset()
    toast.success('Wiadomość wysłana!', {
      description: 'Odezwiemy się w ciągu 24 godzin.',
    })
  }

  if (!address || !coordinates || !phone || !email) return null

  const mapLabel = `${address.street}, ${address.postalCode} ${address.city}`

  return (
    <section id="kontakt" className="scroll-mt-20 bg-white px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          {eyebrow && (
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
              {eyebrow}
            </span>
          )}
          <h2 className="mt-3 text-3xl font-extrabold text-[#131315] sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          {description && <p className="mt-4 text-zinc-500">{description}</p>}
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Formularz */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        Imię i nazwisko
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Jan Kowalski"
                          className="h-11 rounded-md border-zinc-200 bg-zinc-50 px-4 text-sm text-[#131315] placeholder:text-zinc-400 focus-visible:border-[#131315] focus-visible:ring-1 focus-visible:ring-[#131315]/20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        E-mail
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="jan@example.com"
                          className="h-11 rounded-md border-zinc-200 bg-zinc-50 px-4 text-sm text-[#131315] placeholder:text-zinc-400 focus-visible:border-[#131315] focus-visible:ring-1 focus-visible:ring-[#131315]/20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Telefon{' '}
                      <span className="normal-case font-normal tracking-normal text-zinc-300">
                        (opcjonalnie)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+48 123 456 789"
                        className="h-11 rounded-md border-zinc-200 bg-zinc-50 px-4 text-sm text-[#131315] placeholder:text-zinc-400 focus-visible:border-[#131315] focus-visible:ring-1 focus-visible:ring-[#131315]/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Wiadomość
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="W czym możemy Ci pomóc?"
                        className="min-h-32 rounded-md border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-[#131315] placeholder:text-zinc-400 focus-visible:border-[#131315] focus-visible:ring-1 focus-visible:ring-[#131315]/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-12 w-full rounded-full bg-[#131315] text-xs font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-zinc-700 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="size-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Wysyłanie…
                  </span>
                ) : (
                  formCtaLabel
                )}
              </Button>
            </form>
          </Form>

          {/* Mapa + dane kontaktowe */}
          <div className="space-y-6">
            <div className="h-72 w-full overflow-hidden rounded-lg lg:h-80">
              <Map
                lat={coordinates.lat}
                lng={coordinates.lng}
                zoom={mapZoom ?? 15}
                label={mapLabel}
              />
            </div>

            <div className="divide-y divide-zinc-100 border-t border-zinc-100">
              {/* Telefon + Email */}
              <div className="grid grid-cols-2 gap-6 py-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-50">
                    <HugeiconsIcon
                      icon={Call02Icon}
                      size={16}
                      strokeWidth={1.5}
                      className="text-zinc-500"
                    />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                      Telefon
                    </p>
                    <Link
                      href={`tel:${phone}`}
                      className="mt-1 block text-sm font-medium text-[#131315] hover:underline"
                    >
                      {phone}
                    </Link>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-50">
                    <HugeiconsIcon
                      icon={Mail01Icon}
                      size={16}
                      strokeWidth={1.5}
                      className="text-zinc-500"
                    />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                      E-mail
                    </p>
                    <Link
                      href={`mailto:${email}`}
                      className="mt-1 block text-sm font-medium text-[#131315] hover:underline break-all"
                    >
                      {email}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Adres */}
              <div className="flex items-start gap-4 py-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-50">
                  <HugeiconsIcon
                    icon={Location01Icon}
                    size={16}
                    strokeWidth={1.5}
                    className="text-zinc-500"
                  />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                    Adres
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#131315]">{address.street}</p>
                  <p className="text-sm text-zinc-500">
                    {address.postalCode} {address.city}
                  </p>
                </div>
              </div>

              {/* Godziny otwarcia */}
              {openingHours && openingHours.length > 0 && (
                <div className="flex items-start gap-4 py-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-50">
                    <HugeiconsIcon
                      icon={Clock01Icon}
                      size={16}
                      strokeWidth={1.5}
                      className="text-zinc-500"
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                      Godziny otwarcia
                    </p>
                    <div className="mt-1 space-y-0.5">
                      {openingHours.map((row, i) => (
                        <div
                          key={row.id ?? i}
                          className="flex justify-between items-center text-sm"
                        >
                          <span className="font-medium text-[#131315] w-2/3">{row.days}</span>
                          <span className="tabular-nums text-zinc-500 mr-auto">{row.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Social media */}
              {social && social.length > 0 && (
                <div className="flex items-start gap-4 py-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-50">
                    <HugeiconsIcon
                      icon={Share01Icon}
                      size={16}
                      strokeWidth={1.5}
                      className="text-zinc-500"
                    />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                      Social media
                    </p>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                      {social.map((link) => (
                        <Link
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium capitalize text-[#131315] hover:underline"
                        >
                          {link.platform}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

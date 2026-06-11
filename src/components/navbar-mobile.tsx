'use client'

import * as React from 'react'
import Link from 'next/link'
import { HugeiconsIcon } from '@hugeicons/react'
import { Menu01Icon, Cancel01Icon } from '@hugeicons/core-free-icons'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from '@/components/ui/sheet'

type NavLink = {
  label: string
  anchor: string
  id?: string | null
}

type Props = {
  brandText: string
  links: NavLink[]
  isHomepage: boolean
}

export function NavbarMobile({ brandText, links, isHomepage }: Props) {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          aria-label="Otwórz menu"
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-md text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
        >
          <HugeiconsIcon icon={Menu01Icon} size={22} strokeWidth={1.8} />
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full sm:max-w-xs border-l border-zinc-950/[0.07] bg-white px-0 py-0"
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-5">
            <SheetTitle className="text-sm font-extrabold tracking-[0.2em] uppercase text-[#131315]">
              {brandText}
            </SheetTitle>
            <SheetClose asChild>
              <button
                aria-label="Zamknij menu"
                className="flex items-center justify-center w-8 h-8 rounded-md text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={18} strokeWidth={1.8} />
              </button>
            </SheetClose>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-1 px-4 py-6 flex-1">
            {links.map((link) => (
              <SheetClose asChild key={link.id ?? link.anchor}>
                <Link
                  href={isHomepage ? `#${link.anchor}` : `/#${link.anchor}`}
                  className="flex items-center gap-2 px-3 py-3.5 text-sm font-semibold tracking-[0.15em] uppercase text-zinc-400 rounded-md hover:text-[#131315] hover:bg-zinc-50 transition-colors"
                >
                  <span className="text-zinc-300">[</span>
                  {link.label}
                  <span className="text-zinc-300">]</span>
                </Link>
              </SheetClose>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}

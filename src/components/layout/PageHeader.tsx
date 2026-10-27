import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { accent, cn } from '../../lib/cn'
import { IconTile } from '../ui/Misc'

interface PageHeaderProps {
  eyebrow?: ReactNode
  title: string
  aliases?: string[]
  summary?: ReactNode
  color: string
  icon?: LucideIcon
  /** Registry icon name, used when `icon` is not given. */
  iconName?: string
  meta?: ReactNode
  actions?: ReactNode
  className?: string
}

/** The hero at the top of every page: an accent glow, icon tile, title, summary, and tag row. */
export function PageHeader({ eyebrow, title, aliases, summary, color, icon, iconName, meta, actions, className }: PageHeaderProps) {
  return (
    <header
      style={accent(color)}
      className={cn('relative isolate pt-8 pb-8 sm:pt-12', className)}
    >
      <div className="accent-glow pointer-events-none absolute -top-24 -left-[30vw] -z-10 h-[26rem] w-[160vw] opacity-90 lg:-left-24 lg:w-[120%]" aria-hidden />
      <div className="flex items-start gap-4 sm:gap-5">
        {(icon || iconName) && <IconTile icon={icon} name={iconName} color={color} size="xl" solid className="hidden sm:flex" />}
        <div className="min-w-0 flex-1">
          {eyebrow && <div className="eyebrow flex flex-wrap items-center gap-x-2 gap-y-1 text-accent-ink">{eyebrow}</div>}
          <h1 className="mt-2 font-display text-h2 font-semibold tracking-tight text-balance text-fg sm:text-h1">{title}</h1>
          {aliases && aliases.length > 0 && <p className="mt-2 text-sm text-muted">Also called {aliases.join(', ')}</p>}
        </div>
        {actions && <div className="flex shrink-0 items-center gap-1.5">{actions}</div>}
      </div>
      {summary && <div className="mt-5 max-w-[65ch] text-lg leading-relaxed text-pretty text-fg/80">{summary}</div>}
      {meta && <div className="mt-5 flex flex-wrap items-center gap-2">{meta}</div>}
    </header>
  )
}

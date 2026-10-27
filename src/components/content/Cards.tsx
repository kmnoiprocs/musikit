import { ArrowUpRight, CircleDashed } from 'lucide-react'
import { m } from 'motion/react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { accent, cn } from '../../lib/cn'
import { IconTile } from '../ui/Misc'

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.2, 0.8, 0.2, 1] as const } },
}

/** A grid whose children fade and rise in sequence (about 30 ms apart). Wrap each child in StaggerItem. */
export function StaggerGrid({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.div className={className} initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.03 } } }}>
      {children}
    </m.div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.div variants={item} className={className}>
      {children}
    </m.div>
  )
}

interface EntryCardProps {
  href: string
  title: string
  eyebrow?: string
  summary?: string
  color: string
  /** Registry icon name. */
  icon: string
  footer?: ReactNode
  className?: string
}

/** The card used in every encyclopedia grid (genres, instruments, effects, plugins). */
export function EntryCard({ href, title, eyebrow, summary, color, icon, footer, className }: EntryCardProps) {
  return (
    <Link
      to={href}
      style={accent(color)}
      className={cn(
        'group card relative flex h-full flex-col overflow-hidden p-5 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[0_18px_40px_-24px_var(--accent)]',
        className,
      )}
    >
      <div className="pointer-events-none absolute -top-12 -right-12 size-36 rounded-full bg-accent/25 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
      <div className="relative flex items-start justify-between">
        <IconTile name={icon} color={color} />
        <ArrowUpRight className="size-4 text-faint transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-ink" aria-hidden />
      </div>
      {eyebrow && <div className="eyebrow relative mt-4 truncate text-accent-ink">{eyebrow}</div>}
      <h3 className={cn('relative font-display text-lg font-semibold tracking-tight text-fg', !eyebrow && 'mt-4')}>{title}</h3>
      {summary && <p className="relative mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">{summary}</p>}
      {footer && <div className="relative mt-auto flex flex-wrap gap-1.5 pt-4">{footer}</div>}
    </Link>
  )
}

interface GroupTileProps {
  href: string
  title: string
  number?: string
  color: string
  icon?: string
  count: number
  noun: [string, string]
  planned?: number
  className?: string
}

/** A category or family tile (effect categories, instrument and genre families). */
export function GroupTile({ href, title, number, color, icon, count, noun, planned, className }: GroupTileProps) {
  return (
    <Link
      to={href}
      style={accent(color)}
      className={cn(
        'group relative flex h-full min-h-32 flex-col overflow-hidden rounded-2xl border border-line bg-[linear-gradient(145deg,color-mix(in_oklab,var(--accent)_16%,var(--mk-surface)),var(--mk-surface)_62%)] p-4 shadow-[var(--mk-card-shadow)] transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-accent/55',
        className,
      )}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-accent opacity-80" aria-hidden />
      <div className="flex items-start justify-between gap-3">
        {icon ? <IconTile name={icon} color={color} size="sm" className="size-8 rounded-lg" /> : <span className="mt-1 size-3 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />}
        {number && <span className="font-mono text-[11px] text-muted">{number}</span>}
      </div>
      <h3 className="mt-3 font-display text-[15px] leading-snug font-semibold text-fg">{title}</h3>
      <div className="mt-auto flex items-center gap-2 pt-3 text-xs">
        {count > 0 ? (
          <span className="font-semibold text-accent-ink">{count === 1 ? `1 ${noun[0]}` : `${count} ${noun[1]}`}</span>
        ) : (
          <span className="flex items-center gap-1 text-muted">
            <CircleDashed className="size-3" aria-hidden /> Coming soon
          </span>
        )}
        {planned !== undefined && planned > 0 && <span className="text-faint">· {planned} planned topics</span>}
      </div>
    </Link>
  )
}

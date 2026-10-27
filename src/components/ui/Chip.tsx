import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import type { PriceTier, Role, SkillLevel, Status } from '../../content/schema'
import { PRICE_TIERS, ROLES, SKILL_LEVELS, STATUS_COLORS } from '../../design/tokens'
import { accent, cn } from '../../lib/cn'

interface ChipProps {
  children: ReactNode
  /** Tints the chip with this color; neutral when omitted. */
  color?: string
  icon?: LucideIcon
  /** Shows a small colored dot before the label. */
  dot?: boolean
  href?: string
  size?: 'xs' | 'sm'
  className?: string
  title?: string
}

export function Chip({ children, color, icon: IconC, dot, href, size = 'sm', className, title }: ChipProps) {
  const classes = cn(
    'inline-flex max-w-full items-center gap-1.5 rounded-full border font-medium whitespace-nowrap transition-colors',
    size === 'xs' ? 'h-5 px-2 text-[11px]' : 'h-7 px-2.5 text-xs',
    color ? 'border-accent/25 bg-accent/10 text-accent-ink' : 'border-line bg-surface text-muted',
    href && (color ? 'hover:border-accent/50 hover:bg-accent/18' : 'hover:border-faint hover:text-fg'),
    className,
  )
  const content = (
    <>
      {dot && <span className="size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />}
      {IconC && <IconC className={size === 'xs' ? 'size-3' : 'size-3.5'} aria-hidden />}
      <span className="truncate">{children}</span>
    </>
  )
  const style = color ? accent(color) : undefined
  return href ? (
    <Link to={href} className={classes} style={style} title={title}>
      {content}
    </Link>
  ) : (
    <span className={classes} style={style} title={title}>
      {content}
    </span>
  )
}

export function SkillTag({ level, size }: { level: SkillLevel; size?: 'xs' | 'sm' }) {
  const s = SKILL_LEVELS[level]
  return (
    <Chip color={s.color} dot size={size} title="Skill level">
      {s.label}
    </Chip>
  )
}

export function RoleChip({ role, size }: { role: Role; size?: 'xs' | 'sm' }) {
  const r = ROLES[role]
  return (
    <Chip icon={r.icon} size={size}>
      {r.label}
    </Chip>
  )
}

export function PriceTag({ tier, price, size = 'xs' }: { tier: PriceTier; price?: number; size?: 'xs' | 'sm' }) {
  const t = PRICE_TIERS[tier]
  return (
    <Chip color={t.color} size={size} title="Price tier">
      {t.label}
      {price ? ` · ~$${price}` : ''}
    </Chip>
  )
}

/** Entry status; shown in development builds only. */
export function StatusBadge({ status }: { status: Status }) {
  if (!import.meta.env.DEV) return null
  return (
    <Chip color={STATUS_COLORS[status]} size="xs" dot title="Entry status (development builds only)">
      {status}
    </Chip>
  )
}

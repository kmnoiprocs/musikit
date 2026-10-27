import { Hash, type LucideIcon } from 'lucide-react'
import { Tooltip as RadixTooltip } from 'radix-ui'
import type { CSSProperties, ReactNode } from 'react'
import { Icon } from '../../design/icons'
import { accent, cn } from '../../lib/cn'

export function Kbd({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <kbd className={cn('inline-flex h-5 min-w-5 items-center justify-center rounded-md border border-line bg-elevated px-1.5 font-mono text-[10.5px] font-medium text-muted', className)}>
      {children}
    </kbd>
  )
}

const IS_MAC = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.userAgent)

/** The search shortcut: ⌘ K on Apple devices, Ctrl K elsewhere. */
export function ShortcutKeys({ className }: { className?: string }) {
  return (
    <span className={cn('flex items-center gap-1', className)} aria-label={IS_MAC ? 'Command K' : 'Control K'}>
      <Kbd>{IS_MAC ? '⌘' : 'Ctrl'}</Kbd>
      <Kbd>K</Kbd>
    </span>
  )
}

/** A rounded, tinted square holding an icon. Pass a Lucide component or a registry icon name. */
export function IconTile({ icon, name, color, size = 'md', className, solid }: { icon?: LucideIcon; name?: string; color: string; size?: 'sm' | 'md' | 'lg' | 'xl'; className?: string; solid?: boolean }) {
  const IconC = icon
  const box = { sm: 'size-6 rounded-md', md: 'size-9 rounded-xl', lg: 'size-12 rounded-2xl', xl: 'size-16 rounded-[1.25rem]' }[size]
  const glyph = { sm: 'size-3.5', md: 'size-[18px]', lg: 'size-6', xl: 'size-8' }[size]
  return (
    <span
      style={accent(color)}
      className={cn(
        'flex shrink-0 items-center justify-center',
        solid
          ? 'bg-[linear-gradient(135deg,color-mix(in_oklab,var(--accent)_92%,white),color-mix(in_oklab,var(--accent)_70%,black))] text-white shadow-[0_8px_24px_-10px_var(--accent)]'
          : 'bg-accent/14 text-accent-ink ring-1 ring-accent/20 ring-inset',
        box,
        className,
      )}
    >
      {IconC ? <IconC className={glyph} aria-hidden /> : <Icon name={name ?? ''} className={glyph} />}
    </span>
  )
}

export function Tooltip({ content, children, side = 'top' }: { content: ReactNode; children: ReactNode; side?: 'top' | 'bottom' | 'left' | 'right' }) {
  return (
    <RadixTooltip.Root delayDuration={150}>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          side={side}
          sideOffset={6}
          collisionPadding={12}
          className="z-50 max-w-xs rounded-xl border border-line bg-elevated px-3 py-2 text-[13px] leading-snug text-fg shadow-xl data-[state=delayed-open]:animate-pop"
        >
          {content}
          <RadixTooltip.Arrow className="fill-elevated" />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  )
}

export function ProgressBar({ value, total, color, className }: { value: number; total: number; color: string; className?: string }) {
  const pct = total > 0 ? Math.max(value > 0 ? 3 : 0, Math.round((value / total) * 100)) : 0
  return (
    <div style={accent(color)} className={cn('h-1.5 overflow-hidden rounded-full bg-fg/[0.07]', className)} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={total}>
      <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
    </div>
  )
}

/** A heading for a page section, with a hover anchor link and an optional icon tile. */
export function SectionHeading({ id, title, icon, color, description, as: As = 'h2' }: { id?: string; title: string; icon?: LucideIcon; color?: string; description?: ReactNode; as?: 'h2' | 'h3' }) {
  return (
    <div className="mb-5" style={color ? accent(color) : undefined}>
      <As id={id} className={cn('group/h flex items-center gap-3 font-display font-semibold tracking-tight text-fg', As === 'h2' ? 'text-h3' : 'text-h4')}>
        {icon && <IconTile icon={icon} color={color ?? '#A1A1AA'} size="sm" className="size-7 rounded-lg" />}
        <span>{title}</span>
        {id && (
          <a href={`#${id}`} className="text-faint opacity-0 transition-opacity group-hover/h:opacity-100 focus-visible:opacity-100" aria-label={`Link to ${title}`}>
            <Hash className="size-4" />
          </a>
        )}
      </As>
      {description && <p className="mt-1.5 max-w-[68ch] text-[15px] text-muted">{description}</p>}
    </div>
  )
}

export function Eyebrow({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div className={cn('eyebrow text-accent-ink', className)} style={style}>
      {children}
    </div>
  )
}

export function EmptyState({ icon, title, children, color = '#A1A1AA' }: { icon: LucideIcon; title: string; children?: ReactNode; color?: string }) {
  return (
    <div className="card flex flex-col items-center px-6 py-12 text-center" style={accent(color)}>
      <IconTile icon={icon} color={color} size="lg" />
      <h3 className="mt-4 font-display text-h4 font-semibold">{title}</h3>
      {children && <div className="mt-2 max-w-md text-[15px] text-muted">{children}</div>}
    </div>
  )
}

import { ClipboardList } from 'lucide-react'
import { m } from 'motion/react'
import { CALLOUTS } from '../../design/tokens'
import { accent, cn } from '../../lib/cn'
import { RichText } from './RichText'

/** The page-opening summary. Every bullet should stand on its own for someone in a hurry. */
export function CheatSheetCard({ items, title = 'Cheat Sheet', className }: { items: string[]; title?: string; className?: string }) {
  const color = CALLOUTS.cheatsheet.color
  return (
    <section
      style={accent(color)}
      aria-label={title}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-accent/30 bg-[linear-gradient(135deg,color-mix(in_oklab,var(--accent)_11%,var(--mk-surface)),var(--mk-surface)_65%)] p-5 shadow-[var(--mk-card-shadow)] sm:p-6',
        className,
      )}
    >
      <div className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-accent/15 blur-3xl" aria-hidden />
      <div className="relative flex items-center gap-2.5">
        <span className="flex size-8 items-center justify-center rounded-xl bg-accent/20 text-accent-ink">
          <ClipboardList className="size-[18px]" aria-hidden />
        </span>
        <h2 className="font-display text-lg font-semibold tracking-tight text-fg">{title}</h2>
        <span className="ml-auto font-mono text-xs text-muted">{items.length} key points</span>
      </div>
      <ol className={cn('relative mt-4 grid gap-x-8 gap-y-2.5', items.length > 4 && 'md:grid-cols-2')}>
        {items.map((item, i) => (
          <m.li
            key={i}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03, duration: 0.2 }}
            className="flex gap-3 text-[15px] leading-relaxed text-fg/90"
          >
            <span className="mt-[3px] flex size-5 shrink-0 items-center justify-center rounded-md bg-accent/20 font-mono text-[11px] font-semibold text-accent-ink">
              {i + 1}
            </span>
            <RichText text={item} />
          </m.li>
        ))}
      </ol>
    </section>
  )
}

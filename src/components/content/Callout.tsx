import type { ReactNode } from 'react'
import type { CalloutType } from '../../content/schema'
import { CALLOUTS } from '../../design/tokens'
import { accent, cn } from '../../lib/cn'
import { RichText } from './RichText'

export function Callout({ variant, title, body, children, className }: { variant: CalloutType; title?: string; body?: string; children?: ReactNode; className?: string }) {
  const c = CALLOUTS[variant]
  return (
    <aside
      style={accent(c.color)}
      className={cn('relative overflow-hidden rounded-2xl border border-accent/25 bg-accent/[0.07] py-4 pr-5 pl-4', className)}
      aria-label={c.label}
    >
      <div className="absolute inset-y-0 left-0 w-1 bg-accent" aria-hidden />
      <div className="flex gap-3.5 pl-1.5">
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-accent/18 text-accent-ink">
          <c.icon className="size-[18px]" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <div className="eyebrow text-accent-ink">{c.label}</div>
          {title && <div className="mt-1 font-semibold text-fg">{title}</div>}
          <div className="mt-1 text-[15px] leading-relaxed text-fg/85">
            {body && <RichText text={body} />}
            {children}
          </div>
        </div>
      </div>
    </aside>
  )
}

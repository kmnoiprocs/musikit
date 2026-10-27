import { ArrowUpRight, BookOpenText, CalendarCheck } from 'lucide-react'
import { Link } from 'react-router'
import type { Source } from '../../content/schema'
import { Icon } from '../../design/icons'
import { accent, cn } from '../../lib/cn'
import type { ResolvedRef } from '../../lib/content'

/** Cross-reference cards: icon, title, and what kind of page it is. */
export function RefChips({ refs, className }: { refs: ResolvedRef[]; className?: string }) {
  if (refs.length === 0) return null
  return (
    <div className={cn('grid gap-2 sm:grid-cols-2', className)}>
      {refs.map((r) => (
        <Link
          key={r.ref}
          to={r.href}
          style={accent(r.color)}
          className="group flex items-center gap-3 rounded-xl border border-line bg-surface px-3 py-2.5 transition-all hover:-translate-y-px hover:border-accent/45 hover:bg-accent/[0.05]"
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent/14 text-accent-ink">
            <Icon name={r.icon} className="size-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-fg">{r.title}</span>
            <span className="block truncate text-xs text-muted">{r.kindLabel}</span>
          </span>
          <ArrowUpRight className="size-4 shrink-0 text-faint transition-colors group-hover:text-accent-ink" aria-hidden />
        </Link>
      ))}
    </div>
  )
}

export function Sources({ sources, lastVerified }: { sources: Source[]; lastVerified?: string }) {
  return (
    <div className="space-y-3">
      {sources.length > 0 ? (
        <ol className="space-y-2">
          {sources.map((s, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="mt-px font-mono text-xs text-faint">[{i + 1}]</span>
              <span className="min-w-0 text-fg/85">
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noreferrer" className="font-medium text-fg underline decoration-line underline-offset-2 hover:decoration-fg">
                    {s.title}
                  </a>
                ) : (
                  <span className="font-medium text-fg">{s.title}</span>
                )}
                {s.author && <span className="text-muted"> · {s.author}</span>}
                {s.note && <span className="block text-muted">{s.note}</span>}
              </span>
            </li>
          ))}
        </ol>
      ) : (
        <p className="flex items-center gap-2 text-sm text-muted">
          <BookOpenText className="size-4" aria-hidden /> Sources are added when this entry is written in full.
        </p>
      )}
      {lastVerified && (
        <p className="flex items-center gap-2 text-xs text-muted">
          <CalendarCheck className="size-3.5" aria-hidden />
          Facts last verified <time className="font-mono text-fg/80">{lastVerified}</time>
        </p>
      )}
    </div>
  )
}

import type { OutlineTopic } from '../../content/registry/outline.generated'
import { cn } from '../../lib/cn'
import { capitalize } from '../../lib/labels'

/** Renders "Label: text" with the label emphasized, as in outline sub-items. */
function LabeledText({ text }: { text: string }) {
  const m = /^([^:]{2,48}):\s(.+)$/.exec(text)
  if (!m) return <>{capitalize(text)}</>
  return (
    <>
      <span className="font-medium text-fg">{m[1]}:</span> {m[2]}
    </>
  )
}

/** The planned coverage of an outline section or Part, from docs/MASTER_OUTLINE.md. */
export function OutlineTopics({ topics, summary, className }: { topics: OutlineTopic[]; summary?: string; className?: string }) {
  const labeled = topics.filter((t) => t.label)
  const plain = topics.filter((t) => !t.label && t.text)
  return (
    <div className={cn('space-y-4', className)}>
      {summary && <p className="max-w-[72ch] text-base leading-relaxed text-fg/85">{capitalize(summary)}</p>}
      {plain.length > 0 && (
        <ul className="card space-y-2 p-5">
          {plain.map((t, i) => (
            <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-fg/80">
              <span className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              <span>{capitalize(t.text ?? '')}</span>
            </li>
          ))}
        </ul>
      )}
      {labeled.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {labeled.map((t, i) => (
            <div key={i} className="card p-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-accent-ink">
                <span className="size-1.5 rounded-full bg-accent" aria-hidden />
                {t.label}
              </h3>
              {t.text && <p className="mt-1.5 text-sm leading-relaxed text-fg/80">{capitalize(t.text)}</p>}
              {t.items.length > 0 && (
                <ul className="mt-2 space-y-1.5">
                  {t.items.map((it, j) => (
                    <li key={j} className="flex gap-2 text-sm leading-relaxed text-fg/75">
                      <span className="mt-[0.55em] h-px w-2.5 shrink-0 bg-accent/60" aria-hidden />
                      <span>
                        <LabeledText text={it} />
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

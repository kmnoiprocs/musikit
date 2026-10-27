import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { accent, cn } from '../../lib/cn'
import { glossaryById, resolveRef } from '../../lib/content'
import { Tooltip } from '../ui/Misc'

/** Bold, inline code, italics, and [[kind:id|label]] references. */
const INLINE = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]|\*\*(.+?)\*\*|`([^`]+)`|(?<![\w*])\*(?!\s)([^*]+?)\*(?![\w*])|(?<!\w)_(?!\s)([^_]+?)_(?!\w)/g

function parseInline(text: string, keyPrefix: string): ReactNode[] {
  const out: ReactNode[] = []
  let last = 0
  for (const m of text.matchAll(INLINE)) {
    const at = m.index
    if (at > last) out.push(text.slice(last, at))
    const key = `${keyPrefix}${at}`
    if (m[1]) out.push(<RefLink key={key} refId={m[1]} label={m[2]} />)
    else if (m[3]) out.push(<strong key={key} className="font-semibold text-fg">{parseInline(m[3], `${key}-`)}</strong>)
    else if (m[4]) out.push(<code key={key} className="rounded-md border border-line bg-elevated px-1.5 py-0.5 font-mono text-[0.86em] text-fg">{m[4]}</code>)
    else out.push(<em key={key}>{parseInline(m[5] ?? m[6], `${key}-`)}</em>)
    last = at + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

export function RichText({ text, className }: { text: string; className?: string }) {
  return <span className={className}>{parseInline(text, 'rt')}</span>
}

function RefLink({ refId, label }: { refId: string; label?: string }) {
  const target = resolveRef(refId)
  if (!target) {
    return (
      <span className="underline decoration-red-500 decoration-wavy" title={`Broken reference: ${refId}`}>
        {label ?? refId}
      </span>
    )
  }
  const text = label ?? target.title
  if (target.kind === 'glossary') {
    const term = glossaryById.get(target.id)
    return (
      <Tooltip
        content={
          <span style={accent(target.color)} className="block">
            <span className="eyebrow block text-accent-ink">Glossary</span>
            <span className="mt-0.5 block font-semibold">{term?.term}</span>
            <span className="mt-1 block text-muted">{term?.short}</span>
          </span>
        }
      >
        <Link
          to={target.href}
          style={accent(target.color)}
          className="cursor-help font-medium text-fg underline decoration-accent/70 decoration-dotted decoration-[1.5px] underline-offset-[3px] hover:decoration-solid"
        >
          {text}
        </Link>
      </Tooltip>
    )
  }
  return (
    <Link
      to={target.href}
      style={accent(target.color)}
      className={cn('font-medium text-accent-ink underline decoration-accent/40 decoration-[1.5px] underline-offset-[3px] transition-colors hover:decoration-accent')}
    >
      {text}
    </Link>
  )
}

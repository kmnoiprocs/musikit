import { SlidersHorizontal } from 'lucide-react'
import type { Setting } from '../../content/schema'
import { cn } from '../../lib/cn'
import { RichText } from './RichText'

/** Parameter/value rows. Values use the mono face so numbers like "4:1" and "10 ms" line up. */
export function SettingsTable({ rows, title, className }: { rows: Setting[]; title?: string; className?: string }) {
  return (
    <div className={cn('card overflow-hidden', className)}>
      {title && (
        <div className="flex items-center gap-2 border-b border-line bg-fg/[0.02] px-4 py-2.5">
          <SlidersHorizontal className="size-4 text-accent-ink" aria-hidden />
          <span className="text-sm font-semibold text-fg">{title}</span>
        </div>
      )}
      <dl className="divide-y divide-line">
        {rows.map((row, i) => (
          <div key={i} className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 gap-y-0.5 px-4 py-2.5 sm:grid-cols-[minmax(8rem,14rem)_auto_minmax(0,1fr)]">
            <dt className="text-sm font-medium text-fg">{row.param}</dt>
            <dd className="justify-self-end font-mono text-[13px] font-semibold whitespace-nowrap text-accent-ink sm:justify-self-start">{row.value}</dd>
            {row.note && (
              <dd className="col-span-2 text-[13px] text-muted sm:col-span-1">
                <RichText text={row.note} />
              </dd>
            )}
          </div>
        ))}
      </dl>
    </div>
  )
}

export function DataTable({ columns, rows, caption, className }: { columns: string[]; rows: string[][]; caption?: string; className?: string }) {
  return (
    <figure className={cn('card overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line bg-fg/[0.03]">
              {columns.map((c) => (
                <th key={c} scope="col" className="eyebrow px-4 py-3 font-semibold whitespace-nowrap text-muted">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((row, i) => (
              <tr key={i} className="transition-colors hover:bg-fg/[0.025]">
                {row.map((cell, j) => (
                  <td key={j} className={cn('px-4 py-3 align-top', j === 0 ? 'font-medium text-fg' : 'font-mono text-[13px] text-fg/85')}>
                    <RichText text={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && <figcaption className="border-t border-line px-4 py-2.5 text-[13px] text-muted">{caption}</figcaption>}
    </figure>
  )
}

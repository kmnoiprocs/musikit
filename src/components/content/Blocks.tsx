import { Puzzle, Quote } from 'lucide-react'
import type { ContentBlock } from '../../content/schema'
import { cn } from '../../lib/cn'
import { Expandable } from '../ui/Expandable'
import { Callout } from './Callout'
import { RichText } from './RichText'
import { DataTable, SettingsTable } from './Tables'

export function Paragraph({ text, className }: { text: string; className?: string }) {
  return (
    <p className={cn('max-w-[72ch] text-base leading-[1.75] text-fg/85', className)}>
      <RichText text={text} />
    </p>
  )
}

export function BulletList({ items, numbered, className }: { items: string[]; numbered?: boolean; className?: string }) {
  const List = numbered ? 'ol' : 'ul'
  return (
    <List className={cn('max-w-[72ch] space-y-2', className)}>
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-base leading-relaxed text-fg/85">
          {numbered ? (
            <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/14 font-mono text-xs font-semibold text-accent-ink">{i + 1}</span>
          ) : (
            <span className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
          )}
          <span className="min-w-0">
            <RichText text={item} />
          </span>
        </li>
      ))}
    </List>
  )
}

export function StepList({ items }: { items: { title: string; body?: string }[] }) {
  return (
    <ol className="relative max-w-[72ch]">
      {items.map((step, i) => (
        <li key={i} className="relative flex gap-4 pb-6 last:pb-0">
          {i < items.length - 1 && <span className="absolute top-8 bottom-0 left-[15px] w-px bg-gradient-to-b from-accent/50 to-line" aria-hidden />}
          <span className="relative flex size-8 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/12 font-mono text-[13px] font-semibold text-accent-ink">
            {i + 1}
          </span>
          <div className="min-w-0 pt-1">
            <div className="font-semibold text-fg">
              <RichText text={step.title} />
            </div>
            {step.body && (
              <p className="mt-1 text-[15px] leading-relaxed text-fg/80">
                <RichText text={step.body} />
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'paragraph':
      return <Paragraph text={block.text} />
    case 'list':
      return <BulletList items={block.items} numbered={block.style === 'numbered'} />
    case 'steps':
      return <StepList items={block.items} />
    case 'callout':
      return <Callout variant={block.variant} title={block.title} body={block.body} />
    case 'settings':
      return <SettingsTable rows={block.rows} title={block.title} />
    case 'table':
      return <DataTable columns={block.columns} rows={block.rows} caption={block.caption} />
    case 'expandable':
      return (
        <Expandable title={block.title} summary={block.summary}>
          <Blocks blocks={block.blocks} />
        </Expandable>
      )
    case 'quote':
      return (
        <figure className="relative max-w-[72ch] rounded-2xl border border-line bg-surface px-6 py-5">
          <Quote className="absolute -top-3 left-5 size-6 rounded-md bg-bg p-1 text-accent-ink" aria-hidden />
          <blockquote className="font-display text-lg leading-relaxed text-fg">
            <RichText text={block.text} />
          </blockquote>
          {block.attribution && <figcaption className="mt-2 text-sm text-muted">— {block.attribution}</figcaption>}
        </figure>
      )
    case 'widget':
      return (
        <div className="card flex items-center gap-3 border-dashed px-5 py-4 text-sm text-muted">
          <Puzzle className="size-5 text-accent-ink" aria-hidden />
          <span>
            Interactive tool <code className="font-mono text-fg">{block.widget}</code> arrives with the Stage 6 tools.
          </span>
        </div>
      )
  }
}

export function Blocks({ blocks, className }: { blocks: ContentBlock[]; className?: string }) {
  return (
    <div className={cn('space-y-5', className)}>
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  )
}

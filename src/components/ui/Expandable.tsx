import { ChevronDown, type LucideIcon } from 'lucide-react'
import { Collapsible } from 'radix-ui'
import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface ExpandableProps {
  title: ReactNode
  summary?: ReactNode
  icon?: LucideIcon
  defaultOpen?: boolean
  /**
   * Collapsed trigger hugs its label. Open, it grows into a full-width card.
   * Use this for a side note such as History, not for a page section.
   */
  compact?: boolean
  children: ReactNode
  className?: string
}

/** A collapsible card. The content animates its height with the Radix collapsible variables. */
export function Expandable({ title, summary, icon: IconC, defaultOpen, compact, children, className }: ExpandableProps) {
  return (
    <Collapsible.Root
      defaultOpen={defaultOpen}
      className={cn('group/exp', compact ? 'w-fit max-w-full data-[state=open]:card data-[state=open]:w-full data-[state=open]:overflow-hidden' : 'card overflow-hidden', className)}
    >
      <Collapsible.Trigger
        className={cn(
          'flex items-center gap-2 text-left transition-colors',
          compact
            ? 'w-fit rounded-full border border-line bg-surface px-3.5 py-2 hover:border-faint group-data-[state=open]/exp:w-full group-data-[state=open]/exp:rounded-none group-data-[state=open]/exp:border-0 group-data-[state=open]/exp:bg-transparent group-data-[state=open]/exp:px-5 group-data-[state=open]/exp:py-4'
            : 'w-full items-start gap-3 px-5 py-4 hover:bg-fg/[0.025]',
        )}
      >
        {IconC && (
          <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-accent/12 text-accent-ink">
            <IconC className="size-4" aria-hidden />
          </span>
        )}
        <span className={cn('min-w-0', compact ? 'flex items-baseline gap-2' : 'flex-1')}>
          <span className={cn('font-semibold text-fg', compact && 'text-sm')}>{title}</span>
          {summary && (
            <span className={cn('text-muted', compact ? 'hidden text-sm group-data-[state=open]/exp:inline' : 'mt-0.5 block text-sm')}>{summary}</span>
          )}
        </span>
        <ChevronDown
          className={cn('size-4 shrink-0 text-muted transition-transform duration-200 group-data-[state=open]/exp:rotate-180', compact ? '' : 'mt-1')}
          aria-hidden
        />
      </Collapsible.Trigger>
      <Collapsible.Content className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        <div className="border-t border-line px-5 py-5">{children}</div>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

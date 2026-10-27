import { ChevronDown, type LucideIcon } from 'lucide-react'
import { Collapsible } from 'radix-ui'
import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface ExpandableProps {
  title: ReactNode
  summary?: ReactNode
  icon?: LucideIcon
  defaultOpen?: boolean
  children: ReactNode
  className?: string
}

/** A collapsible card. The content animates its height with the Radix collapsible variables. */
export function Expandable({ title, summary, icon: IconC, defaultOpen, children, className }: ExpandableProps) {
  return (
    <Collapsible.Root defaultOpen={defaultOpen} className={cn('group/exp card overflow-hidden', className)}>
      <Collapsible.Trigger className="flex w-full items-start gap-3 px-5 py-4 text-left transition-colors hover:bg-fg/[0.025]">
        {IconC && (
          <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-accent/12 text-accent-ink">
            <IconC className="size-4" aria-hidden />
          </span>
        )}
        <span className="min-w-0 flex-1">
          <span className="block font-semibold text-fg">{title}</span>
          {summary && <span className="mt-0.5 block text-sm text-muted">{summary}</span>}
        </span>
        <ChevronDown
          className="mt-1 size-4 shrink-0 text-muted transition-transform duration-200 group-data-[state=open]/exp:rotate-180"
          aria-hidden
        />
      </Collapsible.Trigger>
      <Collapsible.Content className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        <div className="border-t border-line px-5 py-5">{children}</div>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

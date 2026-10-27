import type { LucideIcon } from 'lucide-react'
import { m } from 'motion/react'
import { Tabs as RadixTabs } from 'radix-ui'
import { useId, useState, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface TabItem {
  value: string
  label: string
  icon?: LucideIcon
  /** Optional color dot for this tab. */
  color?: string
  content: ReactNode
}

export function Tabs({ items, defaultValue, className, label }: { items: TabItem[]; defaultValue?: string; className?: string; label: string }) {
  const [value, setValue] = useState(defaultValue ?? items[0]?.value)
  const indicatorId = useId()
  if (items.length === 0) return null
  return (
    <RadixTabs.Root value={value} onValueChange={setValue} className={className}>
      <RadixTabs.List aria-label={label} className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1">
        {items.map((item) => {
          const active = item.value === value
          return (
            <RadixTabs.Trigger
              key={item.value}
              value={item.value}
              className={cn(
                'relative inline-flex h-9 shrink-0 items-center gap-2 rounded-xl px-3.5 text-sm font-medium transition-colors',
                active ? 'text-fg' : 'text-muted hover:text-fg',
              )}
            >
              {active && (
                <m.span
                  layoutId={indicatorId}
                  className="absolute inset-0 rounded-xl border border-line bg-elevated shadow-sm"
                  transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                />
              )}
              <span className="relative flex items-center gap-2">
                {item.color && <span className="size-2 rounded-full" style={{ background: item.color }} aria-hidden />}
                {item.icon && <item.icon className="size-4" aria-hidden />}
                {item.label}
              </span>
            </RadixTabs.Trigger>
          )
        })}
      </RadixTabs.List>
      {items.map((item) => (
        <RadixTabs.Content key={item.value} value={item.value} className="mt-4 outline-none">
          <m.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}>
            {item.content}
          </m.div>
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  )
}

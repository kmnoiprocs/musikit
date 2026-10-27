import { CircleDashed, Construction, Search, SearchX, type LucideIcon } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { EntryCard, StaggerGrid, StaggerItem } from '../components/content/Cards'
import { OutlineTopics } from '../components/content/OutlineTopics'
import { PageHeader } from '../components/layout/PageHeader'
import { PrevNext } from '../components/layout/PageActions'
import { EmptyState, SectionHeading } from '../components/ui/Misc'
import { accent, cn } from '../lib/cn'
import type { SectionInfo } from '../lib/content'
import { plural } from '../lib/labels'

export function PageContainer({ children, className, color }: { children: ReactNode; className?: string; color?: string }) {
  return (
    <div style={color ? accent(color) : undefined} className={cn('mx-auto w-full max-w-[80rem] px-4 pb-24 sm:px-8', className)}>
      {children}
    </div>
  )
}

export function PageSection({ id, title, icon, color, description, children, className, action }: { id?: string; title: string; icon?: LucideIcon; color?: string; description?: ReactNode; children: ReactNode; className?: string; action?: ReactNode }) {
  return (
    <section className={cn('mt-14', className)} aria-labelledby={id}>
      <div className="flex flex-wrap items-end justify-between gap-x-6">
        <SectionHeading id={id} title={title} icon={icon} color={color} description={description} />
        {action && <div className="mb-5">{action}</div>}
      </div>
      {children}
    </section>
  )
}

export function SearchField({ value, onChange, placeholder, className }: { value: string; onChange: (v: string) => void; placeholder: string; className?: string }) {
  return (
    <label className={cn('flex h-10 items-center gap-2.5 rounded-xl border border-line bg-surface px-3 text-sm transition-colors focus-within:border-accent/60', className)}>
      <Search className="size-4 shrink-0 text-muted" aria-hidden />
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full bg-transparent text-fg outline-none placeholder:text-faint" />
    </label>
  )
}

export interface CardItem {
  key: string
  href: string
  title: string
  eyebrow?: string
  summary?: string
  color: string
  icon: string
  footer?: ReactNode
  /** Extra text matched by the filter box. */
  searchText?: string
  group?: string
}

/** A filterable, staggered grid of entry cards. */
export function EntryGrid({ items, noun, filterPlaceholder, groups, emptyIcon, emptyTitle, emptyText, color }: { items: CardItem[]; noun: [string, string]; filterPlaceholder?: string; groups?: { id: string; label: string; color?: string }[]; emptyIcon: LucideIcon; emptyTitle: string; emptyText: ReactNode; color: string }) {
  const [query, setQuery] = useState('')
  const [group, setGroup] = useState<string | undefined>()
  const q = query.trim().toLowerCase()
  const shown = items.filter((i) => (!group || i.group === group) && (!q || `${i.title} ${i.eyebrow ?? ''} ${i.summary ?? ''} ${i.searchText ?? ''}`.toLowerCase().includes(q)))
  const usedGroups = groups?.filter((g) => items.some((i) => i.group === g.id))

  if (items.length === 0) {
    return (
      <EmptyState icon={emptyIcon} title={emptyTitle} color={color}>
        {emptyText}
      </EmptyState>
    )
  }
  return (
    <div>
      {(items.length > 6 || (usedGroups && usedGroups.length > 1)) && (
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <SearchField value={query} onChange={setQuery} placeholder={filterPlaceholder ?? `Filter ${noun[1]}…`} className="w-full sm:w-72" />
          {usedGroups && usedGroups.length > 1 && (
            <div className="flex flex-wrap gap-1.5">
              <FilterChip active={!group} onClick={() => setGroup(undefined)}>
                All
              </FilterChip>
              {usedGroups.map((g) => (
                <FilterChip key={g.id} active={group === g.id} color={g.color} onClick={() => setGroup(group === g.id ? undefined : g.id)}>
                  {g.label}
                </FilterChip>
              ))}
            </div>
          )}
        </div>
      )}
      {shown.length === 0 ? (
        <p className="flex items-center gap-2 py-8 text-sm text-muted">
          <SearchX className="size-4" aria-hidden /> No {noun[1]} match “{query}”.
        </p>
      ) : (
        <StaggerGrid key={`${group}|${q}`} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {shown.map((i) => (
            <StaggerItem key={i.key}>
              <EntryCard href={i.href} title={i.title} eyebrow={i.eyebrow} summary={i.summary} color={i.color} icon={i.icon} footer={i.footer} />
            </StaggerItem>
          ))}
        </StaggerGrid>
      )}
      <p className="mt-4 text-xs text-faint">
        Showing {plural(shown.length, noun[0], noun[1])} of {items.length}
      </p>
    </div>
  )
}

export function FilterChip({ active, color, onClick, children }: { active: boolean; color?: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={color ? accent(color) : undefined}
      className={cn(
        'flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-colors',
        active ? (color ? 'border-accent/50 bg-accent/15 text-accent-ink' : 'border-fg/25 bg-fg/10 text-fg') : 'border-line bg-surface text-muted hover:border-faint hover:text-fg',
      )}
    >
      {color && <span className="size-1.5 rounded-full bg-accent" aria-hidden />}
      {children}
    </button>
  )
}

interface GroupPageProps {
  title: string
  eyebrow: ReactNode
  color: string
  icon: string
  outline?: SectionInfo
  items: CardItem[]
  noun: [string, string]
  emptyText: ReactNode
  prev?: { href: string; title: string; color: string }
  next?: { href: string; title: string; color: string }
  label: string
}

/** An effect category, instrument family, or genre family page. */
export function GroupPage({ title, eyebrow, color, icon, outline, items, noun, emptyText, prev, next, label }: GroupPageProps) {
  const planned = outline?.topics.length ?? 0
  return (
    <PageContainer color={color}>
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        color={color}
        iconName={icon}
        summary={outline?.summary}
        meta={
          <>
            <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs text-accent-ink">{plural(items.length, noun[0], noun[1])}</span>
            {planned > 0 && <span className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-muted">{plural(planned, 'planned topic')}</span>}
          </>
        }
      />
      <PageSection id="entries" title={`${noun[1].charAt(0).toUpperCase()}${noun[1].slice(1)}`} color={color}>
        <EntryGrid items={items} noun={noun} emptyIcon={CircleDashed} emptyTitle={`No ${noun[1]} written yet`} emptyText={emptyText} color={color} />
      </PageSection>
      {outline && outline.topics.length > 0 && (
        <PageSection id="planned" title="Planned coverage" icon={Construction} color={color} description="Everything this section of the encyclopedia will cover, from the master outline.">
          <OutlineTopics topics={outline.topics} />
        </PageSection>
      )}
      <PrevNext prev={prev && { ...prev, label: `Previous ${label}` }} next={next && { ...next, label: `Next ${label}` }} />
    </PageContainer>
  )
}

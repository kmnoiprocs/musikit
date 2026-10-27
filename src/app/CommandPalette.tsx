import { Command } from 'cmdk'
import { ArrowDown, ArrowUp, Clock, CornerDownLeft, Search, SearchX } from 'lucide-react'
import { Dialog } from 'radix-ui'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { Kbd } from '../components/ui/Misc'
import { PILLARS } from '../content/registry/pillars'
import { Icon } from '../design/icons'
import { accent, cn } from '../lib/cn'
import { COLORS, pillarHref } from '../lib/content'
import { useRecent } from '../lib/prefs'
import { SEARCH_GROUPS, search, type SearchGroup, type SearchItem } from '../lib/search'
import { setPaletteOpen, usePaletteOpen } from './palette'

const SUGGESTED: SearchItem[] = [
  { key: 's:effects', group: 'Pages', title: 'Effects Encyclopedia', subtitle: 'Every effect, by category', href: '/effects', color: COLORS.effects, icon: 'zap', ready: true },
  { key: 's:instruments', group: 'Pages', title: 'Instrument Encyclopedia', subtitle: 'Every instrument, by family', href: '/instruments', color: COLORS.instruments, icon: 'guitar', ready: true },
  { key: 's:genres', group: 'Pages', title: 'Genre Encyclopedia', subtitle: 'Every genre, by family', href: '/genres', color: COLORS.genres, icon: 'disc-3', ready: true },
  { key: 's:plugins', group: 'Pages', title: 'Plugin Registry', subtitle: 'Industry, pro, budget, free, and stock', href: '/plugins', color: COLORS.plugins, icon: 'plug', ready: true },
  { key: 's:reference', group: 'Pages', title: 'Quick Reference Hub', subtitle: 'All cheat sheets in one place', href: '/reference', color: COLORS.reference, icon: 'book-marked', ready: true },
  ...PILLARS.filter((p) => !['effects', 'instruments', 'genres', 'reference', 'interactive'].includes(p.id)).map((p) => ({
    key: `s:${p.id}`,
    group: 'Pages' as const,
    title: p.name,
    subtitle: 'Pillar',
    href: pillarHref(p),
    color: p.color,
    icon: p.icon,
    ready: true,
  })),
]

function Result({ item, onSelect, iconOverride }: { item: SearchItem; onSelect: (href: string) => void; iconOverride?: ReactNode }) {
  return (
    <Command.Item
      value={item.key}
      onSelect={() => onSelect(item.href)}
      style={accent(item.color)}
      className="group flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 data-[selected=true]:bg-accent/12"
    >
      <span className={cn('flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent/14 text-accent-ink', !item.ready && 'opacity-60')}>
        {iconOverride ?? <Icon name={item.icon} className="size-4" />}
      </span>
      <span className="min-w-0 flex-1">
        <span className={cn('block truncate text-sm font-medium', item.ready ? 'text-fg' : 'text-fg/70')}>{item.title}</span>
        <span className="block truncate text-xs text-muted">{item.subtitle}</span>
      </span>
      <CornerDownLeft className="size-3.5 shrink-0 text-faint opacity-0 group-data-[selected=true]:opacity-100" aria-hidden />
    </Command.Item>
  )
}

export function CommandPalette() {
  const open = usePaletteOpen()
  const navigate = useNavigate()
  const recent = useRecent()
  const [query, setQuery] = useState('')
  const [group, setGroup] = useState<SearchGroup | undefined>()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const typing = target?.closest('input, textarea, [contenteditable="true"]')
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setPaletteOpen(!open)
      } else if (e.key === '/' && !typing && !open) {
        e.preventDefault()
        setPaletteOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const results = useMemo(() => search(query, group), [query, group])
  const grouped = useMemo(() => {
    const map = new Map<SearchGroup, SearchItem[]>()
    for (const r of results) map.set(r.group, [...(map.get(r.group) ?? []), r])
    return [...map.entries()]
  }, [results])

  const close = (next: boolean) => {
    setPaletteOpen(next)
    if (!next) {
      setQuery('')
      setGroup(undefined)
    }
  }
  const go = (href: string) => {
    close(false)
    navigate(href)
  }

  const recentItems: SearchItem[] = recent.slice(0, 5).map((r) => ({ key: `r:${r.href}`, group: 'Pages', title: r.title, subtitle: r.kind, href: r.href, color: r.color, icon: '', ready: true }))

  return (
    <Dialog.Root open={open} onOpenChange={close}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed top-[8vh] left-1/2 z-50 w-[calc(100vw-1.5rem)] max-w-2xl -translate-x-1/2 overflow-hidden rounded-2xl border border-line bg-elevated shadow-[0_30px_80px_-20px_rgb(0_0_0/0.6)] data-[state=open]:animate-dialog-in"
        >
          <Dialog.Title className="sr-only">Search MusiKit</Dialog.Title>
          <Command shouldFilter={false} loop label="Search MusiKit">
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="size-5 shrink-0 text-muted" aria-hidden />
              <Command.Input
                value={query}
                onValueChange={setQuery}
                placeholder="Search guides, effects, instruments, genres, plugins…"
                className="h-14 w-full bg-transparent text-[15px] text-fg outline-none placeholder:text-faint"
              />
              <Kbd className="shrink-0">Esc</Kbd>
            </div>
            <div className="flex gap-1.5 overflow-x-auto border-b border-line px-3 py-2">
              {[undefined, ...SEARCH_GROUPS].map((g) => (
                <button
                  key={g ?? 'all'}
                  type="button"
                  onClick={() => setGroup(g)}
                  className={cn(
                    'h-7 shrink-0 rounded-full border px-3 text-xs font-medium transition-colors',
                    group === g ? 'border-fg/20 bg-fg/10 text-fg' : 'border-transparent text-muted hover:bg-fg/[0.05] hover:text-fg',
                  )}
                >
                  {g ?? 'All'}
                </button>
              ))}
            </div>
            <Command.List className="max-h-[min(60vh,32rem)] overflow-y-auto overscroll-contain p-2 [&_[cmdk-group-heading]]:eyebrow [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:text-faint">
              {query.trim() === '' ? (
                <>
                  {recentItems.length > 0 && (
                    <Command.Group heading="Recently viewed">
                      {recentItems.map((item) => (
                        <Result key={item.key} item={item} onSelect={go} iconOverride={<Clock className="size-4" />} />
                      ))}
                    </Command.Group>
                  )}
                  <Command.Group heading="Jump to">
                    {SUGGESTED.map((item) => (
                      <Result key={item.key} item={item} onSelect={go} />
                    ))}
                  </Command.Group>
                </>
              ) : (
                <>
                  <Command.Empty className="flex flex-col items-center gap-2 py-14 text-center text-sm text-muted">
                    <SearchX className="size-8 text-faint" aria-hidden />
                    No matches for “{query}”{group ? ` in ${group}` : ''}.
                  </Command.Empty>
                  {grouped.map(([g, items]) => (
                    <Command.Group key={g} heading={g}>
                      {items.map((item) => (
                        <Result key={item.key} item={item} onSelect={go} />
                      ))}
                    </Command.Group>
                  ))}
                </>
              )}
            </Command.List>
            <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 text-[11px] text-muted">
              <span className="flex items-center gap-1.5">
                <Kbd>
                  <ArrowUp className="size-3" />
                </Kbd>
                <Kbd>
                  <ArrowDown className="size-3" />
                </Kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1.5">
                <Kbd>
                  <CornerDownLeft className="size-3" />
                </Kbd>
                Open
              </span>
              <span className="ml-auto hidden sm:inline">
                {query.trim() ? `${results.length} result${results.length === 1 ? '' : 's'}` : 'Tip: press / anywhere to search'}
              </span>
            </div>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

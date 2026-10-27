import { Bookmark, ChevronRight, House, Palette, Search } from 'lucide-react'
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router'
import { ShortcutKeys } from '../components/ui/Misc'
import { Icon } from '../design/icons'
import { accent, cn } from '../lib/cn'
import { useBookmarks } from '../lib/prefs'
import { Logo } from './Logo'
import { NAV_GROUPS, ancestorKeys, navHrefFor, type NavNode } from './nav'
import { openPalette } from './palette'

export function SearchButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={openPalette}
      className={cn(
        'group flex h-10 w-full items-center gap-2.5 rounded-xl border border-line bg-surface px-3 text-sm text-muted shadow-[var(--mk-card-shadow)] transition-colors hover:border-faint hover:text-fg',
        className,
      )}
    >
      <Search className="size-4" aria-hidden />
      <span className="flex-1 text-left">Search everything…</span>
      <ShortcutKeys />
    </button>
  )
}

/** The full navigation tree, shared by the desktop sidebar and the mobile drawer. */
export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation()
  const activeHref = navHrefFor(pathname)
  const activeTrail = useMemo(() => ancestorKeys(activeHref), [activeHref])
  // Groups on the active page's trail open automatically; groups the reader toggles keep their state.
  const [overrides, setOverrides] = useState<Map<string, boolean>>(() => new Map())
  const [prevTrail, setPrevTrail] = useState(activeTrail)
  const { bookmarks } = useBookmarks()
  const navRef = useRef<HTMLElement>(null)

  if (prevTrail !== activeTrail) {
    setPrevTrail(activeTrail)
    if (activeTrail.some((k) => overrides.has(k))) setOverrides(new Map([...overrides].filter(([k]) => !activeTrail.includes(k))))
  }

  const expanded = useMemo(() => {
    const open = new Set(activeTrail)
    for (const [k, v] of overrides) {
      if (v) open.add(k)
      else open.delete(k)
    }
    return open
  }, [activeTrail, overrides])

  useEffect(() => {
    const el = navRef.current?.querySelector<HTMLElement>('[aria-current="page"]')
    el?.scrollIntoView({ block: 'nearest' })
  }, [activeHref])

  const toggle = (key: string) => setOverrides((prev) => new Map(prev).set(key, !expanded.has(key)))

  return (
    <nav ref={navRef} aria-label="Main" className="flex-1 overflow-y-auto overscroll-contain px-3 pb-8">
      <ul className="space-y-0.5">
        <TopLink href="/" label="Home" icon={<House className="size-4" />} active={pathname === '/'} onNavigate={onNavigate} />
        <TopLink
          href="/bookmarks"
          label="Bookmarks"
          icon={<Bookmark className="size-4" />}
          active={pathname === '/bookmarks'}
          onNavigate={onNavigate}
          count={bookmarks.length || undefined}
        />
      </ul>
      {NAV_GROUPS.map((group) => (
        <div key={group.label} className="mt-6">
          <div className="eyebrow mb-1.5 px-3 text-faint">{group.label}</div>
          <ul className="space-y-0.5">
            {group.nodes.map((node) => (
              <TreeNode key={node.key} node={node} depth={0} activeHref={activeHref} expanded={expanded} onToggle={toggle} onNavigate={onNavigate} />
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}

function TopLink({ href, label, icon, active, onNavigate, count }: { href: string; label: string; icon: ReactNode; active: boolean; onNavigate?: () => void; count?: number }) {
  return (
    <li>
      <Link
        to={href}
        onClick={onNavigate}
        aria-current={active ? 'page' : undefined}
        className={cn(
          'flex h-9 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors',
          active ? 'bg-fg/[0.07] text-fg' : 'text-muted hover:bg-fg/[0.04] hover:text-fg',
        )}
      >
        <span className="flex size-6 items-center justify-center">{icon}</span>
        <span className="flex-1">{label}</span>
        {count !== undefined && <span className="rounded-md bg-fg/[0.08] px-1.5 font-mono text-[11px] text-muted">{count}</span>}
      </Link>
    </li>
  )
}

interface TreeNodeProps {
  node: NavNode
  depth: number
  activeHref: string
  expanded: Set<string>
  onToggle: (key: string) => void
  onNavigate?: () => void
}

function TreeNode({ node, depth, activeHref, expanded, onToggle, onNavigate }: TreeNodeProps) {
  const isOpen = expanded.has(node.key)
  const active = node.href === activeHref
  const hasChildren = !!node.children?.length
  return (
    <li style={accent(node.color)}>
      <div
        className={cn(
          'group relative flex items-center rounded-lg transition-colors',
          active ? 'bg-accent/12 text-fg' : 'text-muted hover:bg-fg/[0.04] hover:text-fg',
        )}
      >
        {active && <span className="absolute top-1.5 bottom-1.5 left-0 w-[3px] rounded-full bg-accent" aria-hidden />}
        <Link
          to={node.href}
          onClick={onNavigate}
          aria-current={active ? 'page' : undefined}
          className={cn('flex min-w-0 flex-1 items-center gap-2.5 py-1.5 pl-3', depth === 0 ? 'min-h-9 text-sm font-medium' : 'min-h-8 text-[13px]', !hasChildren && 'pr-3')}
        >
          {depth === 0 && node.icon && (
            <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-accent/15 text-accent-ink">
              <Icon name={node.icon} className="size-3.5" />
            </span>
          )}
          {depth > 0 && node.badge && <span className={cn('shrink-0 font-mono text-[10.5px] tabular-nums', active ? 'text-accent-ink' : 'text-faint')}>{node.badge}</span>}
          {depth > 0 && !node.badge && <span className="size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />}
          <span className="truncate">{node.label}</span>
          {node.ready && <span className="ml-auto size-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_6px_var(--accent)]" title="Written" aria-label="written" />}
        </Link>
        {hasChildren && (
          <button
            type="button"
            onClick={() => onToggle(node.key)}
            aria-expanded={isOpen}
            aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${node.label}`}
            className="mr-1 flex size-7 shrink-0 items-center justify-center rounded-md text-faint transition-colors hover:bg-fg/[0.06] hover:text-fg"
          >
            <ChevronRight className={cn('size-3.5 transition-transform duration-200', isOpen && 'rotate-90')} />
          </button>
        )}
      </div>
      {hasChildren && isOpen && (
        <ul className={cn('mt-0.5 mb-1 space-y-px border-l border-line', depth === 0 ? 'ml-[1.4rem] pl-1.5' : 'ml-4 pl-1.5')}>
          {node.children!.map((child) => (
            <TreeNode key={child.key} node={child} depth={depth + 1} activeHref={activeHref} expanded={expanded} onToggle={onToggle} onNavigate={onNavigate} />
          ))}
        </ul>
      )}
    </li>
  )
}

export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-dvh w-72 shrink-0 flex-col border-r border-line bg-bg lg:flex">
      <div className="flex h-16 items-center px-5">
        <Logo />
      </div>
      <div className="px-3 pb-4">
        <SearchButton />
      </div>
      <SidebarContent />
      <SidebarFooter />
    </aside>
  )
}

export function SidebarFooter({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex items-center gap-2 border-t border-line px-4 py-3 text-xs text-muted">
      <Link to="/design" onClick={onNavigate} className="flex items-center gap-1.5 rounded-md px-1.5 py-1 transition-colors hover:text-fg">
        <Palette className="size-3.5" aria-hidden /> Design system
      </Link>
      {import.meta.env.DEV && (
        <Link to="/status" onClick={onNavigate} className="ml-auto rounded-md px-1.5 py-1 transition-colors hover:text-fg">
          Content status
        </Link>
      )}
    </div>
  )
}

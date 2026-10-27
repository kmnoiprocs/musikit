import { BookOpen, ChevronRight, ClipboardList, House, Menu, Moon, Search, Sun, X } from 'lucide-react'
import { AnimatePresence, m } from 'motion/react'
import { Dialog } from 'radix-ui'
import { useState } from 'react'
import { Link, useMatches, type Params } from 'react-router'
import { IconButton } from '../components/ui/Button'
import { cn } from '../lib/cn'
import type { Crumb } from '../lib/content'
import { useMode, useTheme, type Mode } from '../lib/prefs'
import { Logo } from './Logo'
import { openPalette } from './palette'
import { SidebarContent, SidebarFooter } from './Sidebar'

export interface RouteHandle {
  crumbs?: (params: Params) => Crumb[]
}

function Breadcrumbs() {
  const matches = useMatches()
  const match = [...matches].reverse().find((m) => (m.handle as RouteHandle | undefined)?.crumbs)
  const crumbs = match ? (match.handle as RouteHandle).crumbs!(match.params) : []
  return (
    <nav aria-label="Breadcrumb" className="hidden min-w-0 flex-1 md:block">
      <ol className="flex min-w-0 items-center gap-1 text-[13px]">
        <li className="shrink-0">
          <Link to="/" className="flex size-7 items-center justify-center rounded-md text-muted transition-colors hover:bg-fg/[0.06] hover:text-fg" aria-label="Home">
            <House className="size-4" />
          </Link>
        </li>
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1
          return (
            <li key={i} className={cn('flex min-w-0 items-center gap-1', !last && 'hidden shrink-[2] lg:flex')}>
              <ChevronRight className="size-3.5 shrink-0 text-faint" aria-hidden />
              {c.href && !last ? (
                <Link to={c.href} className="truncate rounded-md px-1.5 py-1 text-muted transition-colors hover:bg-fg/[0.06] hover:text-fg">
                  {c.label}
                </Link>
              ) : (
                <span className="truncate px-1.5 py-1 font-medium text-fg" aria-current={last ? 'page' : undefined}>
                  {c.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

const MODES: { value: Mode; label: string; icon: typeof BookOpen }[] = [
  { value: 'guide', label: 'Guide', icon: BookOpen },
  { value: 'cheat', label: 'Cheat Sheet', icon: ClipboardList },
]

export function ModeToggle() {
  const [mode, setMode] = useMode()
  return (
    <div role="radiogroup" aria-label="Reading mode" className="flex h-9 items-center rounded-xl border border-line bg-surface p-0.5">
      {MODES.map((item) => {
        const active = mode === item.value
        return (
          <button
            key={item.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setMode(item.value)}
            title={item.value === 'guide' ? 'Guide mode: full explanations' : 'Cheat Sheet mode: just the essentials'}
            className={cn('relative flex h-full items-center gap-1.5 rounded-[10px] px-2.5 text-[13px] font-medium transition-colors', active ? 'text-fg' : 'text-muted hover:text-fg')}
          >
            {active && <m.span layoutId="mode-pill" className="absolute inset-0 rounded-[10px] bg-fg/[0.09] ring-1 ring-line" transition={{ type: 'spring', stiffness: 500, damping: 38 }} />}
            <item.icon className="relative size-4" aria-hidden />
            <span className="relative hidden sm:inline">{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export function ThemeToggle() {
  const [theme, setTheme] = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'
  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className="relative inline-flex size-9 items-center justify-center overflow-hidden rounded-xl border border-line bg-surface text-muted transition-colors hover:text-fg"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <m.span
          key={theme}
          initial={{ y: 18, rotate: -60, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -18, rotate: 60, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 420, damping: 28 }}
        >
          {theme === 'dark' ? <Moon className="size-[17px]" /> : <Sun className="size-[17px]" />}
        </m.span>
      </AnimatePresence>
    </button>
  )
}

function MobileNav() {
  const [open, setOpen] = useState(false)
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <IconButton label="Open navigation" icon={Menu} className="lg:hidden" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" />
        <Dialog.Content className="fixed inset-y-0 left-0 z-50 flex w-[19rem] max-w-[86vw] flex-col border-r border-line bg-bg shadow-2xl data-[state=closed]:animate-drawer-out data-[state=open]:animate-drawer-in">
          <Dialog.Title className="sr-only">Navigation</Dialog.Title>
          <Dialog.Description className="sr-only">Browse every part of MusiKit</Dialog.Description>
          <div className="flex h-14 items-center justify-between px-4">
            <Logo />
            <Dialog.Close asChild>
              <IconButton label="Close navigation" icon={X} />
            </Dialog.Close>
          </div>
          <div className="px-3 pb-3">
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                openPalette()
              }}
              className="flex h-10 w-full items-center gap-2.5 rounded-xl border border-line bg-surface px-3 text-sm text-muted"
            >
              <Search className="size-4" aria-hidden /> Search everything…
            </button>
          </div>
          <SidebarContent onNavigate={() => setOpen(false)} />
          <SidebarFooter onNavigate={() => setOpen(false)} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-line bg-bg/75 px-3 backdrop-blur-xl backdrop-saturate-150 sm:px-5">
      <MobileNav />
      <Logo className="mr-2 lg:hidden" />
      <Breadcrumbs />
      <div className="ml-auto flex items-center gap-1.5">
        <IconButton label="Search" icon={Search} onClick={openPalette} className="lg:hidden" />
        <ModeToggle />
        <ThemeToggle />
      </div>
    </header>
  )
}

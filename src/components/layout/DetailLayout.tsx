import { ArrowUp, BookOpen, ChevronDown, ClipboardList, type LucideIcon } from 'lucide-react'
import { Collapsible } from 'radix-ui'
import { useEffect, useState, type ReactNode } from 'react'
import { accent, cn } from '../../lib/cn'
import { useMode } from '../../lib/prefs'
import { Button } from '../ui/Button'
import { IconTile, SectionHeading } from '../ui/Misc'

export interface PageSection {
  id: string
  title: string
  icon?: LucideIcon
  /** Also shown in Cheat Sheet mode. */
  cheat?: boolean
  /** When the page uses collapsible sections, this one starts open. */
  defaultOpen?: boolean
  description?: ReactNode
  /** Falsy content hides the section, so templates can list every field and skip empty ones. */
  content: ReactNode
}

interface DetailLayoutProps {
  color: string
  header: ReactNode
  cheatSheet?: ReactNode
  sections: PageSection[]
  footer?: ReactNode
  /** Each section is a bordered card. All start closed except those with defaultOpen. */
  collapsible?: boolean
}

/** Entry and guide pages: header, cheat sheet, titled sections, and an "On this page" rail. */
export function DetailLayout({ color, header, cheatSheet, sections, footer, collapsible }: DetailLayoutProps) {
  const [mode, setMode] = useMode()
  const [openRequest, setOpenRequest] = useState<{ id: string; n: number } | null>(null)
  const present = sections.filter((s) => s.content)
  const visible = present.filter((s) => mode === 'guide' || s.cheat)
  const hidden = present.length - visible.length
  const toc = [...(cheatSheet ? [{ id: 'cheat-sheet', title: 'Cheat Sheet' }] : []), ...visible.map((s) => ({ id: s.id, title: s.title }))]

  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (id) setOpenRequest({ id, n: 1 })
  }, [])

  const openSection = (id: string) => setOpenRequest((current) => ({ id, n: (current?.n ?? 0) + 1 }))

  return (
    <div style={accent(color)} className="mx-auto flex w-full max-w-[80rem] gap-12 px-4 pb-24 sm:px-8">
      <article className="min-w-0 flex-1 xl:max-w-[52rem]">
        {header}
        {cheatSheet && <div id="cheat-sheet">{cheatSheet}</div>}
        {mode === 'cheat' && hidden > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-dashed border-line px-4 py-3 text-sm text-muted">
            <ClipboardList className="size-4 text-accent-ink" aria-hidden />
            <span className="flex-1">
              Cheat Sheet mode is showing the essentials. {hidden} more {hidden === 1 ? 'section is' : 'sections are'} in Guide mode.
            </span>
            <Button size="sm" variant="accent" icon={BookOpen} onClick={() => setMode('guide')}>
              Show everything
            </Button>
          </div>
        )}
        {collapsible ? (
          <div className="mt-8 space-y-3">
            {visible.map((s) => (
              <DisclosureSection key={s.id} section={s} color={color} openRequest={openRequest} />
            ))}
          </div>
        ) : (
          visible.map((s) => (
            <section key={s.id} className="mt-14 first-of-type:mt-12" aria-labelledby={s.id}>
              <SectionHeading id={s.id} title={s.title} icon={s.icon} color={color} description={s.description} />
              {s.content}
            </section>
          ))
        )}
        {footer}
      </article>
      {toc.length > 1 && (
        <aside className="hidden w-56 shrink-0 xl:block">
          <TableOfContents items={toc} onNavigate={collapsible ? openSection : undefined} />
        </aside>
      )}
    </div>
  )
}

function DisclosureSection({ section, color, openRequest }: { section: PageSection; color: string; openRequest: { id: string; n: number } | null }) {
  const [open, setOpen] = useState(!!section.defaultOpen)
  useEffect(() => {
    if (openRequest?.id === section.id) setOpen(true)
  }, [openRequest, section.id])
  const IconC = section.icon
  return (
    <section id={section.id} style={accent(color)} className="card scroll-mt-24 overflow-hidden">
      <Collapsible.Root open={open} onOpenChange={setOpen} className="group/sec">
        <Collapsible.Trigger className="flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-fg/[0.03] sm:px-5">
          {IconC && <IconTile icon={IconC} color={color} size="sm" className="mt-0.5 size-7 rounded-lg" />}
          <span className="min-w-0 flex-1">
            <h2 className="block font-display text-[17px] font-semibold tracking-tight text-fg">{section.title}</h2>
            {section.description && <span className="mt-0.5 block text-sm leading-snug text-muted">{section.description}</span>}
          </span>
          <ChevronDown className="mt-1 size-4 shrink-0 text-muted transition-transform duration-200 group-data-[state=open]/sec:rotate-180" aria-hidden />
        </Collapsible.Trigger>
        <Collapsible.Content className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <div className="border-t border-line px-4 py-5 sm:px-5">{section.content}</div>
        </Collapsible.Content>
      </Collapsible.Root>
    </section>
  )
}

function useScrollSpy(idList: string[]) {
  const [active, setActive] = useState(idList[0])
  const [progress, setProgress] = useState(0)
  const key = idList.join('|')
  useEffect(() => {
    const ids = key.split('|')
    let frame = 0
    const update = () => {
      frame = 0
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < 160) current = id
      }
      setActive(current)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [key])
  return { active, progress }
}

function TableOfContents({ items, onNavigate }: { items: { id: string; title: string }[]; onNavigate?: (id: string) => void }) {
  const { active, progress } = useScrollSpy(items.map((i) => i.id))
  return (
    <nav aria-label="On this page" className="sticky top-24 pt-12">
      <div className="eyebrow mb-3 text-muted">On this page</div>
      <div className="mb-4 h-0.5 overflow-hidden rounded-full bg-fg/[0.07]">
        <div className="h-full rounded-full bg-accent transition-[width] duration-150" style={{ width: `${progress * 100}%` }} />
      </div>
      <ul className="space-y-0.5 border-l border-line">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                const el = document.getElementById(item.id)
                if (!el) return
                e.preventDefault()
                if (item.id !== 'cheat-sheet') onNavigate?.(item.id)
                const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
                el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
                history.replaceState(history.state, '', `#${item.id}`)
              }}
              className={cn(
                '-ml-px block border-l-2 py-1.5 pl-3.5 text-[13px] transition-colors',
                active === item.id ? 'border-accent font-medium text-fg' : 'border-transparent text-muted hover:border-faint hover:text-fg',
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="mt-5 flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-fg"
      >
        <ArrowUp className="size-3.5" aria-hidden /> Back to top
      </button>
    </nav>
  )
}

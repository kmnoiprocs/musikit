import { ArrowUp, BookOpen, ClipboardList, type LucideIcon } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { accent, cn } from '../../lib/cn'
import { useMode } from '../../lib/prefs'
import { Button } from '../ui/Button'
import { SectionHeading } from '../ui/Misc'

export interface PageSection {
  id: string
  title: string
  icon?: LucideIcon
  /** Also shown in Cheat Sheet mode. */
  cheat?: boolean
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
}

/** Entry and guide pages: header, cheat sheet, titled sections, and an "On this page" rail. */
export function DetailLayout({ color, header, cheatSheet, sections, footer }: DetailLayoutProps) {
  const [mode, setMode] = useMode()
  const present = sections.filter((s) => s.content)
  const visible = present.filter((s) => mode === 'guide' || s.cheat)
  const hidden = present.length - visible.length
  const toc = [...(cheatSheet ? [{ id: 'cheat-sheet', title: 'Cheat Sheet' }] : []), ...visible.map((s) => ({ id: s.id, title: s.title }))]

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
        {visible.map((s) => (
          <section key={s.id} className="mt-14 first-of-type:mt-12" aria-labelledby={s.id}>
            <SectionHeading id={s.id} title={s.title} icon={s.icon} color={color} description={s.description} />
            {s.content}
          </section>
        ))}
        {footer}
      </article>
      {toc.length > 1 && (
        <aside className="hidden w-56 shrink-0 xl:block">
          <TableOfContents items={toc} />
        </aside>
      )}
    </div>
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

function TableOfContents({ items }: { items: { id: string; title: string }[] }) {
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

import { ArrowLeft, ArrowRight, Bookmark, BookmarkCheck } from 'lucide-react'
import { AnimatePresence, m } from 'motion/react'
import { Link } from 'react-router'
import { accent, cn } from '../../lib/cn'
import { useBookmarks, type SavedPage } from '../../lib/prefs'

type PageRef = Omit<SavedPage, 'at'>

export function BookmarkButton({ page }: { page: PageRef }) {
  const { isBookmarked, toggle } = useBookmarks()
  const saved = isBookmarked(page.href)
  return (
    <button
      type="button"
      onClick={() => toggle(page)}
      aria-pressed={saved}
      aria-label={saved ? 'Remove bookmark' : 'Bookmark this page'}
      title={saved ? 'Remove bookmark' : 'Bookmark this page'}
      style={accent('#F5C542')}
      className={cn(
        'relative inline-flex size-10 items-center justify-center rounded-xl border transition-colors',
        saved ? 'border-accent/40 bg-accent/15 text-accent-ink' : 'border-line bg-surface text-muted hover:text-fg',
      )}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <m.span key={String(saved)} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ type: 'spring', stiffness: 600, damping: 30 }}>
          {saved ? <BookmarkCheck className="size-[18px]" /> : <Bookmark className="size-[18px]" />}
        </m.span>
      </AnimatePresence>
    </button>
  )
}

interface NavTarget {
  href: string
  label: string
  title: string
  color: string
}

export function PrevNext({ prev, next }: { prev?: NavTarget; next?: NavTarget }) {
  if (!prev && !next) return null
  return (
    <nav aria-label="Previous and next" className="mt-16 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
      {prev ? <NavCard target={prev} direction="prev" /> : <span />}
      {next && <NavCard target={next} direction="next" />}
    </nav>
  )
}

function NavCard({ target, direction }: { target: NavTarget; direction: 'prev' | 'next' }) {
  const Arrow = direction === 'prev' ? ArrowLeft : ArrowRight
  return (
    <Link
      to={target.href}
      style={accent(target.color)}
      className={cn('group card flex items-center gap-3 p-4 transition-colors hover:border-accent/50', direction === 'next' && 'text-right sm:col-start-2')}
    >
      {direction === 'prev' && <Arrow className="size-4 shrink-0 text-muted transition-transform group-hover:-translate-x-0.5 group-hover:text-accent-ink" />}
      <span className="min-w-0 flex-1">
        <span className="eyebrow block text-accent-ink">{target.label}</span>
        <span className="mt-0.5 block truncate font-medium text-fg">{target.title}</span>
      </span>
      {direction === 'next' && <Arrow className="size-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent-ink" />}
    </Link>
  )
}

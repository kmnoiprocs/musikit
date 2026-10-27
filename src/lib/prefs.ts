import { useEffect, useSyncExternalStore } from 'react'

/** A tiny localStorage-backed store that React components subscribe to. */
function persisted<T>(key: string, initial: T, isValid: (v: unknown) => v is T) {
  let value = initial
  try {
    const raw = localStorage.getItem(key)
    if (raw !== null) {
      const parsed: unknown = JSON.parse(raw)
      if (isValid(parsed)) value = parsed
    }
  } catch {
    // Private mode or corrupted data: keep the default.
  }
  const listeners = new Set<() => void>()
  return {
    get: () => value,
    set(next: T) {
      value = next
      try {
        localStorage.setItem(key, JSON.stringify(next))
      } catch {
        // Storage full or unavailable: keep the in-memory value.
      }
      listeners.forEach((l) => l())
    },
    subscribe(listener: () => void) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
  }
}

const isOneOf =
  <T extends string>(...options: T[]) =>
  (v: unknown): v is T =>
    options.includes(v as T)

export interface SavedPage {
  href: string
  title: string
  /** e.g. "Effect", "Guide 15.6", "Genre". */
  kind: string
  color: string
  at: number
}

const isSavedPages = (v: unknown): v is SavedPage[] =>
  Array.isArray(v) && v.every((p) => p && typeof p.href === 'string' && typeof p.title === 'string')

export type Theme = 'dark' | 'light'
export type Mode = 'guide' | 'cheat'

const themeStore = persisted<Theme>('musikit:theme', 'dark', isOneOf('dark', 'light'))
const modeStore = persisted<Mode>('musikit:mode', 'guide', isOneOf('guide', 'cheat'))
const bookmarkStore = persisted<SavedPage[]>('musikit:bookmarks', [], isSavedPages)
const recentStore = persisted<SavedPage[]>('musikit:recent', [], isSavedPages)

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0B0B12' : '#F6F6F9')
}
applyTheme(themeStore.get())

export function useTheme(): [Theme, (t: Theme) => void] {
  const theme = useSyncExternalStore(themeStore.subscribe, themeStore.get)
  return [
    theme,
    (t) => {
      applyTheme(t)
      themeStore.set(t)
    },
  ]
}

export function useMode(): [Mode, (m: Mode) => void] {
  return [useSyncExternalStore(modeStore.subscribe, modeStore.get), modeStore.set]
}

export function useBookmarks() {
  const bookmarks = useSyncExternalStore(bookmarkStore.subscribe, bookmarkStore.get)
  return {
    bookmarks,
    isBookmarked: (href: string) => bookmarks.some((b) => b.href === href),
    toggle(page: Omit<SavedPage, 'at'>) {
      const exists = bookmarks.some((b) => b.href === page.href)
      bookmarkStore.set(exists ? bookmarks.filter((b) => b.href !== page.href) : [{ ...page, at: Date.now() }, ...bookmarks])
    },
    remove: (href: string) => bookmarkStore.set(bookmarks.filter((b) => b.href !== href)),
  }
}

export function useRecent(): SavedPage[] {
  return useSyncExternalStore(recentStore.subscribe, recentStore.get)
}

const MAX_RECENT = 8

/** Adds the current page to "Recently viewed". */
export function useRecordVisit(page: Omit<SavedPage, 'at'> | undefined) {
  const { href, title, kind, color } = page ?? {}
  useEffect(() => {
    if (!href || !title || !kind || !color) return
    const rest = recentStore.get().filter((p) => p.href !== href)
    recentStore.set([{ href, title, kind, color, at: Date.now() }, ...rest].slice(0, MAX_RECENT))
  }, [href, title, kind, color])
}

import { PILLARS } from '../content/registry/pillars'
import {
  ALL_SECTIONS,
  COLORS,
  PARTS,
  effectCategories,
  genreFamilies,
  instrumentFamilies,
  library,
  pillarHref,
  effectsById,
  refForEffect,
  refForGenre,
  refForGlossary,
  refForGuide,
  refForInstrument,
  refForPlugin,
} from './content'
import { PLUGIN_CATEGORY_LABELS, capitalize } from './labels'

export const SEARCH_GROUPS = ['Pages', 'Guide', 'Effects', 'Instruments', 'Genres', 'Plugins', 'Glossary'] as const
export type SearchGroup = (typeof SEARCH_GROUPS)[number]

export interface SearchItem {
  key: string
  group: SearchGroup
  title: string
  subtitle: string
  href: string
  color: string
  /** Registry icon name (src/design/icons.tsx). */
  icon: string
  /** Planned pages rank below written ones. */
  ready: boolean
  boost?: number
  keywords?: string[]
  body?: string
}

interface Indexed extends SearchItem {
  nTitle: string
  nKeywords: string[]
  nBody: string
}

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

const topicText = (topics: { label?: string; text?: string; items: string[] }[]) =>
  topics.flatMap((t) => [t.label, t.text, ...t.items]).filter(Boolean).join(' ')

function buildItems(): SearchItem[] {
  const items: SearchItem[] = []

  const pages: [string, string, string, string, string][] = [
    ['Home', 'Start page', '/', COLORS.reference, 'compass'],
    ['Effects Encyclopedia', 'Every effect, by category', '/effects', COLORS.effects, 'zap'],
    ['Instrument Encyclopedia', 'Every instrument, by family', '/instruments', COLORS.instruments, 'guitar'],
    ['Genre Encyclopedia', 'Every genre, by family', '/genres', COLORS.genres, 'disc-3'],
    ['Plugin Registry', 'Industry, pro, budget, free, and stock plugins', '/plugins', COLORS.plugins, 'plug'],
    ['Glossary', 'A to Z definitions', '/glossary', COLORS.glossary, 'book-marked'],
    ['Quick Reference Hub', 'All cheat sheets in one place', '/reference', COLORS.reference, 'book-marked'],
    ['Interactive Tools', 'Calculators, explorers, and trainers', '/tools', COLORS.tools, 'mouse-pointer-click'],
    ['Bookmarks', 'Pages you saved', '/bookmarks', '#F5C542', 'book-marked'],
    ['Design System', 'Colors, components, and patterns', '/design', '#8B5CF6', 'sparkles'],
  ]
  for (const [title, subtitle, href, color, icon] of pages) {
    items.push({ key: `page:${href}`, group: 'Pages', title, subtitle, href, color, icon, ready: true, boost: 4 })
  }

  for (const p of PILLARS) {
    items.push({ key: `pillar:${p.id}`, group: 'Pages', title: p.name, subtitle: 'Pillar', href: pillarHref(p), color: p.color, icon: p.icon, ready: true, boost: 3 })
  }

  for (const part of PARTS) {
    items.push({
      key: `part:${part.part}`,
      group: 'Guide',
      title: `Part ${part.part}: ${part.shortTitle}`,
      subtitle: part.pillar.name,
      href: part.href,
      color: part.accent,
      icon: part.icon,
      ready: true,
      boost: 6,
      keywords: [part.title],
      body: topicText(part.topics),
    })
  }

  for (const s of ALL_SECTIONS) {
    if (s.kind !== 'guide') continue
    const page = s.pages[0]
    items.push({
      key: `section:${s.number}`,
      group: 'Guide',
      title: page ? page.title : s.shortTitle,
      subtitle: `${s.number} · ${PARTS.find((p) => p.part === s.part)?.shortTitle ?? ''}${page ? '' : ' · Planned'}`,
      href: s.href,
      color: s.accent,
      icon: PARTS.find((p) => p.part === s.part)?.icon ?? 'book-marked',
      ready: s.ready,
      boost: page ? 8 : 0,
      keywords: [s.title, s.number],
      body: [s.summary, topicText(s.topics), page?.summary, ...(page?.cheatSheet ?? [])].filter(Boolean).join(' '),
    })
  }

  for (const c of effectCategories) {
    items.push({ key: `cat:${c.id}`, group: 'Effects', title: c.name, subtitle: `Effect category · ${c.section}`, href: c.href, color: COLORS.effects, icon: c.icon, ready: true, boost: 2, body: c.outline ? topicText(c.outline.topics) : '' })
  }
  for (const f of instrumentFamilies) {
    items.push({ key: `ifam:${f.id}`, group: 'Instruments', title: f.name, subtitle: `Instrument family · ${f.section}`, href: f.href, color: COLORS.instruments, icon: f.icon, ready: true, boost: 2, body: f.outline ? topicText(f.outline.topics) : '' })
  }
  for (const f of genreFamilies) {
    items.push({ key: `gfam:${f.id}`, group: 'Genres', title: f.name, subtitle: `Genre family · ${f.section}`, href: f.href, color: f.color, icon: 'disc-3', ready: true, boost: 2, body: f.outline ? topicText(f.outline.topics) : '' })
  }

  for (const e of library.effects) {
    const r = refForEffect(e)
    const parent = e.parent ? effectsById.get(e.parent) : undefined
    items.push({
      key: r.ref,
      group: 'Effects',
      title: e.name,
      subtitle: parent ? `${parent.name} · ${e.typeGroup ?? 'Type'}` : e.kind === 'group' ? `${r.kindLabel} · Group` : r.kindLabel,
      href: r.href,
      color: r.color,
      icon: r.icon,
      ready: true,
      boost: e.kind === 'group' ? 10 : 8,
      keywords: [...e.aliases, parent?.name ?? '', e.typeGroup ?? ''].filter(Boolean),
      body: [e.summary, ...e.cheatSheet].join(' '),
    })
  }
  for (const i of library.instruments) {
    const r = refForInstrument(i)
    items.push({ key: r.ref, group: 'Instruments', title: i.name, subtitle: r.kindLabel, href: r.href, color: r.color, icon: r.icon, ready: true, boost: 8, keywords: i.aliases, body: [i.summary, ...i.cheatSheet].join(' ') })
  }
  for (const g of library.genres) {
    const r = refForGenre(g)
    items.push({
      key: r.ref,
      group: 'Genres',
      title: g.name,
      subtitle: `${r.kindLabel} · ${g.tempo.min}–${g.tempo.max} BPM`,
      href: r.href,
      color: r.color,
      icon: r.icon,
      ready: true,
      boost: 8,
      keywords: [...g.aliases, ...g.soundsLike],
      body: [g.description, ...g.cheatSheet].join(' '),
    })
  }
  for (const g of library.guide) {
    const r = refForGuide(g)
    items.push({ key: r.ref, group: 'Guide', title: g.title, subtitle: `Guide ${g.section}`, href: r.href, color: r.color, icon: r.icon, ready: true, boost: 8, body: [g.summary, ...g.cheatSheet].join(' ') })
  }
  for (const p of library.plugins) {
    const r = refForPlugin(p)
    items.push({
      key: r.ref,
      group: 'Plugins',
      title: p.name,
      subtitle: `${p.developer} · ${p.categories.map((c) => PLUGIN_CATEGORY_LABELS[c]).join(', ')}`,
      href: r.href,
      color: r.color,
      icon: r.icon,
      ready: true,
      boost: 6,
      keywords: [p.developer, ...(p.emulates ? [p.emulates] : [])],
      body: p.bestFor,
    })
  }
  for (const t of library.glossary) {
    const r = refForGlossary(t)
    items.push({ key: r.ref, group: 'Glossary', title: t.term, subtitle: capitalize(t.short), href: r.href, color: r.color, icon: r.icon, ready: true, boost: 5, keywords: t.aliases, body: t.long ?? '' })
  }

  // Sections already covered by a written guide entry are represented once.
  const seen = new Set<string>()
  return items.filter((i) => {
    const dedupe = i.group === 'Guide' ? i.href : i.key
    if (seen.has(dedupe)) return false
    seen.add(dedupe)
    return true
  })
}

let index: Indexed[] | undefined

function getIndex(): Indexed[] {
  index ??= buildItems().map((i) => ({
    ...i,
    nTitle: normalize(i.title),
    nKeywords: (i.keywords ?? []).map(normalize),
    nBody: normalize(`${i.subtitle} ${i.body ?? ''}`),
  }))
  return index
}

function fieldScore(field: string, token: string, weight: number): number {
  if (!field) return 0
  if (field === token) return 100 * weight
  if (field.startsWith(token)) return 45 * weight
  const at = field.indexOf(token)
  if (at < 0) return 0
  return (/[\s\-(/:·&]/.test(field[at - 1]) ? 25 : 10) * weight
}

export function search(query: string, group?: SearchGroup, limit = 60): SearchItem[] {
  const tokens = normalize(query).split(/\s+/).filter(Boolean)
  if (tokens.length === 0) return []
  const results: [Indexed, number][] = []
  for (const item of getIndex()) {
    if (group && item.group !== group) continue
    let total = 0
    for (const token of tokens) {
      const best = Math.max(
        fieldScore(item.nTitle, token, 1),
        ...item.nKeywords.map((k) => fieldScore(k, token, 0.8)),
        item.nBody.includes(token) ? 4 : 0,
      )
      if (best === 0) {
        total = 0
        break
      }
      total += best
    }
    if (total > 0) results.push([item, total + (item.boost ?? 0) + (item.ready ? 14 : 0)])
  }
  return results
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([item]) => item)
}

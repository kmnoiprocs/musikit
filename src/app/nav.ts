import { PILLARS, type Pillar } from '../content/registry/pillars'
import {
  COLORS,
  effectsById,
  genresById,
  genreFamilyById,
  guideById,
  instrumentsById,
  partByNumber,
  partsOfPillar,
  pillarHref,
  sectionByNumber,
  type PartInfo,
  type SectionInfo,
} from '../lib/content'

export interface NavNode {
  key: string
  label: string
  href: string
  color: string
  /** Registry icon name. */
  icon?: string
  /** Short mono label such as a section number. */
  badge?: string
  /** A written page exists (sections only). */
  ready?: boolean
  children?: NavNode[]
}

const sectionNode = (s: SectionInfo): NavNode => ({
  key: `s:${s.number}`,
  label: s.pages[0]?.title ?? s.shortTitle,
  href: s.href,
  color: s.accent,
  badge: s.number,
  ready: s.ready,
})

const partNode = (p: PartInfo): NavNode => ({
  key: `p:${p.part}`,
  label: p.shortTitle,
  href: p.href,
  color: p.accent,
  icon: p.icon,
  badge: String(p.part),
  children: p.sections.length ? p.sections.map(sectionNode) : undefined,
})

function pillarNode(pillar: Pillar): NavNode {
  const parts = partsOfPillar(pillar)
  const single = parts.length === 1 ? parts[0] : undefined
  return {
    key: `pl:${pillar.id}`,
    label: pillar.name,
    href: pillarHref(pillar),
    color: pillar.color,
    icon: pillar.icon,
    children: single ? (single.sections.length ? single.sections.map(sectionNode) : undefined) : parts.map(partNode),
  }
}

const ENCYCLOPEDIA_PILLARS = new Set(['effects', 'instruments', 'genres'])
const REFERENCE_PILLARS = new Set(['reference', 'interactive'])

const encyclopedia = (part: number, label: string, color: string, icon: string): NavNode => {
  const p = partByNumber.get(part)
  return { key: `p:${part}`, label, href: p?.href ?? '/', color, icon, children: p?.sections.map(sectionNode) }
}

export const NAV_GROUPS: { label: string; nodes: NavNode[] }[] = [
  { label: 'Learn', nodes: PILLARS.filter((p) => !ENCYCLOPEDIA_PILLARS.has(p.id) && !REFERENCE_PILLARS.has(p.id)).map(pillarNode) },
  {
    label: 'Encyclopedias',
    nodes: [
      encyclopedia(18, 'Effects', COLORS.effects, 'zap'),
      encyclopedia(19, 'Instruments', COLORS.instruments, 'guitar'),
      encyclopedia(20, 'Genres', COLORS.genres, 'disc-3'),
      { key: 'plugins', label: 'Plugin Registry', href: '/plugins', color: COLORS.plugins, icon: 'plug' },
    ],
  },
  {
    label: 'Reference',
    nodes: [
      { key: 'reference', label: 'Quick Reference', href: '/reference', color: COLORS.reference, icon: 'book-marked' },
      { key: 'glossary', label: 'Glossary', href: '/glossary', color: '#5EEAD4', icon: 'scroll-text' },
      { key: 'tools', label: 'Interactive Tools', href: '/tools', color: COLORS.tools, icon: 'mouse-pointer-click' },
    ],
  },
]

/** The sidebar href to highlight for a pathname; detail pages highlight their category or family. */
export function navHrefFor(pathname: string): string {
  const [, root, a, b] = pathname.split('/')
  if (root === 'effects' && a && a !== 'category') {
    const e = effectsById.get(a)
    return e ? `/effects/category/${e.category}` : '/effects'
  }
  if (root === 'instruments' && a && a !== 'family') {
    const i = instrumentsById.get(a)
    return i ? `/instruments/family/${i.family}` : '/instruments'
  }
  if (root === 'genres' && a && a !== 'family') {
    const g = genresById.get(a)
    return g && genreFamilyById.has(g.family) ? `/genres/family/${g.family}` : '/genres'
  }
  if (root === 'plugins') return '/plugins'
  if (root === 'guide' && a) {
    if (b && guideById.has(b)) return sectionByNumber.get(a)?.href ?? pathname
    return `/guide/${a}`
  }
  return pathname
}

/** Keys of the node with this href and all of its ancestors. */
export function ancestorKeys(href: string): string[] {
  const walk = (nodes: NavNode[], trail: string[]): string[] | undefined => {
    for (const n of nodes) {
      const path = [...trail, n.key]
      if (n.href === href) return path
      const found = n.children && walk(n.children, path)
      if (found) return found
    }
  }
  for (const g of NAV_GROUPS) {
    const found = walk(g.nodes, [])
    if (found) return found
  }
  return []
}

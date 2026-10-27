import { contentResult, library } from '../content/collections'
import { EFFECT_CATEGORIES } from '../content/registry/effectCategories'
import { GENRE_FAMILIES } from '../content/registry/genreFamilies'
import { INSTRUMENT_FAMILIES } from '../content/registry/instrumentFamilies'
import { OUTLINE, type OutlineTopic } from '../content/registry/outline.generated'
import { PILLARS, type Pillar } from '../content/registry/pillars'
import {
  INLINE_REF_PATTERN,
  REF_PATTERN,
  type Effect,
  type Genre,
  type GlossaryTerm,
  type GuideSection,
  type Instrument,
  type Plugin,
  type RefKind,
} from '../content/schema'
import type { RecTier } from '../design/tokens'
import { shortTitle } from './labels'

export { contentResult, library }

export interface Crumb {
  label: string
  href?: string
}

const byId = <T extends { id: string }>(items: T[]) => new Map(items.map((i) => [i.id, i]))

export const effectsById = byId(library.effects)
export const instrumentsById = byId(library.instruments)
export const genresById = byId(library.genres)
export const pluginsById = byId(library.plugins)
export const glossaryById = byId(library.glossary)
export const guideById = byId(library.guide)

export const pillarById = new Map<string, Pillar>(PILLARS.map((p) => [p.id, p]))
const pillarColor = (id: string) => pillarById.get(id)?.color ?? '#A1A1AA'

export const COLORS = {
  effects: pillarColor('effects'),
  instruments: pillarColor('instruments'),
  genres: pillarColor('genres'),
  plugins: '#84CC16',
  glossary: '#E5E7EB',
  reference: pillarColor('reference'),
  tools: pillarColor('interactive'),
}

export const effectCategoryById = new Map(EFFECT_CATEGORIES.map((c) => [c.id as string, c]))
export const instrumentFamilyById = new Map(INSTRUMENT_FAMILIES.map((f) => [f.id as string, f]))
export const genreFamilyById = new Map(GENRE_FAMILIES.map((f) => [f.id as string, f]))

// ---------------------------------------------------------------------------
// Hrefs and colors per entry
// ---------------------------------------------------------------------------

const guideBySection = new Map<string, GuideSection[]>()
for (const g of library.guide) guideBySection.set(g.section, [...(guideBySection.get(g.section) ?? []), g])

export function guideHref(g: GuideSection): string {
  const siblings = guideBySection.get(g.section) ?? []
  return siblings[0]?.id === g.id ? `/guide/${g.section}` : `/guide/${g.section}/${g.id}`
}

export const effectHref = (id: string) => `/effects/${id}`
export const instrumentHref = (id: string) => `/instruments/${id}`
export const genreHref = (id: string) => `/genres/${id}`
export const pluginHref = (id: string) => `/plugins/${id}`
export const glossaryHref = (id: string) => `/glossary#${id}`

export const genreColor = (g: Genre) => genreFamilyById.get(g.family)?.color ?? COLORS.genres
export const glossaryColor = (t: GlossaryTerm) => pillarColor(t.pillar)

// ---------------------------------------------------------------------------
// The outline as a navigation model
// ---------------------------------------------------------------------------

export type SectionKind = 'guide' | 'effects' | 'instruments' | 'genres'

export interface SectionInfo {
  number: string
  title: string
  shortTitle: string
  summary?: string
  topics: OutlineTopic[]
  part: number
  accent: string
  href: string
  kind: SectionKind
  /** Registry ID for encyclopedia sections (an effect category or family). */
  registryId?: string
  /** Guide pages written for this section. */
  pages: GuideSection[]
  /** Encyclopedia entries filed under this section's category or family. */
  entryCount: number
  ready: boolean
}

export interface PartInfo {
  part: number
  title: string
  shortTitle: string
  accent: string
  icon: string
  pillar: Pillar
  href: string
  sections: SectionInfo[]
  topics: OutlineTopic[]
  readyCount: number
}

const PART_HREFS: Record<number, string> = { 18: '/effects', 19: '/instruments', 20: '/genres', 27: '/reference', 28: '/tools' }
export const partHref = (part: number) => PART_HREFS[part] ?? `/part/${part}`

function buildSection(s: (typeof OUTLINE)[number]['sections'][number], part: number, accent: string): SectionInfo {
  const pages = guideBySection.get(s.number) ?? []
  const base = { ...s, shortTitle: shortTitle(s.title), part, pages }
  const category = part === 18 ? EFFECT_CATEGORIES.find((c) => c.section === s.number) : undefined
  if (category) {
    const entryCount = library.effects.filter((e) => e.category === category.id).length
    return { ...base, shortTitle: category.name, accent, kind: 'effects', registryId: category.id, href: `/effects/category/${category.id}`, entryCount, ready: entryCount > 0 }
  }
  const instrumentFamily = part === 19 ? INSTRUMENT_FAMILIES.find((f) => f.section === s.number) : undefined
  if (instrumentFamily) {
    const entryCount = library.instruments.filter((i) => i.family === instrumentFamily.id).length
    return { ...base, shortTitle: instrumentFamily.name, accent, kind: 'instruments', registryId: instrumentFamily.id, href: `/instruments/family/${instrumentFamily.id}`, entryCount, ready: entryCount > 0 }
  }
  const genreFamily = part === 20 ? GENRE_FAMILIES.find((f) => f.section === s.number) : undefined
  if (genreFamily) {
    const entryCount = library.genres.filter((g) => g.family === genreFamily.id).length
    return { ...base, shortTitle: genreFamily.name, accent: genreFamily.color, kind: 'genres', registryId: genreFamily.id, href: `/genres/family/${genreFamily.id}`, entryCount, ready: entryCount > 0 }
  }
  return { ...base, accent, kind: 'guide', href: `/guide/${s.number}`, entryCount: 0, ready: pages.length > 0 }
}

export const PARTS: PartInfo[] = OUTLINE.map((p) => {
  const pillar = PILLARS.find((x) => x.parts.some((y) => y.part === p.part))
  const meta = pillar?.parts.find((y) => y.part === p.part)
  if (!pillar || !meta) throw new Error(`Part ${p.part} is not assigned to a pillar in pillars.ts`)
  const sections = p.sections.map((s) => buildSection(s, p.part, meta.accent))
  return {
    part: p.part,
    title: p.title,
    shortTitle: shortTitle(p.title),
    accent: meta.accent,
    icon: meta.icon,
    pillar,
    href: partHref(p.part),
    sections,
    topics: p.topics,
    readyCount: sections.filter((s) => s.ready).length,
  }
})

export const partByNumber = new Map(PARTS.map((p) => [p.part, p]))
export const sectionByNumber = new Map(PARTS.flatMap((p) => p.sections.map((s) => [s.number, s] as const)))
export const ALL_SECTIONS = PARTS.flatMap((p) => p.sections)

export function partsOfPillar(pillar: Pillar): PartInfo[] {
  return pillar.parts.map((x) => partByNumber.get(x.part)).filter((p): p is PartInfo => !!p)
}

/** Single-Part pillars and encyclopedias link straight to their content. */
export function pillarHref(pillar: Pillar): string {
  return pillar.parts.length === 1 ? partHref(pillar.parts[0].part) : `/learn/${pillar.id}`
}

export function pillarStats(pillar: Pillar) {
  const sections = partsOfPillar(pillar).flatMap((p) => p.sections)
  const topics = partsOfPillar(pillar).reduce((n, p) => n + p.topics.length, 0)
  return sections.length > 0
    ? { total: sections.length, ready: sections.filter((s) => s.ready).length, unit: 'section' }
    : { total: topics, ready: 0, unit: 'topic' }
}

/** Previous and next sections in reading order across the whole outline. */
export function neighbors(number: string): { prev?: SectionInfo; next?: SectionInfo } {
  const i = ALL_SECTIONS.findIndex((s) => s.number === number)
  return { prev: ALL_SECTIONS[i - 1], next: ALL_SECTIONS[i + 1] }
}

export function partCrumbs(part: PartInfo): Crumb[] {
  const crumbs: Crumb[] = []
  if (part.pillar.parts.length > 1) crumbs.push({ label: part.pillar.name, href: pillarHref(part.pillar) })
  crumbs.push({ label: `Part ${part.part}: ${part.shortTitle}`, href: part.href })
  return crumbs
}

// ---------------------------------------------------------------------------
// Encyclopedia groupings
// ---------------------------------------------------------------------------

export const effectCategories = EFFECT_CATEGORIES.map((c) => ({
  ...c,
  href: `/effects/category/${c.id}`,
  entries: library.effects.filter((e) => e.category === c.id),
  outline: sectionByNumber.get(c.section),
}))

export const instrumentFamilies = INSTRUMENT_FAMILIES.map((f) => ({
  ...f,
  href: `/instruments/family/${f.id}`,
  entries: library.instruments.filter((i) => i.family === f.id),
  outline: sectionByNumber.get(f.section),
}))

export const genreFamilies = GENRE_FAMILIES.map((f) => ({
  ...f,
  href: `/genres/family/${f.id}`,
  entries: library.genres.filter((g) => g.family === f.id),
  outline: sectionByNumber.get(f.section),
}))

// ---------------------------------------------------------------------------
// Cross-references
// ---------------------------------------------------------------------------

export interface ResolvedRef {
  ref: string
  kind: RefKind
  id: string
  title: string
  kindLabel: string
  href: string
  color: string
  /** A registry icon name for src/design/icons.tsx. */
  icon: string
}

export function refForEffect(e: Effect): ResolvedRef {
  const category = effectCategoryById.get(e.category)
  return { ref: `effect:${e.id}`, kind: 'effect', id: e.id, title: e.name, kindLabel: category?.name ?? 'Effect', href: effectHref(e.id), color: COLORS.effects, icon: category?.icon ?? 'zap' }
}

export function refForInstrument(i: Instrument): ResolvedRef {
  const family = instrumentFamilyById.get(i.family)
  return { ref: `instrument:${i.id}`, kind: 'instrument', id: i.id, title: i.name, kindLabel: family?.name ?? 'Instrument', href: instrumentHref(i.id), color: COLORS.instruments, icon: family?.icon ?? 'guitar' }
}

export function refForGenre(g: Genre): ResolvedRef {
  const family = genreFamilyById.get(g.family)
  return { ref: `genre:${g.id}`, kind: 'genre', id: g.id, title: g.name, kindLabel: family?.name ?? 'Genre', href: genreHref(g.id), color: genreColor(g), icon: 'disc-3' }
}

export function refForGuide(g: GuideSection): ResolvedRef {
  const section = sectionByNumber.get(g.section)
  const part = section ? partByNumber.get(section.part) : undefined
  return { ref: `guide:${g.id}`, kind: 'guide', id: g.id, title: g.title, kindLabel: `Guide ${g.section}`, href: guideHref(g), color: section?.accent ?? '#A1A1AA', icon: part?.icon ?? 'book-marked' }
}

export function refForPlugin(p: Plugin): ResolvedRef {
  return { ref: `plugin:${p.id}`, kind: 'plugin', id: p.id, title: p.name, kindLabel: p.developer, href: pluginHref(p.id), color: COLORS.plugins, icon: 'plug' }
}

export function refForGlossary(t: GlossaryTerm): ResolvedRef {
  return { ref: `glossary:${t.id}`, kind: 'glossary', id: t.id, title: t.term, kindLabel: 'Glossary', href: glossaryHref(t.id), color: glossaryColor(t), icon: 'book-marked' }
}

export function resolveRef(ref: string): ResolvedRef | undefined {
  const m = REF_PATTERN.exec(ref)
  if (!m) return undefined
  const [, kind, id] = m
  switch (kind as RefKind) {
    case 'effect': {
      const e = effectsById.get(id)
      return e && refForEffect(e)
    }
    case 'instrument': {
      const i = instrumentsById.get(id)
      return i && refForInstrument(i)
    }
    case 'genre': {
      const g = genresById.get(id)
      return g && refForGenre(g)
    }
    case 'guide': {
      const g = guideById.get(id)
      return g && refForGuide(g)
    }
    case 'plugin': {
      const p = pluginsById.get(id)
      return p && refForPlugin(p)
    }
    case 'glossary': {
      const t = glossaryById.get(id)
      return t && refForGlossary(t)
    }
  }
}

export const resolveRefs = (refs: string[]) => refs.map(resolveRef).filter((r): r is ResolvedRef => !!r)

/** Every "kind:id" reference that appears anywhere inside a value, including inline [[refs]]. */
function collectRefs(value: unknown, out = new Set<string>()): Set<string> {
  if (typeof value === 'string') {
    if (REF_PATTERN.test(value)) out.add(value)
    for (const m of value.matchAll(INLINE_REF_PATTERN)) out.add(m[1])
  } else if (Array.isArray(value)) value.forEach((v) => collectRefs(v, out))
  else if (value && typeof value === 'object') Object.values(value).forEach((v) => collectRefs(v, out))
  return out
}

const ALL_SOURCES: ResolvedRef[] = [
  ...library.effects.map(refForEffect),
  ...library.instruments.map(refForInstrument),
  ...library.genres.map(refForGenre),
  ...library.guide.map(refForGuide),
  ...library.glossary.map(refForGlossary),
]

const ENTRY_BY_REF = new Map<string, unknown>([
  ...library.effects.map((e) => [`effect:${e.id}`, e] as const),
  ...library.instruments.map((e) => [`instrument:${e.id}`, e] as const),
  ...library.genres.map((e) => [`genre:${e.id}`, e] as const),
  ...library.guide.map((e) => [`guide:${e.id}`, e] as const),
  ...library.glossary.map((e) => [`glossary:${e.id}`, e] as const),
])

const backlinkMap = new Map<string, ResolvedRef[]>()
for (const source of ALL_SOURCES) {
  for (const target of collectRefs(ENTRY_BY_REF.get(source.ref))) {
    if (target === source.ref) continue
    const list = backlinkMap.get(target) ?? []
    if (!list.some((r) => r.ref === source.ref)) list.push(source)
    backlinkMap.set(target, list)
  }
}

/** Entries that link to the given "kind:id". */
export const backlinks = (ref: string): ResolvedRef[] => backlinkMap.get(ref) ?? []

export interface PluginMention {
  source: ResolvedRef
  tier: Exclude<RecTier, 'stock'>
}

const pluginMentions = new Map<string, PluginMention[]>()
const recSources: [ResolvedRef, { pluginRecs: Effect['pluginRecs'] }][] = [
  ...library.effects.map((e) => [refForEffect(e), e] as [ResolvedRef, Effect]),
  ...library.instruments.map((e) => [refForInstrument(e), e] as [ResolvedRef, Instrument]),
  ...library.genres.map((e) => [refForGenre(e), e] as [ResolvedRef, Genre]),
]
for (const [source, entry] of recSources) {
  for (const tier of ['industryStandard', 'proAlternatives', 'budget', 'free'] as const) {
    for (const id of entry.pluginRecs[tier]) pluginMentions.set(id, [...(pluginMentions.get(id) ?? []), { source, tier }])
  }
}

/** Where a plugin is recommended, and in which tier. */
export const pluginMentionsFor = (id: string): PluginMention[] => pluginMentions.get(id) ?? []

// ---------------------------------------------------------------------------
// Totals for the home page and hubs
// ---------------------------------------------------------------------------

export const TOTALS = {
  parts: PARTS.length,
  sections: ALL_SECTIONS.length,
  readySections: ALL_SECTIONS.filter((s) => s.ready).length,
  effectCategories: EFFECT_CATEGORIES.length,
  instrumentFamilies: INSTRUMENT_FAMILIES.length,
  genreFamilies: GENRE_FAMILIES.length,
  entries: library.effects.length + library.instruments.length + library.genres.length + library.guide.length,
  plugins: library.plugins.length,
  glossary: library.glossary.length,
}

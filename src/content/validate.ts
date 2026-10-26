import type { ZodType } from 'zod'
import { EFFECT_CATEGORIES } from './registry/effectCategories'
import { GENRE_FAMILIES } from './registry/genreFamilies'
import { INSTRUMENT_FAMILIES } from './registry/instrumentFamilies'
import { OUTLINE } from './registry/outline.generated'
import {
  EffectSchema,
  GenreSchema,
  GlossaryTermSchema,
  GuideSectionSchema,
  INLINE_REF_PATTERN,
  InstrumentSchema,
  NOTE_PATTERN,
  PluginSchema,
  REF_KINDS,
  REF_PATTERN,
  STATUSES,
  type Effect,
  type Genre,
  type GlossaryTerm,
  type GuideSection,
  type Instrument,
  type Plugin,
  type PluginRecs,
  type RefKind,
  type Status,
} from './schema'

export interface RawItem {
  /** Where the item came from, for error messages, e.g. "entries/effects/compressor.ts". */
  file: string
  data: unknown
}

export interface RawCollections {
  plugins: RawItem[]
  effects: RawItem[]
  instruments: RawItem[]
  genres: RawItem[]
  guide: RawItem[]
  glossary: RawItem[]
}

export interface ContentLibrary {
  plugins: Plugin[]
  effects: Effect[]
  instruments: Instrument[]
  genres: Genre[]
  guide: GuideSection[]
  glossary: GlossaryTerm[]
}

export interface Issue {
  level: 'error' | 'warning'
  file: string
  message: string
}

export interface CoverageStat {
  label: string
  covered: number
  total: number
}

export interface ValidationResult {
  library: ContentLibrary
  errors: Issue[]
  warnings: Issue[]
  /** Entry counts by status; plugins have no status and are counted separately. */
  statusCounts: Record<Exclude<keyof ContentLibrary, 'plugins'>, Record<Status, number>>
  coverage: CoverageStat[]
}

type Collection = keyof ContentLibrary

const REF_KIND_TO_COLLECTION: Record<RefKind, Collection> = {
  effect: 'effects',
  instrument: 'instruments',
  genre: 'genres',
  guide: 'guide',
  glossary: 'glossary',
  plugin: 'plugins',
}

const PLACEHOLDER_PATTERN = /\b(TODO|TBD|FIXME|lorem ipsum|placeholder)\b/i

/** Minimum counts an entry must meet before it can be marked "published". */
const PUBLISH_RULES: Record<'effects' | 'instruments' | 'genres' | 'guide', [path: string, min: number][]> = {
  effects: [
    ['sources', 2],
    ['cheatSheet', 4],
    ['controls', 3],
    ['variants', 2],
    ['whenNotToUse', 1],
    ['startingSettings', 3],
    ['techniques', 3],
    ['unorthodoxTechniques', 2],
    ['mistakes', 3],
    ['pluginRecs.proAlternatives', 1],
    ['pluginRecs.budget', 1],
    ['pluginRecs.stock', 3],
  ],
  instruments: [
    ['sources', 2],
    ['cheatSheet', 4],
    ['articulations', 3],
    ['scales', 2],
    ['genreUsage', 3],
    ['realismTips', 5],
    ['writingTips', 3],
    ['recordingTips', 2],
    ['mixingTips', 3],
    ['notablePlayers', 3],
    ['pluginRecs.proAlternatives', 1],
  ],
  genres: [
    ['sources', 2],
    ['cheatSheet', 4],
    ['soundsLike', 3],
    ['history.keyMoments', 3],
    ['progressions', 4],
    ['recipe', 8],
    ['authenticityTips', 3],
    ['mistakes', 3],
    ['essentialListening', 8],
    ['artists.pioneers', 2],
    ['artists.modern', 3],
  ],
  guide: [
    ['sources', 2],
    ['cheatSheet', 4],
    ['blocks', 4],
    ['techniqueCards', 2],
  ],
}

function get(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((o, k) => (o && typeof o === 'object' ? (o as Record<string, unknown>)[k] : undefined), obj)
}

/** Visit every string and every object nested anywhere inside a value. */
function walk(value: unknown, onString: (s: string) => void, onObject?: (o: Record<string, unknown>) => void): void {
  if (typeof value === 'string') onString(value)
  else if (Array.isArray(value)) value.forEach((v) => walk(v, onString, onObject))
  else if (value && typeof value === 'object') {
    onObject?.(value as Record<string, unknown>)
    Object.values(value).forEach((v) => walk(v, onString, onObject))
  }
}

export function noteToMidi(note: string): number | undefined {
  const m = NOTE_PATTERN.exec(note)
  if (!m) return undefined
  const base: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }
  const accidental = m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0
  return (Number(m[3]) + 1) * 12 + base[m[1]] + accidental
}

export function validateContent(raw: RawCollections): ValidationResult {
  const errors: Issue[] = []
  const warnings: Issue[] = []
  const error = (file: string, message: string) => errors.push({ level: 'error', file, message })
  const warn = (file: string, message: string) => warnings.push({ level: 'warning', file, message })

  // 1. Schema validation
  function parseAll<T>(items: RawItem[], schema: ZodType<T>): { file: string; entry: T }[] {
    const out: { file: string; entry: T }[] = []
    for (const item of items) {
      const result = schema.safeParse(item.data)
      if (result.success) out.push({ file: item.file, entry: result.data })
      else for (const issue of result.error.issues) error(item.file, `${issue.path.join('.') || '(root)'}: ${issue.message}`)
    }
    return out
  }

  const parsed = {
    plugins: parseAll(raw.plugins, PluginSchema),
    effects: parseAll(raw.effects, EffectSchema),
    instruments: parseAll(raw.instruments, InstrumentSchema),
    genres: parseAll(raw.genres, GenreSchema),
    guide: parseAll(raw.guide, GuideSectionSchema),
    glossary: parseAll(raw.glossary, GlossaryTermSchema),
  }

  // 2. Unique IDs per collection
  const ids = {} as Record<Collection, Set<string>>
  for (const key of Object.keys(parsed) as Collection[]) {
    ids[key] = new Set()
    for (const { file, entry } of parsed[key]) {
      if (ids[key].has(entry.id)) error(file, `duplicate ${key} id "${entry.id}"`)
      ids[key].add(entry.id)
    }
  }
  const pluginsById = new Map(parsed.plugins.map(({ entry }) => [entry.id, entry]))
  const techniqueCardIds = new Set<string>()
  for (const { file, entry } of parsed.guide) {
    for (const card of entry.techniqueCards) {
      if (techniqueCardIds.has(card.id)) error(file, `duplicate technique card id "${card.id}"`)
      techniqueCardIds.add(card.id)
    }
  }

  // 3. Cross-references, plugin recommendations, tables, placeholder text
  const checkRef = (file: string, ref: string) => {
    const m = REF_PATTERN.exec(ref)
    if (!m) return error(file, `malformed reference "${ref}" (expected kind:id with kind in ${REF_KINDS.join(', ')})`)
    const collection = REF_KIND_TO_COLLECTION[m[1] as RefKind]
    if (!ids[collection].has(m[2])) error(file, `reference "${ref}" does not match any ${collection} entry`)
  }

  const checkPluginRecs = (file: string, recs: PluginRecs) => {
    const tiers: [keyof PluginRecs, string[] | undefined][] = [
      ['industryStandard', recs.industryStandard],
      ['proAlternatives', recs.proAlternatives],
      ['budget', recs.budget],
      ['free', recs.free],
    ]
    for (const [tier, list] of tiers) {
      for (const id of list ?? []) {
        const plugin = pluginsById.get(id)
        if (!plugin) {
          error(file, `pluginRecs.${tier}: "${id}" is not in the plugin registry`)
          continue
        }
        if (tier === 'free' && plugin.priceTier !== 'free') error(file, `pluginRecs.free: "${id}" is priced "${plugin.priceTier}", not free`)
        if (tier === 'budget' && plugin.priceTier !== 'budget') error(file, `pluginRecs.budget: "${id}" is priced "${plugin.priceTier}", not budget`)
      }
    }
  }

  for (const key of Object.keys(parsed) as Collection[]) {
    for (const { file, entry } of parsed[key] as { file: string; entry: { status?: Status } }[]) {
      const strict = entry.status === 'review' || entry.status === 'published'
      walk(
        entry,
        (s) => {
          if (REF_PATTERN.test(s)) checkRef(file, s)
          for (const m of s.matchAll(INLINE_REF_PATTERN)) checkRef(file, m[1])
          if (strict && PLACEHOLDER_PATTERN.test(s)) error(file, `placeholder text found in a ${entry.status} entry: "${s.slice(0, 60)}"`)
        },
        (o) => {
          if ('industryStandard' in o && 'free' in o) checkPluginRecs(file, o as unknown as PluginRecs)
          if (o.type === 'table' && Array.isArray(o.columns) && Array.isArray(o.rows)) {
            const width = o.columns.length
            ;(o.rows as unknown[][]).forEach((row, i) => {
              if (row.length !== width) error(file, `table row ${i} has ${row.length} cells but there are ${width} columns`)
            })
          }
        },
      )
    }
  }

  for (const { file, entry } of parsed.plugins) {
    for (const alt of entry.alternatives) if (!pluginsById.has(alt)) error(file, `alternatives: "${alt}" is not in the plugin registry`)
    if (entry.priceTier === 'free' && entry.approxPriceUsd) error(file, 'free plugins must not set approxPriceUsd')
  }

  // 4. Collection-specific logic checks
  for (const { file, entry } of parsed.genres) {
    const { min, max, typical } = entry.tempo
    if (!(min <= typical && typical <= max)) error(file, `tempo must satisfy min <= typical <= max (got ${min}/${typical}/${max})`)
    if (entry.parent && !ids.genres.has(entry.parent)) error(file, `parent genre "${entry.parent}" does not exist`)
    if (entry.parent === entry.id) error(file, 'a genre cannot be its own parent')
    const [lenLo, lenHi] = entry.arrangement.typicalLengthSeconds
    if (lenLo > lenHi) error(file, 'arrangement.typicalLengthSeconds must be [shortest, longest]')
    const lufs = entry.master.integratedLufs
    if (lufs && (lufs[0] > lufs[1] || lufs[1] > 0)) error(file, 'master.integratedLufs must be [quietest, loudest] and both negative')
    const grid = entry.drums.grid
    grid?.lanes.forEach((lane) => {
      if (lane.pattern.length !== grid.steps) error(file, `drum lane "${lane.instrument}" has ${lane.pattern.length} steps, expected ${grid.steps}`)
    })
    const modes = new Set(entry.progressions.map((p) => p.mode))
    if (entry.status !== 'stub' && !(modes.has('major') && modes.has('minor'))) warn(file, 'progressions: consider including both major and minor examples')
  }

  for (const { file, entry } of parsed.instruments) {
    const { lowest, highest, midiLow, midiHigh } = entry.range
    if (noteToMidi(lowest) !== midiLow) error(file, `range.midiLow ${midiLow} does not match ${lowest} (= ${noteToMidi(lowest)})`)
    if (noteToMidi(highest) !== midiHigh) error(file, `range.midiHigh ${midiHigh} does not match ${highest} (= ${noteToMidi(highest)})`)
    if (midiLow > midiHigh) error(file, 'range.lowest is above range.highest')
    for (const key of ['fundamentalHz', 'bodyHz', 'presenceHz', 'airHz'] as const) {
      const r = entry.frequencyProfile[key]
      if (r && r[0] >= r[1]) error(file, `frequencyProfile.${key} must be [low, high]`)
    }
  }

  const validSections = new Set(OUTLINE.flatMap((p) => p.sections.map((s) => s.number)))
  for (const { file, entry } of parsed.guide) {
    if (!validSections.has(entry.section)) error(file, `section "${entry.section}" is not in docs/MASTER_OUTLINE.md`)
  }

  const today = new Date().toISOString().slice(0, 10)
  for (const key of Object.keys(parsed) as Collection[]) {
    for (const { file, entry } of parsed[key] as { file: string; entry: { lastVerified: string } }[]) {
      if (entry.lastVerified > today) warn(file, `lastVerified ${entry.lastVerified} is in the future`)
    }
  }

  // 5. Quality thresholds for entries in review (warnings) or published (errors)
  for (const key of Object.keys(PUBLISH_RULES) as (keyof typeof PUBLISH_RULES)[]) {
    for (const { file, entry } of parsed[key] as { file: string; entry: { status: Status } }[]) {
      if (entry.status !== 'review' && entry.status !== 'published') continue
      const report = entry.status === 'published' ? error : warn
      for (const [path, min] of PUBLISH_RULES[key]) {
        const value = get(entry, path)
        const count = Array.isArray(value) ? value.length : 0
        if (count < min) report(file, `${path} has ${count} item(s); ${entry.status} entries need at least ${min}`)
      }
    }
  }

  // 6. Stats
  const library: ContentLibrary = {
    plugins: parsed.plugins.map((p) => p.entry),
    effects: parsed.effects.map((p) => p.entry),
    instruments: parsed.instruments.map((p) => p.entry),
    genres: parsed.genres.map((p) => p.entry),
    guide: parsed.guide.map((p) => p.entry),
    glossary: parsed.glossary.map((p) => p.entry),
  }

  const statusCounts = {} as ValidationResult['statusCounts']
  for (const key of ['effects', 'instruments', 'genres', 'guide', 'glossary'] as const) {
    statusCounts[key] = Object.fromEntries(STATUSES.map((s) => [s, 0])) as Record<Status, number>
    for (const entry of library[key]) statusCounts[key][entry.status]++
  }

  const coveredSections = new Set(library.guide.map((g) => g.section))
  const coverage: CoverageStat[] = [
    { label: 'Guide sections with a page', covered: coveredSections.size, total: validSections.size },
    {
      label: 'Effect categories with entries',
      covered: EFFECT_CATEGORIES.filter((c) => library.effects.some((e) => e.category === c.id)).length,
      total: EFFECT_CATEGORIES.length,
    },
    {
      label: 'Instrument families with entries',
      covered: INSTRUMENT_FAMILIES.filter((f) => library.instruments.some((i) => i.family === f.id)).length,
      total: INSTRUMENT_FAMILIES.length,
    },
    {
      label: 'Genre families with entries',
      covered: GENRE_FAMILIES.filter((f) => library.genres.some((g) => g.family === f.id)).length,
      total: GENRE_FAMILIES.length,
    },
  ]

  return { library, errors, warnings, statusCounts, coverage }
}

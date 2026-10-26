import { z } from 'zod'

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
export const Slug = z.string().regex(SLUG_PATTERN, 'must be a lowercase kebab-case slug, e.g. "tape-delay"')

export const REF_KINDS = ['effect', 'instrument', 'genre', 'guide', 'glossary', 'plugin'] as const
export type RefKind = (typeof REF_KINDS)[number]

/** A cross-reference to another entry, written as "kind:id", e.g. "effect:compressor". */
export const REF_PATTERN = /^(effect|instrument|genre|guide|glossary|plugin):([a-z0-9]+(?:-[a-z0-9]+)*)$/
export const Ref = z.string().regex(REF_PATTERN, 'must look like "kind:id", e.g. "effect:compressor"')

/** Inline cross-reference inside any text field: [[effect:compressor]] or [[effect:compressor|a compressor]]. */
export const INLINE_REF_PATTERN = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g

export const IsoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'must be a YYYY-MM-DD date')
export const SectionNumber = z.string().regex(/^\d{1,2}\.\d{1,2}$/, 'must be an outline section number, e.g. "15.6"')
export const Text = z.string().trim().min(1, 'must not be empty')

export const STATUSES = ['stub', 'draft', 'review', 'published'] as const
export const Status = z.enum(STATUSES)
export type Status = z.infer<typeof Status>

export const SkillLevel = z.enum(['beginner', 'intermediate', 'advanced'])
export type SkillLevel = z.infer<typeof SkillLevel>

export const ROLES = [
  'beatmaker',
  'songwriter',
  'vocalist',
  'rapper',
  'recording-engineer',
  'mix-engineer',
  'mastering-engineer',
  'artist-entrepreneur',
  'media-composer',
] as const
export const Role = z.enum(ROLES)
export type Role = z.infer<typeof Role>

export const Source = z.object({
  title: Text,
  author: z.string().optional(),
  url: z.url().optional(),
  note: z.string().optional(),
})
export type Source = z.infer<typeof Source>

export const CALLOUT_TYPES = ['tip', 'pro', 'unorthodox', 'mistake', 'myth', 'free', 'cheatsheet', 'warning'] as const
export const CalloutType = z.enum(CALLOUT_TYPES)
export type CalloutType = z.infer<typeof CalloutType>

export const Callout = z.object({
  variant: CalloutType,
  title: z.string().optional(),
  body: Text,
})
export type Callout = z.infer<typeof Callout>

/** One parameter/value pair, used for starting settings and cheat-sheet rows. */
export const Setting = z.object({
  param: Text,
  value: Text,
  note: z.string().optional(),
})
export type Setting = z.infer<typeof Setting>

export const DAWS = [
  'ableton-live',
  'fl-studio',
  'logic-pro',
  'pro-tools',
  'cubase',
  'studio-one',
  'reaper',
  'bitwig-studio',
  'reason',
  'cakewalk-sonar',
  'garageband',
  'bandlab',
] as const
export const Daw = z.enum(DAWS)

export const StockEquivalent = z.object({
  daw: Daw,
  name: Text,
  note: z.string().optional(),
})

/** Plugin recommendations by tier. Every ID must exist in the plugin registry (src/content/plugins). */
export const PluginRecs = z.object({
  industryStandard: z.array(Slug).min(1),
  proAlternatives: z.array(Slug).default([]),
  budget: z.array(Slug).default([]),
  free: z.array(Slug).min(1, 'every entry needs at least one free option'),
  stock: z.array(StockEquivalent).default([]),
  notes: z.string().optional(),
})
export type PluginRecs = z.infer<typeof PluginRecs>

export const NamedDescription = z.object({
  name: Text,
  description: Text,
})

export const Technique = z.object({
  name: Text,
  description: Text,
  steps: z.array(Text).default([]),
  settings: z.array(Setting).default([]),
})
export type Technique = z.infer<typeof Technique>

import { z } from 'zod'
import { GENRE_FAMILY_IDS } from '../registry/genreFamilies'
import { PluginRecs, Ref, Slug, Text } from './common'
import { EntryMeta } from './meta'

/**
 * Drum grid lanes: one character per step.
 * "X" accent, "x" hit, "o" ghost note, "r" roll, "." rest.
 */
export const DRUM_LANE_PATTERN = /^[Xxor.]+$/

export const Progression = z.object({
  numerals: Text,
  mode: z.enum(['major', 'minor', 'modal']),
  exampleKey: Text,
  exampleChords: Text,
  usage: z.string().optional(),
})

export const GenreSchema = EntryMeta.extend({
  name: Text,
  aliases: z.array(Text).default([]),
  family: z.enum(GENRE_FAMILY_IDS),
  /** Parent genre ID for sub-genres. */
  parent: Slug.optional(),
  soundsLike: z.array(Text).min(1),
  description: Text,
  cheatSheet: z.array(Text).min(3).max(8),
  history: z.object({
    origins: Text,
    era: Text,
    place: Text,
    keyMoments: z.array(z.object({ year: Text, event: Text })).default([]),
    evolution: Text,
    today: Text,
  }),
  tempo: z.object({
    min: z.number().positive(),
    max: z.number().positive(),
    typical: z.number().positive(),
    feel: z.enum(['straight', 'swing', 'shuffle', 'half-time', 'double-time', 'variable']),
    timeSignatures: z.array(Text).min(1),
  }),
  keys: z.object({
    common: z.array(Text).default([]),
    scalesModes: z.array(Text).min(1),
  }),
  progressions: z.array(Progression).min(1),
  melodyTraits: z.array(Text).default([]),
  drums: z.object({
    description: Text,
    swingPercent: z.number().min(50).max(75).optional(),
    grid: z
      .object({
        steps: z.number().int().positive(),
        lanes: z.array(z.object({ instrument: Text, pattern: z.string().regex(DRUM_LANE_PATTERN) })).min(1),
      })
      .optional(),
  }),
  bassApproach: Text,
  instrumentation: z.object({
    core: z.array(Text).min(1),
    optional: z.array(Text).default([]),
    signatureSounds: z.array(Text).default([]),
    instrumentRefs: z.array(Ref).default([]),
  }),
  soundDesign: z.array(Text).default([]),
  vocals: z.object({
    style: Text,
    delivery: z.string().optional(),
    processing: z.array(Text).default([]),
    lyricThemes: z.array(Text).default([]),
  }),
  arrangement: z.object({
    sections: z.array(z.object({ name: Text, bars: z.number().int().positive() })).min(1),
    typicalLengthSeconds: z.tuple([z.number().positive(), z.number().positive()]),
  }),
  mix: z.object({ aesthetic: Text, priorities: z.array(Text).default([]) }),
  master: z.object({
    integratedLufs: z.tuple([z.number(), z.number()]).optional(),
    notes: z.string().optional(),
  }),
  recipe: z.array(Text).min(1),
  authenticityTips: z.array(Text).default([]),
  mistakes: z.array(Text).default([]),
  pluginRecs: PluginRecs,
  samplePackTypes: z.array(Text).default([]),
  artists: z.object({
    pioneers: z.array(Text).default([]),
    classic: z.array(Text).default([]),
    modern: z.array(Text).default([]),
    rising: z.array(Text).default([]),
  }),
  essentialListening: z
    .array(
      z.object({
        title: Text,
        artist: Text,
        year: z.number().int().optional(),
        type: z.enum(['song', 'album']),
      }),
    )
    .min(1),
  fusions: z.array(Text).default([]),
  regionalVariants: z.array(Text).default([]),
})

export type GenreInput = z.input<typeof GenreSchema>
export type Genre = z.output<typeof GenreSchema>

import { z } from 'zod'
import { INSTRUMENT_FAMILY_IDS } from '../registry/instrumentFamilies'
import { NamedDescription, PluginRecs, Ref, Text } from './common'
import { EntryMeta } from './meta'

/** Scientific pitch notation, where C4 is middle C (MIDI note 60). */
export const NOTE_PATTERN = /^([A-G])(#|b)?(-?\d)$/
export const NoteName = z.string().regex(NOTE_PATTERN, 'must be scientific pitch notation, e.g. "C4" or "F#2"')

const HzRange = z.tuple([z.number().positive(), z.number().positive()])

export const InstrumentSchema = EntryMeta.extend({
  name: Text,
  aliases: z.array(Text).default([]),
  family: z.enum(INSTRUMENT_FAMILY_IDS),
  hornbostelSachs: z.object({
    class: z.enum(['idiophone', 'membranophone', 'chordophone', 'aerophone', 'electrophone']),
    number: z.string().optional(),
  }),
  summary: Text,
  cheatSheet: z.array(Text).min(3).max(8),
  origin: z.object({ region: Text, era: Text, history: Text }),
  soundProduction: Text,
  range: z.object({
    lowest: NoteName,
    highest: NoteName,
    midiLow: z.number().int().min(0).max(127),
    midiHigh: z.number().int().min(0).max(127),
    /** For transposing instruments, e.g. "Sounds an octave higher than written". */
    transposition: z.string().optional(),
    sweetSpot: z.string().optional(),
  }),
  tunings: z.array(Text).default([]),
  frequencyProfile: z.object({
    fundamentalHz: HzRange,
    bodyHz: HzRange.optional(),
    presenceHz: HzRange.optional(),
    airHz: HzRange.optional(),
    maskingConflicts: z.array(Text).default([]),
  }),
  timbre: z.array(Text).min(1),
  articulations: z.array(NamedDescription).default([]),
  polyphony: z.object({
    type: z.enum(['monophonic', 'limited', 'polyphonic']),
    maxVoices: z.number().int().positive().optional(),
    note: Text,
  }),
  physicalLimits: z.array(Text).default([]),
  scales: z.array(z.object({ name: Text, note: z.string().optional() })).default([]),
  genreUsage: z
    .array(
      z.object({
        genre: Ref,
        role: Text,
        exampleSongs: z.array(Text).default([]),
      }),
    )
    .default([]),
  realismTips: z.array(Text).min(1),
  writingTips: z.array(Text).default([]),
  recordingTips: z.array(Text).default([]),
  mixingTips: z.array(Text).default([]),
  notablePlayers: z.array(Text).default([]),
  pluginRecs: PluginRecs,
  buyingTips: z.array(Text).default([]),
})

export type InstrumentInput = z.input<typeof InstrumentSchema>
export type Instrument = z.output<typeof InstrumentSchema>

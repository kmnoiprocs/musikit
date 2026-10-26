import { z } from 'zod'
import { EFFECT_CATEGORY_IDS } from '../registry/effectCategories'
import { NamedDescription, PluginRecs, Ref, Setting, Technique, Text } from './common'
import { EntryMeta } from './meta'

export const EffectSchema = EntryMeta.extend({
  name: Text,
  aliases: z.array(Text).default([]),
  category: z.enum(EFFECT_CATEGORY_IDS),
  /** "type" = a kind of effect (compressor); "unit" = a specific legendary device (LA-2A). */
  kind: z.enum(['type', 'unit']).default('type'),
  summary: Text,
  cheatSheet: z.array(Text).min(3).max(8),
  history: Text,
  howItWorks: Text,
  controls: z
    .array(
      z.object({
        name: Text,
        description: Text,
        typicalRange: z.string().optional(),
        startingValue: z.string().optional(),
      }),
    )
    .min(1),
  meters: z.array(NamedDescription).default([]),
  variants: z.array(NamedDescription).default([]),
  whenToUse: z.array(Text).min(1),
  whenNotToUse: z.array(Text).default([]),
  startingSettings: z
    .array(
      z.object({
        source: Text,
        settings: z.array(Setting).min(1),
        note: z.string().optional(),
      }),
    )
    .default([]),
  techniques: z.array(Technique).min(1),
  unorthodoxTechniques: z.array(Technique).default([]),
  mistakes: z.array(Text).default([]),
  myths: z.array(z.object({ myth: Text, truth: Text })).default([]),
  chainPlacement: Text,
  genres: z.array(Ref).default([]),
  pluginRecs: PluginRecs,
  hardware: z
    .array(z.object({ name: Text, maker: z.string().optional(), note: z.string().optional() }))
    .default([]),
})

export type EffectInput = z.input<typeof EffectSchema>
export type Effect = z.output<typeof EffectSchema>

import { z } from 'zod'
import { IsoDate, Slug, Text } from './common'

export const PLUGIN_CATEGORIES = [
  'synth',
  'sampler',
  'rompler',
  'keys',
  'orchestral',
  'drums',
  'virtual-guitar-bass',
  'world-instruments',
  'amp-sim',
  'vocal-tuning',
  'vocal-fx',
  'eq',
  'dynamics',
  'saturation',
  'modulation',
  'delay',
  'reverb',
  'pitch-time',
  'stereo-imaging',
  'mastering-suite',
  'restoration',
  'metering',
  'reference',
  'creative-fx',
  'channel-strip',
  'console-bus',
  'midi-tools',
  'utility',
  'multi-fx',
] as const

/**
 * Price tiers: free = $0; budget = under $50; mid = $50 to $199; premium = $200 and up;
 * subscription = only available as a subscription.
 */
export const PriceTier = z.enum(['free', 'budget', 'mid', 'premium', 'subscription'])
export type PriceTier = z.infer<typeof PriceTier>

export const PluginSchema = z.object({
  id: Slug,
  name: Text,
  developer: Text,
  /** Only set when the version has been verified; it is shown in the UI. */
  version: z.string().optional(),
  categories: z.array(z.enum(PLUGIN_CATEGORIES)).min(1),
  formats: z.array(z.enum(['VST3', 'VST2', 'AU', 'AAX', 'CLAP', 'LV2', 'Standalone'])).min(1),
  os: z.array(z.enum(['windows', 'macos', 'linux', 'ios'])).min(1),
  priceTier: PriceTier,
  /** Approximate street price in USD at lastVerified; omit for free plugins. */
  approxPriceUsd: z.number().positive().optional(),
  licensing: z.enum(['perpetual', 'subscription', 'rent-to-own', 'free', 'freemium', 'donationware']),
  bestFor: Text,
  /** Hardware this plugin models, if any. */
  emulates: z.string().optional(),
  alternatives: z.array(Slug).default([]),
  url: z.url(),
  lastVerified: IsoDate,
  notes: z.string().optional(),
})

export type PluginInput = z.input<typeof PluginSchema>
export type Plugin = z.output<typeof PluginSchema>

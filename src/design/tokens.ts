import {
  Award,
  Briefcase,
  CircleX,
  Clapperboard,
  ClipboardList,
  Crown,
  Drum,
  FlaskConical,
  Gauge,
  Gift,
  Lightbulb,
  Mic,
  MicVocal,
  OctagonAlert,
  Package,
  PenLine,
  PiggyBank,
  ShieldQuestion,
  SlidersVertical,
  AudioLines,
  type LucideIcon,
} from 'lucide-react'
import type { CalloutType, Role, SkillLevel, Status } from '../content/schema'
import type { PriceTier } from '../content/schema/plugin'

/*
 * Design tokens from docs/DESIGN_SYSTEM.md. Surface and text colors live in src/index.css
 * as CSS variables (they change with the theme); everything here is theme-independent.
 * Change a value in the doc first, then here.
 */

export const CALLOUTS: Record<CalloutType, { label: string; color: string; icon: LucideIcon }> = {
  tip: { label: 'Tip', color: '#10B981', icon: Lightbulb },
  pro: { label: 'Pro Technique', color: '#0EA5E9', icon: Award },
  unorthodox: { label: 'Unorthodox Trick', color: '#8B5CF6', icon: FlaskConical },
  mistake: { label: 'Common Mistake', color: '#EF4444', icon: CircleX },
  myth: { label: 'Myth-Buster', color: '#F59E0B', icon: ShieldQuestion },
  free: { label: 'Free Alternative', color: '#14B8A6', icon: Gift },
  cheatsheet: { label: 'Cheat Sheet', color: '#EAB308', icon: ClipboardList },
  warning: { label: 'Warning', color: '#F97316', icon: OctagonAlert },
}

export interface FrequencyBand {
  id: string
  name: string
  lo: number
  hi: number
  color: string
}

export const FREQUENCY_BANDS: FrequencyBand[] = [
  { id: 'sub', name: 'Sub', lo: 20, hi: 60, color: '#6D28D9' },
  { id: 'bass', name: 'Bass', lo: 60, hi: 250, color: '#2563EB' },
  { id: 'low-mids', name: 'Low-mids', lo: 250, hi: 500, color: '#0D9488' },
  { id: 'mids', name: 'Mids', lo: 500, hi: 2000, color: '#16A34A' },
  { id: 'upper-mids', name: 'Upper-mids', lo: 2000, hi: 4000, color: '#EAB308' },
  { id: 'presence', name: 'Presence', lo: 4000, hi: 6000, color: '#F97316' },
  { id: 'air', name: 'Air', lo: 6000, hi: 20000, color: '#EC4899' },
]

export const TRACK_COLORS: { name: string; color: string }[] = [
  { name: 'Drums', color: '#EF4444' },
  { name: 'Percussion', color: '#F59E0B' },
  { name: 'Bass and 808', color: '#F97316' },
  { name: 'Keys and chords', color: '#EAB308' },
  { name: 'Synths and leads', color: '#22C55E' },
  { name: 'Guitars', color: '#14B8A6' },
  { name: 'Strings and orchestral', color: '#06B6D4' },
  { name: 'Pads and atmospheres', color: '#A855F7' },
  { name: 'Lead vocals', color: '#3B82F6' },
  { name: 'Background vocals and ad-libs', color: '#93C5FD' },
  { name: 'FX and ear candy', color: '#EC4899' },
  { name: 'Buses and groups', color: '#71717A' },
  { name: 'FX returns', color: '#D4D4D8' },
  { name: 'Reference tracks', color: '#3F3F46' },
]

export const SKILL_LEVELS: Record<SkillLevel, { label: string; color: string }> = {
  beginner: { label: 'Beginner', color: '#22C55E' },
  intermediate: { label: 'Intermediate', color: '#F59E0B' },
  advanced: { label: 'Advanced', color: '#EF4444' },
}

export const ROLES: Record<Role, { label: string; icon: LucideIcon }> = {
  beatmaker: { label: 'Beatmaker', icon: Drum },
  songwriter: { label: 'Songwriter', icon: PenLine },
  vocalist: { label: 'Vocalist', icon: MicVocal },
  rapper: { label: 'Rapper', icon: Mic },
  'recording-engineer': { label: 'Recording Engineer', icon: AudioLines },
  'mix-engineer': { label: 'Mix Engineer', icon: SlidersVertical },
  'mastering-engineer': { label: 'Mastering Engineer', icon: Gauge },
  'artist-entrepreneur': { label: 'Artist-Entrepreneur', icon: Briefcase },
  'media-composer': { label: 'Media Composer', icon: Clapperboard },
}

export const STATUS_COLORS: Record<Status, string> = {
  stub: '#71717A',
  draft: '#F59E0B',
  review: '#0EA5E9',
  published: '#10B981',
}

/** Registry price tiers (src/content/plugins). */
export const PRICE_TIERS: Record<PriceTier, { label: string; color: string }> = {
  free: { label: 'Free', color: '#14B8A6' },
  budget: { label: 'Budget', color: '#84CC16' },
  mid: { label: 'Mid-price', color: '#0EA5E9' },
  premium: { label: 'Premium', color: '#8B5CF6' },
  subscription: { label: 'Subscription', color: '#F59E0B' },
}

/** The five recommendation tiers of a plugin panel. */
export const REC_TIERS = {
  industryStandard: { label: 'Industry Standard', blurb: 'What working pros reach for first', color: '#F5C542', icon: Crown },
  proAlternatives: { label: 'Pro Alternatives', blurb: 'Equally pro, different sound or workflow', color: '#0EA5E9', icon: Award },
  budget: { label: 'Budget', blurb: 'Under $50', color: '#84CC16', icon: PiggyBank },
  free: { label: 'Free', blurb: 'Costs nothing', color: '#14B8A6', icon: Gift },
  stock: { label: 'Stock', blurb: 'Already in your DAW', color: '#94A3B8', icon: Package },
} as const

export type RecTier = keyof typeof REC_TIERS

/** Chord-progression mode colors. */
export const MODE_COLORS = {
  major: '#F59E0B',
  minor: '#6366F1',
  modal: '#14B8A6',
} as const

/** Drum-grid lane colors, matched by keyword against the lane name; drawn from the DAW track colors. */
export const DRUM_LANE_COLORS: { match: RegExp; color: string }[] = [
  { match: /808|bass|sub/i, color: '#F97316' },
  { match: /kick|bd\b/i, color: '#EF4444' },
  { match: /snare|clap|rim|snap/i, color: '#F59E0B' },
  { match: /hat|ride|cymbal|crash|shaker/i, color: '#EAB308' },
  { match: /tom|perc|conga|bongo|cowbell|tamb/i, color: '#14B8A6' },
]
export const DRUM_LANE_FALLBACK = '#A855F7'

/** Arrangement-timeline section colors, matched by keyword against the section name. */
export const ARRANGEMENT_COLORS: { match: RegExp; color: string }[] = [
  { match: /post-?chorus/i, color: '#D946EF' },
  { match: /pre-?(chorus|hook)/i, color: '#06B6D4' },
  { match: /chorus|hook|refrain/i, color: '#EC4899' },
  { match: /drop/i, color: '#F97316' },
  { match: /build|riser/i, color: '#F59E0B' },
  { match: /verse/i, color: '#3B82F6' },
  { match: /bridge|middle/i, color: '#8B5CF6' },
  { match: /break/i, color: '#14B8A6' },
  { match: /solo|instrumental/i, color: '#22C55E' },
  { match: /intro|outro|tag/i, color: '#94A3B8' },
]
export const ARRANGEMENT_FALLBACK = '#A1A1AA'

export function matchColor(name: string, table: { match: RegExp; color: string }[], fallback: string): string {
  return table.find((t) => t.match.test(name))?.color ?? fallback
}

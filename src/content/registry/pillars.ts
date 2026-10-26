/**
 * Pillars group the outline's Parts for navigation and color. Colors are the
 * canonical accents from docs/DESIGN_SYSTEM.md; change them there first.
 */
export interface Pillar {
  id: string
  name: string
  color: string
  /** Genre pages color themselves by genre family instead of the pillar accent. */
  multicolor?: boolean
  parts: { part: number; accent: string }[]
}

export const PILLARS = [
  { id: 'start', name: 'Start Here', color: '#A1A1AA', parts: [{ part: 0, accent: '#A1A1AA' }] },
  { id: 'foundations', name: 'Foundations', color: '#94A3B8', parts: [{ part: 1, accent: '#94A3B8' }] },
  {
    id: 'theory-ear',
    name: 'Theory & Ear Training',
    color: '#8B5CF6',
    parts: [
      { part: 2, accent: '#8B5CF6' },
      { part: 3, accent: '#6366F1' },
    ],
  },
  {
    id: 'writing-performance',
    name: 'Writing & Performance',
    color: '#F43F5E',
    parts: [
      { part: 4, accent: '#F43F5E' },
      { part: 5, accent: '#EC4899' },
      { part: 6, accent: '#D946EF' },
      { part: 7, accent: '#FB7185' },
    ],
  },
  {
    id: 'production',
    name: 'Production',
    color: '#F97316',
    parts: [
      { part: 8, accent: '#F97316' },
      { part: 9, accent: '#F59E0B' },
      { part: 10, accent: '#EAB308' },
      { part: 11, accent: '#FB923C' },
      { part: 12, accent: '#FBBF24' },
    ],
  },
  {
    id: 'engineering',
    name: 'Engineering',
    color: '#0EA5E9',
    parts: [
      { part: 13, accent: '#0EA5E9' },
      { part: 14, accent: '#3B82F6' },
      { part: 15, accent: '#06B6D4' },
      { part: 16, accent: '#14B8A6' },
      { part: 17, accent: '#38BDF8' },
    ],
  },
  { id: 'effects', name: 'Effects Encyclopedia', color: '#EF4444', parts: [{ part: 18, accent: '#EF4444' }] },
  { id: 'instruments', name: 'Instrument Encyclopedia', color: '#22C55E', parts: [{ part: 19, accent: '#22C55E' }] },
  {
    id: 'genres',
    name: 'Genre Encyclopedia',
    color: '#A855F7',
    multicolor: true,
    parts: [{ part: 20, accent: '#A855F7' }],
  },
  {
    id: 'tools-workflow',
    name: 'Tools & Workflow',
    color: '#84CC16',
    parts: [
      { part: 21, accent: '#84CC16' },
      { part: 22, accent: '#A3E635' },
      { part: 23, accent: '#65A30D' },
    ],
  },
  { id: 'business', name: 'Business & Career', color: '#10B981', parts: [{ part: 24, accent: '#10B981' }] },
  { id: 'health', name: 'Health & Mindset', color: '#5EEAD4', parts: [{ part: 25, accent: '#5EEAD4' }] },
  { id: 'profiles', name: 'Producer Profiles', color: '#C084FC', parts: [{ part: 26, accent: '#C084FC' }] },
  { id: 'reference', name: 'Quick Reference', color: '#E5E7EB', parts: [{ part: 27, accent: '#E5E7EB' }] },
  { id: 'interactive', name: 'Interactive Tools', color: '#818CF8', parts: [{ part: 28, accent: '#818CF8' }] },
] as const satisfies readonly Pillar[]

export type PillarId = (typeof PILLARS)[number]['id']
export const PILLAR_IDS = PILLARS.map((p) => p.id) as [PillarId, ...PillarId[]]

export function pillarForPart(part: number): Pillar | undefined {
  return PILLARS.find((p) => p.parts.some((x) => x.part === part))
}

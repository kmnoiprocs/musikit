/**
 * Pillars group the outline's Parts for navigation and color. Colors are the
 * canonical accents from docs/DESIGN_SYSTEM.md; change them there first.
 * `icon` is a Lucide icon name (see src/design/icons.tsx).
 */
export interface Pillar {
  id: string
  name: string
  color: string
  icon: string
  /** Genre pages color themselves by genre family instead of the pillar accent. */
  multicolor?: boolean
  parts: { part: number; accent: string; icon: string }[]
}

export const PILLARS = [
  { id: 'start', name: 'Start Here', color: '#A1A1AA', icon: 'compass', parts: [{ part: 0, accent: '#A1A1AA', icon: 'compass' }] },
  { id: 'foundations', name: 'Foundations', color: '#94A3B8', icon: 'speaker', parts: [{ part: 1, accent: '#94A3B8', icon: 'speaker' }] },
  {
    id: 'theory-ear',
    name: 'Theory & Ear Training',
    color: '#8B5CF6',
    icon: 'music',
    parts: [
      { part: 2, accent: '#8B5CF6', icon: 'music' },
      { part: 3, accent: '#6366F1', icon: 'ear' },
    ],
  },
  {
    id: 'writing-performance',
    name: 'Writing & Performance',
    color: '#F43F5E',
    icon: 'pen-line',
    parts: [
      { part: 4, accent: '#F43F5E', icon: 'pen-line' },
      { part: 5, accent: '#EC4899', icon: 'scroll-text' },
      { part: 6, accent: '#D946EF', icon: 'mic' },
      { part: 7, accent: '#FB7185', icon: 'mic-vocal' },
    ],
  },
  {
    id: 'production',
    name: 'Production',
    color: '#F97316',
    icon: 'drum',
    parts: [
      { part: 8, accent: '#F97316', icon: 'layers' },
      { part: 9, accent: '#F59E0B', icon: 'drum' },
      { part: 10, accent: '#EAB308', icon: 'audio-waveform' },
      { part: 11, accent: '#FB923C', icon: 'layout-list' },
      { part: 12, accent: '#FBBF24', icon: 'clapperboard' },
    ],
  },
  {
    id: 'engineering',
    name: 'Engineering',
    color: '#0EA5E9',
    icon: 'sliders-vertical',
    parts: [
      { part: 13, accent: '#0EA5E9', icon: 'audio-lines' },
      { part: 14, accent: '#3B82F6', icon: 'scissors' },
      { part: 15, accent: '#06B6D4', icon: 'sliders-vertical' },
      { part: 16, accent: '#14B8A6', icon: 'gauge' },
      { part: 17, accent: '#38BDF8', icon: 'orbit' },
    ],
  },
  { id: 'effects', name: 'Effects Encyclopedia', color: '#EF4444', icon: 'zap', parts: [{ part: 18, accent: '#EF4444', icon: 'zap' }] },
  {
    id: 'instruments',
    name: 'Instrument Encyclopedia',
    color: '#22C55E',
    icon: 'guitar',
    parts: [{ part: 19, accent: '#22C55E', icon: 'guitar' }],
  },
  {
    id: 'genres',
    name: 'Genre Encyclopedia',
    color: '#A855F7',
    icon: 'disc-3',
    multicolor: true,
    parts: [{ part: 20, accent: '#A855F7', icon: 'disc-3' }],
  },
  {
    id: 'tools-workflow',
    name: 'Tools & Workflow',
    color: '#84CC16',
    icon: 'plug',
    parts: [
      { part: 21, accent: '#84CC16', icon: 'plug' },
      { part: 22, accent: '#A3E635', icon: 'workflow' },
      { part: 23, accent: '#65A30D', icon: 'headphones' },
    ],
  },
  { id: 'business', name: 'Business & Career', color: '#10B981', icon: 'briefcase', parts: [{ part: 24, accent: '#10B981', icon: 'briefcase' }] },
  { id: 'health', name: 'Health & Mindset', color: '#5EEAD4', icon: 'heart-pulse', parts: [{ part: 25, accent: '#5EEAD4', icon: 'heart-pulse' }] },
  { id: 'profiles', name: 'Producer Profiles', color: '#C084FC', icon: 'users', parts: [{ part: 26, accent: '#C084FC', icon: 'users' }] },
  { id: 'reference', name: 'Quick Reference', color: '#E5E7EB', icon: 'book-marked', parts: [{ part: 27, accent: '#E5E7EB', icon: 'book-marked' }] },
  {
    id: 'interactive',
    name: 'Interactive Tools',
    color: '#818CF8',
    icon: 'mouse-pointer-click',
    parts: [{ part: 28, accent: '#818CF8', icon: 'mouse-pointer-click' }],
  },
] as const satisfies readonly Pillar[]

export type PillarId = (typeof PILLARS)[number]['id']
export const PILLAR_IDS = PILLARS.map((p) => p.id) as [PillarId, ...PillarId[]]

export function pillarForPart(part: number): Pillar | undefined {
  return PILLARS.find((p) => p.parts.some((x) => x.part === part))
}

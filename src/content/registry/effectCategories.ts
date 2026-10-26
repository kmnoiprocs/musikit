/** Effect categories, matching Part 18 of docs/MASTER_OUTLINE.md. `icon` is a Lucide icon name. */
export const EFFECT_CATEGORIES = [
  { id: 'dynamics', name: 'Dynamics', section: '18.1', icon: 'activity' },
  { id: 'eq-filters', name: 'EQ & Filters', section: '18.2', icon: 'sliders-horizontal' },
  { id: 'saturation-distortion', name: 'Saturation & Distortion', section: '18.3', icon: 'flame' },
  { id: 'modulation', name: 'Modulation', section: '18.4', icon: 'waves' },
  { id: 'delay-echo', name: 'Delay & Echo', section: '18.5', icon: 'repeat' },
  { id: 'reverb', name: 'Reverb', section: '18.6', icon: 'cloud' },
  { id: 'pitch-time', name: 'Pitch & Time', section: '18.7', icon: 'music-2' },
  { id: 'stereo-spatial', name: 'Stereo & Spatial', section: '18.8', icon: 'move-horizontal' },
  { id: 'restoration-utility', name: 'Restoration, Utility & Analysis', section: '18.9', icon: 'wrench' },
  { id: 'creative-multi-fx', name: 'Creative, Multi-FX & Lo-fi', section: '18.10', icon: 'sparkles' },
  { id: 'guitar-pedals', name: 'Guitar & Bass Pedals', section: '18.11', icon: 'footprints' },
  { id: 'outboard-gear', name: 'Legendary Outboard & Rack Gear', section: '18.12', icon: 'server' },
] as const

export type EffectCategoryId = (typeof EFFECT_CATEGORIES)[number]['id']
export const EFFECT_CATEGORY_IDS = EFFECT_CATEGORIES.map((c) => c.id) as [EffectCategoryId, ...EffectCategoryId[]]

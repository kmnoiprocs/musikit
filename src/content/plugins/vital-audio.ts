import { definePlugins } from '../define'

export default definePlugins([
  {
    id: 'vital',
    name: 'Vital',
    developer: 'Vital Audio',
    categories: ['synth'],
    formats: ['VST3', 'AU', 'CLAP', 'LV2', 'Standalone'],
    os: ['windows', 'macos', 'linux'],
    priceTier: 'free',
    licensing: 'freemium',
    bestFor: 'A free spectral-warping wavetable synth with a very visual modulation system.',
    alternatives: ['xfer-serum'],
    url: 'https://vital.audio',
    lastVerified: '2026-10-26',
  },
])

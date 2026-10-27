import { definePlugins } from '../define'

export default definePlugins([
  {
    id: 'cytomic-the-glue',
    name: 'The Glue',
    developer: 'Cytomic',
    version: '1.9.3',
    categories: ['dynamics'],
    formats: ['VST3', 'VST2', 'AU', 'AAX'],
    os: ['windows', 'macos'],
    priceTier: 'mid',
    approxPriceUsd: 99,
    licensing: 'perpetual',
    bestFor: 'Feedback VCA bus compression modeled on a classic 1980s large-console bus compressor.',
    emulates: '1980s British large-console bus compressor',
    alternatives: ['fabfilter-pro-c', 'tdr-kotelnikov'],
    url: 'https://cytomic.com/product/glue/',
    lastVerified: '2026-10-26',
    notes:
      'Listed at $99. Cytomic describes a diode-based envelope follower in a feedback loop, plus mix, range, sidechain high-pass, external sidechain, and a peak clipper. The same compressor design is built into Ableton Live as Glue Compressor.',
  },
])

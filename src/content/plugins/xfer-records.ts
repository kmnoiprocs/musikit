import { definePlugins } from '../define'

export default definePlugins([
  {
    id: 'xfer-serum',
    name: 'Serum',
    developer: 'Xfer Records',
    version: '2',
    categories: ['synth'],
    formats: ['VST3', 'AU', 'AAX'],
    os: ['windows', 'macos'],
    priceTier: 'premium',
    licensing: 'rent-to-own',
    bestFor: 'The reference wavetable synth for modern bass, leads, and plucks, with a huge preset ecosystem.',
    alternatives: ['vital'],
    url: 'https://xferrecords.com',
    lastVerified: '2026-10-26',
    notes: 'Available as a perpetual license or rent-to-own through Splice.',
  },
])

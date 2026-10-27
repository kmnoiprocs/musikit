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
  {
    id: 'xfer-ott',
    name: 'OTT',
    developer: 'Xfer Records',
    version: '1.37',
    categories: ['dynamics'],
    formats: ['VST3', 'VST2', 'AU', 'AAX'],
    os: ['windows', 'macos'],
    priceTier: 'free',
    licensing: 'free',
    bestFor: 'The free three-band over-the-top compressor: downward compression on peaks and upward compression on quiet details.',
    alternatives: ['audio-damage-evil-otto', 'tdr-nova'],
    url: 'https://xferrecords.com/freeware/',
    lastVerified: '2026-10-26',
    notes:
      'Freeware, version 1.37. Depth is a dry/wet blend. Upward and Downward are separate amounts, with low, mid, and high bands. It is the usual free plugin for the over-the-top multiband sound.',
  },
])

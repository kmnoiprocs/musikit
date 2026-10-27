import { definePlugins } from '../define'

export default definePlugins([
  {
    id: 'melda-mcompressor',
    name: 'MCompressor',
    developer: 'MeldaProduction',
    categories: ['dynamics'],
    formats: ['VST3', 'VST2', 'AU', 'AAX'],
    os: ['windows', 'macos'],
    priceTier: 'free',
    licensing: 'freemium',
    bestFor: 'A free general-purpose compressor with a drawable transfer curve and an external sidechain input.',
    alternatives: ['tdr-kotelnikov', 'fabfilter-pro-c'],
    url: 'https://www.meldaproduction.com/Mcompressor',
    lastVerified: '2026-10-26',
    notes:
      'Included in the free MFreeFXBundle. A paid upgrade adds upsampling, custom preset management, and modulators. The manual documents a sidechain input for keying, including pumping a mix from a kick, plus a detector filter.',
  },
])

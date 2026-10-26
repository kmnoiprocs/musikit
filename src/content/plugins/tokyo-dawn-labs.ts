import { definePlugins } from '../define'

export default definePlugins([
  {
    id: 'tdr-nova',
    name: 'TDR Nova',
    developer: 'Tokyo Dawn Labs',
    categories: ['eq', 'dynamics'],
    formats: ['VST3', 'VST2', 'AU', 'AAX'],
    os: ['windows', 'macos'],
    priceTier: 'free',
    licensing: 'freemium',
    bestFor: 'A free parallel dynamic EQ that doubles as a de-esser and multiband compressor.',
    alternatives: ['fabfilter-pro-q'],
    url: 'https://www.tokyodawn.net',
    lastVerified: '2026-10-26',
  },
  {
    id: 'tdr-kotelnikov',
    name: 'TDR Kotelnikov',
    developer: 'Tokyo Dawn Labs',
    categories: ['dynamics'],
    formats: ['VST3', 'VST2', 'AU', 'AAX'],
    os: ['windows', 'macos'],
    priceTier: 'free',
    licensing: 'freemium',
    bestFor: 'A transparent, mastering-grade free compressor for buses and the mix bus.',
    alternatives: ['fabfilter-pro-c'],
    url: 'https://www.tokyodawn.net',
    lastVerified: '2026-10-26',
  },
])

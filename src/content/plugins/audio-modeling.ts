import { definePlugins } from '../define'

export default definePlugins([
  {
    id: 'swam-flutes',
    name: 'SWAM Flutes',
    developer: 'Audio Modeling',
    categories: ['orchestral', 'world-instruments'],
    formats: ['VST3', 'AU', 'AAX', 'Standalone'],
    os: ['windows', 'macos', 'ios'],
    priceTier: 'mid',
    licensing: 'perpetual',
    bestFor: 'Physically modeled flutes that respond to breath and expression controllers in real time.',
    url: 'https://audiomodeling.com',
    lastVerified: '2026-10-26',
    notes: 'Stub entry: confirm the current price and format list in the Stage 4 golden-sample pass.',
  },
])

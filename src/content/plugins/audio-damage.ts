import { definePlugins } from '../define'

export default definePlugins([
  {
    id: 'audio-damage-evil-otto',
    name: 'Evil Otto',
    developer: 'Audio Damage',
    categories: ['dynamics'],
    formats: ['VST3', 'AU', 'CLAP'],
    os: ['windows', 'macos', 'linux'],
    priceTier: 'free',
    licensing: 'free',
    bestFor: 'A free three-band upward-and-downward compressor in the OTT style, including a native Linux build.',
    alternatives: ['xfer-ott', 'tdr-nova'],
    url: 'https://www.audiodamage.com/pages/evil-otto',
    lastVerified: '2026-10-26',
    notes:
      'Desktop builds for Windows, macOS, and Linux are free. The iOS version is paid. Audio Damage says it is not a clone of any one OTT implementation. Rough Rider is no longer a public free download.',
  },
])

import { definePlugins } from '../define'

export default definePlugins([
  {
    id: 'fabfilter-pro-q',
    name: 'FabFilter Pro-Q',
    developer: 'FabFilter',
    version: '4',
    categories: ['eq'],
    formats: ['VST3', 'AU', 'AAX', 'CLAP'],
    os: ['windows', 'macos'],
    priceTier: 'mid',
    approxPriceUsd: 199,
    licensing: 'perpetual',
    bestFor: 'Fast surgical and musical EQ with dynamic, mid/side, and linear-phase modes.',
    alternatives: ['tdr-nova'],
    url: 'https://www.fabfilter.com',
    lastVerified: '2026-10-26',
  },
  {
    id: 'fabfilter-pro-c',
    name: 'FabFilter Pro-C',
    developer: 'FabFilter',
    version: '3',
    categories: ['dynamics'],
    formats: ['VST3', 'VST2', 'AU', 'AAX', 'CLAP'],
    os: ['windows', 'macos'],
    priceTier: 'mid',
    approxPriceUsd: 199,
    licensing: 'perpetual',
    bestFor: 'A precise compressor with 14 styles, from clean and upward to opto, variable-mu, bus glue, and multiband TTM.',
    alternatives: ['tdr-kotelnikov', 'klanghelm-dc8c', 'cytomic-the-glue'],
    url: 'https://www.fabfilter.com',
    lastVerified: '2026-10-26',
    notes:
      'Pro-C 3, released 15 Jan 2026, lists at $199 / €169. Styles: Clean, Versatile, Smooth, Punch, Upward, TTM, Op-El, Vari-Mu, Classic, Opto, Vocal, Mastering, Bus, and Pumping. Character modes add Tube, Diode, or Bright color. Sidechain EQ goes up to six bands.',
  },
])

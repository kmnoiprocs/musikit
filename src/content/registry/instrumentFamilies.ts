/** Instrument families, matching Part 19 of docs/MASTER_OUTLINE.md. */
export const INSTRUMENT_FAMILIES = [
  { id: 'pianos-keys', name: 'Pianos & Keys', section: '19.1' },
  { id: 'organs', name: 'Organs', section: '19.2' },
  { id: 'electromechanical-keys', name: 'Electro-mechanical & Tape Keyboards', section: '19.3' },
  { id: 'synths-electronic', name: 'Synths & Electronic Instruments', section: '19.4' },
  { id: 'guitars', name: 'Guitars', section: '19.5' },
  { id: 'bass', name: 'Bass', section: '19.6' },
  { id: 'plucked-americas-europe', name: 'Plucked Strings (Americas & Europe)', section: '19.7' },
  { id: 'plucked-world', name: 'Plucked Strings (Africa, Middle East, Asia)', section: '19.8' },
  { id: 'bowed-strings', name: 'Bowed Strings', section: '19.9' },
  { id: 'flutes-whistles', name: 'Flutes & Whistles', section: '19.10' },
  { id: 'reeds', name: 'Reeds', section: '19.11' },
  { id: 'free-reeds', name: 'Free Reeds', section: '19.12' },
  { id: 'brass', name: 'Brass', section: '19.13' },
  { id: 'drum-kits', name: 'Drum Kits', section: '19.14' },
  { id: 'orchestral-percussion', name: 'Orchestral Percussion', section: '19.15' },
  { id: 'mallets-pitched-percussion', name: 'Mallet & Pitched Percussion', section: '19.16' },
  { id: 'latin-caribbean-percussion', name: 'Latin American & Caribbean Percussion', section: '19.17' },
  { id: 'african-percussion', name: 'African Percussion', section: '19.18' },
  { id: 'mena-central-asian-percussion', name: 'Middle Eastern, North African & Central Asian Percussion', section: '19.19' },
  { id: 'south-asian-percussion', name: 'South Asian Percussion', section: '19.20' },
  { id: 'east-southeast-asian-percussion', name: 'East & Southeast Asian Percussion', section: '19.21' },
  { id: 'european-folk-percussion', name: 'European & Folk Percussion', section: '19.22' },
  { id: 'voice', name: 'The Voice', section: '19.23' },
  { id: 'experimental-hybrid', name: 'Experimental & Hybrid', section: '19.24' },
] as const

export type InstrumentFamilyId = (typeof INSTRUMENT_FAMILIES)[number]['id']
export const INSTRUMENT_FAMILY_IDS = INSTRUMENT_FAMILIES.map((f) => f.id) as [InstrumentFamilyId, ...InstrumentFamilyId[]]

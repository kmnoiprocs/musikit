/** Instrument families, matching Part 19 of docs/MASTER_OUTLINE.md. `icon` is a Lucide icon name. */
export const INSTRUMENT_FAMILIES = [
  { id: 'pianos-keys', name: 'Pianos & Keys', section: '19.1', icon: 'piano' },
  { id: 'organs', name: 'Organs', section: '19.2', icon: 'church' },
  { id: 'electromechanical-keys', name: 'Electro-mechanical & Tape Keyboards', section: '19.3', icon: 'cassette-tape' },
  { id: 'synths-electronic', name: 'Synths & Electronic Instruments', section: '19.4', icon: 'keyboard-music' },
  { id: 'guitars', name: 'Guitars', section: '19.5', icon: 'guitar' },
  { id: 'bass', name: 'Bass', section: '19.6', icon: 'audio-waveform' },
  { id: 'plucked-americas-europe', name: 'Plucked Strings (Americas & Europe)', section: '19.7', icon: 'music-3' },
  { id: 'plucked-world', name: 'Plucked Strings (Africa, Middle East, Asia)', section: '19.8', icon: 'globe' },
  { id: 'bowed-strings', name: 'Bowed Strings', section: '19.9', icon: 'music-4' },
  { id: 'flutes-whistles', name: 'Flutes & Whistles', section: '19.10', icon: 'wind' },
  { id: 'reeds', name: 'Reeds', section: '19.11', icon: 'feather' },
  { id: 'free-reeds', name: 'Free Reeds', section: '19.12', icon: 'rows-3' },
  { id: 'brass', name: 'Brass', section: '19.13', icon: 'megaphone' },
  { id: 'drum-kits', name: 'Drum Kits', section: '19.14', icon: 'drum' },
  { id: 'orchestral-percussion', name: 'Orchestral Percussion', section: '19.15', icon: 'bell-ring' },
  { id: 'mallets-pitched-percussion', name: 'Mallet & Pitched Percussion', section: '19.16', icon: 'bell' },
  { id: 'latin-caribbean-percussion', name: 'Latin American & Caribbean Percussion', section: '19.17', icon: 'drum' },
  { id: 'african-percussion', name: 'African Percussion', section: '19.18', icon: 'hand' },
  { id: 'mena-central-asian-percussion', name: 'Middle Eastern, North African & Central Asian Percussion', section: '19.19', icon: 'circle-dot' },
  { id: 'south-asian-percussion', name: 'South Asian Percussion', section: '19.20', icon: 'drum' },
  { id: 'east-southeast-asian-percussion', name: 'East & Southeast Asian Percussion', section: '19.21', icon: 'drum' },
  { id: 'european-folk-percussion', name: 'European & Folk Percussion', section: '19.22', icon: 'circle-dot' },
  { id: 'voice', name: 'The Voice', section: '19.23', icon: 'mic-vocal' },
  { id: 'experimental-hybrid', name: 'Experimental & Hybrid', section: '19.24', icon: 'flask-conical' },
] as const

export type InstrumentFamilyId = (typeof INSTRUMENT_FAMILIES)[number]['id']
export const INSTRUMENT_FAMILY_IDS = INSTRUMENT_FAMILIES.map((f) => f.id) as [InstrumentFamilyId, ...InstrumentFamilyId[]]

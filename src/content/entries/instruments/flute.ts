import { defineInstrument } from '../../define'

export default defineInstrument({
  id: 'flute',
  status: 'stub',
  skillLevel: 'beginner',
  roles: ['beatmaker', 'songwriter', 'media-composer'],
  lastVerified: '2026-10-26',
  name: 'Flute',
  aliases: ['Concert flute', 'C flute', 'Western concert flute'],
  family: 'flutes-whistles',
  hornbostelSachs: { class: 'aerophone', number: '421.121.12' },
  summary: 'A side-blown metal flute with a pure, airy tone, used from orchestras to trap melodies.',
  cheatSheet: [
    'Monophonic: one note at a time unless you are writing for a flute section.',
    'Range C4 to C7; the low octave is breathy and soft, the top is bright and piercing.',
    'Leave breath gaps; real players cannot sustain forever.',
  ],
  origin: {
    region: 'Europe',
    era: 'Modern keyed design from the 1840s (Theobald Boehm)',
    history: 'Side-blown flutes are ancient and global; the modern metal concert flute comes from Theobald Boehm\'s 19th-century key system.',
  },
  soundProduction: 'The player blows an air stream across the embouchure hole, setting the air column inside the tube vibrating. Keys change the effective tube length.',
  range: { lowest: 'C4', highest: 'C7', midiLow: 60, midiHigh: 96, sweetSpot: 'G4 to G6' },
  frequencyProfile: { fundamentalHz: [262, 2093], airHz: [8000, 14000] },
  timbre: ['airy', 'pure', 'breathy (low register)', 'bright (high register)'],
  polyphony: {
    type: 'monophonic',
    note: 'A flute plays one note at a time. For chords, use a flute ensemble patch or several tracks.',
  },
  realismTips: ['Insert short gaps every few bars where a player would breathe.'],
  genreUsage: [
    {
      genre: 'genre:trap',
      role: 'Flute melody loops became a signature trap sound in the late 2010s.',
      exampleSongs: ['Future - "Mask Off" (2017)'],
    },
  ],
  pluginRecs: {
    industryStandard: ['swam-flutes'],
    free: ['decent-sampler'],
    notes: 'For the free option, load a free flute library from Pianobook into Decent Sampler.',
  },
})

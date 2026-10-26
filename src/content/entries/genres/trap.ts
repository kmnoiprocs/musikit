import { defineGenre } from '../../define'

export default defineGenre({
  id: 'trap',
  status: 'stub',
  skillLevel: 'beginner',
  roles: ['beatmaker', 'rapper', 'mix-engineer'],
  lastVerified: '2026-10-26',
  name: 'Trap',
  family: 'hip-hop',
  soundsLike: ['booming tuned 808s', 'rolling hi-hats', 'dark minor-key melodies'],
  description:
    'Southern hip-hop born in Atlanta, built on long tuned 808 bass, half-time snares, and fast, rolling hi-hats under dark, minimal melodies.',
  cheatSheet: [
    'Around 130 to 150 BPM with a half-time feel.',
    'The 808 is the bassline: tune it to the key and glide between notes.',
    'Hi-hat rolls (triplets, 32nds) create the signature bounce.',
  ],
  history: {
    origins: 'Named after "trap houses" and the street life described by early Atlanta rappers.',
    era: 'Early 2000s to present',
    place: 'Atlanta, Georgia, USA',
    evolution: 'From the raw early-2000s sound to the polished, melodic trap that became the dominant sound of mainstream rap.',
    today: 'A global production style that underpins drill, rage, plugg, Latin trap, and pop.',
  },
  tempo: { min: 130, max: 170, typical: 140, feel: 'half-time', timeSignatures: ['4/4'] },
  keys: { scalesModes: ['Natural minor', 'Harmonic minor', 'Phrygian'] },
  progressions: [
    { numerals: 'i - VI', mode: 'minor', exampleKey: 'A minor', exampleChords: 'Am - F', usage: 'Two-chord dark loop' },
  ],
  drums: {
    description: 'Kick and 808 patterns lock together, snare or clap on beat 3 of a half-time bar, and hi-hats run 8ths with rolls.',
    grid: {
      steps: 16,
      lanes: [
        { instrument: 'Kick', pattern: 'X.....x...x.....' },
        { instrument: 'Snare/Clap', pattern: '........X.......' },
        { instrument: 'Hi-hat', pattern: 'x.x.x.x.x.x.xrx.' },
      ],
    },
  },
  bassApproach: 'A long, distorted 808 tuned to the song key, often following the kick, with pitch glides between notes.',
  instrumentation: {
    core: ['808 bass', 'hi-hats', 'snare or clap', 'dark melody (bells, piano, synth, or flute)'],
    instrumentRefs: ['instrument:flute'],
  },
  vocals: { style: 'Rapped or sung-rapped, often with Auto-Tune, layered ad-libs, and doubled hooks.' },
  arrangement: {
    sections: [
      { name: 'Intro', bars: 4 },
      { name: 'Hook', bars: 8 },
      { name: 'Verse', bars: 16 },
      { name: 'Hook', bars: 8 },
      { name: 'Verse', bars: 16 },
      { name: 'Hook', bars: 8 },
      { name: 'Outro', bars: 4 },
    ],
    typicalLengthSeconds: [150, 210],
  },
  mix: { aesthetic: 'Loud, forward vocals over a heavy, clean low end where the 808 and kick never fight.' },
  master: { notes: 'Typically mastered loud; check translation of the 808 on small speakers.' },
  recipe: ['Pick a dark minor melody.', 'Program the 808 and kick together.', 'Add the snare on beat 3, then hi-hats with rolls.'],
  pluginRecs: {
    industryStandard: ['xfer-serum'],
    free: ['vital'],
  },
  artists: { pioneers: ['T.I.', 'Young Jeezy', 'Gucci Mane'] },
  essentialListening: [
    { title: 'Trap Muzik', artist: 'T.I.', year: 2003, type: 'album' },
    { title: 'Trap House', artist: 'Gucci Mane', year: 2005, type: 'album' },
  ],
  related: ['effect:compressor'],
})

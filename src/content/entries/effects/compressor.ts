import { defineEffect } from '../../define'

export default defineEffect({
  id: 'compressor',
  status: 'stub',
  skillLevel: 'beginner',
  roles: ['beatmaker', 'recording-engineer', 'mix-engineer', 'mastering-engineer'],
  lastVerified: '2026-10-26',
  name: 'Compressor',
  aliases: ['Dynamic range compressor'],
  category: 'dynamics',
  summary: 'Turns loud parts down automatically so a sound is more even, controlled, and present.',
  cheatSheet: [
    'Threshold decides when it acts; ratio decides how hard.',
    'Slow attack keeps punch; fast attack tames peaks.',
    'Aim for 2 to 6 dB of [[glossary:gain-reduction|gain reduction]] on most sources.',
  ],
  history:
    'Compressors began as broadcast tools in the 1930s and 1940s to stop transmitters overloading, then became core studio tools in the 1950s and 1960s.',
  howItWorks:
    'A detector measures the incoming level. When it rises above the threshold, the gain is reduced according to the ratio, using the attack and release times to decide how quickly to react and recover.',
  controls: [
    { name: 'Threshold', description: 'The level above which compression starts.', typicalRange: '-40 to 0 dB' },
    { name: 'Ratio', description: 'How much the signal is reduced above the threshold.', typicalRange: '1.5:1 to 20:1', startingValue: '4:1' },
    { name: 'Attack', description: 'How quickly compression engages after the threshold is crossed.', typicalRange: '0.1 to 100 ms', startingValue: '10 ms' },
    { name: 'Release', description: 'How quickly compression lets go after the level falls.', typicalRange: '20 to 1000 ms', startingValue: '100 ms' },
  ],
  meters: [{ name: 'Gain reduction meter', description: 'Shows how many decibels the compressor is turning the signal down right now.' }],
  whenToUse: ['To even out a performance that jumps between quiet and loud.'],
  techniques: [
    {
      name: 'Parallel compression',
      description: 'Blend a heavily compressed copy under the dry signal to add density without losing transients.',
    },
  ],
  chainPlacement: 'Usually after corrective EQ and before time-based effects such as reverb and delay.',
  genres: ['genre:trap'],
  pluginRecs: {
    industryStandard: ['fabfilter-pro-c'],
    budget: ['klanghelm-dc1a'],
    free: ['tdr-kotelnikov'],
    stock: [
      { daw: 'ableton-live', name: 'Compressor' },
      { daw: 'logic-pro', name: 'Compressor' },
      { daw: 'reaper', name: 'ReaComp' },
    ],
  },
  related: ['guide:mixing-dynamics'],
})

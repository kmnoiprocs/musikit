import { defineGuideSection } from '../../define'

export default defineGuideSection({
  id: 'mixing-dynamics',
  status: 'stub',
  skillLevel: 'beginner',
  roles: ['mix-engineer', 'beatmaker'],
  lastVerified: '2026-10-26',
  section: '15.6',
  title: 'Dynamics in Mixing',
  summary: 'How to use compression, gating, and transient shaping to control and shape every element of a mix.',
  cheatSheet: ['Compress for a reason: control, glue, punch, or color.', 'Always level-match before judging a compressor.'],
  blocks: [
    {
      type: 'paragraph',
      text: 'Dynamics processing changes the difference between the loud and quiet parts of a sound. The main tool is the [[effect:compressor|compressor]].',
    },
    {
      type: 'callout',
      variant: 'myth',
      title: 'Louder is not better',
      body: 'A compressed sound often seems better only because it is louder. Match levels before deciding.',
    },
    {
      type: 'expandable',
      title: 'Starting points by source',
      blocks: [
        {
          type: 'table',
          columns: ['Source', 'Ratio', 'Attack', 'Release'],
          rows: [
            ['Lead vocal', '3:1 to 4:1', '5 to 15 ms', '50 to 100 ms'],
            ['Drum bus', '2:1 to 4:1', '10 to 30 ms', 'Auto or timed to tempo'],
          ],
        },
      ],
    },
  ],
  techniqueCards: [
    {
      id: 'parallel-drum-compression',
      title: 'Parallel drum compression',
      goal: 'Add density and sustain to drums without losing their punch.',
      whenToUse: 'When drums sound thin or lack energy but you want to keep transients intact.',
      steps: [
        'Send the drum bus to an aux track.',
        'Compress the aux hard (high ratio, fast attack).',
        'Blend it under the dry drums to taste.',
      ],
      related: ['effect:compressor'],
    },
  ],
  related: ['effect:compressor', 'glossary:gain-reduction'],
})

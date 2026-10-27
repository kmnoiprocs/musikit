import { defineEffect } from '../../define'

export default defineEffect({
  id: 'multiband-compressor',
  status: 'review',
  skillLevel: 'intermediate',
  roles: ['beatmaker', 'mix-engineer', 'mastering-engineer', 'media-composer'],
  lastVerified: '2026-10-26',
  parent: 'compressor',
  typeGroup: 'Job',
  typeOrder: 8,
  sources: [
    { title: 'Live Audio Effect Reference', author: 'Ableton', url: 'https://www.ableton.com/en/manual/live-audio-effect-reference/' },
    { title: 'MultibandCompressor', author: 'Steinberg', url: 'https://www.steinberg.help/r/cubase-pro/cubaseplugref/15.0/en/_shared/topics/plug_ref/multiband_compressor_r.html' },
    { title: 'Maximus', author: 'Image-Line', url: 'https://www.image-line.com/fl-studio-learning-content/fl-studio-online-manual/html/plugins/Maximus.htm' },
    { title: 'ReaPlugs', author: 'Cockos', url: 'https://www.cockos.com/reaper/reaplugs/' },
    { title: 'TDR Nova', author: 'Tokyo Dawn Records', url: 'https://www.tokyodawn.net/tdr-nova/' },
    { title: 'FabFilter Pro-C 3 Help: Style and character', author: 'FabFilter', url: 'https://www.fabfilter.com/help/pro-c/using/styleandcharacter' },
  ],
  name: 'Multiband Compressor',
  aliases: ['Split-band compressor', 'Crossover compressor'],
  category: 'dynamics',
  kind: 'type',
  summary: 'Splits the signal into bands, compresses each band on its own, and sums them back, so a loud bass does not have to duck the vocal.',
  cheatSheet: [
    'A wideband compressor turns everything down when anything gets loud. A multiband compressor only turns down the band that got loud.',
    'Ableton Multiband Dynamics is up to three bands, with an above-threshold and a below-threshold on each, so one device can compress and expand at once.',
    'Cubase MultibandCompressor is four bands. Attack is 0.1 to 100 ms. Release is 10 to 1000 ms or Auto. Auto makeup turns off on a band if that band is sidechained.',
    'Crossovers are part of the sound. Solo each band before you trust the seam.',
    'Lookahead and linear-phase splits add latency. Cubase Live mode and FL Studio linear-phase FIR mode are the documented versions of that trade.',
    '[[plugin:tdr-nova|TDR Nova]] is a dynamic EQ that Tokyo Dawn also lists for multiband compression. It is not the same machine as a crossover compressor. Know which one you opened.',
  ],
  history:
    'Multiband compression showed up when a single detector was too blunt for a full mix. A bass hit would duck a vocal that did not need ducking. Splitting the audio at crossovers let each range have a threshold. Mastering rooms used it to level a boomy low end or a harsh top without repainting the mids. DAWs then shipped it as a stock device: Ableton as three bands aimed at mastering, Cubase as four, FL Studio as Maximus and the Fruity Multiband Compressor, Reaper as ReaXcomp with as many bands as you add. The over-the-top three-band sound, upward and downward together, became its own pop and electronic dialect. The failure mode traveled with it. Too many bands, each doing too much, and the song turns into a dense, phasey picture of itself.',
  howItWorks:
    'A crossover network slices the signal. Ableton example of the arithmetic, not a recommended setting: a low crossover at 500 Hz and a high crossover at 2 kHz makes a low band up to 500 Hz, a mid band from 500 Hz to 2 kHz, and a high band above that. Each band has its own threshold, ratio, attack, and release. The bands are summed at the output. If you solo a band you hear only that slice, which is how you find out the crossover is sitting on a snare crack or a vocal formant. Turn the high and low bands off in Ableton and the device becomes a normal one-band compressor using the mid controls. That is the right way to prove you needed more than one band. Cubase gives you four bands and plus or minus 15 dB of level after the compression, with solo and bypass per band. Image-Line Maximus is three bands plus a wideband master compressor, with IIR or linear-phase band splits. On the separate Fruity Multiband Compressor, Image-Line recommends the linear-phase FIR mode for mastering. Linear-phase and lookahead both delay the signal. A dynamic EQ such as TDR Nova can do a related job by compressing only the bell or shelf you drew, without splitting the entire signal into a stack of bands. Pro-C TTM is the other relative: FabFilter describes it as upward and downward compression across bands, where the threshold acts as a target level and the knee blends the two stages. Use TTM when you wanted that specific effect. Use a real multiband when you need to place the crossovers yourself.',
  controls: [
    {
      name: 'Crossovers',
      description: 'The edges of the bands. Move them until a problem lives inside one band. Ableton manual uses 500 Hz and 2 kHz only to explain the ranges. Put yours where the music actually changes.',
      typicalRange: 'Two splits for three bands, three splits for four',
      startingValue: 'Solo, then place the split on the problem',
    },
    {
      name: 'Per-band threshold and ratio',
      description: 'Each band is a compressor. Leave a band at 1:1, or bypass it, if that range was fine. Cubase auto makeup is per band and switches off when that band sidechain is on, so a ducked band does not get its gain quietly put back.',
      typicalRange: '1:1 up to a firm 4:1 inside a band',
      startingValue: 'One band, 2 to 4 dB, the others bypassed',
    },
    {
      name: 'Per-band attack and release',
      description: 'Low bands want slower times than high bands. A 5 ms release on a bass band will distort. A 200 ms release on a de-ess band will lisp. Cubase allows 0.1 to 100 ms attack and 10 to 1000 ms release.',
      typicalRange: 'Slower in the low band, faster up high',
      startingValue: 'Match the band to the note length you can hear',
    },
    {
      name: 'Band gain',
      description: 'Level after the dynamics, plus or minus 15 dB in Cubase. This is a makeup and a tilt. It is easy to "fix" a mix here and accidentally master it. Write down what you changed.',
      typicalRange: 'A few dB',
      startingValue: '0 dB until the compression is right',
    },
    {
      name: 'Amount or global time',
      description: 'Ableton Amount scales every band. At 0% the ratios are effectively 1:1. Time scales every attack and release together. Use them to back out of a preset without redrawing six thresholds.',
      typicalRange: '0% to full',
      startingValue: 'Amount only as high as the one band you needed',
    },
  ],
  meters: [
    { name: 'Per-band gain reduction', description: 'Each band needs its own meter. A single global meter hides which band is doing the damage.' },
    { name: 'Solo and crossover display', description: 'Solo is a meter you hear. If the soloed band sounds like a telephone, the crossover is in the middle of a vocal. Move it until the soloed band is the problem you meant to isolate.' },
  ],
  variants: [
    {
      name: 'Three-band downward',
      description: 'Ableton with only the upper thresholds, or Maximus and the Fruity Multiband Compressor in ordinary compression. The classic "tame the bass and the harshness" mastering move.',
    },
    {
      name: 'Upward and downward together',
      description: 'Ableton can raise the below-threshold block and lower the above-threshold block on each band. OTT and Pro-C TTM are the aggressive version of that idea. Read [[effect:upward-compressor|upward compression]] before you live there.',
    },
    {
      name: 'Dynamic EQ instead',
      description: 'TDR Nova compresses the band you drew. Tokyo Dawn lists multiband compression as one of its uses. Pick it when one resonance is the problem and a full crossover split is too much surgery.',
    },
  ],
  whenToUse: [
    'The low end of a mix booms on one note and a wideband compressor is ducking the vocal every time that note plays.',
    'A harsh vocal top or a cymbal that only needs the top band turned down. Ableton de-ess suggestion: high band only, crossover around 5 kHz, fast attack and release, solo the band while you set it.',
    'A synth or a drum loop that should be dense in every register. That is the OTT case, used with the mix or depth control, not at full wet by default.',
  ],
  whenNotToUse: [
    'The whole mix needs two decibels of glue. A multiband compressor will give you three different glues and a crossover. Use a [[effect:bus-compressor|bus compressor]].',
    'You have not soloed the bands. You are compressing a crossover you have not heard.',
    'You are tracking. Linear-phase splits and lookahead will delay the headphones. Image-Line and Steinberg both document that class of delay.',
  ],
  startingSettings: [
    {
      source: 'Boomy mix low end',
      settings: [
        { param: 'Bands', value: 'Three. Bypass mid and high.' },
        { param: 'Low crossover', value: 'Wherever the boom starts. Find it by soloing.' },
        { param: 'Low-band gain reduction', value: '2 to 4 dB on the loud notes only' },
        { param: 'Low-band release', value: 'Slow enough that the bass note does not flutter' },
      ],
      note: 'If the vocal thins out when the bass plays, the crossover is too high and the vocal fundamental is inside the low band.',
    },
    {
      source: 'Harsh top',
      settings: [
        { param: 'Bands', value: 'High band only' },
        { param: 'Crossover', value: 'Around 5 kHz, Ableton de-ess starting point' },
        { param: 'Attack and release', value: 'Fast' },
        { param: 'Gain reduction', value: 'A few dB on the esses, almost none on the vowels' },
      ],
      note: 'Solo the band. If you hear the whole vocal, the crossover is too low. A dedicated de-esser comes later in the encyclopedia. This is the multiband version of the same idea.',
    },
    {
      source: 'Dense synth or drum loop',
      settings: [
        { param: 'Tool', value: 'OTT, Evil Otto, or Pro-C TTM' },
        { param: 'Depth or mix', value: 'Start low and raise until the detail appears' },
        { param: 'Upward amount', value: 'Less than the default if the noise floor jumps' },
      ],
      note: 'These are effects. The default preset is already "a lot." Depth on OTT is a dry/wet control. Use it.',
    },
  ],
  techniques: [
    {
      name: 'One band until you can prove you need two',
      description: 'Ableton lets you turn the outer bands off and keep the mid path as a normal compressor.',
      steps: [
        'Bypass every band except the one with the problem.',
        'Compress that band until the problem moves.',
        'Turn the other bands back on at 1:1.',
        'Add a second band only if a second problem is still audible.',
      ],
    },
    {
      name: 'Solo the crossover, not just the band',
      description: 'The seam is where phase and tone go strange.',
      steps: [
        'Solo the low band, then the mid band, and listen to a note that sits on the split.',
        'Sweep the crossover a little. If the note jumps in tone, you are on a resonance or a vocal note.',
        'Park the split in a gap, not on the note.',
      ],
    },
    {
      name: 'Match the band gain after you compress',
      description: 'A compressed low band gets quieter and you will boost it back without noticing you changed the balance.',
      steps: [
        'Note the band output gain before you touch the threshold.',
        'Compress.',
        'Put the band level back where the mix balance was, then decide if the compression helped.',
      ],
    },
  ],
  unorthodoxTechniques: [
    {
      name: 'Different release per band on purpose',
      description: 'The low band can breathe slowly while the high band chatters. That is legal. It is also how you get motion that a wideband compressor cannot do.',
      steps: [
        'Set the low band release to follow the bass note.',
        'Set the high band release fast enough to catch esses and let them go.',
        'Bypass the mid band so you are not also pumping the vocal body.',
      ],
    },
    {
      name: 'Sidechain one band only',
      description: 'Cubase turns auto makeup off for a sidechained band so the duck stays a duck. Use that on the low band and leave the vocal band alone.',
      steps: [
        'Key the low band from the kick.',
        'Leave mid and high unkeyed.',
        'The bass gets out of the kick. The vocal does not pump. Confirm auto makeup did not undo the low band.',
      ],
    },
  ],
  mistakes: [
    'Loading a mastering multiband preset on a single vocal and leaving all four bands active. You will carve a vocal into a diagram.',
    'Linear-phase mode on a live cue mix. Image-Line recommends the FIR linear-phase mode on Fruity Multiband Compressor for mastering, which is the clue that it is not the tracking mode.',
    'Boosting a band 6 dB after compressing it 6 dB and calling the result "more controlled." You undid the level and kept the pumping.',
    'Using multiband to fix a mix that needs arrangement. If the bass and the vocal cannot fit, a crossover will only make that fight narrower.',
  ],
  myths: [
    {
      myth: 'Multiband compression is just EQ.',
      truth: 'The band gain is EQ. The compressor on the band is dynamics. A static cut does not duck when the note gets loud and let go when it gets quiet. If a static cut solves it, do the cut and skip this page.',
    },
    {
      myth: 'More bands are more precise, so they are safer.',
      truth: 'ReaXcomp will give you as many bands as you add. Each new band is another crossover and another envelope that can pump. Precision is one band on the problem. The rest should be bypassed.',
    },
  ],
  chainPlacement:
    'On a mix, a multiband compressor usually sits after the broad EQ and before a wideband bus compressor or a limiter. If the multiband is already doing the glue, skip the extra bus compressor or keep it at 1 dB. On a vocal, try one high band as a de-ess before you build a four-band vocal chain. Do not put a linear-phase multiband in front of a live performer. Latency from lookahead and from linear-phase filters stacks with every other linear-phase plugin in the chain.',
  genres: ['genre:trap'],
  pluginRecs: {
    industryStandard: ['fabfilter-pro-c'],
    proAlternatives: ['tdr-nova'],
    budget: ['klanghelm-dc8c'],
    free: ['xfer-ott', 'audio-damage-evil-otto', 'tdr-nova'],
    stock: [
      { daw: 'ableton-live', name: 'Multiband Dynamics', note: 'Standard and Suite. Up to three bands, upward and downward, compression and expansion.' },
      { daw: 'cubase', name: 'MultibandCompressor', note: 'Four bands, solo and bypass, auto makeup that drops out when a band is sidechained.' },
      { daw: 'fl-studio', name: 'Maximus', note: 'Producer Edition and up. Three bands plus a master band. IIR or linear-phase crossovers.' },
      { daw: 'reaper', name: 'ReaXcomp', note: 'As many bands as you add, with solo, knee, and feedback detection per band.' },
    ],
    notes: 'Pro-C is the industry pick for the TTM style, which is multiband upward and downward with a target level. It is not a fully drawable crossover compressor. For that, use the stock devices above. TDR Nova is free and is a dynamic EQ that can cover multiband duties. It is listed under pro alternatives because the workflow is the real alternative, and under free because that is its price. DC8C is not multiband. It is the budget wideband compressor to buy when you discover you only needed one band. Do not expect crossovers in it.',
  },
  hardware: [
    { name: 'Stock multiband in the DAW', note: 'The working tool for this type is usually the one that came with the DAW. Hardware multiband mastering compressors exist. You can learn the moves on Multiband Dynamics, Cubase MultibandCompressor, Maximus, or ReaXcomp before you price one.' },
  ],
  callouts: [
    {
      variant: 'tip',
      title: 'Bypass bands until only the problem is left',
      body: 'A multiband compressor with every band working is a remix. A multiband compressor with one band working is a fix. Start at the fix.',
    },
    {
      variant: 'mistake',
      title: 'OTT at the default is already a sound',
      body: 'Depth, or the mix knob, is how you use a three-band upward-and-downward preset without handing it the whole track. Turn it up from zero. Do not turn it down from "destroyed" and hope.',
    },
  ],
  related: ['effect:compressor', 'effect:upward-compressor', 'effect:digital-compressor', 'effect:bus-compressor'],
})

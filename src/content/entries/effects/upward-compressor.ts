import { defineEffect } from '../../define'

export default defineEffect({
  id: 'upward-compressor',
  status: 'review',
  skillLevel: 'intermediate',
  roles: ['beatmaker', 'mix-engineer', 'mastering-engineer', 'media-composer'],
  lastVerified: '2026-10-26',
  parent: 'compressor',
  typeGroup: 'Job',
  typeOrder: 9,
  sources: [
    { title: 'Live Audio Effect Reference', author: 'Ableton', url: 'https://www.ableton.com/en/manual/live-audio-effect-reference/' },
    { title: 'FabFilter Pro-C 3 Help: Style and character', author: 'FabFilter', url: 'https://www.fabfilter.com/help/pro-c/using/styleandcharacter' },
    { title: 'Evil Otto user guide', author: 'Audio Damage', url: 'https://audio-damage-inc.github.io/manuals/Evil_Otto_Manual.pdf' },
    { title: 'OTT', author: 'Xfer Records', url: 'https://xferrecords.com/freeware/' },
    { title: 'MCompressor manual', author: 'MeldaProduction', url: 'https://www.meldaproduction.com/download/documentation/MCompressor.pdf' },
  ],
  name: 'Upward Compressor',
  aliases: ['Upwards compression', 'Quiet-part compressor'],
  category: 'dynamics',
  kind: 'type',
  summary: 'Lifts the sounds below a threshold so the quiet detail comes forward, which shrinks dynamic range without pushing the peaks down.',
  cheatSheet: [
    'Ableton: downward compression makes loud signals quieter. Upward compression makes quiet signals louder. Both shrink the range.',
    'Makeup gain after ordinary compression is not this. Makeup lifts the peaks too.',
    'Pro-C Upward is the style that raises level when the signal drops below the threshold. TTM does that and downward compression, across bands, and the threshold becomes a target level.',
    'OTT and Evil Otto are three-band versions: downward on the peaks, upward on the quiet parts, with separate amounts.',
    'The noise floor, the room, the breath, and the headphone bleed all come up with the detail. That is the failure mode.',
    'Ableton Multiband Dynamics draws it as the lower block: drag that block up and you are compressing upward.',
  ],
  history:
    'Downward compression is what the word compressor meant for decades, because broadcast and cutting lathes needed the loud parts held back. Upward compression was always possible and rarely the default. Ableton still calls it the much less common form. It became a daily electronic-music move when multiband devices let you lift the quiet parts of a bass, a mid, and a top separately. The OTT preset, and the free plugins that followed it, made that lift obvious enough to be a genre sound. FabFilter later put a dedicated Upward style in Pro-C 3, and a TTM style that aims the whole signal at a target level by pushing peaks down and quiet parts up. The technique is no longer obscure. It is still easy to confuse with "I turned the makeup knob."',
  howItWorks:
    'Pick a threshold. Material below it gets turned up. Material above it is left alone, or, in a combined processor, turned down by a separate downward stage. The quiet words, the tail of a reverb, the finger noise, and the noise floor all move toward the loud parts. Dynamic range shrinks from the bottom. Ableton Multiband Dynamics shows this as a block below the Below threshold. Drag that block up and the manual calls it upward compression. Drag the block above the Above threshold down and that is ordinary downward compression. You can do both on each of three bands. FabFilter Upward is the single-band version: level increases when the signal falls below the threshold. TTM runs both directions across bands. The knee blends the two stages, and the threshold is the level the signal is herded toward. OTT and Evil Otto expose Upward and Downward as different knobs so you can lift the whisper without also flattening the hit. A negative ratio on a normal compressor is a different stunt: past a point, louder input comes out quieter. That is extreme downward compression. It does not lift the quiet parts.',
  controls: [
    {
      name: 'Threshold or target',
      description: 'On a pure upward compressor, audio under this line gets lifted. On Pro-C TTM, FabFilter says the threshold becomes a target level the signal is pushed toward from both sides.',
      typicalRange: 'Set it where the quiet detail lives, not where the peaks are',
      startingValue: 'So the quiet phrase moves and the noise floor only barely does',
    },
    {
      name: 'Upward amount',
      description: 'How hard the quiet parts are lifted. OTT and Evil Otto give this its own knob, separate from downward. Start lower than the preset.',
      typicalRange: 'From a hint to "everything is in front"',
      startingValue: 'Less than the factory preset',
    },
    {
      name: 'Downward amount',
      description: 'Optional. Combined processors also turn peaks down. If you only wanted the quiet parts louder, leave this lower, or at zero if the plugin allows.',
      typicalRange: '0 to a normal few dB',
      startingValue: 'Low, until you know you also want peaks controlled',
    },
    {
      name: 'Time or release',
      description: 'Fast times make the lift flutter and pull up room tone between syllables. Slower times lift whole phrases. OTT uses one Time knob for the envelopes. Evil Otto gives you the speed as part of the same idea.',
      typicalRange: 'Slow enough that breaths do not pump',
      startingValue: 'Medium, then slower if the room comes up',
    },
    {
      name: 'Depth or mix',
      description: 'Dry/wet. This is the control that makes an OTT-style plugin usable. Full wet is the effect. Anything less is the effect under the original transient.',
      typicalRange: '0 to 100%',
      startingValue: 'Low, raise until the detail appears',
    },
  ],
  meters: [
    { name: 'Below-threshold gain', description: 'On Ableton Multiband Dynamics the lower block is the upward move. If that block is up and the noise between notes is suddenly a part, you have gone too far. The meter will not say "noise." Your ears will.' },
    { name: 'Upward versus downward meters', description: 'OTT shows the quiet zone and the loud zone separately. Watch both. A preset can be doing a huge upward lift while you stare at the downward gain reduction out of habit.' },
  ],
  variants: [
    {
      name: 'Single-band upward',
      description: 'Pro-C Upward. The whole signal gets the quiet-part lift. Simple, and it will raise everything quiet, including rumble.',
    },
    {
      name: 'Multiband upward and downward',
      description: 'Ableton three bands, OTT, Evil Otto, and Pro-C TTM. Each range can be made denser. This is the electronic-music sound. It is also how a mix loses its background.',
    },
    {
      name: 'Drawn transfer curve',
      description: 'Melda MCompressor can replace the stock curve with a shape you draw. A curve that rises for low input levels and flattens for high ones is upward compression. Look at the graph. The name of the preset is not the proof.',
    },
  ],
  whenToUse: [
    'A synth, a room mic, or a soft vocal detail that disappears, and the peaks are already the right size.',
    'A drum loop or a bass that should feel detailed in the quiet ticks, used in parallel or at low depth.',
    'A voiceover bed where the quiet words must come up and you do not want the loud words pushed down any further.',
  ],
  whenNotToUse: [
    'The take is noisy, washy, or full of breath. Upward compression will feature that. Downward compression plus makeup, or editing the clip gain, is kinder.',
    'You only needed the vocal louder. Clip gain or a fader does that without lifting the noise between words.',
    'You wanted a limiter. Upward compression does not hold peaks back unless the plugin also has a downward stage or you add a limiter after it.',
  ],
  startingSettings: [
    {
      source: 'Soft vocal detail',
      settings: [
        { param: 'Mode', value: 'Upward only, if you can split it' },
        { param: 'Depth', value: 'Low' },
        { param: 'Time', value: 'Slow enough that breaths stay breaths' },
        { param: 'Noise check', value: 'Listen between the words' },
      ],
      note: 'If the room arrived before the quiet lyric did, stop. Edit the clip or use downward compression.',
    },
    {
      source: 'Synth or drum loop',
      settings: [
        { param: 'Tool', value: 'OTT or Evil Otto' },
        { param: 'Depth', value: 'Start near the bottom and raise' },
        { param: 'Upward', value: 'Below the downward amount at first' },
        { param: 'Bands', value: 'Turn a band down if only one range got harsh' },
      ],
      note: 'Audio Damage describes the goal as dense and aggressively present. That is a choice. Depth is how you decline part of it.',
    },
    {
      source: 'Target-level bus',
      settings: [
        { param: 'Style', value: 'Pro-C TTM' },
        { param: 'Threshold', value: 'The level you want the program herded toward' },
        { param: 'Knee', value: 'Wider if the pumping is obvious' },
        { param: 'Gain reduction and lift', value: 'A few dB, not the preset extreme' },
      ],
      note: 'FabFilter: the knee blends the upward and downward stages. A narrow knee on TTM is a more obvious pump.',
    },
  ],
  techniques: [
    {
      name: 'Prove it is not makeup',
      description: 'You should be able to explain which parts got louder.',
      steps: [
        'Loop a loud hit and a quiet tick.',
        'Engage upward compression at a modest amount.',
        'The tick should come up more than the hit. If both came up the same, you used makeup or an output fader.',
        'Bypass and match the loud hit. The tick should still be more present when the processor is in.',
      ],
    },
    {
      name: 'Upward in parallel',
      description: 'The dry path keeps the dynamics. The lifted path adds the detail.',
      steps: [
        'Put OTT or Pro-C Upward on a return, or use the mix knob.',
        'Set it stronger than you would full wet.',
        'Blend until the detail shows and the noise does not.',
      ],
    },
    {
      name: 'Lift one band',
      description: 'Ableton lets you drag only the lower block of one band.',
      steps: [
        'Solo the band that is missing, often the top of a dull loop or the body of a thin vocal.',
        'Raise only that band below-threshold block.',
        'Unsolo. If the whole track got noisy, the band was too wide.',
      ],
    },
  ],
  unorthodoxTechniques: [
    {
      name: 'Upward on the room, downward on the close mic',
      description: 'The close mic stays punchy. The room comes forward and makes the kit bigger.',
      steps: [
        'Downward-compress the close snare or vocal as usual.',
        'Upward-compress the room mic, slowly, and high-pass it.',
        'If the room pre-delay smear gets louder than the hit, you lifted too much. The hit has to win.',
      ],
    },
    {
      name: 'Draw the bottom of the curve and leave the top alone',
      description: 'MCompressor custom shape can do this without a mode switch named upward.',
      steps: [
        'Enable the custom shape and look at input on the horizontal axis and output on the vertical.',
        'Lift the left side of the curve, where quiet inputs live.',
        'Leave the right side near the diagonal so peaks are not also being rewritten.',
        'The free edition is enough to try the idea. Preset management beyond the factory set is part of the paid upgrade.',
      ],
    },
  ],
  mistakes: [
    'Turning makeup up and calling it upward compression. The peaks got louder too. That is a fader.',
    'Using a negative ratio because the manual said "more compression." Negative ratio ducks harder as the signal gets louder. It does not fetch the quiet parts.',
    'Full-wet OTT on a vocal recorded in an untreated room. You will master the room tone.',
    'Stacking upward compression on every bus. The noise and the reverb tails become the arrangement.',
  ],
  myths: [
    {
      myth: 'Upward compression is the same as parallel compression.',
      truth: 'Parallel blends a squashed copy under a dry copy. The squashed copy is usually downward compression. Upward compression changes the quiet parts gain before the blend. You can put an upward compressor in parallel, and then you are doing both.',
    },
    {
      myth: 'It is safer than downward compression because the peaks stay put.',
      truth: 'The peaks stay closer to where they were, which is why a limiter may still be required. The quiet junk is what gets less safe. Ableton lists it as uncommon for a reason.',
    },
  ],
  chainPlacement:
    'Upward compression wants a clean signal. Edit clips, high-pass rumble, and mute the gaps before you lift everything that is left. Put it after those repairs and before a limiter, because the lift can create new peaks when a quiet moment is no longer quiet. On a send, it can live in parallel under a normal downward compressor on the dry track. Do not follow it with another upward stage on the mix bus unless you have listened to the noise floor at the new gain.',
  genres: ['genre:trap'],
  pluginRecs: {
    industryStandard: ['fabfilter-pro-c'],
    proAlternatives: ['cytomic-the-glue'],
    budget: ['klanghelm-dc8c'],
    free: ['xfer-ott', 'audio-damage-evil-otto', 'melda-mcompressor'],
    stock: [
      { daw: 'ableton-live', name: 'Multiband Dynamics', note: 'Drag the lower block up. Standard and Suite. OTT-style presets live here.' },
      { daw: 'logic-pro', name: 'Compressor', note: 'No upward mode is named on Apple parameters page. Do not confuse makeup gain with this page.' },
      { daw: 'cubase', name: 'MultibandCompressor', note: 'A band can be turned up after compression. That post gain is not automatically upward compression. Listen for the quiet parts specifically.' },
      { daw: 'reaper', name: 'ReaComp', note: 'No dedicated upward mode. Use OTT or Evil Otto in Reaper for the actual process.' },
    ],
    notes: 'Pro-C Upward and TTM are the verified paid upward tools. The Glue does not do upward compression. It is listed so you have the pro wideband compressor to switch to when upward lift is the wrong tool. DC8C negative ratios are also not upward compression. They are listed because a budget downward compressor is what you buy if this page talked you out of the move. The free plugins are the ones that actually lift the quiet parts: OTT, Evil Otto, and a drawn curve in MCompressor.',
  },
  hardware: [
    { name: 'Rare in the classic rack', note: 'The famous analog compressors on the other pages are downward compressors. Upward compression became common in software, especially in multiband devices. If a hardware box claims it, read whether it lifts below the threshold or only adds makeup.' },
  ],
  callouts: [
    {
      variant: 'warning',
      title: 'It will turn the noise up',
      body: 'Room tone, hiss, breaths, and bleed are quiet on purpose. Upward compression treats them as detail. Listen in the gaps at the level of the loud note before you keep the setting.',
    },
    {
      variant: 'myth',
      title: 'Makeup is not the mode',
      body: 'If the loud hit and the quiet tick both rose by the same amount, you used the output knob. Upward compression moves the tick more than the hit.',
    },
  ],
  related: ['effect:compressor', 'effect:multiband-compressor', 'effect:digital-compressor', 'glossary:gain-reduction'],
})

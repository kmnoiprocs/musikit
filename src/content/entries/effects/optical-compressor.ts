import { defineEffect } from '../../define'

export default defineEffect({
  id: 'optical-compressor',
  status: 'review',
  skillLevel: 'beginner',
  roles: ['vocalist', 'rapper', 'recording-engineer', 'mix-engineer', 'songwriter'],
  lastVerified: '2026-10-26',
  parent: 'compressor',
  typeGroup: 'Circuit',
  typeOrder: 2,
  sources: [
    { title: 'Teletronix LA-2A Leveler Collection Manual', author: 'Universal Audio', url: 'https://help.uaudio.com/hc/en-us/articles/4419496124180-Teletronix-LA-2A-Leveler-Collection-Manual' },
    { title: 'Compressor main parameters in Logic Pro for Mac', author: 'Apple', url: 'https://support.apple.com/guide/logicpro/compressor-main-parameters-lgcead9636ef/mac' },
    { title: 'FabFilter Pro-C 3 Help: Style and character', author: 'FabFilter', url: 'https://www.fabfilter.com/help/pro-c/using/styleandcharacter' },
    { title: '1176LN Manual', author: 'Universal Audio', url: 'https://media.uaudio.com/assetlibrary/1/1/1176ln_manual.pdf', note: 'Engineers quoted here pair the LA-2A with the 1176.' },
  ],
  name: 'Optical Compressor',
  aliases: ['Opto compressor', 'Optical leveler', 'Leveling amplifier'],
  category: 'dynamics',
  kind: 'type',
  summary: 'A light shines on a photocell, the cell changes gain slowly and unevenly, and vocals and bass come out smoother than you could ride them.',
  cheatSheet: [
    'The detector is a lamp and a light-sensitive resistor. The cell has a memory, so release is not one number.',
    'An LA-2A has peak reduction and gain, plus Compress or Limit. It does not have attack and release knobs.',
    'UA: Compress is about 3:1, Limit is about infinity:1, and neither figure is exact because the ratio is nonlinear and changes with frequency.',
    'Apple calls optical release non-linear, and lists vocals and guitars as the fit. Use it to level, not to catch a click.',
    'FabFilter Opto is the slow, soft-knee optical style. Op-El is the opto-like tube style. They are not the same setting.',
    'If the vocal still has stray peaks after the optical, follow it with a faster [[effect:fet-compressor|FET]], or put the FET first.',
  ],
  history:
    'The leveling amplifier is the optical compressor people mean by name. The Teletronix LA-2A is the reference: a small set of controls, a tube makeup path, and an optical cell doing the gain change. Universal Audio still documents it as a leveler with a compress/limit switch rather than as a fully timed compressor. Studios kept it because a singer can lean in and back off and the gain follows without a ratio and an attack time to rethink on every take. The 1176, which is faster and brighter, ended up beside it. Engineers quoted in the 1176LN manual talk about owning both. Modern plugins split the idea into a slow optical style and a slightly tube-colored optical style. FabFilter labels those Opto and Op-El.',
  howItWorks:
    'An optical compressor turns the audio into light, then back into a resistance. When the signal gets louder, the lamp gets brighter, the photocell conducts differently, and the audio level falls. The cell does not forget the light the instant the lamp dims. That memory is the program-dependent release Apple is pointing at when it says optical compressors have non-linear release handling: a short burst lets go quicker than a long loud note. You usually cannot set that as two numbers. On the LA-2A you set Peak Reduction until the gain-reduction meter moves on the loud phrases, and Gain until the level matches. Compress mode is about 3:1. Limit mode is about infinity:1. UA is explicit that those ratios are not absolute. They bend with level and with frequency, which is why an optical compressor can take a surprising amount of peak reduction and still sound less mechanical than a 4:1 digital compressor showing the same meter.',
  controls: [
    {
      name: 'Peak reduction',
      description: 'How hard the lamp is driven. This is threshold and amount in one knob. Turn it until the loud phrases show a few decibels of gain reduction and the quiet phrases mostly do not.',
      typicalRange: 'From barely moving the meter to heavy limiting',
      startingValue: '3 to 7 dB on the loud phrases',
    },
    {
      name: 'Gain',
      description: 'Makeup after the optical cell. On the LA-2A this is also where tube color lives, so more gain is not only louder. Match it to the bypass before you decide you like the thickness.',
      typicalRange: 'Unity up through several dB of makeup',
      startingValue: 'Match the bypass',
    },
    {
      name: 'Compress / Limit',
      description: 'UA sets Compress near 3:1 and Limit near infinity:1, with the caveat that the ratio is nonlinear and frequency dependent. Compress for leveling a vocal or a bass. Limit when you truly want peaks held down and you like the thicker result.',
      typicalRange: 'Two positions on an LA-2A',
      startingValue: 'Compress',
    },
    {
      name: 'Emphasis or sidechain filter',
      description: 'Many optical plugins add a control the hardware hid or omitted: a high-frequency emphasis so the cell reacts more to brightness, or a high-pass so a boomy note does not dim the lamp. Use it when one band is doing all the triggering.',
      typicalRange: 'Flat, or a gentle tilt',
      startingValue: 'Flat, then high-pass the detector if the low end pumps',
    },
  ],
  meters: [
    { name: 'Gain reduction', description: 'On the LA-2A you flip the meter to GR. Watch the loud words, not the noise floor. If the needle is pinned for the whole phrase, peak reduction is past leveling and into an effect.' },
    { name: 'Output', description: 'Flip back to output after you set gain. The bypass comparison is the real meter: the vocal should not jump in level when you click the plugin off.' },
  ],
  variants: [
    {
      name: 'Leveling amplifier',
      description: 'The LA-2A case: two knobs, compress or limit, program-dependent optical release, tube makeup. You level a performance. You do not sculpt a transient.',
    },
    {
      name: 'Soft-knee optical style',
      description: 'FabFilter describes Opto as relatively slow, with a very soft knee and a more linear optical behavior. Use this when you want the smoothness without asking a plugin to be a specific LA-2A revision.',
    },
    {
      name: 'Opto with tube color',
      description: 'FabFilter Op-El is the opto-like tube style: smooth, warm, and more colored than the plain Opto style. Reach for it when the vocal needs body, not only evenness.',
    },
  ],
  whenToUse: [
    'A sung vocal, a rap vocal with uneven distance to the mic, or a bass that blooms on some notes and vanishes on others.',
    'Acoustic guitar or a pad that should feel even without audible pumping.',
    'The second compressor in a chain, after a FET has caught the peaks, when the phrase still drifts.',
  ],
  whenNotToUse: [
    'You need to shape a snare transient in milliseconds. The optical cell will not give you a 1176 attack. Use a [[effect:fet-compressor|FET]] or a [[effect:vca-compressor|VCA]].',
    'The vocal is already consistent and a little dull. An optical plus tube makeup can make it softer and thicker when you wanted air.',
    'You are riding a mix bus that needs a couple of decibels of glue on the hits. That is a [[effect:bus-compressor|bus compressor]] with a slow attack you can actually set.',
  ],
  startingSettings: [
    {
      source: 'Lead vocal',
      settings: [
        { param: 'Mode', value: 'Compress (about 3:1 on an LA-2A)' },
        { param: 'Peak reduction', value: 'Until loud phrases show 3 to 5 dB' },
        { param: 'Gain', value: 'Match bypass' },
        { param: 'Detector', value: 'Flat, unless low notes are triggering it' },
      ],
      note: 'If the loud notes still jump, do not keep turning peak reduction until the cell is stuck. Add a faster compressor for those peaks.',
    },
    {
      source: 'Bass',
      settings: [
        { param: 'Mode', value: 'Compress' },
        { param: 'Peak reduction', value: '3 to 6 dB on the loud notes' },
        { param: 'Gain', value: 'Match bypass' },
        { param: 'Detector high-pass', value: 'On, if the sub is doing all the work' },
      ],
      note: 'Optical on bass is leveling. If the pluck disappears, the cell is being hit too hard, or you wanted a FET with a slower attack instead.',
    },
    {
      source: 'Acoustic guitar',
      settings: [
        { param: 'Style', value: 'Soft-knee optical' },
        { param: 'Gain reduction', value: '2 to 4 dB' },
        { param: 'Emphasis', value: 'A little, only if pick noise is the thing jumping out' },
      ],
      note: 'Emphasis makes the detector hear the pick. The strings you wanted to keep can duck. Use a little, and bypass often.',
    },
  ],
  techniques: [
    {
      name: 'Level the phrase, then stop',
      description: 'Optical compressors reward under-doing it.',
      steps: [
        'Loop a section that has one shy line and one pushed line.',
        'Raise peak reduction until those two lines are closer, and the gain-reduction meter mostly rests between them.',
        'Match gain to the bypass.',
        'If you can hear the compressor breathing, you have gone past leveling.',
      ],
    },
    {
      name: 'Optical after a FET',
      description: 'The FET does the fast work the photocell cannot. The optical does the slow work the FET makes obvious.',
      steps: [
        'FET first, 4:1, a few dB, attack not pinned to its fastest.',
        'Optical second, compress mode, another 2 to 4 dB on the body.',
        'Judge the pair with one bypass of both. Either one soloed will sound unfinished, and that is fine.',
      ],
    },
    {
      name: 'Limit mode as a thick peak hold',
      description: 'Limit on an LA-2A is not a brickwall limiter. UA puts it near infinity:1 and immediately qualifies that.',
      steps: [
        'Set the performance in Compress first.',
        'Flip to Limit and listen to the same peak reduction.',
        'Keep Limit if the peaks sit back and the tone got thicker in a way you want. Flip back if the vocal just got smaller.',
      ],
    },
  ],
  unorthodoxTechniques: [
    {
      name: 'Pin it and blend',
      description: 'Heavy optical compression gets spongy and dark. In parallel, that sponge is a vocal body knob.',
      steps: [
        'Duplicate the vocal or use a mix knob.',
        'Drive peak reduction until the copy is obviously squashed.',
        'Blend it under the dry vocal until the center of the note fills in and the diction stays on the dry path.',
      ],
    },
    {
      name: 'Optical on a drum room, not on the close snare',
      description: 'The cell is too slow to be your snare shaper and slow enough to make a room mic feel like a room.',
      steps: [
        'Leave the close snare on a FET or a VCA.',
        'Put the optical on the room mic and let it clamp the wash after the hit.',
        'Ride the gain so the room bloom returns before the next backbeat, or accept a darker room and high-pass it.',
      ],
    },
  ],
  mistakes: [
    'Looking for an attack knob that the LA-2A does not have, then swapping in a digital compressor and calling it optical because the preset said so.',
    'Using Limit mode on a whole vocal bus because infinity:1 sounds more serious. The ratio is not a brickwall, and the cell will sit down for a long time after a loud word.',
    'Adding high-end EQ after a dark optical squash to get the air back, instead of reducing peak reduction.',
    'Ignoring frequency dependence. UA says the ratio changes with frequency. A bright vocal and a bass will not compress the same at the same knob position.',
  ],
  myths: [
    {
      myth: 'Optical compressors are too slow to be useful on anything with a transient.',
      truth: 'They are the wrong tool for shaping a snare click. They are a good tool on the vocal or bass that contains those transients, because the cell levels the note and lets a little of the start through. Apple still lists a fast transient response as part of the optical description, alongside the non-linear release. Read that as "it is not a smear box," not as "it replaces an 1176."',
    },
    {
      myth: 'Compress on an LA-2A is exactly 3:1.',
      truth: 'Universal Audio says approximately 3:1 in Compress and approximately infinity:1 in Limit, and that the figures are not absolute because the ratios are nonlinear and frequency dependent.',
    },
  ],
  chainPlacement:
    'High-pass and the worst mud cuts go before the optical compressor so the lamp is not flashing on low-end junk. De-essing often goes after, because tube makeup and a squeezed midrange can make sibilance more obvious, or before, if the "s" is what keeps triggering the cell. A FET can sit on either side: before, to catch peaks the cell misses, or after, to add bite the optical rounded off. Time-based effects stay on a send.',
  pluginRecs: {
    industryStandard: ['fabfilter-pro-c'],
    proAlternatives: ['arturia-comp-tube-sta'],
    budget: ['klanghelm-dc8c'],
    free: ['klanghelm-dc1a', 'tdr-molotok'],
    stock: [
      { daw: 'logic-pro', name: 'Compressor', note: 'Vintage Opto. Apple describes Opto as clean, with non-linear release, and suited to vocals and guitars. The manual page does not claim a specific LA-2A revision.' },
      { daw: 'ableton-live', name: 'Compressor', note: 'No optical model. A soft knee, RMS detection, and a slower attack are the closest stock behavior.' },
      { daw: 'cubase', name: 'VintageCompressor', note: 'Input-driven vintage behavior with auto release. Not labeled optical.' },
      { daw: 'reaper', name: 'ReaComp', note: 'Use program-dependent auto-release and a slower attack. It will level. It will not be an LA-2A.' },
    ],
    notes: 'Set Pro-C to Opto for the slow soft-knee style, or Op-El if you want the opto-like tube color FabFilter describes. Comp TUBE-STA is not an optical cell. It is the pro alternative when you wanted that slow, colored, two-knob leveling and a tube path fits better. DC8C gain-reduction smoothing is the Klanghelm suggestion for opto-style timing, and it is not an LA-2A model. DC1A is the free two-knob leveler. Same honesty: character, not a photocell.',
  },
  hardware: [
    { name: 'LA-2A', maker: 'Teletronix / Universal Audio', note: 'The leveling amplifier. Peak reduction, gain, and compress/limit. Ratios are approximate.' },
    { name: 'LA-3A', maker: 'UREI', note: 'A different optical hardware unit from the LA-2A. If a plugin names the LA-3A, it is claiming that unit, not a generic opto preset.' },
  ],
  callouts: [
    {
      variant: 'tip',
      title: 'Stop when the shy line comes up',
      body: 'The goal is the quiet word matching the loud word. Once that happens, more peak reduction is an effect. Blend it or quit.',
    },
  ],
  related: ['effect:compressor', 'effect:fet-compressor', 'effect:tube-compressor', 'effect:vintage-compressor'],
})

import { defineEffect } from '../../define'

export default defineEffect({
  id: 'tube-compressor',
  status: 'review',
  skillLevel: 'intermediate',
  roles: ['vocalist', 'recording-engineer', 'mix-engineer', 'mastering-engineer', 'songwriter'],
  lastVerified: '2026-10-26',
  parent: 'compressor',
  typeGroup: 'Circuit',
  typeOrder: 3,
  sources: [
    { title: 'MJUC', author: 'Klanghelm', url: 'https://klanghelm.com/contents/products/MJUC.html' },
    { title: 'MJUC jr.', author: 'Klanghelm', url: 'https://klanghelm.com/contents/products/MJUCjr.html' },
    { title: 'Comp TUBE-STA overview', author: 'Arturia', url: 'https://www.arturia.com/products/software-effects/comp-tubesta/overview' },
    { title: 'Tube Compressor', author: 'Steinberg', url: 'https://www.steinberg.help/r/cubase-pro/cubaseplugref/15.0/en/_shared/topics/plug_ref/tube_compressor_r.html' },
    { title: 'FabFilter Pro-C 3 Help: Style and character', author: 'FabFilter', url: 'https://www.fabfilter.com/help/pro-c/using/styleandcharacter' },
  ],
  name: 'Tube Compressor',
  aliases: ['Variable-mu compressor', 'Vari-mu compressor', 'Valve compressor'],
  category: 'dynamics',
  kind: 'type',
  summary: 'A tube changes its own gain as the signal gets louder, which is why these compressors feel thick, slow to misbehave, and bad at surgical peak catching.',
  cheatSheet: [
    'The technical name is variable-mu: the tube gain (mu) changes with the control voltage. Manley uses Variable Mu as a product name, so this page says tube compressor for the circuit.',
    'Klanghelm splits the history into three feels: dense early designs, the 175 and 176 tube limiters of the early 1960s, and a cleaner modern tube path.',
    'The Gates STA-Level, which Arturia models, is a 1950s tube compressor with input drive instead of a normal threshold.',
    'You get harmonics from the tubes and the transformers. Match the bypass or you will keep it just because it got louder.',
    'Use it on vocals, bass, and mix color. Do not hire it to catch a click. That is a FET or a digital lookahead compressor.',
    'Cubase Tube Compressor is the stock version: input-driven amount, a drive knob, and a low or high ratio.',
  ],
  history:
    'Tube compressors are the oldest studio compressors still in daily use. Arturia dates the Gates STA-Level to production in the 1950s: a broadcast and studio leveler with a quirky attack and release and very few controls. Klanghelm, building MJUC, describes the early variable-mu designs as dense and simple, then the more complex 175 and 176 of the early 1960s, which are the all-tube limiters that came before the FET 1176. Later tube compressors got quieter and cleaner. The circuit never became the right tool for a transparent master. It stayed the tool for "make this vocal or this bass feel expensive." FabFilter Vari-Mu style is the plugin version of that request without a specific vintage unit attached.',
  howItWorks:
    'In a variable-mu compressor the gain reduction happens in the tube, not in a separate VCA chip. A control voltage shifts the tube operating point so a louder input produces less gain. The ratio is often not a fixed number. It increases as you drive the input harder, which is why these boxes feel gentle until they suddenly feel like a lot. Transformers and extra tube stages add harmonics on the way in and the way out. Klanghelm is blunt about the trademark: variable-mu is the right technical term and also a Manley product name, and their plugin is not that product. Their three models are a practical map. Mk1 is the dense, highly colored early behavior, using several variable-mu stages and, they say, very little of the thump some fast tube designs produce. Mk2 follows the 175 and 176: more forward, more harmonics, with a switchable interstage transformer. Mk3 is the cleaner modern one, and Klanghelm says its dual-stage feed-forward-plus-feedback trick lands closer to a British G-type bus compressor than to a 670. Arturia STA-Level takes the other road: link input and output so turning the compressor up does not also turn the fader up.',
  controls: [
    {
      name: 'Input or compression amount',
      description: 'On an STA-Level style box this replaces a threshold. More input, more compression, and more tube drive. Arturia includes an input-output link so you can hear the compression without the level jump.',
      typicalRange: 'From barely kissing the tube to obvious drive',
      startingValue: 'A few dB of gain reduction, link on',
    },
    {
      name: 'Timing',
      description: 'Hardware tube compressors often give you a handful of time-constant positions rather than continuous attack and release. MJUC jr. offers Fast, Slow, and Auto. Fast is not FET-fast. It is fast for a tube.',
      typicalRange: 'A few fixed positions, or Auto',
      startingValue: 'Slow or Auto',
    },
    {
      name: 'Drive and timbre',
      description: 'Klanghelm Drive loads the transformers and the tube stages. Timbre shifts the tone. These are not the compressor. Set the gain reduction first, then add drive until the harmonic change is the one you wanted.',
      typicalRange: 'Off to clearly audible',
      startingValue: 'Low, then match level',
    },
    {
      name: 'Ratio or density',
      description: 'Where a ratio exists it may be stepped, and a density switch may bring in another tube stage. MJUC Mk2 has four ratios and a density switch that adds a second variable-mu stage and makes the timing less program-dependent.',
      typicalRange: 'A few steps, not 1.5:1 through 20:1',
      startingValue: 'The lowest step that levels the phrase',
    },
  ],
  meters: [
    { name: 'VU gain reduction', description: 'Tube compressors are usually read on a VU, which is slower than a peak meter. A VU showing 3 dB can be hiding a much taller short peak. Do not use it as a safety limiter.' },
    { name: 'Output VU', description: 'MJUC jr. can show gain reduction or output. Check output after makeup so the tube color is not just a louder vocal.' },
  ],
  variants: [
    {
      name: 'Early dense tube',
      description: 'Klanghelm Mk1: several variable-mu stages, simple path, lots of color, designed to avoid the thump of a fast control voltage. Vocals and bass that should feel heavy.',
    },
    {
      name: '1960s tube limiter',
      description: 'The 175 and 176 approach, which Klanghelm uses for Mk2. More forward and more harmonic than the earliest designs, and the ancestor of the FET 1176.',
    },
    {
      name: 'Clean modern tube',
      description: 'Klanghelm Mk3, and the cleaner end of FabFilter Vari-Mu. Still a tube compressor, closer to glue than to a fuzz box. Klanghelm explicitly compares Mk3 punch to a British G-type bus more than to a 670.',
    },
  ],
  whenToUse: [
    'A vocal that is even enough but sounds thin. The tube and the transformer are the point, with a few decibels of real compression on top.',
    'Bass that should feel larger than the DI. Arturia calls out the STA-Level as a bass and vocal tool.',
    'A mix or a stem that needs a slow, thick glue and can spare a little transparency. Try the clean modern model before the densest one.',
  ],
  whenNotToUse: [
    'You are trying to stop a snare click or a plosive from clipping a converter. The tube will be late. Use a [[effect:fet-compressor|FET]] or a [[effect:digital-compressor|digital]] lookahead compressor.',
    'The source is already boomy and dark. More transformer color will make that worse. Fix the tone, or pick a VCA.',
    'You need the same ratio on every song in a series. Program-dependent tube timing will not repeat like a digital threshold.',
  ],
  startingSettings: [
    {
      source: 'Lead vocal',
      settings: [
        { param: 'Model', value: 'Early or 1960s, if you want color' },
        { param: 'Timing', value: 'Slow or Auto' },
        { param: 'Gain reduction', value: '2 to 4 dB on the VU' },
        { param: 'Drive', value: 'Low, then raise with the level matched' },
      ],
      note: 'Link input and output on an STA-Level style plugin before you judge drive. Arturia added that link because the original hardware did not separate "more compression" from "more level."',
    },
    {
      source: 'Bass',
      settings: [
        { param: 'Model', value: 'Dense or STA-Level' },
        { param: 'Timing', value: 'Slow' },
        { param: 'Gain reduction', value: '3 to 6 dB' },
        { param: 'Output', value: 'Matched to bypass' },
      ],
      note: 'If the low note thumps, the timing is too fast for this circuit. Klanghelm calls that thump out as a known variable-mu problem and designed Mk1 to avoid it. Switch model or slow down before you EQ the thump.',
    },
    {
      source: 'Mix color',
      settings: [
        { param: 'Model', value: 'Clean modern, or Pro-C Vari-Mu' },
        { param: 'Gain reduction', value: '1 to 2 dB' },
        { param: 'Drive', value: 'Barely on' },
      ],
      note: 'This is glue with a tube accent. If the chorus pumps, you wanted a [[effect:bus-compressor|bus compressor]], not more input drive.',
    },
  ],
  techniques: [
    {
      name: 'Separate drive from reduction',
      description: 'The two knobs that both make it "more" are doing different jobs.',
      steps: [
        'Set timing and get a couple of decibels of gain reduction with drive low.',
        'Match the output.',
        'Raise drive and turn the output back down until the level matches again.',
        'Keep the drive change only if the tone got better at the same loudness.',
      ],
    },
    {
      name: 'Use the 175/176 model as a bridge to a FET',
      description: 'Klanghelm Mk2 is the tube ancestor of the 1176. It is the right tube model when the vocal needs to come forward, not sink into the couch.',
      steps: [
        'Pick the forward, higher-harmonic model rather than the densest early one.',
        'Use a medium timing and 3 to 5 dB.',
        'If you still want bite after that, add a FET doing less, instead of driving the tube until it is fuzzy.',
      ],
    },
    {
      name: 'Stereo link, then check the image',
      description: 'Tube compressors can image-shift if the two sides reduce gain differently.',
      steps: [
        'On a bus, engage stereo link.',
        'Sum to mono for a second. If the vocal or the snare ducks in mono only, the link is off or the sides are triggering differently.',
        'High-pass the detector if a bass note on one side is pulling the whole picture.',
      ],
    },
  ],
  unorthodoxTechniques: [
    {
      name: 'Almost no gain reduction, mostly the iron',
      description: 'Sometimes the compressor is a tone box and the meter is a passenger.',
      steps: [
        'Set the timing slow and the threshold so the VU barely twitches on the loudest word.',
        'Raise drive until the midrange fills in.',
        'Match level. If the twitch turns into 5 dB, you slipped back into real compression. Decide which one you wanted.',
      ],
    },
    {
      name: 'Tube on a parallel vocal, digital on the dry',
      description: 'The dry vocal stays intelligible. The tube copy supplies the size.',
      steps: [
        'Keep a [[effect:digital-compressor|digital]] or optical compressor on the main vocal, doing the leveling.',
        'Send to a tube compressor and hit it harder than you would on the main path.',
        'Blend until the chorus feels bigger and the words are still the dry vocal.',
      ],
    },
  ],
  mistakes: [
    'Calling every warm compressor a tube compressor. Optical cells, diode bridges, and tape are different color. Read the product page.',
    'Judging Mk1, an STA-Level, and a clean modern tube model as if they were one plugin with a skin. Klanghelm gave them separate signal paths for a reason.',
    'Using the VU as a peak meter and sending the mix to a limiter that then works too hard.',
    'Driving the input on an unlinked STA-Level style control and keeping the result because the vocal got louder.',
  ],
  myths: [
    {
      myth: 'Variable-mu means the Manley Variable Mu, and any other tube compressor is a copy of it.',
      truth: 'Klanghelm notes that Variable Mu is a Manley trademark and that the words, in a technical sentence, mean the decades-old circuit. The Gates STA-Level, the 175 and 176, and later clean tube designs are different machines in that family.',
    },
    {
      myth: 'Tube compression is always slow and always muddy.',
      truth: 'Fast time constants exist, and Klanghelm says they are exactly where some designs thump. The clean modern models are built to be quieter and less distorted. Mud is too much drive plus too much low end, not a law of tubes.',
    },
  ],
  chainPlacement:
    'Put the tube compressor after the cleanup EQ, so you are not saturating a rumble you meant to cut. If you want the EQ to shape the harmonics, put a gentle tone EQ after the tube and keep it small. A de-esser after a driven tube vocal is common because the harmonics make "s" sounds louder. On a mix, the tube compressor replaces a bus compressor only when you want that color. Otherwise the bus compressor goes after it, doing 1 dB, or you skip one of them.',
  pluginRecs: {
    industryStandard: ['arturia-comp-tube-sta'],
    proAlternatives: ['fabfilter-pro-c'],
    budget: ['klanghelm-mjuc'],
    free: ['klanghelm-mjuc-jr'],
    stock: [
      { daw: 'cubase', name: 'Tube Compressor', note: 'Input sets the amount, Drive is the tube saturation, Ratio is a low or high switch, and Character protects bass attacks while adding high harmonics.' },
      { daw: 'logic-pro', name: 'Compressor', note: 'No tube circuit in the published model list. Vintage Opto is the closest slow, colored stock compressor, and it is optical, not a tube.' },
      { daw: 'ableton-live', name: 'Compressor', note: 'No tube compressor. Dynamic Tube is a saturator, not a leveler. Do not substitute it and expect gain reduction.' },
      { daw: 'reaper', name: 'ReaComp', note: 'No tube model. Use it for the leveling, then a separate saturator if you need the harmonics.' },
    ],
    notes: 'Comp TUBE-STA is the Gates STA-Level model. Pro-C Vari-Mu is the style to load if you already own Pro-C and want the circuit without a specific 1950s unit. MJUC is the budget plugin with the three models Klanghelm describes. MJUC jr. is the free tube compressor: Fast, Slow, and Auto, without the model switch.',
  },
  hardware: [
    { name: 'STA-Level', maker: 'Gates', note: '1950s tube leveler. Arturia Comp TUBE-STA is the plugin model, with a modern input-output link and sidechain.' },
    { name: '175 and 176', maker: 'Universal Audio', note: 'Early-1960s all-tube limiters. Klanghelm treats them as the bridge to the 1176.' },
    { name: 'Variable Mu', maker: 'Manley', note: 'A specific modern product in this circuit family. The name is trademarked. This page is about the circuit, not a manual for that unit.' },
  ],
  callouts: [
    {
      variant: 'tip',
      title: 'Link the input and the output',
      body: 'If the plugin has an input-output link, turn it on before you twist the big knob. You are trying to hear compression and harmonics, not a fader move.',
    },
    {
      variant: 'warning',
      title: 'A VU is not a safety meter',
      body: 'Tube gain reduction on a VU can look gentle while short peaks still slam the next plugin or the converter. Watch a peak meter after the tube compressor if this is the last dynamics stage before a limiter.',
    },
  ],
  related: ['effect:compressor', 'effect:fet-compressor', 'effect:vintage-compressor', 'effect:bus-compressor', 'effect:optical-compressor'],
})

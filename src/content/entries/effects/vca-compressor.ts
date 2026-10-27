import { defineEffect } from '../../define'

export default defineEffect({
  id: 'vca-compressor',
  status: 'review',
  skillLevel: 'beginner',
  roles: ['beatmaker', 'recording-engineer', 'mix-engineer', 'mastering-engineer'],
  lastVerified: '2026-10-26',
  parent: 'compressor',
  typeGroup: 'Circuit',
  typeOrder: 0,
  sources: [
    { title: 'Compressor main parameters in Logic Pro for Mac', author: 'Apple', url: 'https://support.apple.com/guide/logicpro/compressor-main-parameters-lgcead9636ef/mac' },
    { title: 'The Glue', author: 'Cytomic', url: 'https://cytomic.com/product/glue/' },
    { title: 'Comp VCA-65 overview', author: 'Arturia', url: 'https://www.arturia.com/products/software-effects/comp-vca65/overview' },
    { title: 'Live Audio Effect Reference', author: 'Ableton', url: 'https://www.ableton.com/en/manual/live-audio-effect-reference/' },
  ],
  name: 'VCA Compressor',
  aliases: ['Voltage-controlled amplifier compressor', 'VCA'],
  category: 'dynamics',
  kind: 'type',
  summary: 'A voltage tells a gain chip how loud to be, so the compressor can be fast or slow and still do what the knobs say.',
  cheatSheet: [
    'VCA means voltage-controlled amplifier: the detector produces a voltage, and that voltage sets the gain.',
    'Apple describes the tone as tending toward clean, and the timing as able to be slow or quick.',
    'Use one on drums, bass, and buses when you want punch or glue more than obvious color.',
    'Feedback VCAs, like Cytomic The Glue, ease off as they compress. Feed-forward VCAs hit the ratio more literally.',
    'A few dB on a bus is the move. If you wanted grit, open the [[effect:fet-compressor|FET]] or [[effect:diode-bridge-compressor|diode-bridge]] page instead.',
    'Ableton Glue Compressor is this circuit, in Standard and Suite, built with Cytomic.',
  ],
  history:
    'Once consoles needed a compressor that could be strapped across a whole mix and still be predictable, the VCA was the part that made it practical. The detector decides how much gain to remove. A control voltage tells the amplifier. Arturia describes the dbx 165A, the unit behind Comp VCA-65, as a solid-state VCA with RMS detection rather than a tube. Cytomic The Glue, and the Glue Compressor Ableton ships from the same design, is the other famous job: a feedback compressor based on the bus compressor of a large 1980s British console. The VCA did not replace the colored boxes. It gave you a compressor you could set and trust.',
  howItWorks:
    'The audio passes through a voltage-controlled amplifier. A sidechain detector turns the incoming level into a control voltage, and that voltage turns the amplifier down. Because the gain cell is happy being fast or slow, a VCA compressor can catch a snare click or glide across a mix bus with the same part. Apple notes that a VCA can attenuate or amplify, while a FET compressor only attenuates. In practice you still use it as a downward compressor plus makeup. The important musical split is feedback versus feed-forward. Cytomic describes The Glue as a feedback design: a diode-based envelope follower listens to the level, controls the main signal, and also controls its own detector input. That loop is why console-style VCAs feel smoother than a feed-forward compressor with the same ratio painted on the panel. Feed-forward VCAs, and the Clean styles in digital compressors, are the ones that land on the ratio you dialed.',
  controls: [
    {
      name: 'Threshold',
      description: 'Most VCA plugins give you a real threshold, unlike an 1176. Lower it until the meter shows the gain reduction you wanted, then stop.',
      typicalRange: 'About -40 to 0 dB',
      startingValue: '1 to 4 dB of gain reduction',
    },
    {
      name: 'Ratio',
      description: 'Console bus VCAs are often stepped. Ableton Glue has no separate knee control: the knee gets sharper as the ratio goes up. On a flexible VCA, 2:1 is glue and 4:1 is a drum bus.',
      typicalRange: '2:1 to 10:1 on bus-style units',
      startingValue: '2:1 or 4:1',
    },
    {
      name: 'Attack',
      description: 'This is the VCA advantage. Slow enough (10 to 30 ms) and the transient stays. Very fast and the VCA will tame a click the way a slower optical cell will not.',
      typicalRange: 'Well under 1 ms up to about 30 ms',
      startingValue: '10 to 30 ms',
    },
    {
      name: 'Release',
      description: 'Auto on a bus VCA usually means two speeds at once. Ableton says Glue Auto uses a slow release as the base and a fast one for transients, and that Auto can be too slow for sudden changes.',
      typicalRange: 'About 0.1 to 1.2 s, or Auto',
      startingValue: 'Auto',
    },
    {
      name: 'Range or mix',
      description: 'The Glue adds a Range control that caps how much gain reduction is allowed, and a mix knob for parallel. Ableton says Range around -60 to -70 dB emulates the original hardware behavior, and 0 dB means no compression.',
      typicalRange: '0 dB (off) to about -70 dB',
      startingValue: 'Hardware-style range, mix at 100%',
    },
  ],
  meters: [
    { name: 'Gain-reduction needle', description: 'Bus VCAs are traditionally read on a needle. Ableton Glue shows gain reduction in dB on that needle. Set makeup so the needle reading roughly matches the gain you put back.' },
    { name: 'Clip LED', description: 'Ableton Glue lights a clip LED if the output passes 0 dB. With the soft clipper on, that LED turns yellow to say peaks are being clipped, and the clipper is not a transparent limiter.' },
  ],
  variants: [
    {
      name: 'Feedback console VCA',
      description: 'The detector listens to the output. This is The Glue and the bus-compressor job. Smooth, good at a few dB across drums or a mix. Read [[effect:bus-compressor|bus compression]] for the settings.',
    },
    {
      name: 'Feed-forward VCA',
      description: 'The detector listens only to the input. Ratios land harder and the compressor is easier to predict. Many modern VCA plugins and the dbx-style RMS detectors sit here.',
    },
    {
      name: 'RMS VCA',
      description: 'Arturia describes the 165A as using RMS detection. The compressor follows average level instead of every spike, which is why this family levels a bass or a drum bus without chewing the click off every hit.',
    },
  ],
  whenToUse: [
    'A drum bus or mix bus that should feel like one instrument, with the hits still sticking out.',
    'Bass or a rhythm section that needs even level and not a lot of extra hash.',
    'Any track where you want the attack and ratio you dialed to be the attack and ratio you hear.',
  ],
  whenNotToUse: [
    'You want the bright grab of an [[effect:fet-compressor|1176]] or the soft program-dependent release of an [[effect:optical-compressor|optical]] leveler. A clean VCA will sound polite in comparison.',
    'You are mastering and even a little console color is too much. Use a [[effect:digital-compressor|digital]] compressor in its cleanest mode.',
    'One band of the mix is the problem. A wideband VCA turns the whole signal down. Open [[effect:multiband-compressor|multiband]] instead.',
  ],
  startingSettings: [
    {
      source: 'Drum bus',
      settings: [
        { param: 'Ratio', value: '4:1' },
        { param: 'Attack', value: '10 to 30 ms' },
        { param: 'Release', value: 'Auto, then override if it lags' },
        { param: 'Gain reduction', value: '2 to 4 dB' },
      ],
      note: 'On Ableton Glue, leave the soft clipper off unless you specifically want that crunch. Ableton says it is not a transparent limiter.',
    },
    {
      source: 'Mix bus',
      settings: [
        { param: 'Ratio', value: '2:1' },
        { param: 'Attack', value: '10 to 30 ms' },
        { param: 'Release', value: 'Auto' },
        { param: 'Gain reduction', value: '1 to 2 dB' },
      ],
      note: 'If Auto feels late on a sudden chorus, switch to a timed release that recovers inside the bar.',
    },
    {
      source: 'Bass',
      settings: [
        { param: 'Detector', value: 'RMS if you have the choice' },
        { param: 'Ratio', value: '4:1' },
        { param: 'Attack', value: '10 to 30 ms' },
        { param: 'Gain reduction', value: '3 to 5 dB' },
      ],
      note: 'High-pass the sidechain if the lowest notes are triggering harder than the notes you actually want controlled.',
    },
  ],
  techniques: [
    {
      name: 'Let the bus breathe with Range',
      description: 'A range cap stops a feedback VCA from clamping down forever when a loud hit arrives.',
      steps: [
        'Set a bus ratio and a slow attack until the groove feels glued.',
        'If a fill makes the whole bus duck and stay ducked, pull Range back from the deepest hardware-style setting.',
        'Ableton suggests values between about -40 and -15 dB as an alternative to using the mix knob.',
      ],
    },
    {
      name: 'Parallel on the same plugin',
      description: 'The Glue mix knob is New York compression without a second track.',
      steps: [
        'Set a harder ratio and a faster attack than you would print on the whole bus.',
        'Drop Mix until the dry hits return and the body of the crushed signal remains.',
        'Match the overall level so the parallel blend is not just louder.',
      ],
    },
    {
      name: 'Pick feedback or feed-forward on purpose',
      description: 'If the plugin offers both, do not leave the switch where the preset put it.',
      steps: [
        'Loop a drum bar.',
        'Flip between feedback and feed-forward at the same threshold and ratio.',
        'Keep feedback if the bar feels smoother. Keep feed-forward if a hit is still poking through and you want the ratio to mean what it says.',
      ],
    },
  ],
  unorthodoxTechniques: [
    {
      name: 'Use the fastest attack as a click tamer, not a sound',
      description: 'A VCA can be quicker than you need. Use that speed on a short problem, then go back.',
      steps: [
        'Duplicate the track or use a clip effect on the one hit that spikes.',
        'Set a very fast attack and a high ratio so only that click is turned down.',
        'Leave the main track on a slower VCA setting so the rest of the performance keeps its punch.',
      ],
    },
    {
      name: 'Soften the clipper into the groove',
      description: 'Ableton warns that Glue soft clip distorts and is not a clean limiter. Used quietly, that distortion is a transient shaper.',
      steps: [
        'Get the gain reduction right with soft clip off.',
        'Turn soft clip on and listen only to the attack of the snare.',
        'If the attack turns papery, turn it off again. If it rounds a nasty click, keep it and back the drive off until the color is small.',
      ],
    },
  ],
  mistakes: [
    'Treating every VCA as colorless. A feedback console VCA has a sound. A feed-forward RMS VCA has a different one.',
    'Leaving Auto release on a track with sudden stops. Ableton notes that Glue Auto can be too slow for sudden level changes.',
    'Cranking the mix-bus VCA because the chorus got louder. Automate the threshold, or turn the arrangement up, instead of compressing the whole song harder.',
    'Turning on the soft clipper to "be safe." It clips on purpose and can still pass 0 dB when oversampling is on.',
  ],
  myths: [
    {
      myth: 'VCA means transparent, so it is the mastering compressor.',
      truth: 'Many VCAs are clean compared with a FET or a tube, and some are colored on purpose. A transparent master still wants the [[effect:digital-compressor|digital]] page, where lookahead and low distortion are the feature.',
    },
    {
      myth: 'The Glue is just a generic compressor that says bus on it.',
      truth: 'Cytomic describes a specific feedback topology with a diode envelope follower. Ableton ships that design as Glue Compressor and says it is based on the classic bus compressor from a famous 1980s console.',
    },
  ],
  chainPlacement:
    'On a drum bus, the VCA usually sits after the bus EQ that tamed the mud, and before a saturator or a clipper you are using for loudness. On a mix bus, put it where you want the glue to react to the tone you have already committed to. High-pass the detector if the kick is the only thing moving the needle. Individual tracks that need color should see a FET, optical, or tube compressor first. The VCA can come after those, doing less work.',
  genres: ['genre:trap'],
  pluginRecs: {
    industryStandard: ['cytomic-the-glue'],
    proAlternatives: ['arturia-comp-vca-65', 'fabfilter-pro-c'],
    budget: ['klanghelm-dc8c'],
    free: ['tdr-kotelnikov', 'melda-mcompressor'],
    stock: [
      { daw: 'ableton-live', name: 'Glue Compressor', note: 'Standard and Suite. Intro and Lite have Compressor, which is not this model.' },
      { daw: 'logic-pro', name: 'Compressor', note: 'Use a VCA circuit type: Studio VCA, Classic VCA, or Vintage VCA. Apple does not publish a one-to-one hardware map on the main parameters page.' },
      { daw: 'reaper', name: 'ReaComp', note: 'Feed-forward or feedback, with a variable RMS size.' },
      { daw: 'cubase', name: 'Compressor', note: 'Clean VCA-style control with a peak-to-RMS blend. Not a console-bus model.' },
    ],
    notes: 'The Glue and Comp VCA-65 are the circuit-specific picks. Kotelnikov, DC8C, and Pro-C can do the same job with less of that console identity. DC8C can morph between feedback and feed-forward, which is the control difference that matters on this page. Pro-C Bus and Smooth are the styles to try when you want the job without buying a second plugin.',
  },
  hardware: [
    { name: 'dbx 165A', maker: 'dbx', note: 'The RMS VCA compressor Arturia models in Comp VCA-65.' },
    { name: 'SSL 4000 bus compressor', maker: 'Solid State Logic', note: 'The console bus compressor Cytomic and Ableton are pointing at when they say a famous 1980s large-format desk. The job page is [[effect:bus-compressor|bus compression]].' },
  ],
  callouts: [
    {
      variant: 'tip',
      title: 'Read the attack in milliseconds, not in vibes',
      body: 'If the snare gets thinner, the attack is too fast. Start at 10 to 30 ms on a bus and only go faster when a specific click is the problem.',
    },
  ],
  related: ['effect:compressor', 'effect:bus-compressor', 'effect:digital-compressor', 'effect:fet-compressor'],
})

import { defineEffect } from '../../define'

export default defineEffect({
  id: 'compressor',
  status: 'review',
  skillLevel: 'beginner',
  roles: ['beatmaker', 'songwriter', 'vocalist', 'rapper', 'recording-engineer', 'mix-engineer', 'mastering-engineer', 'media-composer'],
  lastVerified: '2026-10-26',
  sources: [
    { title: 'Compressor main parameters in Logic Pro for Mac', author: 'Apple', url: 'https://support.apple.com/guide/logicpro/compressor-main-parameters-lgcead9636ef/mac' },
    { title: 'Live Audio Effect Reference', author: 'Ableton', url: 'https://www.ableton.com/en/manual/live-audio-effect-reference/' },
    { title: 'Mixing Secrets for the Small Studio', author: 'Mike Senior', note: '3rd ed., 2025. The small-studio reference for level-matched compression moves.' },
    { title: 'FabFilter Pro-C 3 Help: Style and character', author: 'FabFilter', url: 'https://www.fabfilter.com/help/pro-c/using/styleandcharacter' },
  ],
  name: 'Compressor',
  aliases: ['Dynamic range compressor', 'Dynamics compressor'],
  category: 'dynamics',
  kind: 'group',
  summary: 'Turns loud moments down, or quiet moments up, so a performance sits steady without you riding the fader.',
  cheatSheet: [
    'Threshold sets when it acts. Ratio sets how hard. Attack and release set the timing.',
    'Match the bypass level before you decide you like it. Louder almost always wins a bad comparison.',
    'Start around 2 to 6 dB of [[glossary:gain-reduction|gain reduction]] on a track, and 1 to 3 dB on a bus.',
    'Slow attack keeps the hit. Fast attack tucks the hit in and can make the sound smaller.',
    'Pick a type for the job: [[effect:fet-compressor|FET]] for grab, [[effect:optical-compressor|optical]] for vocals, [[effect:bus-compressor|bus]] for glue, [[effect:digital-compressor|digital]] when you want no color.',
    'Makeup gain after downward compression is not [[effect:upward-compressor|upward compression]]. Upward lifts the quiet parts themselves.',
  ],
  history:
    'Compression started as a broadcast and disc-cutting tool. It kept a signal from overloading a transmitter or a cutter head. Tube designs such as the Gates STA-Level were already studio tools in the 1950s. Later circuits solved different problems. Optical leveling amplifiers, FET limiters such as the 1176, VCA console compressors, and diode-bridge units each left a sound people still ask for by name. Digital compressors then made the threshold and the timing exact, and added jobs analog boxes did not offer: lookahead, upward compression, and multiband splits. The cards on this page are those choices.',
  howItWorks:
    'Ordinary compression is downward compression: the loud parts get turned down, so the gap between loud and quiet shrinks. A detector measures the level. Peak mode watches spikes. RMS mode watches a short average, which is closer to how loudness feels. Ableton describes RMS as less sensitive to very short peaks and usually more musical. When the level crosses the threshold, the ratio sets how hard the extra level is held back. At 4:1, a moment that sits 4 dB over the threshold is pulled toward 1 dB over it. Attack is how fast the turn-down starts. Release is how fast it lets go. Knee is how gradually the ratio eases in around the threshold. Makeup gain puts the lost level back so a bypass comparison is fair.\n\nThe detector can listen to the compressor output (feedback) or only to the input (feed-forward). Feedback designs tend to ease off as they reduce gain, so they feel softer and more program-dependent. Feed-forward designs hit the ratio you asked for more literally. The part that actually changes the gain is the type: a [[effect:vca-compressor|VCA]], a [[effect:fet-compressor|FET]], an [[effect:optical-compressor|optical cell]], a [[effect:tube-compressor|tube]], a [[effect:diode-bridge-compressor|diode bridge]], a [[effect:pwm-compressor|PWM switch]], or a [[effect:digital-compressor|digital multiply]]. [[effect:upward-compressor|Upward compression]] shrinks the range from the other direction by lifting quiet passages. Turning the whole output up after downward compression is not the same move.',
  controls: [
    {
      name: 'Threshold',
      description: 'The level where downward compression starts. Lower it until the [[glossary:gain-reduction|gain-reduction]] meter moves on the notes you care about, then stop.',
      typicalRange: 'Often -40 to 0 dB',
      startingValue: 'A few dB of gain reduction',
    },
    {
      name: 'Ratio',
      description: 'How hard levels above the threshold are held back. 2:1 is gentle. 4:1 is an obvious track compressor. 10:1 and up is limiting territory.',
      typicalRange: '1.5:1 to 20:1',
      startingValue: '4:1 on a track, 2:1 on a bus',
    },
    {
      name: 'Attack',
      description: 'How fast gain reduction starts after the threshold is crossed. Slower lets the transient through. Many digital compressors time this in milliseconds. A [[effect:fet-compressor|FET]] is timed in microseconds, and its knob may be backwards.',
      typicalRange: '0.1 to 100 ms on many digital compressors',
      startingValue: '10 to 30 ms',
    },
    {
      name: 'Release',
      description: 'How fast gain reduction lets go after the level falls. Too fast pumps and can distort bass. Too slow keeps later notes ducked. Auto release follows the program and is a sane start on a bus.',
      typicalRange: 'About 50 ms to 1 s, or Auto',
      startingValue: '100 ms, or Auto',
    },
    {
      name: 'Knee',
      description: 'How gradually the ratio begins near the threshold. A hard knee grabs. A soft knee eases in and is easier to hide on vocals and buses.',
      typicalRange: 'Hard (0 dB) to a wide soft knee',
      startingValue: 'Soft on vocals and buses',
    },
    {
      name: 'Makeup gain',
      description: 'Level restored after downward compression. Set it so bypassing the plugin does not change the loudness. If the compressed version is louder, you are voting for volume.',
      typicalRange: '0 to about 12 dB on a track',
      startingValue: 'Match the gain-reduction meter',
    },
  ],
  meters: [
    { name: 'Gain reduction', description: 'How many decibels the compressor is turning the signal down right now. This is the meter to watch. A needle, a bar, or a trace all answer the same question.' },
    { name: 'Knee graph', description: 'Input level against output level. The bend away from the diagonal is the knee and the ratio. If the plugin has one, use it to see whether you are barely touching the signal or folding it flat.' },
  ],
  variants: [
    {
      name: 'Feed-forward',
      description: 'The detector hears the input only, then turns the gain down by the ratio you set. [[effect:digital-compressor|Digital]] compressors and many [[effect:vca-compressor|VCAs]] work this way. The result tracks the controls.',
    },
    {
      name: 'Feedback',
      description: 'The detector hears the compressor output, so the gain reduction eases itself. [[effect:bus-compressor|Console bus compressors]] and the [[effect:fet-compressor|1176]] are in this family. The feel is softer than the same numbers on a feed-forward box.',
    },
    {
      name: 'Peak detection',
      description: 'The detector reacts to short spikes. Ableton calls this more aggressive and more precise, which is what you want when a snare click or a vocal plosive must be caught.',
    },
    {
      name: 'RMS detection',
      description: 'The detector reacts to a short average. Ableton describes it as closer to perceived loudness and usually more musical. Use it when you want leveling rather than peak catching. Many plugins blend the two.',
    },
  ],
  whenToUse: [
    'A vocal, bass, or 808 that jumps in level between notes and will not sit in the mix.',
    'Drums that need the hits to feel even, or a drum bus that should move as one instrument.',
    'A mix bus that needs a little glue, on the order of 1 to 3 dB, not a smashed master.',
    'A deliberate effect: pumped sidechain, crushed parallel drums, or an upward lift on a thin synth.',
  ],
  whenNotToUse: [
    'The performance is already even and the compressor is only making it smaller and duller. Bypass it.',
    'The problem is tone, pitch, or timing. Compression will not tune a vocal or fix a late snare.',
    'You are still recording and the singer is chasing the compressor. Print a safety take uncompressed, or compress lightly after the take.',
    'You want the quiet words gone. That is a gate or an expander, which gets its own page later. A compressor does the opposite.',
  ],
  startingSettings: [
    {
      source: 'Lead vocal',
      settings: [
        { param: 'Ratio', value: '3:1 to 4:1' },
        { param: 'Attack', value: '10 to 30 ms', note: 'Let the consonant through.' },
        { param: 'Release', value: '50 to 150 ms' },
        { param: 'Gain reduction', value: '2 to 6 dB' },
        { param: 'Knee', value: 'Soft' },
      ],
      note: 'Starting points for a sung or rapped lead. If the vocal still jumps, add a second gentler compressor later rather than forcing this one to 10 dB.',
    },
    {
      source: 'Drum bus',
      settings: [
        { param: 'Ratio', value: '4:1' },
        { param: 'Attack', value: '10 to 30 ms', note: 'Slow enough that the snare crack stays.' },
        { param: 'Release', value: 'Auto, or timed so it recovers before the next hit' },
        { param: 'Gain reduction', value: '2 to 4 dB' },
      ],
      note: 'This is punch, not smash. For smash, use the parallel technique below and keep this bus gentle.',
    },
    {
      source: 'Bass or 808',
      settings: [
        { param: 'Ratio', value: '4:1' },
        { param: 'Attack', value: '10 to 30 ms', note: 'Faster if a note pokes out, slower if the attack dies.' },
        { param: 'Release', value: '80 to 200 ms', note: 'If the low note growls, slow the release.' },
        { param: 'Gain reduction', value: '3 to 6 dB' },
      ],
      note: 'High-pass the detector if the sub-bass is doing all the triggering and the mids are pumping. See [[effect:sidechain-compressor|sidechain compression]].',
    },
    {
      source: 'Mix bus',
      settings: [
        { param: 'Ratio', value: '1.5:1 to 2:1' },
        { param: 'Attack', value: 'Slow, often 10 to 30 ms' },
        { param: 'Release', value: 'Auto' },
        { param: 'Gain reduction', value: '1 to 3 dB' },
      ],
      note: 'Open [[effect:bus-compressor|bus compression]] before you push past this. Streaming services turn loud masters down, so extra gain reduction here does not buy a louder song.',
    },
  ],
  techniques: [
    {
      name: 'Level-match the bypass',
      description: 'Decide with your ears, not with the volume jump.',
      steps: [
        'Loop the loudest phrase and the quietest phrase.',
        'Set threshold, ratio, attack, and release until the gain-reduction meter shows the amount you intended.',
        'Move makeup until bypassing the plugin does not change the loudness.',
        'Then bypass several times. Keep the compressor only if the tone or the pocket got better.',
      ],
    },
    {
      name: 'Parallel compression',
      description: 'A crushed copy under the dry signal adds density and leaves the transient on the dry path. New York compression is this move.',
      steps: [
        'Send the track to a return, or use the plugin mix knob.',
        'On the copy, use a high ratio and a fast attack. Let it show 10 dB or more of gain reduction.',
        'Blend the copy in until the body fills in and the hit is still the dry one.',
        'High-pass the copy if the low end gets woolly.',
      ],
      settings: [
        { param: 'Copy ratio', value: '8:1 to 20:1' },
        { param: 'Copy gain reduction', value: '10 dB or more' },
        { param: 'Mix', value: 'Until you just hear the density' },
      ],
    },
    {
      name: 'Two gentle stages',
      description: 'Two compressors doing 2 to 3 dB each usually sound calmer than one compressor doing 8 dB. The first catches peaks. The second levels the phrase.',
      steps: [
        'Put a faster compressor first and aim for 2 to 3 dB on the peaks only.',
        'Put a slower one second, optical or a soft-knee digital, and level the phrase another 2 to 3 dB.',
        'Match the bypass of the pair, not of each plugin in isolation, when you judge the chain.',
      ],
    },
    {
      name: 'Move the detector off the mud',
      description: 'If a boomy note is triggering the compressor and everything else is ducking, the detector is listening to the wrong band.',
      steps: [
        'Engage the sidechain filter or sidechain EQ. You are filtering the detector, not the audio you hear.',
        'High-pass the detector until the meter stops jumping on every sub hit.',
        'Use the listen button if the plugin has one, then turn listen off.',
      ],
    },
  ],
  unorthodoxTechniques: [
    {
      name: 'Compress into the effect, then again after it',
      description: 'A saturator, amp, or distortion reacts to level. A compressor before it makes every note drive the effect the same way. A light compressor after it catches the harmonics the effect added.',
      steps: [
        'Put a gentle compressor before the color box and hold the level to within a couple of dB.',
        'Drive the color box until the tone is right.',
        'Add a second, lighter compressor after it only if the output level still jumps.',
      ],
    },
    {
      name: 'Duck the reverb, not the vocal',
      description: 'The vocal stays present and the room gets out of the way on the words. This is sidechain compression on the reverb return.',
      steps: [
        'Leave the vocal compressor on the vocal track.',
        'Put a compressor on the vocal reverb return and key it from the vocal.',
        'Use a fast attack and a release that brings the room back between phrases.',
        'The full routing lives on the [[effect:sidechain-compressor|sidechain]] page.',
      ],
    },
  ],
  mistakes: [
    'Judging the compressor while it is louder than the bypass. You will keep too much of it.',
    'An attack so fast that the transient disappears and the track feels smaller, then adding more makeup and more plugins to get the punch back.',
    'A release so fast that bass notes growl, or so slow that the compressor is still clamped when the next note starts.',
    'Compressing every channel because a template had a compressor loaded. Bypass anything that is not earning its place.',
    'Stacking a slammed track compressor, a slammed bus compressor, and a limiter, then wondering why the mix has no dynamics left.',
  ],
  myths: [
    {
      myth: 'More gain reduction always sounds more professional.',
      truth: 'A bus moving 1 to 2 dB can do more for a mix than 10 dB on every track. The meter is not a score.',
    },
    {
      myth: 'Makeup gain is upward compression.',
      truth: 'Makeup turns the whole waveform up, peaks included. [[effect:upward-compressor|Upward compression]] raises the quiet parts and leaves the peaks closer to where they were.',
    },
    {
      myth: 'There is one correct compressor setting per instrument.',
      truth: 'The numbers on this page are starting points. The right attack is the one that keeps the hit you wanted to keep.',
    },
  ],
  chainPlacement:
    'On a track, put corrective EQ that you do not want the detector to hear before the compressor, then the compressor, then tone EQ and saturation if you want them to see a steadier level. Reverb and delay usually belong on a send after the compressor, so the compressor is not pumping the tail. Break that order on purpose when you want the effect itself compressed. On a bus, the compressor often sits after the bus EQ and before a limiter. Read the type page before you copy a chain: an [[effect:optical-compressor|optical]] leveler, a [[effect:fet-compressor|FET]], and a [[effect:multiband-compressor|multiband]] compressor do not want the same neighbors.',
  genres: ['genre:trap'],
  pluginRecs: {
    industryStandard: ['fabfilter-pro-c'],
    proAlternatives: ['cytomic-the-glue', 'arturia-comp-fet-76'],
    budget: ['klanghelm-dc8c'],
    free: ['tdr-kotelnikov', 'klanghelm-dc1a', 'melda-mcompressor'],
    stock: [
      { daw: 'ableton-live', name: 'Compressor', note: 'Included in every Live edition. Glue Compressor is Standard and Suite.' },
      { daw: 'logic-pro', name: 'Compressor', note: 'Circuit types include Platinum Digital, VCA, FET, and Opto.' },
      { daw: 'reaper', name: 'ReaComp' },
      { daw: 'cubase', name: 'Compressor', note: 'Peak-to-RMS analysis, soft knee, and lookahead that you can defeat with Live mode.' },
      { daw: 'fl-studio', name: 'Fruity Limiter', note: 'Image-Line points you here for compression. Fruity Compressor is the older simple plugin.' },
    ],
    notes:
      'Pro-C 3 is the map of this section: Clean and Mastering for [[effect:digital-compressor|digital]], Opto and Op-El for [[effect:optical-compressor|optical]], Vari-Mu for [[effect:tube-compressor|tube]], Bus and Smooth for [[effect:bus-compressor|bus]], Upward and TTM for [[effect:upward-compressor|upward]] and [[effect:multiband-compressor|multiband]], Classic plus the Tube, Diode, and Bright character modes for [[effect:vintage-compressor|vintage color]]. It is not a component model of an 1176 or a 33609. Use the specialist plugins on those type pages when the circuit is the point.',
  },
  hardware: [
    { name: '1176', maker: 'UREI / Universal Audio', note: 'FET limiter. Controls and all-button mode are on the [[effect:fet-compressor|FET]] page.' },
    { name: 'LA-2A', maker: 'Teletronix / Universal Audio', note: 'Optical leveling amplifier. Two knobs and a compress/limit switch. See [[effect:optical-compressor|optical]].' },
    { name: 'STA-Level', maker: 'Gates', note: '1950s tube compressor, the unit Arturia models in Comp TUBE-STA. See [[effect:tube-compressor|tube]].' },
    { name: '33609', maker: 'Neve', note: 'Diode-bridge compressor and limiter. See [[effect:diode-bridge-compressor|diode bridge]].' },
    { name: 'SSL 4000 bus compressor', maker: 'Solid State Logic', note: 'The large-console bus compressor this job is named after. Plugin makers often say "1980s British console" instead of the brand. See [[effect:bus-compressor|bus]].' },
    { name: 'STC-8', maker: 'Crane Song', note: 'A transparent compressor whose manual shows a PWM gain stage. See [[effect:pwm-compressor|PWM]].' },
  ],
  callouts: [
    {
      variant: 'tip',
      title: 'Watch the meter, then close your eyes',
      body: 'Set the move on the gain-reduction meter first, level-match the bypass, and only then decide. If you cannot hear the compressor with your eyes shut, it is either perfect or doing nothing. Bypass it and find out which.',
    },
    {
      variant: 'free',
      title: 'A free kit that covers the map',
      body: '[[plugin:tdr-kotelnikov|TDR Kotelnikov]] for clean bus and track work, [[plugin:klanghelm-dc1a|DC1A]] when you want character from two knobs, [[plugin:klanghelm-mjuc-jr|MJUC jr.]] for tube color, and [[plugin:xfer-ott|OTT]] when you want the over-the-top multiband lift. None of them is pretending to be an 1176.',
    },
  ],
  related: ['guide:mixing-dynamics', 'glossary:gain-reduction', 'effect:fet-compressor', 'effect:optical-compressor', 'effect:bus-compressor', 'effect:sidechain-compressor'],
  extra: [
    {
      type: 'expandable',
      title: 'Which type should you open?',
      summary: 'One line each. The cards above go to the full page.',
      blocks: [
        {
          type: 'table',
          caption: 'Starting points for choosing, not a ranking.',
          columns: ['Type', 'Character', 'Reach for it', 'Skip it'],
          rows: [
            ['[[effect:vca-compressor|VCA]]', 'Clean to punchy, controls do what they say', 'Drums, bass, bus glue', 'You wanted obvious color'],
            ['[[effect:fet-compressor|FET]]', 'Very fast, bright, can crunch', 'Vocals, snare, bass, rooms', 'A transparent master'],
            ['[[effect:optical-compressor|Optical]]', 'Soft knee, program-dependent release', 'Vocals, bass, gentle leveling', 'You need to catch a click'],
            ['[[effect:tube-compressor|Tube]]', 'Thick, slow-leaning, harmonically rich', 'Vocals, bass, mix color', 'A surgical peak problem'],
            ['[[effect:diode-bridge-compressor|Diode bridge]]', 'Dense, a little grit, mid-forward', 'Drums, buses, attitude', 'You need a clean master'],
            ['[[effect:pwm-compressor|PWM]]', 'Fast analog gain with very little color', 'Transparent control', 'You wanted a vintage sound'],
            ['[[effect:digital-compressor|Digital]]', 'Exact ratios, lookahead, low distortion', 'Any source, especially masters', 'The color was the point'],
            ['[[effect:bus-compressor|Bus]]', 'Low ratio, slow attack, a few dB', 'Drum bus and mix bus', 'One vocal that needs leveling'],
            ['[[effect:multiband-compressor|Multiband]]', 'Separate bands, separate moves', 'A harsh top or a booming low end', 'The whole mix just needs glue'],
            ['[[effect:upward-compressor|Upward]]', 'Quiet details come forward', 'Thin synths, room mics, density', 'The noise floor is already a problem'],
            ['[[effect:sidechain-compressor|Sidechain]]', 'Another signal does the triggering', 'Kick versus bass, ducked reverb', 'The track only needs self-leveling'],
            ['[[effect:vintage-compressor|Vintage]]', 'Fewer controls, input-driven, colored', 'You want the box in the sound', 'You need a precise ratio'],
          ],
        },
      ],
    },
  ],
})

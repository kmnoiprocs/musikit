import { defineEffect } from '../../define'

export default defineEffect({
  id: 'bus-compressor',
  status: 'review',
  skillLevel: 'intermediate',
  roles: ['beatmaker', 'mix-engineer', 'mastering-engineer'],
  lastVerified: '2026-10-26',
  parent: 'compressor',
  typeGroup: 'Job',
  typeOrder: 7,
  sources: [
    { title: 'Live Audio Effect Reference', author: 'Ableton', url: 'https://www.ableton.com/en/manual/live-audio-effect-reference/' },
    { title: 'The Glue', author: 'Cytomic', url: 'https://cytomic.com/product/glue/' },
    { title: 'TDR Kotelnikov', author: 'Tokyo Dawn Records', url: 'https://www.tokyodawn.net/tdr-kotelnikov/' },
    { title: 'FabFilter Pro-C 3 Help: Style and character', author: 'FabFilter', url: 'https://www.fabfilter.com/help/pro-c/using/styleandcharacter' },
  ],
  name: 'Bus Compressor',
  aliases: ['Glue compressor', 'Mix-bus compressor', 'Console bus compressor'],
  category: 'dynamics',
  kind: 'type',
  summary: 'A few decibels of slow-attack compression across a drum bus or a whole mix, so the parts move together without each track being smashed first.',
  cheatSheet: [
    'Glue means the bus feels like one instrument. It does not mean the meter is buried.',
    'Start at 1 to 3 dB of gain reduction, a slow attack, and auto release. Then level-match.',
    'Ableton Glue Compressor is this job, built with Cytomic, in Live Standard and Suite. It is based on the classic bus compressor from a famous 1980s console.',
    'The knee gets sharper as the ratio goes up. You do not get a separate knee knob on Glue.',
    'Auto release on Glue is two times at once: a slow base and a fast one for transients. Ableton says it can be too slow for sudden changes.',
    'Range around -60 to -70 dB is Ableton hardware-style depth. 0 dB is no compression. The mix knob is the other way to back off.',
  ],
  history:
    'Large consoles put one stereo compressor across the mix bus, after the channels had already been balanced. The compressor was not there to fix a vocal. It was there so the song breathed as a single level. Cytomic The Glue models that 1980s British large-console bus compressor as a feedback VCA, and Ableton ships the same design as Glue Compressor. The manual says to use it on the Main track or a group. Digital bus compressors such as Kotelnikov later took the same chair and refused the console color. Tokyo Dawn calls Kotelnikov stealthy and suited to a stereo bus. FabFilter Bus and Smooth styles are the same job inside Pro-C. The technique survived the brand.',
  howItWorks:
    'A bus compressor hears a sum. Every kick, vocal, and cymbal adds up in the detector, so the loudest moment in the song is what moves the gain, and everything else ducks with it. That shared motion is the glue. A slow attack, often in the 10 to 30 ms range, lets the transient of the snare or the vocal consonant get through before the gain comes down, which is why a bus can feel punchier and more together at the same time. The ratio stays low, or the threshold stays high, so the gain reduction is a couple of decibels. Feedback designs such as The Glue ease off as they reduce gain. Cytomic describes a diode-based envelope follower in that feedback loop. Ableton Glue has no independent knee: higher ratios sharpen the knee for you. Release is where mixes get ruined. Auto tries to be slow on the average program and fast on a hit. If the drop after a loud chorus stays ducked, Auto lost. Set a release that comes back inside the groove. Makeup, or the fader after the compressor, must match the bypass. A louder mix will always beat an honest one in a blind test you forgot to make blind.',
  controls: [
    {
      name: 'Threshold',
      description: 'Set this so the gain-reduction meter shows about 1 to 3 dB on the loud section, and less on the quiet section. If the verse and the chorus show the same heavy reduction, the threshold is too low.',
      typicalRange: 'Wherever 1 to 3 dB lands',
      startingValue: '1 to 2 dB on a full mix, up to 4 dB on a drum bus',
    },
    {
      name: 'Ratio',
      description: '2:1 is a mix. 4:1 is a drum bus. Ableton notes that Glue knee sharpens as the ratio increases, so 10:1 is a different device, not a "more glue" switch.',
      typicalRange: '2:1 to 4:1',
      startingValue: '2:1 on the mix, 4:1 on drums',
    },
    {
      name: 'Attack',
      description: 'Slow enough that the hit exists. 10 to 30 ms is the usual bus window. Faster starts to do the job of a track compressor, on every track at once.',
      typicalRange: 'About 0.1 to 30 ms on Glue-style units',
      startingValue: '10 or 30 ms',
    },
    {
      name: 'Release',
      description: 'Auto first. Ableton: Glue Auto uses a slow release as the base and a fast release for transients, and it may be too slow when the level changes suddenly. If the chorus ending sucks the verse down, set a time instead.',
      typicalRange: 'About 0.1 to 1.2 s, or Auto',
      startingValue: 'Auto',
    },
    {
      name: 'Range and mix',
      description: 'Range caps the maximum gain reduction. Ableton says about -60 to -70 dB resembles the hardware depth, -40 to -15 dB is a useful lighter cap, and 0 dB bypasses the compression. Mix blends dry and compressed without a second track.',
      typicalRange: '0 dB to about -70 dB of range',
      startingValue: 'Deep range, mix at 100%, then blend if it is too much',
    },
  ],
  meters: [
    { name: 'Gain-reduction needle', description: 'Bus compressors are judged in small numbers. If the needle is parked at 8 dB, you are no longer gluing. You are remaking the balance of every track.' },
    { name: 'Clip LED', description: 'Ableton Glue lights red over 0 dB, and yellow when the soft clipper is rounding peaks. The manual says the soft clipper is not a transparent limiter and can still pass 0 dB if oversampling is on.' },
  ],
  variants: [
    {
      name: 'Console feedback glue',
      description: 'The Glue and The Glue. A few decibels, slow attack, feedback VCA, a little console motion. The default meaning of "bus compressor."',
    },
    {
      name: 'Clean digital glue',
      description: 'Kotelnikov, or Pro-C Bus and Smooth. FabFilter describes Smooth as the low-ratio, longer-timing glue style, and Bus as the one for buses, drums, and mixes. Same job, less console identity.',
    },
    {
      name: 'Drum-bus glue',
      description: 'The same processor on a drum group, often at 4:1 and a couple of decibels more than you would put on the whole mix. The mix bus then does less, or nothing.',
    },
  ],
  whenToUse: [
    'A drum bus that sounds like separate samples and should sound like a kit.',
    'A mix that is balanced but feels like the faders are not in the same room.',
    'A instrument group, such as backing vocals or guitars, that should swell together.',
  ],
  whenNotToUse: [
    'A single vocal that needs leveling. The bus compressor will turn the whole mix down every time the vocal gets loud, which is a clumsy de-esser for the entire song. Compress the vocal.',
    'The mix is already crushed on the individual tracks. Another 3 dB on the bus will not add glue. It will remove the last transient.',
    'You wanted the mix louder on Spotify or YouTube. Those services turn loud masters down. Bus compression is a tone and a groove move, not a loudness coupon.',
  ],
  startingSettings: [
    {
      source: 'Full mix',
      settings: [
        { param: 'Ratio', value: '2:1' },
        { param: 'Attack', value: '10 to 30 ms' },
        { param: 'Release', value: 'Auto' },
        { param: 'Gain reduction', value: '1 to 2 dB on the chorus' },
        { param: 'Soft clip', value: 'Off' },
      ],
      note: 'Bypass it under the verse and under the chorus. If only the chorus improved, automate the threshold instead of compromising both sections.',
    },
    {
      source: 'Drum bus',
      settings: [
        { param: 'Ratio', value: '4:1' },
        { param: 'Attack', value: '10 to 30 ms' },
        { param: 'Release', value: 'Auto, or a time that recovers before the next backbeat' },
        { param: 'Gain reduction', value: '2 to 4 dB' },
      ],
      note: 'High-pass the sidechain if the kick is the only thing the needle follows and the snare never gets glued to it.',
    },
    {
      source: 'Backing-vocal group',
      settings: [
        { param: 'Ratio', value: '2:1' },
        { param: 'Attack', value: '10 to 30 ms' },
        { param: 'Release', value: 'Auto or medium' },
        { param: 'Gain reduction', value: '2 to 3 dB' },
      ],
      note: 'The lead vocal should not be inside this bus. Gluing the lead to the backs makes the lead duck whenever the stack sings.',
    },
  ],
  techniques: [
    {
      name: 'Glue the drums, then barely touch the mix',
      description: 'Most of the "bus compression" people like is the drum bus. The mix bus can stay almost idle.',
      steps: [
        'Set the drum-bus compressor until the kit is one instrument, at 2 to 4 dB.',
        'Set the mix bus to 1 dB on the loudest chorus, or bypass it.',
        'If bypassing the mix bus changes nothing you care about, leave it bypassed.',
      ],
    },
    {
      name: 'Automate the threshold between sections',
      description: 'A chorus is louder than a verse. One threshold is a compromise.',
      steps: [
        'Set the threshold for the chorus so you see 1 to 2 dB.',
        'Automate it higher in the verse so the verse is not sitting under chorus-sized gain reduction.',
        'Do not automate the makeup. You will chase level forever. Automate the amount of compression.',
      ],
    },
    {
      name: 'High-pass the bus detector',
      description: 'The kick should not be the only vote.',
      steps: [
        'Turn on the sidechain high-pass. The Glue and Pro-C both have one. You are filtering the detector.',
        'Raise it until the needle moves on the snare and the vocal, not only on the kick.',
        'Use sidechain listen if you have it, then turn listen off before you export.',
      ],
    },
  ],
  unorthodoxTechniques: [
    {
      name: 'Range as a safety, mix as a second opinion',
      description: 'Ableton gives you both because "a bit less" should not require a new threshold.',
      steps: [
        'Set a slightly heavy glue that you almost like.',
        'Pull Range up from the deepest setting until the deepest duck disappears.',
        'If the tone is still too compressed, use Mix instead. Range limits depth. Mix restores transients from the dry path.',
      ],
    },
    {
      name: 'No bus compressor, polarity-check the feeling',
      description: 'Sometimes the glue people are hearing is just the tracks being in time.',
      steps: [
        'Bypass every bus compressor.',
        'Fix the one track that is early or loud.',
        'Put 1 dB back only if the picture still falls apart. A compressor will not tune a performance.',
      ],
    },
  ],
  mistakes: [
    'Six decibels on the mix bus "for loudness," then a limiter after it doing another six. The bus compressor was supposed to be the small move.',
    'Leaving soft clip on because it was in the preset. Ableton says it distorts and is not a clean limiter.',
    'Compressing the drum bus, the music bus, and the mix bus at 4 dB each. The kick transient does not survive three slow attacks. It survives one.',
    'Judging the bus compressor with makeup hot. Match it. The glue that remains is the glue you actually added.',
  ],
  myths: [
    {
      myth: 'Every professional mix has a bus compressor doing a lot.',
      truth: 'The classic use is a small move, and some mixes do not need it. Ableton describes Glue as something you can use on a group or the Main track, not as a required last insert.',
    },
    {
      myth: 'Auto release means you never have to listen to release.',
      truth: 'Ableton warns that Glue Auto can be too slow for sudden changes. If the downbeat after a drop feels choked, that warning is your mix.',
    },
  ],
  chainPlacement:
    'On a drum bus: after the bus EQ, before a clipper or a limiter you are using for peak control. On a mix: after the mix EQ you trust, before the limiter, and after any stereo widener you want the compressor to react to. If a widener is after the bus compressor, the compressor never sees the sides you just added. High-pass the detector rather than high-passing the mix. Solo the kick and the vocal once with the bus compressor on. If the vocal ducks every time the kick hits and you hate it, the detector is too bass-heavy or the release is too slow.',
  genres: ['genre:trap'],
  pluginRecs: {
    industryStandard: ['cytomic-the-glue'],
    proAlternatives: ['fabfilter-pro-c'],
    budget: ['klanghelm-dc8c'],
    free: ['tdr-kotelnikov'],
    stock: [
      { daw: 'ableton-live', name: 'Glue Compressor', note: 'Standard and Suite. The manual says Main track or a group. Not in Intro or Lite.' },
      { daw: 'logic-pro', name: 'Compressor', note: 'Try Vintage VCA or Studio VCA for this job. Apple does not label either one as a specific console on the parameters page.' },
      { daw: 'reaper', name: 'ReaComp', note: 'Feedback mode, a slow attack, and auto-release. Put it on the bus, not because the name says bus.' },
      { daw: 'cubase', name: 'Compressor', note: 'Low ratio, soft knee, auto release. VintageCompressor if you want the input-driven vintage version of the same job.' },
    ],
    notes: 'Pro-C Bus and Smooth are the styles that match this page. Kotelnikov is the free stereo-bus compressor Tokyo Dawn describes as stealthy. DC8C can sit on a bus in Clean mode when you want the control without console color. The Glue is the one that is actually the console-bus design.',
  },
  hardware: [
    { name: 'SSL 4000 bus compressor', maker: 'Solid State Logic', note: 'The large-console bus compressor behind this job. Cytomic and Ableton describe the plugin as that kind of 1980s desk compressor without always printing the brand.' },
  ],
  callouts: [
    {
      variant: 'tip',
      title: 'One to three decibels, then go do something else',
      body: 'If you want more, the fix is usually a track that is too loud, not a lower threshold. The needle is a limit, not a target to beat.',
    },
  ],
  related: ['effect:compressor', 'effect:vca-compressor', 'effect:digital-compressor', 'effect:sidechain-compressor', 'glossary:lufs'],
})

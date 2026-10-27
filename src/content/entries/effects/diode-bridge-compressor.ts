import { defineEffect } from '../../define'

export default defineEffect({
  id: 'diode-bridge-compressor',
  status: 'review',
  skillLevel: 'intermediate',
  roles: ['beatmaker', 'recording-engineer', 'mix-engineer'],
  lastVerified: '2026-10-26',
  parent: 'compressor',
  typeGroup: 'Circuit',
  typeOrder: 4,
  sources: [
    { title: 'Comp DIODE-609', author: 'Arturia', url: 'https://www.arturia.com/store/comp-diode-609' },
    { title: 'FabFilter Pro-C 3 Help: Style and character', author: 'FabFilter', url: 'https://www.fabfilter.com/help/pro-c/using/styleandcharacter' },
    { title: 'DC8C', author: 'Klanghelm', url: 'https://klanghelm.com/contents/products/DC8C.html' },
  ],
  name: 'Diode-Bridge Compressor',
  aliases: ['Diode compressor', '33609-style compressor'],
  category: 'dynamics',
  kind: 'type',
  summary: 'A ring of diodes does the gain change, which is the thick, slightly gritty compression associated with the Neve 33609.',
  cheatSheet: [
    'The gain cell is a diode bridge: diodes in a ring, steered by a control current, sitting in the audio path.',
    'Arturia Comp DIODE-609 is a model of the Neve 33609 compressor and limiter. Expect a stereo, warm, dense result rather than a clean VCA.',
    'These units are usually a compressor plus a separate limiter. Set the compressor first. Add the limiter only for peaks the compressor is not meant to catch.',
    'FabFilter Diode character is diode-style color you can put on another compressor style. It is not a 33609 model.',
    'Use it on drums, drum buses, and guitars when you want attitude. Skip it on a transparent master.',
    'If the mids get honky, you are hearing the circuit. Back the drive off before you EQ the honk into a worse problem.',
  ],
  history:
    'Diode-bridge compression is the Neve answer to level control. Arturia describes the 33609 as a diode compressor and limiter known for a warm, smooth stereo response, and sells Comp DIODE-609 as the software model. The circuit sits in a different family from the FET 1176 and from the optical LA-2A. People reach for it when a drum bus or a guitar should sound like it passed through a large-format console, not when they want a ratio they can predict to the tenth. Plugin character modes later borrowed the diode idea as a color you can paint onto a digital compressor. FabFilter calls that mode Diode. It is a saturation flavor, not this whole processor.',
  howItWorks:
    'A diode bridge is four diodes in a loop. Audio goes in one axis. A control current, taken from the detector, goes in the other and changes how hard the diodes conduct. More control current, more attenuation. That is the gain reduction. Diodes are not a clean gain computer. They bend the waveform while they turn it down, which is the grit and the midrange thickness this type is hired for. The famous desk units pair that compressor with a separate limiter, so you can level with the bridge and still catch a peak without asking the compressor timing to do both jobs. In a plugin you often get the bridge model plus modern extras Arturia lists on DIODE-609: external sidechain, detection modes including mid/side, and a sidechain EQ. Use those extras when you need them. They are not what the diodes sound like.',
  controls: [
    {
      name: 'Compressor threshold',
      description: 'When the diode bridge starts to conduct harder. On a 33609-style unit this is the leveling control. Lower it until the bus feels denser, then stop while the transients still read as hits.',
      typicalRange: 'From barely on to obviously clamped',
      startingValue: '2 to 4 dB of gain reduction',
    },
    {
      name: 'Recovery',
      description: 'The release, often a small set of fixed times rather than a smooth knob. Too fast and the bridge fizzes on bass. Too slow and the next hit is still ducked.',
      typicalRange: 'A few fixed recovery times',
      startingValue: 'The middle step, then slower if it chatters',
    },
    {
      name: 'Gain',
      description: 'Makeup after the bridge. The diodes may already have changed the tone. Match the bypass so you are not keeping a louder, thicker accident.',
      typicalRange: 'Unity to several dB',
      startingValue: 'Match bypass',
    },
    {
      name: 'Limiter',
      description: 'A separate, faster ceiling after the compressor. Arturia sells the 33609 model as a compressor and a limiter. Use a higher threshold here than on the compressor, so it only ticks on the peaks.',
      typicalRange: 'Peaks only',
      startingValue: 'Just kissing the loudest hits',
    },
  ],
  meters: [
    { name: 'Compressor gain reduction', description: 'The bridge doing the leveling. This is the meter for the body of the sound.' },
    { name: 'Limiter gain reduction', description: 'Should stay near zero most of the time. If it is moving on every hit, the limiter has become the compressor and the recovery time you set is no longer the one you hear.' },
  ],
  variants: [
    {
      name: 'Console diode compressor',
      description: 'The 33609-style path: diode bridge, stepped recovery, transformer color, meant for buses and instruments that can take some grain.',
    },
    {
      name: 'Diode as a character mode',
      description: 'FabFilter Pro-C 3 can add Diode character on top of Clean, Bus, Classic, and the other styles. You get some of the harmonic idea without the 33609 timing. Say which one you loaded.',
    },
    {
      name: 'Compressor plus limiter',
      description: 'The two sections stacked. The compressor levels. The limiter only catches what is left. Bypassing them separately tells you which one is actually doing the work.',
    },
  ],
  whenToUse: [
    'A drum bus or a parallel drum crush that should sound thick rather than hifi.',
    'Electric guitar, bass, or a synth stab that needs to sit in a mix the way a console channel would.',
    'A mix that is already a little polite and can spend one or two decibels on diode color.',
  ],
  whenNotToUse: [
    'A vocal that needs transparent leveling. The bridge will add a grain the singer may not want. Try [[effect:optical-compressor|optical]] or [[effect:digital-compressor|digital]] first.',
    'Mastering where the brief is "do not change the tone." A diode bridge changes the tone. That is the feature.',
    'You only wanted the color and not the gain reduction. A diode character mode or a saturator is the smaller move. Do not compress 6 dB to get a saturation you could have added at unity gain.',
  ],
  startingSettings: [
    {
      source: 'Drum bus',
      settings: [
        { param: 'Compressor gain reduction', value: '2 to 4 dB' },
        { param: 'Recovery', value: 'Middle step' },
        { param: 'Limiter', value: 'Only the loudest hits' },
        { param: 'Makeup', value: 'Matched to bypass' },
      ],
      note: 'If the cymbals turn harsh, the limiter is working too often or the bridge is being hit too hard. Back the compressor off before you dull the cymbals with EQ.',
    },
    {
      source: 'Electric guitar',
      settings: [
        { param: 'Gain reduction', value: '3 to 5 dB' },
        { param: 'Recovery', value: 'Fast enough to follow the pick, not so fast it fizzes' },
        { param: 'Limiter', value: 'Off, unless a strum spikes' },
      ],
      note: 'Diode compression on a distorted guitar can be too much of the same harmonic family. Try it on a cleaner part first.',
    },
    {
      source: 'Parallel crush',
      settings: [
        { param: 'Gain reduction', value: '6 dB or more on the copy only' },
        { param: 'Recovery', value: 'Slower than you would use full-wet' },
        { param: 'Blend', value: 'Under the dry bus' },
      ],
      note: 'The grit is the point of the copy. The dry bus keeps the transient. Do not also smash the dry bus with the same plugin.',
    },
  ],
  techniques: [
    {
      name: 'Compressor and limiter, one job each',
      description: 'The 33609 layout is two processors. Use them that way.',
      steps: [
        'Bypass the limiter.',
        'Set the compressor recovery and threshold until the performance is even.',
        'Engage the limiter and raise its threshold until the gain-reduction meter only flicks on the spikes.',
        'If the limiter meter is as busy as the compressor meter, raise the limiter threshold.',
      ],
    },
    {
      name: 'Hear the diode, then decide',
      description: 'Color and compression arrive together. Separate them once before you commit.',
      steps: [
        'Get a few decibels of gain reduction and match the level.',
        'Switch to a clean [[effect:digital-compressor|digital]] compressor at the same gain reduction and the same level.',
        'If you miss the diode when you switch, keep it. If you cannot tell, you do not need this circuit on this source.',
      ],
    },
    {
      name: 'Sidechain the detector, not the tone',
      description: 'Arturia adds a sidechain EQ. It changes what the bridge reacts to. It does not EQ the audio, unless you are monitoring the sidechain.',
      steps: [
        'High-pass the detector if the kick is crushing the overheads.',
        'Use the sidechain listen control, set the filter, then turn listen off.',
        'Re-check the gain-reduction meter. It should move on the hits you care about.',
      ],
    },
  ],
  unorthodoxTechniques: [
    {
      name: 'Diode character on a clean compressor',
      description: 'When you want a hint of the harmonic and you already trust the timing of another compressor.',
      steps: [
        'Load Pro-C in Bus or Clean, with the gain reduction you already like.',
        'Turn Diode character on, after the compression if the plugin lets you choose pre or post.',
        'Match level. Keep only as much drive as you can hear at that matched level.',
      ],
    },
    {
      name: 'One diode on the drum bus, none on the mix',
      description: 'The color stacks. A diode drum bus plus a diode mix bus plus a tape plugin is three versions of "thick."',
      steps: [
        'Print the attitude on the drum bus.',
        'Use a [[effect:vca-compressor|VCA]] or digital compressor for the mix bus, at 1 dB.',
        'Bypass the mix-bus compressor. If the drums already did the job, leave the mix bus clean.',
      ],
    },
  ],
  mistakes: [
    'Assuming FabFilter Diode mode is a Neve 33609. Arturia is the registry plugin that says it models that unit. Diode character is a color.',
    'Letting the limiter do all the gain reduction, then wondering why the recovery switch does nothing.',
    'High-passing the audio to fix mud that the diode bridge exaggerated, and hollowing out the kick. Back the compression off first.',
    'Using it on every bus because the preset name said console. One diode stage is a sound. Three is a blanket.',
  ],
  myths: [
    {
      myth: 'Diode-bridge compression is just a VCA with a different panel.',
      truth: 'The gain cell is the diodes, and they distort as they attenuate. A VCA is built to take a control voltage and change gain more cleanly. The settings can look similar. The residue in the mids does not.',
    },
    {
      myth: 'Warm means it will fix a harsh mix.',
      truth: 'A driven diode bridge can add its own harshness in the midrange. Warm, in Arturia description of the 33609, is not a de-esser.',
    },
  ],
  chainPlacement:
    'On a drum bus, put broad mud cuts before the diode compressor so the bridge is not triggering on junk, then a gentle high shelf after it if the cymbals died. Do not follow it with another colored compressor unless the second one is doing almost nothing. On a single guitar, the diode compressor can go before an amp sim if you want the amp to see a steadier, already gritty signal, or after it if you want the amp color first. Listen to both orders once. They are not the same.',
  pluginRecs: {
    industryStandard: ['arturia-comp-diode-609'],
    proAlternatives: ['fabfilter-pro-c'],
    budget: ['klanghelm-dc8c'],
    free: ['tdr-molotok'],
    stock: [
      { daw: 'logic-pro', name: 'Compressor', note: 'No diode-bridge model in the published circuit list. Classic VCA is the colored stock compressor to try, and it is still a VCA.' },
      { daw: 'cubase', name: 'VintageCompressor', note: 'Input-driven vintage color. Not a 33609.' },
      { daw: 'ableton-live', name: 'Glue Compressor', note: 'A feedback VCA, not a diode bridge. Use it if you wanted glue and only thought you wanted diodes.' },
      { daw: 'reaper', name: 'ReaComp', note: 'No diode model. Pair it with a saturator if you need the grit separately.' },
    ],
    notes: 'Comp DIODE-609 is the plugin in this registry that Arturia says models the Neve 33609. Pro-C Diode is a character mode on whatever style you already picked. DC8C has two saturation models and is not a diode-bridge emulation. Molotok is free character compression inspired by vintage behavior, and Tokyo Dawn says it is not a model of one device.',
  },
  hardware: [
    { name: '33609', maker: 'Neve', note: 'The diode-bridge compressor and limiter Arturia names as the model for Comp DIODE-609.' },
  ],
  callouts: [
    {
      variant: 'tip',
      title: 'Two meters, two jobs',
      body: 'If the unit has a compressor meter and a limiter meter, the limiter meter should be the quiet one. A busy limiter means you are not hearing the recovery time you set.',
    },
  ],
  related: ['effect:compressor', 'effect:vca-compressor', 'effect:vintage-compressor', 'effect:bus-compressor'],
})

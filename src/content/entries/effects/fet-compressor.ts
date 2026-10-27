import { defineEffect } from '../../define'

export default defineEffect({
  id: 'fet-compressor',
  status: 'review',
  skillLevel: 'intermediate',
  roles: ['beatmaker', 'vocalist', 'rapper', 'recording-engineer', 'mix-engineer'],
  lastVerified: '2026-10-26',
  parent: 'compressor',
  typeGroup: 'Circuit',
  typeOrder: 1,
  sources: [
    { title: '1176LN Manual', author: 'Universal Audio', url: 'https://media.uaudio.com/assetlibrary/1/1/1176ln_manual.pdf' },
    { title: 'UA 1176 Classic Limiter Collection Manual', author: 'Universal Audio', url: 'https://help.uaudio.com/hc/en-us/articles/4419447352980-UA-1176-Classic-Limiter-Collection-Manual' },
    { title: 'Compressor main parameters in Logic Pro for Mac', author: 'Apple', url: 'https://support.apple.com/guide/logicpro/compressor-main-parameters-lgcead9636ef/mac' },
    { title: 'MJUC', author: 'Klanghelm', url: 'https://klanghelm.com/contents/products/MJUC.html', note: 'Klanghelm describes the 175 and 176 as the all-tube predecessors of the 1176.' },
  ],
  name: 'FET Compressor',
  aliases: ['FET limiter', '1176-style compressor', 'Field-effect transistor compressor'],
  category: 'dynamics',
  kind: 'type',
  summary: 'A field-effect transistor does the gain change, fast enough to catch a transient and bright enough that people use it as a tone box.',
  cheatSheet: [
    'On an 1176, clockwise is faster. Attack runs from 20 to 800 microseconds. Release runs from 50 ms to 1.1 seconds.',
    'There is no threshold knob. The input drives the compression. Output puts the level back.',
    'Ratios are stepped: 4:1, 8:1, 12:1, and 20:1. Higher ratios also raise the threshold.',
    'All-button mode lands somewhere between 12:1 and 20:1, shifts the bias, and gets dirty on purpose. UA says it will not harm the 1176LN.',
    'Apple: a FET can only attenuate, and it can go from clean to a crunchy transient. Vocals, drums, guitars, and bass are the day job.',
    'In a linked stereo pair, UA says the fastest attack becomes 40 microseconds instead of 20.',
  ],
  history:
    'The FET limiter is the solid-state follow-up to the tube limiters that came before it. Klanghelm describes the Universal Audio 175 and 176 of the early 1960s as the all-tube predecessors of the 1176. The 1176 kept the "grab it and make it present" job and replaced the tube gain cell with a field-effect transistor. The manual still tells you to treat attack and release as backwards relative to most other gear: up is faster. Engineers quoted in the 1176LN manual keep coming back to the same uses: vocals that need brightness and bite, drums, and rooms. The all-button trick, pressing every ratio at once, was not a labeled mode. It became one because the circuit did something people liked.',
  howItWorks:
    'A FET compressor uses a field-effect transistor as a voltage-controlled resistor in the audio path. The detector, in the classic 1176, is a feedback design: it watches the output and yanks the gain down very quickly. Universal Audio specs the attack from 20 microseconds at full clockwise to 800 microseconds at full counter-clockwise. Both of those are fast. A "slow" 1176 attack is still quicker than a 10 ms VCA attack, so the FET always touches the transient. What changes is how much of the click survives. Release is 50 ms clockwise to 1.1 seconds counter-clockwise. The input knob is the drive. Noon on the input and output knobs, the number 24 on the hardware, is the manual unity-gain start. Ratio buttons are 4, 8, 12, and 20 to 1. The manual notes that higher ratios also set the threshold higher, so 20:1 is not just "more of 4:1." All four buttons together move the ratio to somewhere between 12:1 and 20:1, change bias points through the circuit, and make attack and release shift while you play. Distortion goes up. That is the sound, not a fault.',
  controls: [
    {
      name: 'Input',
      description: 'How hard you drive the FET. This is your threshold. The 1176LN manual starts at 24, about noon, for unity, then has you raise the input until the gain-reduction meter shows the amount you want.',
      typicalRange: 'The hardware scale centers near 24',
      startingValue: '24, then raise for gain reduction',
    },
    {
      name: 'Output',
      description: 'Makeup gain. After the input is doing the compression you want, bring the output back so bypass is the same loudness. The meter +4 or +8 buttons show output level instead of gain reduction.',
      typicalRange: 'Centered near 24 for unity',
      startingValue: 'Match the bypass',
    },
    {
      name: 'Attack',
      description: '20 microseconds (fully clockwise, fastest) to 800 microseconds (fully counter-clockwise, slowest). Actual time shifts a little with ratio. UA notes that lower ratios keep the fastest attacks. Slower, meaning counter-clockwise, lets more of the hit through.',
      typicalRange: '20 to 800 µs',
      startingValue: 'Near noon, then back off if the bite is gone',
    },
    {
      name: 'Release',
      description: '50 ms fully clockwise to 1.1 seconds fully counter-clockwise. Fast release brings energy back and can grind on bass. Slow release keeps the vocal glued and can smear the next word.',
      typicalRange: '50 ms to 1.1 s',
      startingValue: 'Near noon',
    },
    {
      name: 'Ratio',
      description: '4:1 is the vocal and general compression setting the manual and its interviews keep returning to. 8:1 is heavier. 12:1 and 20:1 are limiting. All four at once is the British, all-button sound.',
      typicalRange: '4:1, 8:1, 12:1, 20:1, or all',
      startingValue: '4:1',
    },
  ],
  meters: [
    { name: 'GR', description: 'Gain reduction. Use this while you raise the input. In all-button mode UA says the meter often sits pinned. Do not chase it back to zero. Listen.' },
    { name: '+4 and +8', description: 'Output-level modes on the hardware meter. 0 VU is +4 dBm or +8 dBm depending on the button. Use them after you set makeup, so you are not judging the compressor by a hotter output.' },
  ],
  variants: [
    {
      name: '4:1 compression',
      description: 'The everyday FET setting. The 1176LN manual calls 4:1 moderate compression. Jim Scott, quoted there, says he stays on 4:1.',
    },
    {
      name: '20:1 limiting',
      description: 'The manual calls 20:1 hard limiting and 12:1 mild limiting. Use it when a peak must come down, and remember the threshold sits higher at these ratios.',
    },
    {
      name: 'All-button',
      description: 'Every ratio engaged. UA puts the ratio somewhere between 12:1 and 20:1, with shifting attack, release, and bias, and a lag on the first transient that reads as crunch. Drums, rooms, dirty bass, and in-your-face vocals are the uses they name.',
    },
  ],
  whenToUse: [
    'A vocal that needs to sit forward and pick up a little brightness. Several engineers quoted in the 1176LN manual describe that as the default vocal box.',
    'Snare, kick, or a room mic that should feel aggressive. All-button is the extreme version.',
    'Bass or guitar that needs to be even and a bit dirty, especially with all-button or a fast release used on purpose.',
  ],
  whenNotToUse: [
    'A mastering pass that must stay transparent. The FET adds brightness even at modest gain reduction. Use [[effect:digital-compressor|digital]] or a very light [[effect:bus-compressor|bus]] compressor.',
    'A source that is already harsh. The 1176LN manual interviews describe the FET as adding top end. If the vocal is icy, an [[effect:optical-compressor|optical]] leveler is the calmer first try.',
    'You need a threshold you can automate in decibels. Classic FET workflow is input-driven. A [[effect:vca-compressor|VCA]] or digital compressor is easier to ride.',
  ],
  startingSettings: [
    {
      source: 'Lead vocal',
      settings: [
        { param: 'Ratio', value: '4:1' },
        { param: 'Input', value: 'Start at 24, raise until you see several dB' },
        { param: 'Attack', value: 'Counter-clockwise of noon if you want the consonant' },
        { param: 'Release', value: 'Near noon, faster if the vocal sits back' },
        { param: 'Output', value: 'Match bypass' },
      ],
      note: 'The 1176LN manual getting-started procedure is the same shape: unity at 24, ratio in, then input for the gain reduction you want. Jim Scott, quoted in that manual, stays on 4:1 with the timing knobs at 10 o clock and 2 o clock.',
    },
    {
      source: 'Snare or room',
      settings: [
        { param: 'Ratio', value: 'All-button, or 8:1 if that is too broken' },
        { param: 'Attack', value: 'Slower (counter-clockwise) so the crack remains' },
        { param: 'Release', value: 'Fast enough to recover before the next hit' },
        { param: 'Gain reduction', value: 'As much as the smash needs, then blend' },
      ],
      note: 'If all-button is too much on the track, put it on a parallel copy and blend. The manual lists drums and ambience as the all-button uses.',
    },
    {
      source: 'Bass',
      settings: [
        { param: 'Ratio', value: '4:1 or 8:1' },
        { param: 'Attack', value: 'A little slower, so the pluck is still there' },
        { param: 'Release', value: 'Not pinned clockwise. Fast release can growl on low notes.' },
        { param: 'Gain reduction', value: '3 to 6 dB' },
      ],
      note: 'All-button on bass is a sound, the "dirty bass" case UA names. It is not the default even setting.',
    },
  ],
  techniques: [
    {
      name: 'Set it the way the manual does',
      description: 'The 1176LN quick start is still the least confusing way into a backwards panel.',
      steps: [
        'Set input and output near 24. Disengage the ratios if you want to hear the color with almost no gain reduction.',
        'Pick 4:1. Put attack and release near the middle, which the manual calls about 4 on the knob scale.',
        'Switch the meter to GR and raise the input until the reduction looks right.',
        'Move attack and release by ear. Remember clockwise is faster. Then set the output against the bypass.',
      ],
    },
    {
      name: 'All-button on a parallel drum copy',
      description: 'You get the crunch without giving the whole kit away to it.',
      steps: [
        'Send the drums to a return and put the FET there in all-button.',
        'Let the meter pin. UA says that is normal in this mode.',
        'Blend the return under the dry drums until the room or the snare body appears.',
        'High-pass the return if the low end turns to mush.',
      ],
    },
    {
      name: 'FET into optical',
      description: 'A fast FET catches the peaks. A slower optical leveler evens the phrase. This is the two-stage vocal chain people mean when they name both boxes.',
      steps: [
        'FET first, 4:1, only a few dB, attack slow enough to keep the consonant.',
        'Optical second, compress mode, another few dB on the body of the phrase.',
        'Level-match the pair. The optical page has the LA-2A specifics.',
      ],
    },
  ],
  unorthodoxTechniques: [
    {
      name: 'No ratio buttons, color only',
      description: 'The 1176AE manual notes that with every ratio out, the signal still passes through the circuitry at 1:1 and picks up color without gain reduction. Arturia Comp FET-76 includes a range control that can sit at 0 dB for the same idea.',
      steps: [
        'Disengage every ratio, or set the range so gain reduction cannot happen.',
        'Raise the input until you hear the brightness, then set the output back down.',
        'If you cannot hear a change at matched level, you do not need the color. Bypass it.',
      ],
    },
    {
      name: 'Slow attack on a fast box',
      description: 'The slowest 1176 attack is still under a millisecond, but it is the difference between a choked snare and a snare with a crack.',
      steps: [
        'Start fully counter-clockwise on attack, the slow end.',
        'Play the snare and nudge clockwise until the crack just starts to round off.',
        'Stop there. Faster will be smoother and smaller, which is rarely what you wanted from a FET.',
      ],
    },
  ],
  mistakes: [
    'Turning attack clockwise because every other plugin gets slower that way. On an 1176, clockwise is the 20 microsecond end, and it will eat the transient.',
    'Reading all-button as "broken" and avoiding it, or printing it on a lead vocal at full wet when you only wanted a little presence.',
    'Matching a louder output and calling the brightness "the 1176 sound." Match the level first. The brightness that remains is the circuit.',
    'Using 20:1 as a vocal default. The manual treats 20:1 as hard limiting. 4:1 is the compression ratio its own interviews keep naming.',
  ],
  myths: [
    {
      myth: 'All-button mode will damage the compressor.',
      truth: 'The 1176LN manual says you will not harm the unit. In a plugin there is nothing to harm. The meter pinning is expected.',
    },
    {
      myth: 'A slow 1176 attack behaves like a 30 ms VCA attack.',
      truth: '800 microseconds is the slow end of the 1176 range Universal Audio prints. It still grabs faster than a typical console-bus attack. Use a VCA or digital compressor when you truly want 10 to 30 ms.',
    },
  ],
  chainPlacement:
    'On a vocal, the FET usually comes after the high-pass and the worst resonance cuts, and before a de-esser if the brightness it adds makes "s" sounds worse. An optical leveler can follow it for the slow second stage. On drums, all-button works better in parallel than as the only compressor on the bus. Do not put a long reverb before a FET that is keyed from the dry vocal. The reverb tail will keep the FET clamped.',
  genres: ['genre:trap'],
  pluginRecs: {
    industryStandard: ['arturia-comp-fet-76'],
    proAlternatives: ['fabfilter-pro-c'],
    budget: ['klanghelm-dc8c'],
    free: ['tdr-molotok', 'klanghelm-dc1a'],
    stock: [
      { daw: 'logic-pro', name: 'Compressor', note: 'Studio FET or Vintage FET. Apple describes FET models as fast, and able to go crunchy. The parameters page does not name a specific 1176 revision.' },
      { daw: 'ableton-live', name: 'Compressor', note: 'No FET model. Use a fast attack if you need the speed, and accept that the color is not an 1176.' },
      { daw: 'reaper', name: 'ReaComp', note: 'Set a very fast attack and feedback mode. It will not become an 1176, but it will do the fast-grab job.' },
      { daw: 'cubase', name: 'VintageCompressor', note: 'Input-driven, with a Punch switch that keeps the attack. Not a published 1176 model.' },
    ],
    notes: 'Comp FET-76 is the verified FET-specific plugin in the registry. Pro-C Punch and Classic can be fast and colored, and they are not 1176 models. DC8C Smash is the budget way to get a very fast grab. Molotok and DC1A are free character compressors, not FET emulations. If the circuit model is the point, save for the Arturia or use Logic Vintage FET.',
  },
  hardware: [
    { name: '1176LN', maker: 'UREI / Universal Audio', note: 'The FET limiter this page is built from. Attack 20 to 800 µs, release 50 ms to 1.1 s, ratios 4, 8, 12, and 20.' },
    { name: '1176 revisions', maker: 'UREI / Universal Audio', note: 'Bluestripe, blackface, and silverface revisions are voiced differently. UA ships them as separate models in the 1176 collection. Do not assume two "1176" plugins are the same revision.' },
    { name: '175 and 176', maker: 'Universal Audio', note: 'The earlier all-tube limiters. Klanghelm points at them as the 1176 predecessors. They belong with [[effect:tube-compressor|tube compressors]].' },
  ],
  callouts: [
    {
      variant: 'tip',
      title: 'Say the direction out loud once',
      body: 'Clockwise is faster. Counter-clockwise is slower. If a preset browser ever hands you an 1176-style plugin that "fixed" the knobs, look for a label before you turn attack up and lose the snare.',
    },
    {
      variant: 'mistake',
      title: 'All-button is a parallel effect until you know you want it full wet',
      body: 'The crunch is real and it is a lot. Blend it. The dry drum transient is what makes the smash readable.',
    },
  ],
  related: ['effect:compressor', 'effect:optical-compressor', 'effect:tube-compressor', 'effect:vintage-compressor'],
})

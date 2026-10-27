import { defineEffect } from '../../define'

export default defineEffect({
  id: 'digital-compressor',
  status: 'review',
  skillLevel: 'beginner',
  roles: ['beatmaker', 'recording-engineer', 'mix-engineer', 'mastering-engineer', 'media-composer'],
  lastVerified: '2026-10-26',
  parent: 'compressor',
  typeGroup: 'Circuit',
  typeOrder: 6,
  sources: [
    { title: 'TDR Kotelnikov', author: 'Tokyo Dawn Records', url: 'https://www.tokyodawn.net/tdr-kotelnikov/' },
    { title: 'FabFilter Pro-C 3 Help: Style and character', author: 'FabFilter', url: 'https://www.fabfilter.com/help/pro-c/using/styleandcharacter' },
    { title: 'DC8C', author: 'Klanghelm', url: 'https://klanghelm.com/contents/products/DC8C.html' },
    { title: 'Compressor', author: 'Steinberg', url: 'https://www.steinberg.help/r/cubase-pro/cubaseplugref/15.0/en/_shared/topics/plug_ref/compressor_r.html' },
    { title: 'Compressor main parameters in Logic Pro for Mac', author: 'Apple', url: 'https://support.apple.com/guide/logicpro/compressor-main-parameters-lgcead9636ef/mac' },
    { title: 'ReaPlugs', author: 'Cockos', url: 'https://www.cockos.com/reaper/reaplugs/' },
  ],
  name: 'Digital Compressor',
  aliases: ['Clean compressor', 'Transparent compressor', 'Feed-forward compressor'],
  category: 'dynamics',
  kind: 'type',
  summary: 'A gain computer does the math in samples, so the ratio, the timing, and the lookahead are the ones you set, with as little extra color as the design allows.',
  cheatSheet: [
    'Digital does not mean "no sound." It means the gain change is calculated, then applied by multiplying the signal.',
    'Kotelnikov is the reference free one: Tokyo Dawn calls it stealthy and proudly not an emulation, with separate release for peak and RMS.',
    'Pro-C Clean is FabFilter low-distortion, feed-forward, program-dependent style. Mastering is the style they describe as the most transparent, including on fast transients.',
    'DC8C Clean mode is the budget version of "no intermodulation, no distortion, no aliasing."',
    'Lookahead catches a peak before it happens and adds latency. Cubase Live mode turns lookahead off so the plugin can be used with no added latency.',
    'Use this when the level is the problem and the tone is not. Switch families when you wanted the box in the recording.',
  ],
  history:
    'Digital compressors arrived when the gain change no longer had to be a lamp, a transistor, or a tube. The detector could look ahead in a delay line, the knee could be any curve, and the ratio could be the ratio. That made them the default stock compressor in a DAW. Apple describes Logic Platinum Digital as clean, with a fast transient response, usable on many sources. The cost of that freedom is that a careless digital compressor is very good at sounding small, because it will do exactly the fast attack you asked for. The craft moved from "what will this box do" to "what did I just tell it to do."',
  howItWorks:
    'A digital compressor measures level in the computer, runs it through attack and release envelopes, and multiplies the audio by a gain that changes over time. Feed-forward is the usual topology: the detector hears the input, computes the gain, and applies it. FabFilter describes Clean as that kind of style, low distortion and program-dependent. Because the audio can be delayed a few milliseconds, the detector can react before the peak arrives. That is lookahead. It is why a digital compressor can catch a transient without the click-smear of a too-fast analog attack, and why the track gets late relative to tracks that are not delayed. Cubase states the trade in one switch: lookahead is more accurate and adds latency, and Live mode turns lookahead off for zero added latency. ReaComp offers lookahead and oversampling as options, not as a different brand of magic. Kotelnikov splits release into a peak path and an RMS path, so a spike and a sustained note do not have to share one recovery time. DC8C Clean mode is the explicit "do not add harmonics" setting. The other DC8C modes, and Pro-C character modes, are what you turn on when you have decided you no longer want this page.',
  controls: [
    {
      name: 'Threshold and ratio',
      description: 'On a clean digital compressor these mean what they say. 4:1 is four to one. Set the threshold until the gain-reduction meter shows the decibels you planned.',
      typicalRange: 'Ratio from 1:1 up past 20:1',
      startingValue: '2:1 to 4:1, a few dB of reduction',
    },
    {
      name: 'Attack and release',
      description: 'Continuous times, usually from a fraction of a millisecond to a second or more. Auto release is a convenience, not a model of a photocell. If Auto pumps, type a number.',
      typicalRange: '0.1 ms to 100 ms attack, and release out to about 1 s, are common ranges',
      startingValue: '10 to 30 ms attack, 100 ms release',
    },
    {
      name: 'Knee',
      description: 'Hard knee matches the drawing in the manual. Soft knee starts early and hides the join. Cubase offers both on its stock Compressor. Use soft on vocals and buses, hard when you want a peak to hit a wall.',
      typicalRange: 'Hard to a wide soft knee',
      startingValue: 'Soft',
    },
    {
      name: 'Peak / RMS',
      description: 'Cubase blends them on one control: 0 is pure peak, 100 is pure RMS. Their guide says RMS suits vocals and other material with few transients, and peak suits percussion. Kotelnikov goes further and lets peak and RMS have different release times.',
      typicalRange: 'Peak, RMS, or a blend',
      startingValue: 'RMS for vocals, peak for drums',
    },
    {
      name: 'Lookahead',
      description: 'A short delay so the gain change can start before the peak. It adds latency. Turn it off, or use the host low-latency mode, when you are tracking.',
      typicalRange: '0 to a few milliseconds',
      startingValue: 'On for mixing and mastering, off while recording',
    },
  ],
  meters: [
    { name: 'Gain reduction', description: 'Still the only meter that tells you the compressor is working. A pretty waveform under it is not a substitute.' },
    { name: 'Latency or lookahead readout', description: 'If the plugin shows delay in samples or milliseconds, that delay is real. Tracks without this plugin will be early relative to this one unless the host compensates. Most DAWs compensate on playback and do not while you are recording through the plugin.' },
  ],
  variants: [
    {
      name: 'Clean feed-forward',
      description: 'Pro-C Clean, Kotelnikov, DC8C Clean, Logic Platinum Digital. The goal is level, not a vintage name.',
    },
    {
      name: 'Lookahead peak control',
      description: 'The same compressor with a few milliseconds of preview, or a mastering style aimed at fast transients. FabFilter describes the Mastering style as transparent and still able to catch those transients.',
    },
    {
      name: 'Digital that can pretend',
      description: 'One plugin, many styles. Pro-C also has Opto, Vari-Mu, Bus, and Classic. Those are on the other type pages. Staying on this page means leaving the character modes off.',
    },
  ],
  whenToUse: [
    'Any track where you can say the problem in decibels: this word is 6 dB louder than the last one.',
    'A master or a stem that should keep its tone. Kotelnikov and Pro-C Mastering are built for that brief.',
    'Tracking, with lookahead off, when the singer needs even level in the headphones and you cannot afford a colored box in the record path.',
  ],
  whenNotToUse: [
    'The vocal is even and lifeless and you were hoping the compressor would add a sound. Pick [[effect:fet-compressor|FET]], [[effect:tube-compressor|tube]], or [[effect:optical-compressor|optical]] on purpose.',
    'You are recording a live take and the plugin lookahead is delaying the headphones. Turn lookahead off or bypass it while recording.',
    'One frequency is the problem. A wideband digital compressor will turn the whole vocal down every time that frequency appears. Move to [[effect:multiband-compressor|multiband]] or a dynamic EQ.',
  ],
  startingSettings: [
    {
      source: 'Lead vocal',
      settings: [
        { param: 'Detector', value: 'RMS, or a peak/RMS blend' },
        { param: 'Ratio', value: '3:1 to 4:1' },
        { param: 'Knee', value: 'Soft' },
        { param: 'Attack', value: '10 to 20 ms' },
        { param: 'Release', value: '80 to 150 ms' },
        { param: 'Gain reduction', value: '2 to 5 dB' },
      ],
      note: 'Cubase own guideline: RMS for material with few transients, such as vocals. If the consonants vanish, the attack is too short. Lengthen it before you add EQ.',
    },
    {
      source: 'Drum peaks',
      settings: [
        { param: 'Detector', value: 'Peak' },
        { param: 'Lookahead', value: 'On, a few ms, if you are mixing' },
        { param: 'Attack', value: '5 to 15 ms if you still want the crack' },
        { param: 'Ratio', value: '4:1' },
        { param: 'Gain reduction', value: '2 to 4 dB' },
      ],
      note: 'Lookahead off if this compressor is in a cue mix. The host cannot hide the delay from a singer or a drummer.',
    },
    {
      source: 'Mastering leveler',
      settings: [
        { param: 'Style', value: 'Clean or Mastering' },
        { param: 'Ratio', value: '1.5:1 to 2:1' },
        { param: 'Attack', value: 'Slow, or program-dependent' },
        { param: 'Gain reduction', value: '1 to 2 dB' },
      ],
      note: 'Kotelnikov separate peak and RMS release is the control to learn here. Let the RMS release be slower than the peak release so a kick does not hold the whole master down.',
    },
  ],
  techniques: [
    {
      name: 'Write the gain reduction down',
      description: 'Digital compressors invite endless tiny moves. A number stops that.',
      steps: [
        'Decide the maximum gain reduction before you touch the threshold. Three decibels is a real decision.',
        'Move only the threshold until the meter hits that number on the loudest phrase.',
        'Match makeup to bypass.',
        'If it is not enough, add a second compressor. Do not "just" make it 8 dB because the knob still moves.',
      ],
    },
    {
      name: 'Split peak and RMS release',
      description: 'Kotelnikov gives you both. Use them so transients recover fast and the body of the note does not pump.',
      steps: [
        'Set the peak release short enough that a snare or a consonant comes back quickly.',
        'Set the RMS release longer so a sustained vocal does not flutter.',
        'If you only have one release knob, pick the release that fixes the problem you can hear, and high-pass the detector if the other problem is just bass.',
      ],
    },
    {
      name: 'Tracking with zero added latency',
      description: 'Lookahead is a mix tool.',
      steps: [
        'On Cubase, enable Live mode. The manual says this defeats lookahead and the plugin adds no latency.',
        'On any other digital compressor, set lookahead to zero or bypass the plugin in the record path.',
        'You can put the lookahead version on later, on the recorded audio.',
      ],
    },
  ],
  unorthodoxTechniques: [
    {
      name: 'Oversample only the compressor you can hear aliasing',
      description: 'Fast gain changes create new high frequencies. Oversampling pushes that math higher. It also costs CPU.',
      steps: [
        'If a bright vocal or a distorted guitar sounds fizzy only when the compressor is in, try DC8C or ReaComp oversampling, or Pro-C oversampling.',
        'Level-match again. Oversampling can change the level you thought you matched.',
        'Turn it off on the compressors where you cannot hear a difference.',
      ],
    },
    {
      name: 'A hard knee as a spot fix',
      description: 'Soft knee is the polite default. A hard knee is how you make one loud syllable sit down and leave the rest alone.',
      steps: [
        'Set a high threshold and a higher ratio, hard knee, fast attack, lookahead on.',
        'Aim the meter at the one word that jumps.',
        'If the whole line is now flat, the threshold is too low. This is a peak catcher, not the vocal compressor.',
      ],
    },
  ],
  mistakes: [
    'Using a 0.1 ms attack on a vocal because the plugin allows it. You will shave the consonant off and then boost presence to fake it back.',
    'Leaving lookahead on while recording and singing or playing early to compensate. Fix the plugin delay instead.',
    'Calling a character mode "digital" because the plugin is software. Pro-C Classic, Opto, and Vari-Mu are on the other pages. Clean and Mastering are this page.',
    'Stacking three clean compressors at 4 dB each and describing the vocal as uncompressed because none of them is a vintage emulation.',
  ],
  myths: [
    {
      myth: 'Digital compressors have no sound, so they cannot be overdone.',
      truth: 'They have less harmonic residue. They still remove dynamics. A vocal with 12 dB of clean gain reduction can sound smaller than one with 3 dB of FET, and it will not advertise itself with distortion.',
    },
    {
      myth: 'Lookahead is free.',
      truth: 'Cubase documents it as a latency trade. The peak is caught early because the audio was delayed. Playback delay compensation hides that from the mix. A live cue mix does not.',
    },
  ],
  chainPlacement:
    'A clean compressor can go early in a chain when you want later EQ and saturation to see a steady level, with lookahead off if you are printing. For a master, it usually sits after the broad tone EQ and before a limiter. Do not put a linear-phase EQ and a lookahead compressor and a multiband compressor in a tracking chain and then hunt for the delay in the interface. Any one of them is enough to make a cue mix late.',
  genres: ['genre:trap'],
  pluginRecs: {
    industryStandard: ['fabfilter-pro-c'],
    proAlternatives: ['cytomic-the-glue'],
    budget: ['klanghelm-dc8c'],
    free: ['tdr-kotelnikov', 'melda-mcompressor'],
    stock: [
      { daw: 'logic-pro', name: 'Compressor', note: 'Platinum Digital. Apple: clean, fast transient response, useful on many sources.' },
      { daw: 'ableton-live', name: 'Compressor', note: 'Peak, RMS, or Expand. Included in every edition.' },
      { daw: 'cubase', name: 'Compressor', note: 'Soft or hard knee, peak-to-RMS analysis, auto release, and Live mode to defeat lookahead.' },
      { daw: 'reaper', name: 'ReaComp', note: 'Lookahead, oversampling, feedback or feed-forward, and a variable RMS size.' },
      { daw: 'fl-studio', name: 'Fruity Limiter', note: 'Image-Line recommends the compressor section here over the legacy Fruity Compressor.' },
    ],
    notes: 'Pro-C Clean or Mastering is the digital compressor. Turn character off on this page. DC8C Clean mode is the budget no-color option. The Glue is the pro plugin to open when clean digital is the wrong sound and you want console bus glue instead. Kotelnikov is the free compressor Tokyo Dawn built for the transparent brief.',
  },
  hardware: [
    { name: 'None required', note: 'This type is the computer. A hardware digital compressor such as a mastering-house unit exists, and it is still the same idea: a delay for lookahead, a gain computer, and a multiply. You do not need one to use the stock plugin.' },
  ],
  callouts: [
    {
      variant: 'tip',
      title: 'Name the style out loud',
      body: 'If the plugin has Clean, Opto, FET, and Bus in one menu, the menu position is the type. This page is Clean, Mastering, or an explicit no-color mode. The other names are the other pages.',
    },
  ],
  related: ['effect:compressor', 'effect:pwm-compressor', 'effect:bus-compressor', 'effect:multiband-compressor', 'glossary:gain-reduction'],
})

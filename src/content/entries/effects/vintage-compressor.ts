import { defineEffect } from '../../define'

export default defineEffect({
  id: 'vintage-compressor',
  status: 'review',
  skillLevel: 'beginner',
  roles: ['beatmaker', 'vocalist', 'recording-engineer', 'mix-engineer', 'songwriter'],
  lastVerified: '2026-10-26',
  parent: 'compressor',
  typeGroup: 'Style',
  typeOrder: 11,
  sources: [
    { title: 'VintageCompressor', author: 'Steinberg', url: 'https://www.steinberg.help/r/cubase-pro/cubaseplugref/15.0/en/_shared/topics/plug_ref/vintage_compressor_r.html' },
    { title: 'FabFilter Pro-C 3 Help: Style and character', author: 'FabFilter', url: 'https://www.fabfilter.com/help/pro-c/using/styleandcharacter' },
    { title: 'TDR Molotok', author: 'Tokyo Dawn Records', url: 'https://www.tokyodawn.net/tdr-molotok/' },
    { title: 'DC1A', author: 'Klanghelm', url: 'https://klanghelm.com/contents/products/DC1A' },
    { title: '1176LN Manual', author: 'Universal Audio', url: 'https://media.uaudio.com/assetlibrary/1/1/1176ln_manual.pdf' },
  ],
  name: 'Vintage Compressor',
  aliases: ['Character compressor', 'Colored compressor', 'Classic compressor'],
  category: 'dynamics',
  kind: 'type',
  summary: 'A compressor you choose for the color and the program-dependent timing, not because it will hit a ratio to the decimal.',
  cheatSheet: [
    'Vintage is a workflow: fewer controls, drive the input, accept harmonics, let the release follow the program.',
    'It is not one circuit. FET, optical, tube, and diode-bridge pages are the actual machines. This page is how to choose and use that color.',
    'Cubase VintageCompressor is the stock sketch: input sets the amount, Punch keeps the attack, Auto release is program-dependent, and there is a mix knob.',
    'Pro-C Classic is FabFilter vintage, feedback, very program-dependent style. Character adds Tube, Diode, or Bright on top.',
    'Molotok is free character with eleven flavors. Tokyo Dawn says it does not emulate a specific device. Believe them.',
    'Match the level. Vintage plugins are experts at sounding better only because they got louder and brighter.',
  ],
  history:
    'The compressors people call vintage were built to solve a level problem and happened to leave a fingerprint. An 1176 brightens. An LA-2A eases off in a way you cannot set with two times. A tube leveler from the 1950s wants you to turn an input knob. A diode-bridge desk compressor thickens a bus. None of those designers was selling "vintage." The word showed up when plugins had to tell you which behavior you were loading. Steinberg VintageCompressor says it is modeled after vintage type compressors and then gives you the tells: input and output instead of a modern threshold, a Punch switch, and program-dependent auto release. FabFilter Classic is the same announcement in one style name: vintage, feedback, very program-dependent. The useful question is which fingerprint you meant. The circuit pages answer it. This page keeps you from buying four plugins when one colored move was the whole request.',
  howItWorks:
    'A vintage-style compressor usually listens in feedback, so the gain reduction softens itself, and it usually adds harmonics in the gain cell or the transformers around it. The timing is program-dependent: a short peak lets go faster than a long loud note, which is the optical and tube habit, and also what Cubase Auto release is aiming at. Controls are often coarser. You drive an input, pick a stepped ratio or a compress/limit switch, and you do not get a millisecond readout you can copy into a spreadsheet. Punch, on the Cubase plugin, is the explicit version of a trick the old attack knobs did by accident: keep the first instant even when the rest of the note is compressed. Modern character modes split the idea. You can take a clean digital compressor and add Tube, Diode, or Bright color, which is FabFilter Pro-C 3, or you can load a plugin that only does the colored job, which is DC1A, Molotok, or a real 1176 model. DC1A is two knobs, input and output, with a parallel mix, a negative ratio, a Relaxed peak/RMS switch, and a Deep high-pass. Klanghelm built it so the small panel would still go from nearly invisible leveling to crunchy pumping. That range is the vintage promise and the vintage trap. The same plugin can be a subtle leveler or a distortion box, and the panel will not stop you.',
  controls: [
    {
      name: 'Input',
      description: 'On VintageCompressor and on an 1176, this is how hard the circuit is driven. More input is more compression and often more color. It is not a clean threshold unless the plugin gives you a separate one.',
      typicalRange: 'From unity until the meter is working',
      startingValue: 'A few dB of gain reduction',
    },
    {
      name: 'Output',
      description: 'Makeup, and on some tubes the last color stage. Match it to bypass every time you move the input.',
      typicalRange: 'Whatever undoes the level loss',
      startingValue: 'Matched',
    },
    {
      name: 'Attack, or Punch',
      description: 'If you have a real attack knob, slower keeps the hit. Cubase Punch is a switch that preserves the early attack even with a short attack time. Use it when the vintage compressor is eating the consonant or the snare and you do not want to give up the body.',
      typicalRange: 'A knob, or a Punch switch',
      startingValue: 'Punch on for drums and picked bass',
    },
    {
      name: 'Auto release',
      description: 'Program-dependent recovery. Cubase offers it. Optical and tube hardware often give you nothing else. If the auto recovery pumps, you wanted a digital compressor with a number, not a more vintage preset.',
      typicalRange: 'On, or a slow fixed time',
      startingValue: 'Auto',
    },
    {
      name: 'Mix',
      description: 'Parallel, in the plugin. Vintage compression at full wet is a lot of color. The mix knob is how you keep ten percent of an 1176 or a diode bridge.',
      typicalRange: '0 to 100%',
      startingValue: '100% while you set it, then lower if the color is too much',
    },
  ],
  meters: [
    { name: 'VU gain reduction', description: 'Vintage panels show a VU because that is what the hardware had. It is slow. A peak can clip the next plugin while the needle looks calm. Glance at a peak meter too.' },
    { name: 'The bypass button', description: 'The real vintage meter is the matched bypass. If the plugin only wins when it is louder, the vintage sound was volume.' },
  ],
  variants: [
    {
      name: 'Feedback program-dependent',
      description: 'Pro-C Classic, optical levelers, a lot of tube compressors. The release follows the music. You stop trying to type it in milliseconds.',
    },
    {
      name: 'Input-driven FET or diode',
      description: 'The 1176 and the 33609 family. Stepped ratios, real grit, still "vintage" in a catalog. The details are on those circuit pages. Do not stop on this page if you already know which one you meant.',
    },
    {
      name: 'Character on a clean compressor',
      description: 'Tube, Diode, or Bright after a modern detector. You get the harmonic and you keep the threshold you understand. This is the right variant when the song needs a hint, not a replica.',
    },
  ],
  whenToUse: [
    'A sound is even enough and still feels small, digital, or pale, and a little harmonic density would help.',
    'You want the timing to follow the performance, especially a vocal or a bass, and a precise ratio is not the brief.',
    'A drum bus or a parallel smash where the dirt is the arrangement.',
  ],
  whenNotToUse: [
    'The brief is a transparent master or a broadcast voice that must not change tone. Use [[effect:digital-compressor|digital]].',
    'You already have two colored compressors and a tape plugin on the same bus. A third vintage stage is a blanket.',
    'You cannot name the color you want. Open the circuit cards and pick FET, optical, tube, or diode bridge instead of a preset called Vintage Warm.',
  ],
  startingSettings: [
    {
      source: 'Vocal color',
      settings: [
        { param: 'Style', value: 'Classic, optical, or a light FET at 4:1' },
        { param: 'Gain reduction', value: '2 to 4 dB' },
        { param: 'Character or drive', value: 'Low' },
        { param: 'Output', value: 'Matched' },
      ],
      note: 'If you need the vocal brighter and forward, the FET page is the specific tool. If you need it smoother, use optical. Vintage is the wrong last word if you already know which.',
    },
    {
      source: 'Drum attitude',
      settings: [
        { param: 'Punch', value: 'On' },
        { param: 'Gain reduction', value: '3 to 6 dB, or more on a parallel copy' },
        { param: 'Release', value: 'Auto, unless it hangs' },
        { param: 'Mix', value: 'Blend if the kit gets smaller' },
      ],
      note: 'Cubase Punch exists so a short attack does not have to delete the hit. Use it before you go hunting for a transient designer.',
    },
    {
      source: 'Two-knob character',
      settings: [
        { param: 'Plugin', value: 'DC1A' },
        { param: 'Input', value: 'Until it is obviously working' },
        { param: 'Relaxed', value: 'On for a smoother RMS feel, off for peak grab' },
        { param: 'Deep', value: 'On if bass is pumping the whole loop' },
        { param: 'Mix', value: 'Back it off from 100% if the crunch is the whole sound' },
      ],
      note: 'Klanghelm DC1A is freeware and is not a model of one vintage unit. It is the two-knob version of their Punch mode, which is the right free start.',
    },
  ],
  techniques: [
    {
      name: 'Name the circuit, then the plugin',
      description: 'Vintage is a shelf. The circuit is the book.',
      steps: [
        'Decide if you want grab, smooth leveling, thickness, or grit.',
        'Open [[effect:fet-compressor|FET]], [[effect:optical-compressor|optical]], [[effect:tube-compressor|tube]], or [[effect:diode-bridge-compressor|diode bridge]].',
        'Come back here only if you wanted the general colored workflow and not a specific box.',
      ],
    },
    {
      name: 'Character after a clean leveler',
      description: 'You keep a threshold you understand and add the harmonic second.',
      steps: [
        'Level with a clean digital compressor or Kotelnikov.',
        'Add Pro-C character, or a second vintage plugin, with almost no extra gain reduction.',
        'Match level. Keep the color only if the matched bypass still loses.',
      ],
    },
    {
      name: 'Use Punch or a slower attack before you add another plugin',
      description: 'Vintage compressors eat transients and then people buy a transient designer to undo it.',
      steps: [
        'If the hit disappeared, turn Punch on or slow the attack.',
        'Re-match the level.',
        'Only then decide you need another processor.',
      ],
    },
  ],
  unorthodoxTechniques: [
    {
      name: 'Negative ratio as a pumping special, not a vocal setting',
      description: 'DC1A includes negative compression. Louder input can come out quieter past the knee. That is an effect for a drum loop, not a default.',
      steps: [
        'Duplicate a drum loop.',
        'Engage the negative-ratio behavior and push the input.',
        'Blend it under the dry loop. Full wet is a novelty. Parallel is a texture.',
      ],
    },
    {
      name: 'One vintage compressor for the song, used everywhere by send',
      description: 'The same color on five tracks is a sound. Five different vintage presets is a yard sale.',
      steps: [
        'Pick one colored compressor you actually like.',
        'Put it on a return and send the tracks that need the fingerprint.',
        'Keep the other tracks clean. The contrast is what makes the color read.',
      ],
    },
  ],
  mistakes: [
    'Collecting emulations and leaving them all on. The record can have one strong color.',
    'Trusting a preset named Vintage Vocal. Set the gain reduction and the level match yourself.',
    'Using a VU alone and clipping the next plugin on peaks the needle did not show.',
    'Assuming Molotok, DC1A, or Pro-C Classic is an 1176 or an LA-2A. Their own pages say they are styles or original designs. The circuit pages name the models.',
  ],
  myths: [
    {
      myth: 'Vintage compressors are better compressors.',
      truth: 'They are more specific compressors. A clean digital compressor will level a master with less collateral tone. A vintage one will change the tone on purpose. Better is the one that matches the note you wrote down.',
    },
    {
      myth: 'If it does not distort, it is not really vintage.',
      truth: 'Engineers quoted in the 1176 manual also describe conservative use that still changes the vocal. Cubase Punch and a couple of decibels is a vintage workflow. Destroying a loop is a different workflow that happens to use the same plugin.',
    },
  ],
  chainPlacement:
    'A vintage compressor usually replaces the clean compressor, it does not follow it at the same depth. Cleanup EQ first, so you are not saturating a rumble. Then the vintage stage. Then a de-esser or a gentle shelf if the color made the top end worse. On a bus, pick this or the [[effect:bus-compressor|bus compressor]], not both at heroic settings. Parallel is the escape hatch: the vintage plugin can be filthy if the dry track is still the one carrying the transient.',
  genres: ['genre:trap'],
  pluginRecs: {
    industryStandard: ['fabfilter-pro-c'],
    proAlternatives: ['arturia-comp-fet-76', 'arturia-comp-diode-609', 'arturia-comp-tube-sta'],
    budget: ['klanghelm-mjuc'],
    free: ['tdr-molotok', 'klanghelm-dc1a', 'klanghelm-mjuc-jr'],
    stock: [
      { daw: 'cubase', name: 'VintageCompressor', note: 'Input-driven, Punch, auto release, mix. The channel strip also offers it beside the standard and tube compressors.' },
      { daw: 'logic-pro', name: 'Compressor', note: 'The Vintage VCA, Vintage FET, and Vintage Opto circuit types. Pick the circuit. Vintage alone is not a setting.' },
      { daw: 'ableton-live', name: 'Glue Compressor', note: 'The stock console-colored bus compressor in Standard and Suite. Not a general vintage drawer.' },
      { daw: 'reaper', name: 'ReaComp', note: 'No vintage model. Use Molotok or DC1A if you want the color in Reaper for free.' },
    ],
    notes: 'Pro-C Classic plus a character mode is the all-rounder. The Arturia trio is there when you have already chosen FET, diode bridge, or the Gates STA-Level tube path. MJUC is the budget tube. Molotok, DC1A, and MJUC jr. are the free character set, and only MJUC jr. is specifically a tube circuit.',
  },
  hardware: [
    { name: '1176', maker: 'UREI / Universal Audio', note: 'The FET end of vintage. [[effect:fet-compressor|FET page]].' },
    { name: 'LA-2A', maker: 'Teletronix / Universal Audio', note: 'The optical end. [[effect:optical-compressor|Optical page]].' },
    { name: 'STA-Level', maker: 'Gates', note: 'The 1950s tube end. [[effect:tube-compressor|Tube page]].' },
    { name: '33609', maker: 'Neve', note: 'The diode-bridge end. [[effect:diode-bridge-compressor|Diode-bridge page]].' },
  ],
  callouts: [
    {
      variant: 'tip',
      title: 'Pick the fingerprint, not the adjective',
      body: 'Bright and fast is FET. Slow and smooth is optical. Thick is tube. Gritty and dense is diode bridge. "Vintage" only tells you that some of those are welcome.',
    },
  ],
  related: ['effect:compressor', 'effect:fet-compressor', 'effect:optical-compressor', 'effect:tube-compressor', 'effect:diode-bridge-compressor'],
})

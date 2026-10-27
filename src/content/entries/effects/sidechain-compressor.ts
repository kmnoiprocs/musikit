import { defineEffect } from '../../define'

export default defineEffect({
  id: 'sidechain-compressor',
  status: 'review',
  skillLevel: 'intermediate',
  roles: ['beatmaker', 'mix-engineer', 'media-composer', 'recording-engineer'],
  lastVerified: '2026-10-26',
  parent: 'compressor',
  typeGroup: 'Job',
  typeOrder: 10,
  sources: [
    { title: 'Live Audio Effect Reference', author: 'Ableton', url: 'https://www.ableton.com/en/manual/live-audio-effect-reference/' },
    { title: 'MCompressor manual', author: 'MeldaProduction', url: 'https://www.meldaproduction.com/download/documentation/MCompressor.pdf' },
    { title: 'Compressor', author: 'Steinberg', url: 'https://www.steinberg.help/r/cubase-pro/cubaseplugref/15.0/en/_shared/topics/plug_ref/compressor_r.html' },
    { title: 'The Glue', author: 'Cytomic', url: 'https://cytomic.com/product/glue/' },
    { title: 'ReaPlugs', author: 'Cockos', url: 'https://www.cockos.com/reaper/reaplugs/' },
  ],
  name: 'Sidechain Compressor',
  aliases: ['Sidechain compression', 'Ducking compressor', 'Keyed compressor'],
  category: 'dynamics',
  kind: 'type',
  summary: 'The compressor turns one signal down using a different signal as the trigger, so a kick can make a hole for itself or a voice can push music out of the way.',
  cheatSheet: [
    'The sidechain is the key. It is not in the output. Ableton says raising sidechain gain does not make the kick louder in the mix.',
    'External sidechain: another track triggers the compressor. Internal sidechain EQ: the same track triggers it, but only in a band you choose.',
    'Use listen, set the key, then turn listen off. Exporting with listen on is how a beat becomes a solo kick.',
    'Ableton automatic makeup is unavailable on Compressor while an external sidechain is active. Set the level yourself.',
    'A volume shaper that ducks on a clock is not this. This page is the compressor that listens to audio.',
    'At the trap page typical tempo of 140 BPM, a quarter note is about 429 ms and an eighth is about 214 ms. Use those as release starting points, then move by ear.',
  ],
  history:
    'Sidechain started as a practical fix. A narrator had to stay in front of the music, so the music compressor listened to the voice. Ableton still teaches it that way. Dance records turned the same routing into a pump: the bass, or the whole mix, listens to the kick and gets out of the way on every hit. Radio used the internal version without a second track, filtering the detector so a loud bass note or a loud "s" did the triggering. The routing is ordinary now. Live, Logic, Cubase, Reaper, The Glue, Pro-C, and MCompressor all document an external key. What is still easy to get wrong is remembering that the key is a control signal. You do not hear it unless you press listen.',
  howItWorks:
    'A normal compressor detector listens to the audio it is turning down. A sidechain compressor lets you pick a different input for that detector. The gain change still happens to the track the plugin is inserted on. Ableton walks through two cases. A voiceover track keys a compressor on the music, so the bed ducks while the narrator talks. A kick keys a compressor on the bass, so the low end clears a space for the beater. An EQ on the sidechain, which Ableton, The Glue, and MCompressor all offer, limits which frequencies may pull the detector. Low-pass the key and a mixed drum bus can still isolate something like a kick. High-pass it and a full mix stops triggering on sub-bass. Melda makes the same point with a hi-hat: filter the detector to the hat and the compressor responds to the hat even though you still hear the whole kit. Their de-ess example is the internal version, a detector aimed at roughly 2.5 kHz and up. The listen button solos the key. It is a setup tool. The processed audio is what the audience hears, and the key is not part of it.',
  controls: [
    {
      name: 'External source',
      description: 'Which track feeds the detector. Ableton can tap it pre-FX, post-FX, or post-mixer. Post-FX means the key compressor and EQ are part of what the sidechain hears. Pick the tap on purpose.',
      typicalRange: 'One track, usually the kick or the voice',
      startingValue: 'The isolated kick, post-fader if you want mutes to count',
    },
    {
      name: 'Sidechain gain',
      description: 'How hard the key hits the detector. It does not change the kick volume in the song. If the duck is too deep, turn this down before you rewrite the bass.',
      typicalRange: 'From barely triggering to pinning the meter',
      startingValue: 'Enough that the duck is visible, not slammed',
    },
    {
      name: 'Sidechain filter',
      description: 'EQ on the key only. High-pass to ignore rumble. Low-pass to chase a kick inside a drum loop. Melda documents an audition button for this filtered detector. Use it, then disable it.',
      typicalRange: 'One band, swept until the key is obvious',
      startingValue: 'Flat if the key is already isolated',
    },
    {
      name: 'Attack',
      description: 'How fast the ducked track gets out of the way. For a kick, fast, unless a click appears at the start of the duck. For a voiceover, fast enough that the first word is not covered.',
      typicalRange: '0 to 30 ms',
      startingValue: 'As fast as it stays click-free',
    },
    {
      name: 'Release',
      description: 'How fast the ducked track returns. This is the groove. Too short chatters. Too long and the bass never comes back. Time it against the tempo, then nudge.',
      typicalRange: 'About an eighth note to a quarter note at the song tempo',
      startingValue: 'Around 200 to 400 ms at 140 BPM, then by ear',
    },
  ],
  meters: [
    { name: 'Gain reduction', description: 'Should move when the key plays and rest when the key is silent. If it moves when the kick is muted, you are still listening to the internal detector.' },
    { name: 'Sidechain listen', description: 'A headphone button, not a meter, but it is how you see with your ears. If listen plays the whole drum kit, your low-pass has not found the kick yet.' },
  ],
  variants: [
    {
      name: 'External ducking',
      description: 'Another track is the key. Kick and bass, voice and music, vocal and its own reverb return. This is the routing Ableton spells out.',
    },
    {
      name: 'Filtered internal detector',
      description: 'No second track. The sidechain EQ makes the compressor respond to part of itself. De-essing and "ignore the bass, catch the pick" live here. Melda separates this detector filter from the external input on purpose.',
    },
    {
      name: 'Ghost trigger',
      description: 'A silent MIDI or audio click, not the audible kick, feeds the key. The duck stays locked to the grid even when the kick sample changes. The click must be muted in the mix or it becomes a second kick.',
    },
  ],
  whenToUse: [
    'The kick and the bass are masking each other and EQ alone makes the bass thin.',
    'A voiceover, a podcast, or a hook vocal must stay in front of a music bed.',
    'A reverb or delay return should get out of the way while the dry vocal is singing and bloom in the gaps.',
  ],
  whenNotToUse: [
    'The bass is simply too loud. Turn the bass down. Sidechain is a motion, not a balance fader.',
    'You want a trance-gate rhythm that ignores the actual kick audio. That is a volume shaper or a trance gate, a later effects topic. Do not fight a compressor into being a clock.',
    'The key track is a full mix and you have not filtered it. Everything will duck everything.',
  ],
  startingSettings: [
    {
      source: 'Kick ducks the bass',
      settings: [
        { param: 'Key', value: 'Kick, external' },
        { param: 'Detector filter', value: 'Low-pass if the kick track is not clean, otherwise flat' },
        { param: 'Attack', value: 'Fast, under 10 ms if it does not click' },
        { param: 'Release', value: 'About 150 to 300 ms at 140 BPM, then lock it to the groove' },
        { param: 'Gain reduction', value: '2 to 6 dB on the hit' },
      ],
      note: 'The trap page puts a typical tempo at 140. An eighth note there is about 214 ms. If your kick is half-time, the hole can be longer. Mute the kick. The meter must stop.',
    },
    {
      source: 'Voiceover over music',
      settings: [
        { param: 'Key', value: 'The voice track' },
        { param: 'Attack', value: 'Fast' },
        { param: 'Release', value: '200 to 500 ms, so the bed returns between sentences' },
        { param: 'Gain reduction', value: 'As much as the voice needs to read, often several dB' },
      ],
      note: 'Ableton example: compressor on the music, narration as the external source. Do not also compress the voice so hard that the key itself is tiny. The detector hears the voice you send it.',
    },
    {
      source: 'Vocal ducks its reverb',
      settings: [
        { param: 'Insert', value: 'Compressor on the reverb return, not on the vocal' },
        { param: 'Key', value: 'The dry vocal' },
        { param: 'Attack', value: 'Fast' },
        { param: 'Release', value: 'A tail that comes back between phrases' },
        { param: 'Gain reduction', value: 'Enough that words stay dry and gaps stay wet' },
      ],
      note: 'If the reverb pumps in time with the vocal in a way that sounds like a tremolo, the release is too fast or the duck is too deep.',
    },
  ],
  techniques: [
    {
      name: 'Set the key before you set the groove',
      description: 'A wrong key makes every later knob a waste.',
      steps: [
        'Enable external sidechain and choose the source.',
        'Press listen. You should hear the key, not the bass.',
        'Filter until that listen pass is the part you meant.',
        'Turn listen off. Then set attack, release, and depth.',
      ],
    },
    {
      name: 'Time the release to the grid',
      description: 'The duck is a rhythm part.',
      steps: [
        'Find the tempo. At 140 BPM a quarter note is about 429 ms and an eighth is about 214 ms.',
        'Start the release near the gap you want filled, often an eighth or a bit more.',
        'Nudge until the bass or the pad returns on a subdivision you can nod to, not in a smear.',
      ],
    },
    {
      name: 'Ghost kick, audible kick',
      description: 'The sample the listener hears does not have to be the sample the detector hears.',
      steps: [
        'Make a short click on the grid, routed only to the sidechain.',
        'Mute its output to the mix.',
        'Let the audible kick be whatever sample sounds right. The duck stays consistent when you swap samples.',
      ],
    },
  ],
  unorthodoxTechniques: [
    {
      name: 'Duck the pad with the snare, not the kick',
      description: 'Everything pump-from-kick starts to sound like the same record. The backbeat can be the key.',
      steps: [
        'Key a long pad or a vocal throw from the snare.',
        'Slow the release so the duck is a swell into the next hit, not a flicker.',
        'Keep the depth small. A pad that vanishes on beat 3 is an effect you must actually want.',
      ],
    },
    {
      name: 'Sidechain EQ as a de-esser',
      description: 'Melda describes aiming the detector at the loud "s," around 2.5 kHz and above, so the compressor moves on sibilance and less on the vowel.',
      steps: [
        'No external track. Turn on the detector filter.',
        'High-pass or band-pass into the sibilant range and audition it.',
        'Fast attack, fast release, a few decibels only on the "s."',
        'This is a stopgap. A real de-esser page comes later. If the whole vocal is dulling, the filter is too wide.',
      ],
    },
  ],
  mistakes: [
    'Leaving sidechain listen on and bouncing a track that is only the kick.',
    'Thinking sidechain gain turned the kick up. Ableton is explicit that it does not. The kick fader is still the kick fader.',
    'A release so long the bass is a swell with no pitch, or so short the bass stutters on every transient in the key.',
    'Keying from a drum bus and not filtering, then wondering why the hi-hats are ducking the vocal.',
    'Using external sidechain and forgetting Ableton will not auto-makeup. The bass gets quieter on average and you "fix" it by crushing more.',
  ],
  myths: [
    {
      myth: 'Sidechain compression means the kick is routed into the bass audio.',
      truth: 'The kick is routed into the detector. The bass audio is what comes out of the plugin, quieter when the kick happens. If you can hear the kick coming out of the bass track, listen is on or the routing is wrong.',
    },
    {
      myth: 'Every electronic bass must be sidechained or it is wrong.',
      truth: 'Sidechain is how you make a hole. If the bass and the kick already leave each other room, the hole is a stutter you added. Bypass it on the next beat and see if you miss it.',
    },
  ],
  chainPlacement:
    'Put the sidechain compressor on the track that should move: the bass, the music bed, the reverb return. Do not put it on the kick unless you are doing something stranger on purpose. Filtering the key happens inside the compressor, not as an EQ printed on the kick the listener hears. If the bass also needs ordinary leveling, that can be a second compressor before the sidechain one, so the duck is not also trying to be the leveler. On a mix bus, external sidechain from the kick ducks the entire song, including the vocal. That is a sound. It is rarely the accidental default you wanted.',
  genres: ['genre:trap'],
  pluginRecs: {
    industryStandard: ['fabfilter-pro-c'],
    proAlternatives: ['cytomic-the-glue'],
    budget: ['klanghelm-dc8c'],
    free: ['melda-mcompressor'],
    stock: [
      { daw: 'ableton-live', name: 'Compressor', note: 'External sidechain, sidechain EQ, and listen. Glue Compressor has the same routing in Standard and Suite. Auto makeup switches off on Compressor when the external sidechain is on.' },
      { daw: 'logic-pro', name: 'Compressor', note: 'Apple puts Side Chain next to the main controls. Open it and pick the key track.' },
      { daw: 'cubase', name: 'Compressor', note: 'Steinberg documents external sidechain, plus a hold time they say is useful for ducking.' },
      { daw: 'reaper', name: 'ReaComp', note: 'Cockos lists sidechain inputs and sidechain filters.' },
    ],
    notes: 'Pro-C 3 sidechain EQ goes to six bands, which is the convenient key filter. The Glue adds an external sidechain and a high-pass. DC8C has external sidechain plus high-pass, low-pass, and tilt on the detector. MCompressor is the free one with a documented external input, including the manual example of pumping a mix from a kick, and a separate detector filter.',
  },
  hardware: [
    { name: 'Any compressor with a key input', note: 'A hardware key input is the same routing: the jack listens, the audio output does not contain the key. If the unit has no key input, you do not have this type. You have a normal compressor.' },
  ],
  callouts: [
    {
      variant: 'tip',
      title: 'Mute the key and watch the meter',
      body: 'If gain reduction continues while the kick is muted, the external sidechain is not the thing you are hearing. Fix the routing before you touch the release.',
    },
    {
      variant: 'mistake',
      title: 'Listen is a solo button with consequences',
      body: 'It replaces the plugin output with the key. Turn it off before you bounce. Then play the bounce once without looking at the session.',
    },
  ],
  related: ['effect:compressor', 'effect:bus-compressor', 'effect:multiband-compressor', 'genre:trap', 'guide:mixing-dynamics'],
})

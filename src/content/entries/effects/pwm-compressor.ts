import { defineEffect } from '../../define'

export default defineEffect({
  id: 'pwm-compressor',
  status: 'review',
  skillLevel: 'advanced',
  roles: ['mix-engineer', 'mastering-engineer', 'recording-engineer'],
  lastVerified: '2026-10-26',
  parent: 'compressor',
  typeGroup: 'Circuit',
  typeOrder: 5,
  sources: [
    { title: 'STC-8 manual, version 1.2', author: 'Crane Song', url: 'http://www.cranesong.com/stc-8_manual_ver1.2.pdf' },
    { title: 'STC-8', author: 'Crane Song', url: 'http://www.cranesong.com/stc-8.html' },
    { title: 'TDR Kotelnikov', author: 'Tokyo Dawn Records', url: 'https://www.tokyodawn.net/tdr-kotelnikov/' },
    { title: 'FabFilter Pro-C 3 Help: Style and character', author: 'FabFilter', url: 'https://www.fabfilter.com/help/pro-c/using/styleandcharacter' },
  ],
  name: 'PWM Compressor',
  aliases: ['Pulse-width compressor', 'STC-8-style compressor'],
  category: 'dynamics',
  kind: 'type',
  summary: 'The audio is switched very quickly, and the width of each pulse sets the gain, which is how a few transparent analog compressors avoid a VCA or an optical cell.',
  cheatSheet: [
    'PWM means pulse-width modulation. A fast switch lets signal through for part of each cycle. A wider pulse is more level.',
    'The Crane Song STC-8 manual draws this stage as "PWM and Control Signal Combiner," and says the unit does not use a VCA or an optical cell.',
    'On the STC-8, attack and release knobs are normal: 0 is fast and 10 is slow. That is the opposite of an 1176.',
    'It is a compressor and a peak limiter at once. The peak limiter slope is greater than 10:1 and takes over only when a peak exceeds the average gain reduction.',
    'HARA is the transparent path. KI adds warmth for bass or voice, and it changes the audio path and the sidechain.',
    'Almost no plugin in this registry is a PWM model. The recommendations below are clean compressors for the same job, and the notes say so.',
  ],
  history:
    'PWM gain control showed up where engineers wanted analog compression without the color of a tube, a FET, or an optical cell. Crane Song STC-8 is the unit with a public manual that names the method. The block diagram labels a "PWM and Control Signal Combiner." The product page says the gain cell is not a VCA and not optical, and that the point is consistent gain control that can still be pushed toward vintage color with a switch. The manual also makes clear how rare the behavior felt at the time: attack, release, shape, and program all interact, "not possible with any other gain control device available" in their wording. You will not find this circuit in a stock DAW list next to FET and Opto. When you want the job it was hired for, transparent control with a real peak limiter beside it, a clean digital compressor is the honest substitute.',
  howItWorks:
    'Pulse-width modulation turns the audio into a rapid series of on and off moments. The control signal from the detector changes how long each moment stays on. Average those pulses and you have a level. Wider pulses, louder signal. Narrower pulses, more gain reduction. Because the gain element is a switch rather than a lamp, a FET, or a VCA chip, the Crane Song manual can say the audio path avoids both VCA and optical gain cells and still call the result musical. The STC-8 runs a compressor and a peak limiter on that same gain cell. The compressor starts with a soft knee, and the Shape knob makes the curve more aggressive as you turn it from 0 toward 10. The peak limiter has a slope greater than 10:1. When a peak sticks out past the average gain reduction, the peak circuit takes over, a green LED lights, and then it hands control back. Program Dependent Release, on the left half of the preset switch, is for leveling voice without pulling the noise floor up. The right half is constant release, which the manual points at guitar sustain and drum-room ambience. A-MOD is the party trick: if you set a slow compressor attack and a peak happens, the limiter shortens the compressor attack for that moment, then lets the slow attack return. HARA leaves the path transparent. KI warms bass or voice by changing the audio path and the sidechain together.',
  controls: [
    {
      name: 'Threshold',
      description: 'How much average gain reduction the compressor section applies. The manual says the curve starts as a soft knee and the Shape control makes it firmer.',
      typicalRange: 'From a light leveler to heavy gain reduction',
      startingValue: 'A few dB, Shape near 0',
    },
    {
      name: 'Shape',
      description: '0 is a gentle curve and a lower slope. 10 is aggressive and steeper. Shape also changes attack and release behavior, because the gain relationship changed. It is not a tone knob you can ignore.',
      typicalRange: '0 to 10',
      startingValue: '0 to 3 for transparent work',
    },
    {
      name: 'Attack and release',
      description: 'On the STC-8, 0 is fast and 10 is slow, which is the usual direction and the opposite of an 1176. The manual says the actual times still depend on shape, the amount of gain change, the preset, and the program.',
      typicalRange: '0 fast to 10 slow',
      startingValue: 'A slow attack if you want transients, then let the peak limiter catch the overs',
    },
    {
      name: 'Peak threshold',
      description: 'The fast limiter. Slope greater than 10:1. It only takes over when the peak is larger than the compressor gain reduction. At +20 dBm on the hardware, the manual says output stops rising even if you add gain.',
      typicalRange: 'Above the average program, down to where the LED is always on',
      startingValue: 'High enough that the peak LED only flashes',
    },
    {
      name: 'Mode',
      description: 'HARA is transparent. KI adds warmth for bass or voice and modifies the sidechain as well as the audio. The manual says the KI amount also depends on attack, release, and shape.',
      typicalRange: 'HARA or KI',
      startingValue: 'HARA',
    },
  ],
  meters: [
    { name: 'Gain reduction', description: 'The compressor section doing the averaging. Read this for the leveling.' },
    { name: 'Peak LED', description: 'Crane Song uses a green peak LED for the moments the limiter has taken over. If it is lit constantly, the peak threshold is too low and you are listening to the limiter, not the compressor.' },
  ],
  variants: [
    {
      name: 'Program-dependent release',
      description: 'The left half of the STC-8 preset switch. The manual recommends it for voiceover, lead vocal, and complex program, because a short fixed release lifts noise, room tone, and headphone bleed.',
    },
    {
      name: 'Constant release',
      description: 'The right half of the switch. The manual points this at guitar sustain and percussion ambience, where you want the recovery to keep ringing instead of getting out of the way.',
    },
    {
      name: 'Attack modification',
      description: 'A-MOD. A slow compressor attack stays slow for the average program. A peak that hits the limiter temporarily shortens that attack, including after silence. You get overload protection without living at a fast attack the whole time.',
    },
  ],
  whenToUse: [
    'A vocal, a voiceover, or a mix that needs even level and as little harmonic fingerprint as you can get from an analog box.',
    'A source with occasional peaks taller than the average. Let the compressor level, and let the peak section catch the spikes.',
    'Bass or voice where you do want a little color. That is the KI position, not a reason to switch families.',
  ],
  whenNotToUse: [
    'You want an 1176, an LA-2A, or a console-bus sound. PWM is the circuit you pick when those fingerprints are the problem. Use their pages instead.',
    'You do not have a PWM plugin and you are about to pretend a FET is one. Use the clean digital substitutes in the plugin list and call them that.',
    'The noise floor is the thing that bothers you and you are using a very fast constant release. The manual is explicit that short release brings noise up. Switch on program-dependent release.',
  ],
  startingSettings: [
    {
      source: 'Lead vocal or voiceover',
      settings: [
        { param: 'Mode', value: 'HARA' },
        { param: 'Preset side', value: 'Program-dependent release' },
        { param: 'Shape', value: 'Gentle, near 0' },
        { param: 'Peak LED', value: 'Flashing only on real peaks' },
      ],
      note: 'This is the manual use case for PDR: level the voice without lifting the room. Makeup on the hardware is 0 to 14 dB, and in stereo link the two gain knobs still work separately so you can balance the sides.',
    },
    {
      source: 'Drum room',
      settings: [
        { param: 'Release', value: 'Constant, not program-dependent' },
        { param: 'Attack', value: 'Slower, with A-MOD on if peaks crack' },
        { param: 'Shape', value: 'Low, unless you want the room clamped' },
      ],
      note: 'Constant release is the manual suggestion when you want ambience to sustain. A-MOD keeps a slow attack from missing the first hit after a gap.',
    },
    {
      source: 'Bass, with color',
      settings: [
        { param: 'Mode', value: 'KI' },
        { param: 'Shape', value: 'Start low and raise only if the knee is too soft' },
        { param: 'Release', value: 'Not pinned fast' },
      ],
      note: 'KI changes the sidechain too. If the bass suddenly pumps in a new way, that is the mode, not a broken threshold. Compare to HARA at the same gain reduction.',
    },
  ],
  techniques: [
    {
      name: 'Let the peak section be the safety, not the sound',
      description: 'The STC-8 is built as both. The compressor should still be the one you hear.',
      steps: [
        'Set the compressor threshold and a gentle shape until the vocal or the bus is even.',
        'Set the peak threshold so the LED is dark on normal phrases.',
        'Hit one loud peak. The LED should flash and the output should not jump.',
        'If the LED stays on, raise the peak threshold before you touch the compressor again.',
      ],
    },
    {
      name: 'Use A-MOD instead of a permanently fast attack',
      description: 'You keep the transient on the average program and still survive a shout.',
      steps: [
        'Pick a slower attack, 3 or higher on the STC-8 scale the manual uses for this description.',
        'Enable an A-MOD preset group.',
        'Leave a gap, then a loud note. The attack should shorten for that note and relax after.',
      ],
    },
    {
      name: 'Substitute a clean digital compressor without lying about it',
      description: 'The plugin list on this page is for the job, not for the PWM switch.',
      steps: [
        'Load Kotelnikov or Pro-C Clean or Mastering.',
        'Use a soft knee, a slow-ish attack, and a separate limiter after it for the peaks.',
        'If you need the KI-style warmth, add a little tube or diode character after the level is right. Do not rename that chain a PWM compressor.',
      ],
    },
  ],
  unorthodoxTechniques: [
    {
      name: 'Sidechain EQ that the peak limiter ignores',
      description: 'The STC-8 sidechain insert affects the compressor, the average circuit, and not the peak limiter. You can stop the low end from leveling the vocal without disarming the overload protection.',
      steps: [
        'Insert a gentle high-pass on the compressor sidechain only.',
        'Confirm the peak LED still responds to a real overload.',
        'In stereo, the manual says you need the same EQ on both channels. One side only will unbalance the link.',
      ],
    },
    {
      name: 'Constant release on a guitar, PDR on the vocal',
      description: 'The preset switch exists because one release law does not fit both.',
      steps: [
        'Vocal: program-dependent release, so breaths and room do not swell.',
        'Guitar or room: constant release, so the sustain is the effect.',
        'Do not copy one preset onto the other track and then fight it with EQ.',
      ],
    },
  ],
  mistakes: [
    'Treating an 1176 or a Glue compressor as a PWM unit because both can sound clean if you barely hit them.',
    'Turning attack clockwise on an STC-8-style panel out of 1176 habit. Here, 10 is slow.',
    'Leaving the peak LED on for the whole phrase, then editing the compressor attack and hearing nothing change.',
    'Using a fast constant release on a noisy vocal and blaming the mic. The manual says that release behavior brings the noise up. That is the control to change.',
  ],
  myths: [
    {
      myth: 'PWM is just a marketing name for auto release.',
      truth: 'Program-dependent release is a detector feature, and the STC-8 has it. PWM is the gain cell, the switch in the block diagram. You can have auto release on a VCA, a FET, or a digital compressor and still not have a PWM gain cell.',
    },
    {
      myth: 'If it is transparent, any clean plugin is a PWM emulation.',
      truth: 'Transparency is the goal. The gain cell is the circuit. Kotelnikov calls itself proudly digital and not an emulation of an older device. That honesty is why it is in the free list here.',
    },
  ],
  chainPlacement:
    'A PWM compressor, or the clean digital stand-in, wants to see a signal you already believe in. Put corrective EQ first if a resonance would otherwise run the detector. Put the peak limiter in the same unit, or a separate limiter after, and do not also stack a colored bus compressor unless that color is a separate decision. Hardware wants air: the STC-8 manual asks for 10 to 15 minutes of warm-up and for the vents to stay clear. A plugin does not need either.',
  pluginRecs: {
    industryStandard: ['fabfilter-pro-c'],
    proAlternatives: ['cytomic-the-glue'],
    budget: ['klanghelm-dc8c'],
    free: ['tdr-kotelnikov'],
    stock: [
      { daw: 'logic-pro', name: 'Compressor', note: 'Platinum Digital. Apple calls it clean, with a fast transient response. It is not a PWM model.' },
      { daw: 'ableton-live', name: 'Compressor', note: 'The stock clean compressor. No PWM mode.' },
      { daw: 'reaper', name: 'ReaComp', note: 'Lookahead and oversampling are available. Still a digital compressor, not an STC-8.' },
      { daw: 'cubase', name: 'Compressor', note: 'Use Live mode off if you want lookahead. Again, a substitute for the job.' },
    ],
    notes: 'None of these plugins is a Crane Song STC-8 or another PWM gain cell. Pro-C Clean or Mastering, Kotelnikov, and DC8C Clean mode are the transparent tools to use while PWM-specific software stays rare. The Glue is the pro alternative only when you decide you wanted console glue after all. Do not buy it expecting a pulse-width switch.',
  },
  hardware: [
    { name: 'STC-8', maker: 'Crane Song', note: 'Compressor plus peak limiter. The manual block diagram names a PWM control stage, and the text rules out a VCA or optical gain cell. HARA is clean. KI is the colored path. Gain is 0 to 14 dB.' },
  ],
  callouts: [
    {
      variant: 'tip',
      title: 'Read 0 as fast',
      body: 'On the STC-8, 0 is fast and 10 is slow. If you arrived from an 1176 preset, your hands will do this backwards exactly once. Look at the panel before you turn anything.',
    },
    {
      variant: 'free',
      title: 'The free version of this job',
      body: '[[plugin:tdr-kotelnikov|TDR Kotelnikov]] is the transparent free compressor. Tokyo Dawn is explicit that it is not an emulation. That is the right free tool when you wanted PWM for the cleanliness and you do not own the hardware.',
    },
  ],
  related: ['effect:compressor', 'effect:digital-compressor', 'effect:vca-compressor', 'effect:fet-compressor'],
})

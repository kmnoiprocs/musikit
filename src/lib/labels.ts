import type { DAWS, PLUGIN_CATEGORIES } from '../content/schema'
import type { Genre, Instrument, Plugin } from '../content/schema'

export const DAW_LABELS: Record<(typeof DAWS)[number], string> = {
  'ableton-live': 'Ableton Live',
  'fl-studio': 'FL Studio',
  'logic-pro': 'Logic Pro',
  'pro-tools': 'Pro Tools',
  cubase: 'Cubase',
  'studio-one': 'Studio One',
  reaper: 'Reaper',
  'bitwig-studio': 'Bitwig Studio',
  reason: 'Reason',
  'cakewalk-sonar': 'Cakewalk / Sonar',
  garageband: 'GarageBand',
  bandlab: 'BandLab',
}

export const PLUGIN_CATEGORY_LABELS: Record<(typeof PLUGIN_CATEGORIES)[number], string> = {
  synth: 'Synth',
  sampler: 'Sampler',
  rompler: 'ROMpler',
  keys: 'Keys',
  orchestral: 'Orchestral',
  drums: 'Drums',
  'virtual-guitar-bass': 'Guitar & Bass',
  'world-instruments': 'World Instruments',
  'amp-sim': 'Amp Sim',
  'vocal-tuning': 'Vocal Tuning',
  'vocal-fx': 'Vocal FX',
  eq: 'EQ',
  dynamics: 'Dynamics',
  saturation: 'Saturation',
  modulation: 'Modulation',
  delay: 'Delay',
  reverb: 'Reverb',
  'pitch-time': 'Pitch & Time',
  'stereo-imaging': 'Stereo Imaging',
  'mastering-suite': 'Mastering Suite',
  restoration: 'Restoration',
  metering: 'Metering',
  reference: 'Reference',
  'creative-fx': 'Creative FX',
  'channel-strip': 'Channel Strip',
  'console-bus': 'Console & Bus',
  'midi-tools': 'MIDI Tools',
  utility: 'Utility',
  'multi-fx': 'Multi-FX',
}

export const OS_LABELS: Record<Plugin['os'][number], string> = {
  windows: 'Windows',
  macos: 'macOS',
  linux: 'Linux',
  ios: 'iOS',
}

export const LICENSING_LABELS: Record<Plugin['licensing'], string> = {
  perpetual: 'Perpetual license',
  subscription: 'Subscription',
  'rent-to-own': 'Rent-to-own',
  free: 'Free',
  freemium: 'Freemium',
  donationware: 'Donationware',
}

export const FEEL_LABELS: Record<Genre['tempo']['feel'], string> = {
  straight: 'Straight',
  swing: 'Swing',
  shuffle: 'Shuffle',
  'half-time': 'Half-time',
  'double-time': 'Double-time',
  variable: 'Variable',
}

export const HS_CLASS_LABELS: Record<Instrument['hornbostelSachs']['class'], string> = {
  idiophone: 'Idiophone',
  membranophone: 'Membranophone',
  chordophone: 'Chordophone',
  aerophone: 'Aerophone',
  electrophone: 'Electrophone',
}

export const POLYPHONY_LABELS: Record<Instrument['polyphony']['type'], string> = {
  monophonic: 'Monophonic',
  limited: 'Limited polyphony',
  polyphonic: 'Polyphonic',
}

/** "notes, octaves" becomes "Notes, octaves". */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/** Drops a trailing parenthetical: "Rap (Writing, Flow)" becomes "Rap". */
export function shortTitle(title: string): string {
  return title.replace(/\s*\([^)]*\)\s*$/, '').trim()
}

export function formatSeconds(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.round(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

export function formatHz(hz: number): string {
  if (hz >= 1000) {
    const k = hz / 1000
    return `${Number.isInteger(k) ? k : k.toFixed(k < 10 ? 1 : 0)} kHz`
  }
  return `${Math.round(hz)} Hz`
}

export function plural(n: number, one: string, many = `${one}s`): string {
  return `${n} ${n === 1 ? one : many}`
}

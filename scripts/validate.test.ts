import assert from 'node:assert/strict'
import { before, describe, it } from 'node:test'
import { noteToMidi, validateContent, type RawCollections } from '../src/content/validate'
import { loadContent } from './lib/load'

let base: RawCollections

/** Deep-clone the real content, apply one mutation to the first item of a collection, and validate. */
function errorsAfter(collection: keyof RawCollections, mutate: (data: any) => void): string[] {
  const raw = structuredClone(base)
  mutate(raw[collection][0].data)
  return validateContent(raw).errors.map((e) => e.message)
}

const expectError = (errors: string[], fragment: string) =>
  assert.ok(
    errors.some((m) => m.includes(fragment)),
    `expected an error containing "${fragment}", got:\n${errors.join('\n')}`,
  )

describe('content validation', () => {
  before(async () => {
    base = await loadContent()
  })

  it('accepts the current content', () => {
    assert.deepEqual(validateContent(base).errors, [])
  })

  it('rejects a missing required field', () => {
    expectError(errorsAfter('effects', (e) => delete e.chainPlacement), 'chainPlacement')
  })

  it('rejects references to entries that do not exist', () => {
    expectError(errorsAfter('effects', (e) => e.related.push('genre:does-not-exist')), 'does not match any genres entry')
  })

  it('rejects broken inline references inside text', () => {
    expectError(errorsAfter('effects', (e) => (e.summary += ' See [[instrument:kazoo]].')), 'instrument:kazoo')
  })

  it('rejects unknown plugin IDs and mis-tiered plugins', () => {
    expectError(errorsAfter('effects', (e) => e.pluginRecs.free.push('nope')), 'not in the plugin registry')
    expectError(errorsAfter('effects', (e) => e.pluginRecs.free.push('fabfilter-pro-c')), 'not free')
  })

  it('rejects drum lanes with the wrong number of steps', () => {
    expectError(errorsAfter('genres', (g) => (g.drums.grid.lanes[0].pattern = 'X...')), 'expected 16')
  })

  it('rejects tempo ranges that do not contain the typical tempo', () => {
    expectError(errorsAfter('genres', (g) => (g.tempo.typical = 200)), 'min <= typical <= max')
  })

  it('rejects instrument ranges whose MIDI numbers do not match the note names', () => {
    expectError(errorsAfter('instruments', (i) => (i.range.midiLow = 61)), 'does not match C4')
  })

  it('rejects guide pages for sections missing from the outline', () => {
    expectError(errorsAfter('guide', (g) => (g.section = '99.9')), 'not in docs/MASTER_OUTLINE.md')
  })

  it('rejects tables whose rows do not match their columns', () => {
    expectError(errorsAfter('guide', (g) => g.blocks[2].blocks[0].rows.push(['only one cell'])), 'table row')
  })

  it('rejects placeholder text and thin content once an entry is published', () => {
    const errors = errorsAfter('effects', (e) => {
      e.status = 'published'
      e.summary = 'TODO write this'
      e.unorthodoxTechniques = []
    })
    expectError(errors, 'placeholder text')
    expectError(errors, 'unorthodoxTechniques has 0 item(s)')
  })

  it('rejects a broken effect parent', () => {
    expectError(errorsAfter('effects', (e) => (e.parent = 'not-a-real-effect')), 'does not exist')
    const raw = structuredClone(base)
    const group = raw.effects.find((item) => (item.data as { id?: string }).id === 'compressor')
    assert.ok(group)
    ;(group.data as { parent?: string }).parent = 'vca-compressor'
    expectError(
      validateContent(raw).errors.map((e) => e.message),
      'cannot have a parent',
    )
  })

  it('converts note names to MIDI numbers', () => {
    assert.equal(noteToMidi('C4'), 60)
    assert.equal(noteToMidi('A4'), 69)
    assert.equal(noteToMidi('C#-1'), 1)
    assert.equal(noteToMidi('Bb2'), 46)
  })
})

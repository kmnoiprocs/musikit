import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { parseOutline, readOutline } from './lib/outline'

const SAMPLE = `
# Title

### Part 1: Foundations (Studio)
- **1.1 Studio builds:** $0, around $300.
- **1.2 Computers:**
  - CPU and RAM.
  - **Drivers:** ASIO, Core Audio.
    - Limiters: peak, brickwall.
    - **Clippers:** soft, hard.
- **1.3 Stem mastering.**

### Part 27: Quick Reference Hub
- **Frequency and EQ:** colored frequency chart.
- **Hip-hop:**
  - **Golden-age pioneers:** Marley Marl.

## Staged Build Roadmap
- **Stage 1 (now): Rules and memory.**
  - Write docs.
`

describe('outline parser', () => {
  const [foundations, reference] = parseOutline(SAMPLE)

  it('reads parts, sections, and section summaries', () => {
    assert.equal(foundations.part, 1)
    assert.deepEqual(
      foundations.sections.map((s) => [s.number, s.title, s.summary]),
      [
        ['1.1', 'Studio builds', '$0, around $300.'],
        ['1.2', 'Computers', undefined],
        ['1.3', 'Stem mastering', undefined],
      ],
    )
  })

  it('nests labeled and unlabeled topics with their items', () => {
    assert.deepEqual(foundations.sections[1].topics, [
      { text: 'CPU and RAM.', items: [] },
      { label: 'Drivers', text: 'ASIO, Core Audio.', items: ['Limiters: peak, brickwall.', 'Clippers: soft, hard.'] },
    ])
  })

  it('keeps unnumbered bullets as part-level topics', () => {
    assert.equal(reference.sections.length, 0)
    assert.deepEqual(reference.topics, [
      { label: 'Frequency and EQ', text: 'colored frequency chart.', items: [] },
      { label: 'Hip-hop', items: ['Golden-age pioneers: Marley Marl.'] },
    ])
  })

  it('stops at the next level-2 heading', () => {
    assert.equal(parseOutline(SAMPLE).length, 2)
    assert.equal(reference.topics.some((t) => t.label?.startsWith('Stage')), false)
  })

  it('parses the real outline with topics for every Part', () => {
    const parts = readOutline()
    assert.equal(parts.length, 29)
    for (const p of parts) assert.ok(p.sections.length > 0 || p.topics.length > 0, `Part ${p.part} has no content`)
  })
})

import { writeFileSync } from 'node:fs'
import { OUTLINE_GENERATED, readOutline, renderGenerated } from './lib/outline'

const parts = readOutline()
writeFileSync(OUTLINE_GENERATED, renderGenerated(parts))

const sectionCount = parts.reduce((n, p) => n + p.sections.length, 0)
console.log(`Synced outline: ${parts.length} parts, ${sectionCount} sections -> ${OUTLINE_GENERATED}`)

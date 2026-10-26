import { readFileSync } from 'node:fs'
import { validateContent } from '../src/content/validate'
import { loadContent } from './lib/load'
import { OUTLINE_GENERATED, readOutline, renderGenerated } from './lib/outline'

const normalize = (s: string) => s.replace(/\r\n/g, '\n')
const outlineInSync = normalize(readFileSync(OUTLINE_GENERATED, 'utf8')) === normalize(renderGenerated(readOutline()))

const result = validateContent(await loadContent())

if (!outlineInSync) {
  result.errors.unshift({
    level: 'error',
    file: 'docs/MASTER_OUTLINE.md',
    message: 'outline.generated.ts is out of date; run `npm run sync:outline`',
  })
}

console.log('\nMusiKit content validation\n')
console.log(`  ${'plugins'.padEnd(12)} ${String(result.library.plugins.length).padStart(4)}  in registry`)
for (const [collection, counts] of Object.entries(result.statusCounts)) {
  const total = Object.values(counts).reduce((a, b) => a + b, 0)
  const breakdown = Object.entries(counts)
    .filter(([, n]) => n > 0)
    .map(([status, n]) => `${n} ${status}`)
    .join(', ')
  console.log(`  ${collection.padEnd(12)} ${String(total).padStart(4)}  ${breakdown}`)
}
console.log('')
for (const c of result.coverage) console.log(`  ${c.label.padEnd(34)} ${c.covered}/${c.total}`)
console.log('')

for (const w of result.warnings) console.log(`  warning  ${w.file}: ${w.message}`)
for (const e of result.errors) console.log(`  ERROR    ${e.file}: ${e.message}`)

console.log(`\n${result.errors.length} error(s), ${result.warnings.length} warning(s)\n`)
process.exit(result.errors.length > 0 ? 1 : 0)

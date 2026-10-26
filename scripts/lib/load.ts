import { existsSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import type { RawCollections, RawItem } from '../../src/content/validate'

const CONTENT_DIR = resolve(import.meta.dirname, '../../src/content')

/** Load every .ts module in a content folder. Array exports are expanded into one item per element. */
async function loadDir(relativeDir: string, expectArray: boolean): Promise<RawItem[]> {
  const dir = join(CONTENT_DIR, relativeDir)
  if (!existsSync(dir)) return []
  const items: RawItem[] = []
  for (const name of readdirSync(dir).filter((f) => f.endsWith('.ts')).sort()) {
    const file = `${relativeDir}/${name}`
    const mod = (await import(pathToFileURL(join(dir, name)).href)) as { default?: unknown }
    if (mod.default === undefined) {
      items.push({ file, data: undefined })
    } else if (expectArray) {
      if (!Array.isArray(mod.default)) items.push({ file, data: mod.default })
      else mod.default.forEach((data, i) => items.push({ file: `${file}[${i}]`, data }))
    } else {
      items.push({ file, data: mod.default })
    }
  }
  return items
}

export async function loadContent(): Promise<RawCollections> {
  return {
    plugins: await loadDir('plugins', true),
    effects: await loadDir('entries/effects', false),
    instruments: await loadDir('entries/instruments', false),
    genres: await loadDir('entries/genres', false),
    guide: await loadDir('entries/guide', false),
    glossary: await loadDir('entries/glossary', true),
  }
}

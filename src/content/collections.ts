import { validateContent, type RawItem } from './validate'

function toItems(modules: Record<string, unknown>, expectArray: boolean): RawItem[] {
  return Object.entries(modules)
    .sort(([a], [b]) => a.localeCompare(b))
    .flatMap(([path, data]) => {
      const file = path.replace(/^\.\//, '')
      return expectArray && Array.isArray(data) ? data.map((d, i) => ({ file: `${file}[${i}]`, data: d })) : [{ file, data }]
    })
}

/** Every content module, bundled by Vite. Mirrors scripts/lib/load.ts, which loads the same folders in Node. */
export const contentResult = validateContent({
  plugins: toItems(import.meta.glob('./plugins/*.ts', { eager: true, import: 'default' }), true),
  effects: toItems(import.meta.glob('./entries/effects/*.ts', { eager: true, import: 'default' }), false),
  instruments: toItems(import.meta.glob('./entries/instruments/*.ts', { eager: true, import: 'default' }), false),
  genres: toItems(import.meta.glob('./entries/genres/*.ts', { eager: true, import: 'default' }), false),
  guide: toItems(import.meta.glob('./entries/guide/*.ts', { eager: true, import: 'default' }), false),
  glossary: toItems(import.meta.glob('./entries/glossary/*.ts', { eager: true, import: 'default' }), true),
})

export const library = contentResult.library

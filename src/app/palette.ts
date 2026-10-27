import { useSyncExternalStore } from 'react'

let open = false
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((l) => l())

export const setPaletteOpen = (next: boolean) => {
  open = next
  emit()
}
export const openPalette = () => setPaletteOpen(true)

export function usePaletteOpen(): boolean {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => open,
  )
}

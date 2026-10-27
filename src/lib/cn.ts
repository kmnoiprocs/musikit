import { clsx, type ClassValue } from 'clsx'
import type { CSSProperties } from 'react'
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['h1', 'h2', 'h3', 'h4', 'display'] }],
    },
  },
})

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/** Inline style that sets the --accent variable for a subtree. */
export function accent(color: string): CSSProperties {
  return { '--accent': color } as CSSProperties
}

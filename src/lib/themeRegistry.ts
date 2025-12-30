import { defaultThemeId } from '../config/themes'

let themeCallback: ((id: string) => void) | null = null
let currentThemeId: string = defaultThemeId

export function registerThemeCallback(
  callback: (id: string) => void,
  initialId: string
): void {
  themeCallback = callback
  currentThemeId = initialId
}

export function unregisterThemeCallback(): void {
  themeCallback = null
}

export function setTheme(id: string): void {
  themeCallback?.(id)
  currentThemeId = id
}

export function getCurrentThemeId(): string {
  return currentThemeId
}

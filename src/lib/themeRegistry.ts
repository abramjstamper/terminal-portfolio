// Registry to allow command handlers to access theme functionality
// This bridges the gap between React context and non-React command handlers

type SetThemeFn = (id: string) => void;

let setThemeCallback: SetThemeFn | null = null;
let currentThemeId: string = 'green';

export function registerThemeCallback(callback: SetThemeFn, themeId: string) {
  setThemeCallback = callback;
  currentThemeId = themeId;
}

export function unregisterThemeCallback() {
  setThemeCallback = null;
}

export function setTheme(id: string): boolean {
  if (setThemeCallback) {
    setThemeCallback(id);
    currentThemeId = id;
    return true;
  }
  return false;
}

export function getCurrentThemeId(): string {
  return currentThemeId;
}

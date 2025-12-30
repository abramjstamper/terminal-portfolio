export interface ThemeColors {
  bg: string
  text: string
  prompt: string
  accent: string
  error: string
  success: string
  link: string
  muted: string
}

export interface ThemeEffects {
  scanlines: boolean
  glow: boolean
}

export interface Theme {
  id: string
  name: string
  description: string
  colors: ThemeColors
  effects: ThemeEffects
}

export const themes: Record<string, Theme> = {
  green: {
    id: 'green',
    name: 'Classic CRT',
    description: 'Classic green phosphor terminal',
    colors: {
      bg: '#0a0a0a',
      text: '#00ff00',
      prompt: '#ffb000',
      accent: '#00ffff',
      error: '#ff4444',
      success: '#44ff88',
      link: '#00aaff',
      muted: '#669966',
    },
    effects: { scanlines: true, glow: true },
  },
  amber: {
    id: 'amber',
    name: 'Amber',
    description: 'Warm amber phosphor display',
    colors: {
      bg: '#0a0a0a',
      text: '#ffb000',
      prompt: '#ff6600',
      accent: '#ffdd44',
      error: '#ff4444',
      success: '#88cc44',
      link: '#ffcc66',
      muted: '#997744',
    },
    effects: { scanlines: true, glow: true },
  },
  blue: {
    id: 'blue',
    name: 'Blue',
    description: 'Cool blue terminal display',
    colors: {
      bg: '#0a0a14',
      text: '#00aaff',
      prompt: '#00ffff',
      accent: '#88ddff',
      error: '#ff4466',
      success: '#00ff88',
      link: '#66ccff',
      muted: '#4477aa',
    },
    effects: { scanlines: true, glow: true },
  },
  matrix: {
    id: 'matrix',
    name: 'Matrix',
    description: 'The Matrix digital rain style',
    colors: {
      bg: '#000000',
      text: '#00ff41',
      prompt: '#88ff88',
      accent: '#00ff41',
      error: '#ff0000',
      success: '#33ff77',
      link: '#66ffaa',
      muted: '#338833',
    },
    effects: { scanlines: false, glow: true },
  },
  'high-contrast': {
    id: 'high-contrast',
    name: 'High Contrast',
    description: 'Maximum contrast for accessibility',
    colors: {
      bg: '#000000',
      text: '#ffffff',
      prompt: '#ffff00',
      accent: '#00ffff',
      error: '#ff0000',
      success: '#00ff00',
      link: '#00ffff',
      muted: '#888888',
    },
    effects: { scanlines: false, glow: false },
  },
  light: {
    id: 'light',
    name: 'Light',
    description: 'Light theme for daytime use',
    colors: {
      bg: '#f5f5f5',
      text: '#1a1a1a',
      prompt: '#0066cc',
      accent: '#cc6600',
      error: '#cc0000',
      success: '#008800',
      link: '#0066cc',
      muted: '#666666',
    },
    effects: { scanlines: false, glow: false },
  },
  rainbow: {
    id: 'rainbow',
    name: 'Rainbow',
    description: 'Colorful and vibrant',
    colors: {
      bg: '#0f0f1a',
      text: '#ffffff',
      prompt: '#ff0000',
      accent: '#ff8800',
      error: '#ff0055',
      success: '#00ff00',
      link: '#00aaff',
      muted: '#aa00ff',
    },
    effects: { scanlines: false, glow: true },
  },
}

export const themeIds = Object.keys(themes) as Array<keyof typeof themes>
export const defaultThemeId = 'green'

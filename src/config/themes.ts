export interface Theme {
  id: string;
  name: string;
  description: string;
  colors: {
    bg: string;
    text: string;
    prompt: string;
    accent: string;
    error: string;
    success: string;
    link: string;
    muted: string;
  };
  effects: {
    scanlines: boolean;
    glow: boolean;
  };
}

export const themes: Record<string, Theme> = {
  green: {
    id: 'green',
    name: 'Green (Classic CRT)',
    description: 'Classic green phosphor terminal',
    colors: {
      bg: '#0a0a0a',
      text: '#00ff00',
      prompt: '#ffb000',
      accent: '#00ffff',
      error: '#ff0000',
      success: '#00ff00',
      link: '#00aaff',
      muted: '#4a4a4a',
    },
    effects: {
      scanlines: true,
      glow: true,
    },
  },
  amber: {
    id: 'amber',
    name: 'Amber',
    description: 'Warm amber monochrome',
    colors: {
      bg: '#0a0a0a',
      text: '#ffb000',
      prompt: '#ff8c00',
      accent: '#ffd700',
      error: '#ff4444',
      success: '#ffb000',
      link: '#ffc966',
      muted: '#5a4a2a',
    },
    effects: {
      scanlines: true,
      glow: true,
    },
  },
  blue: {
    id: 'blue',
    name: 'Blue',
    description: 'Cool blue hacker aesthetic',
    colors: {
      bg: '#0a0a14',
      text: '#00aaff',
      prompt: '#00ffff',
      accent: '#88ddff',
      error: '#ff4466',
      success: '#00ff88',
      link: '#66ccff',
      muted: '#3a4a5a',
    },
    effects: {
      scanlines: true,
      glow: true,
    },
  },
  matrix: {
    id: 'matrix',
    name: 'Matrix',
    description: 'The Matrix rain aesthetic',
    colors: {
      bg: '#000000',
      text: '#00ff41',
      prompt: '#008f11',
      accent: '#00ff41',
      error: '#ff0000',
      success: '#00ff41',
      link: '#39ff14',
      muted: '#003b00',
    },
    effects: {
      scanlines: false,
      glow: true,
    },
  },
  'high-contrast': {
    id: 'high-contrast',
    name: 'High Contrast',
    description: 'JetBrains-inspired vivid colors',
    colors: {
      bg: '#0d0d0d',
      text: '#e4e4e4',
      prompt: '#ff9e4a',      // bright orange (keywords)
      accent: '#ffc66d',      // golden yellow
      error: '#ff5555',       // bright red
      success: '#a5c261',     // bright green (strings)
      link: '#68abdf',        // bright blue
      muted: '#808080',       // gray (comments)
    },
    effects: {
      scanlines: false,
      glow: false,
    },
  },
  light: {
    id: 'light',
    name: 'Light',
    description: 'Light mode for bright environments',
    colors: {
      bg: '#f5f5f5',
      text: '#1a1a1a',
      prompt: '#0066cc',
      accent: '#cc6600',
      error: '#cc0000',
      success: '#008800',
      link: '#0066cc',
      muted: '#888888',
    },
    effects: {
      scanlines: false,
      glow: false,
    },
  },
  pride: {
    id: 'pride',
    name: 'Pride',
    description: 'Rainbow pride colors',
    colors: {
      bg: '#1a1a2e',
      text: '#ffffff',
      prompt: '#ff6b6b',      // red
      accent: '#ffd93d',      // yellow
      error: '#ff6b6b',       // red
      success: '#6bcb77',     // green
      link: '#4d96ff',        // blue
      muted: '#9d4edd',       // purple
    },
    effects: {
      scanlines: false,
      glow: true,
    },
  },
};

export const DEFAULT_THEME = 'green';

export function getTheme(id: string): Theme {
  return themes[id] || themes[DEFAULT_THEME];
}

export function getThemeIds(): string[] {
  return Object.keys(themes);
}

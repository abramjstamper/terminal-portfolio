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
      prompt: '#ffb000',       // amber - distinct from green
      accent: '#00ffff',       // cyan
      error: '#ff4444',        // red
      success: '#44ff88',      // lighter green - distinct from text
      link: '#00aaff',         // blue
      muted: '#669966',        // muted green - visible but subtle
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
      prompt: '#ff6600',       // orange - distinct from amber
      accent: '#ffdd44',       // yellow
      error: '#ff4444',        // red
      success: '#88cc44',      // green - contrasts with amber
      link: '#ffcc66',         // light amber
      muted: '#997744',        // muted amber
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
      prompt: '#00ffff',       // cyan
      accent: '#88ddff',       // light blue
      error: '#ff4466',        // red
      success: '#00ff88',      // green
      link: '#66ccff',         // lighter blue
      muted: '#4477aa',        // muted blue
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
      prompt: '#88ff88',       // lighter green
      accent: '#00ff41',
      error: '#ff0000',
      success: '#33ff77',      // slightly different green
      link: '#66ffaa',         // cyan-green
      muted: '#338833',        // dark green
    },
    effects: {
      scanlines: false,
      glow: true,
    },
  },
  'high-contrast': {
    id: 'high-contrast',
    name: 'High Contrast',
    description: 'Windows-style high contrast',
    colors: {
      bg: '#000000',           // pure black
      text: '#ffffff',         // pure white
      prompt: '#ffff00',       // yellow (like Windows HC)
      accent: '#00ffff',       // cyan
      error: '#ff0000',        // pure red
      success: '#00ff00',      // pure green
      link: '#00ffff',         // cyan (Windows HC links)
      muted: '#888888',        // gray
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
      prompt: '#0066cc',       // blue
      accent: '#cc6600',       // orange
      error: '#cc0000',        // red
      success: '#008800',      // green
      link: '#0066cc',         // blue
      muted: '#666666',        // gray
    },
    effects: {
      scanlines: false,
      glow: false,
    },
  },
  rainbow: {
    id: 'rainbow',
    name: 'Rainbow',
    description: 'Colorful rainbow theme',
    colors: {
      bg: '#1a1a2e',
      text: '#ffffff',         // white text
      prompt: '#ff6b6b',       // red
      accent: '#feca57',       // yellow/orange
      error: '#ff6b6b',        // red
      success: '#1dd1a1',      // green/teal
      link: '#54a0ff',         // blue
      muted: '#a55eea',        // purple
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

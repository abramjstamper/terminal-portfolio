/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        terminal: {
          bg: 'var(--color-bg)',
          text: 'var(--color-text)',
          prompt: 'var(--color-prompt)',
          accent: 'var(--color-accent)',
          error: 'var(--color-error)',
          success: 'var(--color-success)',
          link: 'var(--color-link)',
          muted: 'var(--color-muted)',
          // Keep static colors for fallbacks
          green: '#00ff00',
          amber: '#ffb000',
          blue: '#00aaff',
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        scanline: 'scanline 8s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
    },
  },
  plugins: [],
}


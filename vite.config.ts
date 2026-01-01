import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GITHUB_SHA is set automatically by GitHub Actions on push events
// It contains the full 40-char SHA, slice to 7 for short hash
const gitCommit = process.env.GITHUB_SHA?.slice(0, 7) || 'dev'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    __GIT_COMMIT__: JSON.stringify(gitCommit),
    __SHOW_PROJECTS__: JSON.stringify(process.env.VITE_SHOW_PROJECTS === 'true'),
  },
})

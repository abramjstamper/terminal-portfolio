# CLAUDE.md

This file provides context for Claude Code when working on this project.

## Project Overview

A React/TypeScript portfolio website with a retro terminal interface. Features dual modes: an interactive CLI terminal (default on desktop) and a traditional navigation site (default on mobile).

**Live:** https://abramstamper.dev

## Tech Stack

- **Framework:** React 19 + TypeScript 5.7
- **Build:** Vite 6
- **Styling:** Tailwind CSS 4 with CSS custom properties for theming
- **Testing:** Vitest + React Testing Library (262 tests)
- **Deployment:** GitHub Actions → GitHub Pages

## Commands

```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run lint       # Run ESLint
npm run test       # Run tests in watch mode
npm run test:run   # Run tests once
npm run preview    # Preview production build
```

## Project Structure

```
src/
├── components/
│   ├── terminal/          # Terminal mode components
│   │   ├── Terminal.tsx   # Main container, handles command execution
│   │   ├── TerminalInput.tsx  # Input with cursor, keyboard handling
│   │   └── TerminalOutput.tsx # Renders output lines
│   └── nav/               # Navigation mode components
│       ├── NavSite.tsx    # Main nav layout
│       ├── Header.tsx     # Sticky nav + dark mode toggle
│       ├── Hero.tsx       # Name, title, CTAs
│       ├── About.tsx      # Bio section
│       ├── Experience.tsx # Timeline with company logos
│       ├── Skills.tsx     # Skills grid with icons
│       ├── Projects.tsx   # Project cards
│       ├── Certifications.tsx # Certs and patent
│       ├── Contact.tsx    # Contact links
│       └── Footer.tsx     # Footer with terminal switch
├── config/
│   ├── data/site-data.ts  # All site content (experience, skills, etc.)
│   ├── content.ts         # TypeScript types for content
│   └── themes.ts          # Terminal color themes (7 themes)
├── contexts/
│   ├── ThemeContext.tsx   # Terminal theme (green, amber, matrix, etc.)
│   ├── ModeContext.tsx    # Terminal vs nav mode
│   └── NavThemeContext.tsx # Light/dark mode for nav
├── hooks/
│   └── useTerminal.ts     # Terminal state, history, command execution
├── lib/
│   ├── commands/
│   │   ├── handlers.tsx   # Command implementations
│   │   ├── parser.ts      # Command parsing with && support
│   │   └── autocomplete.ts # Tab completion
│   └── themeRegistry.ts   # Bridge between React and command handlers
└── test/
    ├── setup.ts           # Test setup (matchMedia mock)
    └── utils.tsx          # Render helpers with providers
```

## Key Architecture Decisions

### Dual Mode System
- `ModeContext` manages terminal vs nav mode
- Auto-detects mobile (< 768px) → defaults to nav mode
- User preference persisted to localStorage

### Terminal Themes
- 7 themes: green, amber, blue, matrix, high-contrast, light, rainbow
- CSS custom properties (`--color-text`, `--color-bg`, etc.)
- `ThemeContext` applies colors to document root
- `themeRegistry.ts` allows command handlers to change themes

### Command System
- Commands defined in `handlers.tsx` with name, description, usage, handler
- Parser supports `&&` chaining, detects unsupported `|` and `&`
- Tab completion for commands, sections, and theme names
- History navigation with up/down arrows

## Adding a New Command

1. Add to `commands` object in `src/lib/commands/handlers.tsx`:
```tsx
newcmd: {
  name: 'newcmd',
  description: 'Description here',
  usage: 'newcmd [options]',
  options: ['-h, --help  Show help'],
  handler: (args, history) => {
    if (hasHelpFlag(args)) return commands.newcmd.help()
    return { output: <div>Output here</div> }
  },
},
```

2. Add to autocomplete if needed in `src/lib/commands/autocomplete.ts`
3. Write tests in `src/lib/commands/handlers.test.tsx`

## Content Updates

All site content is in `src/config/data/site-data.ts`:
- `experience[]` - Work history
- `skills[]` - Skill categories
- `certifications[]` - Certs and patents
- `projects[]` - Project cards
- `contact` - Email, GitHub, LinkedIn, etc.
- `heroTypingPhrases[]` - Animated typing text

## Testing

- **262 tests** across 20 files
- Run with `npm run test:run`
- Tests use `src/test/utils.tsx` which wraps components in all providers
- `vitest.config.ts` defines `__BUILD_TIME__`, `__GIT_COMMIT__`, `__SHOW_PROJECTS__`

## Build-Time Constants

Defined in `vite.config.ts`:
- `__BUILD_TIME__` - ISO timestamp
- `__GIT_COMMIT__` - Short SHA from `GITHUB_SHA` env var (or 'dev' locally)
- `__SHOW_PROJECTS__` - Feature flag for projects section

## CI/CD

- **CI:** `.github/workflows/ci.yml` - Lint, test, build on push/PR
- **Deploy:** `.github/workflows/deploy.yml` - Deploy to GitHub Pages on push to main
- Custom domain configured via `public/CNAME`

## SEO

- Meta tags, Open Graph, Twitter Cards in `index.html`
- JSON-LD structured data (Person schema)
- `public/sitemap.xml` and `public/robots.txt`
- OG image at `public/og-image.png`

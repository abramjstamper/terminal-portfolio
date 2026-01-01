# Terminal Portfolio

A React/TypeScript portfolio website with a retro terminal interface and dual terminal/navigation modes.

**Live:** [abramstamper.dev](https://abramstamper.dev)

## Features

- **Dual Interface**: Terminal mode (interactive CLI) and Navigation mode (traditional website)
- **Terminal Commands**: `help`, `cat`, `ls`, `theme`, `whoami`, `neofetch`, and more
- **Multiple Themes**: 7 color themes including classic CRT green, amber, matrix, and high-contrast
- **Dark/Light Mode**: System preference detection with manual toggle in nav mode
- **Responsive**: Auto-switches to nav mode on mobile devices
- **Easter Eggs**: `cowsay`, `sl`, `matrix`, `fortune`, and other fun commands

## Tech Stack

- **Framework**: React 19 + TypeScript 5.7
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4
- **Testing**: Vitest + React Testing Library (215 tests)
- **Deployment**: GitHub Actions → GitHub Pages

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests
npm run test:run

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── terminal/     # Terminal mode components
│   └── nav/          # Navigation mode components
├── config/
│   ├── data/         # Site content (experience, skills, etc.)
│   └── themes.ts     # Terminal color themes
├── contexts/         # React contexts (Theme, Mode, NavTheme)
├── hooks/            # Custom hooks (useTerminal)
└── lib/
    └── commands/     # Command parser, handlers, autocomplete
```

## Terminal Commands

| Command | Description |
|---------|-------------|
| `help` | Show available commands |
| `cat <section>` | Display section content (about, experience, skills, etc.) |
| `ls` | List available sections |
| `theme <name>` | Change terminal theme |
| `theme -l` | List available themes |
| `whoami` | Display current user |
| `neofetch` | System info in stylized format |
| `export` | Download resume |
| `clear` | Clear terminal screen |

## Configuration

Edit `src/config/data/site-data.ts` to update:
- Personal info (name, title, bio)
- Experience history
- Skills categories
- Certifications
- Contact links

## License

MIT

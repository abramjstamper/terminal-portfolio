# whoami.dev - Complete Planning Document

## Project Overview

### Purpose
A React/TypeScript portfolio website with a retro terminal interface to showcase professional skills and experience for career advancement. The site serves as a portfolio for prospective employers with a unique, interactive UX that demonstrates technical capabilities and personality.

### Key Goals
- **Primary**: Provide information about professional background to prospective employers
- **Secondary**: History and accomplishments for job applications
- **SEO**: Rank well when searching for your name on Google
- **Accessibility**: WCAG compliant, screen reader friendly

### Current Website
- Domain: abramstamper.dev (primary), with redirects from other domains
- Current stack: React 19 + TypeScript 5.x + Tailwind CSS 4.x + Vite
- Deployment: GitHub Actions → GitHub Pages (automatic on push to main)
- Status: Complete terminal portfolio with dual terminal/nav modes
- Live at: https://abramstamper.dev

---

## Technical Stack

### Core Technologies
- **Build Tool**: Vite 7.x
- **Framework**: React 19 + TypeScript 5.9
- **Styling**: Tailwind CSS 4.x with CSS custom properties for theming
- **Routing**: React Router 7
- **Testing**: Vitest + React Testing Library
- **SSG**: TBD (vite-plugin-ssr or vite-ssg for SEO pre-rendering)

### Why These Choices
- **Vite**: Fast builds, modern tooling, HMR, better than CRA
- **Tailwind**: Utility-first CSS with CSS variables for dynamic theming
- **React 19**: Latest stable with improved performance
- **TypeScript 5.9**: Type safety, shows professional development practices

### Deployment Strategy
- **Hosting**: GitHub Pages
- **CI**: GitHub Actions (lint, test, build on PR/push)
- **CD**: GitHub Actions deploy to GitHub Pages via `actions/deploy-pages`
- **Process**: Build → Upload artifact → Deploy to GitHub Pages
- **Domain**: `abramstamper.dev` (custom domain with CNAME file)
- **SEO Solution**: Pre-render all routes at build time (no server-side runtime needed)

---

## Core Concept & Features

### Dual Interface Design

#### 1. Terminal Mode (Primary)
**Default experience** - Full-screen interactive command-line interface:
- **No nav bar** - terminal takes over the entire viewport
- Multiple color themes with CSS variable-based theming
- Blinking cursor with command input
- Command history (up/down arrows)
- Tab completion for commands, sections, and theme names
- ASCII art banner on load
- Optional scanlines and CRT glow effects
- Shell operator support
- Small "Switch to Navigation" link (subtle, corner position)

#### 2. Navigation Mode (Fallback)
**Traditional website experience** for accessibility and mobile:

**Header**:
- Sticky nav bar: About | Experience | Skills | Credentials | Contact
- Dark/light mode toggle button (sun/moon icons)
- "Switch to Terminal" button (right side)
- Name/logo on left
- Full dark mode support with system preference detection

**Hero Section**:
- Name, title, brief tagline
- Profile photo (optional)
- CTA buttons: View Resume | Contact Me

**About Section**:
- Bio text
- Key highlights or fun facts

**Experience Section** (Interactive Horizontal Timeline):
- Horizontally scrollable timeline with left/right scroll buttons
- Company logos displayed at each timeline node
- Default state: Logo, company name, title, and start year visible
- Hover: Highlights node and shows brief info card
- Click: Expands detailed card below timeline with full description, highlights, tech stack
- Scroll buttons: Click for discrete scroll, hover for continuous smooth scroll
- Mobile: Accordion-style cards with tap to expand (no horizontal timeline)

**Skills Section**:
- Grouped by category (Languages, Frameworks, Tools, etc.)
- Visual representation (tags, progress bars, or simple lists)

**Projects Section**:
- Card grid
- Each card: Screenshot/icon, title, description, tech stack, links (GitHub, live demo)

**Certifications & Patents Section**:
- Grid layout with certification cards
- Company/issuer logos (US Patent, Microsoft, Linux Foundation, SmallBox, Security Journey)
- Certification name, issuer, year, description
- External links to verify credentials

**Contact Section**:
- Email, LinkedIn, GitHub links
- Optional contact form

**Footer**:
- Copyright, "Built with React" badge
- "Switch to Terminal" link

**Responsive Behavior**:
- Mobile: hamburger menu, stacked sections
- Desktop: full nav, side-by-side layouts where appropriate
- Default to nav mode on mobile (terminal requires keyboard)

**Styling**:
- Clean, minimal design with Tailwind CSS
- Light/dark mode with system preference detection
- Color scheme toggle persisted to localStorage
- Dark mode enabled via Tailwind v4 `@custom-variant dark` directive
- Smooth scroll between sections
- Subtle animations on scroll (respect reduced-motion)

**Dark Mode Implementation**:
- NavThemeContext manages color scheme state
- System preference detected via `window.matchMedia('(prefers-color-scheme: dark)')`
- User preference saved to localStorage (`nav-color-scheme` key)
- Toggle adds/removes `dark` class on `document.documentElement`
- All components use `dark:` Tailwind variants for dark mode styles

---

## Page Layout & Routing

### URL Structure
```
/                   # Terminal mode (default on desktop)
/nav                # Navigation mode (default on mobile, or via toggle)
```

**Alternative approach** (single page, no routes):
```
/                   # Both modes on same page, toggle with state
                    # Mode preference stored in localStorage
                    # URL hash for nav sections: /#about, /#experience
```

### Recommended: Single Page with Mode Toggle

```
┌─────────────────────────────────────────────────────────┐
│                        App.tsx                          │
│  ┌───────────────────────────────────────────────────┐  │
│  │              ModeContext (terminal|nav)           │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │           ThemeContext (colors)             │  │  │
│  │  │                                             │  │  │
│  │  │   mode === 'terminal'    mode === 'nav'     │  │  │
│  │  │         ↓                      ↓            │  │  │
│  │  │   ┌──────────┐          ┌───────────┐       │  │  │
│  │  │   │ Terminal │          │  NavSite  │       │  │  │
│  │  │   │   Mode   │          │   Mode    │       │  │  │
│  │  │   └──────────┘          └───────────┘       │  │  │
│  │  │                                             │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Terminal Mode Layout
```
┌─────────────────────────────────────────────────────────┐
│ [Switch to Nav ↗]                              100% vh  │
│                                                         │
│  ██╗    ██╗██╗  ██╗ ██████╗  █████╗ ███╗   ███╗██╗     │
│  ██║    ██║██║  ██║██╔═══██╗██╔══██╗████╗ ████║██║     │
│  ██║ █╗ ██║███████║██║   ██║███████║██╔████╔██║██║     │
│  ██║███╗██║██╔══██║██║   ██║██╔══██║██║╚██╔╝██║██║     │
│  ╚███╔███╔╝██║  ██║╚██████╔╝██║  ██║██║ ╚═╝ ██║██║     │
│   ╚══╝╚══╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝     │
│                                                         │
│  Welcome to whoami.dev - Type 'help' to get started    │
│                                                         │
│  guest@portfolio:~$ help                                │
│  Available commands:                                    │
│    help      Show this help message                     │
│    cat       Display section content                    │
│    ...                                                  │
│                                                         │
│  guest@portfolio:~$ █                                   │
│                                                         │
│─────────────────────────────────────────────────────────│
│  (scrollable output area, input fixed at bottom)        │
└─────────────────────────────────────────────────────────┘
```

### Navigation Mode Layout

**Desktop (≥1024px)**:
```
┌─────────────────────────────────────────────────────────┐
│  LOGO    About  Experience  Skills  Projects  [⌨ Term] │  ← Sticky header
├─────────────────────────────────────────────────────────┤
│                                                         │
│                      HERO                               │
│              Abram Stamper                              │
│           Software Engineer                             │
│      [View Resume]    [Contact Me]                      │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────┐  ┌─────────────────────────────┐   │
│  │                 │  │                             │   │
│  │     Photo       │  │   About text goes here...  │   │
│  │   (optional)    │  │                             │   │
│  │                 │  │                             │   │
│  └─────────────────┘  └─────────────────────────────┘   │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                     EXPERIENCE                          │
│                                                         │
│  Default state (nodes with brief info):                 │
│  ┌─────────────────────────────────────────────────┐    │
│  │                                                 │    │
│  │    ●────────────●────────────●────────────●     │    │
│  │    │            │            │            │     │    │
│  │ ┌──┴──┐      ┌──┴──┐      ┌──┴──┐      ┌──┴──┐  │    │
│  │ │ Co1 │      │ Co2 │      │ Co3 │      │ Co4 │  │    │
│  │ │Title│      │Title│      │Title│      │Title│  │    │
│  │ └─────┘      └─────┘      └─────┘      └─────┘  │    │
│  │  2024         2022         2020         2018    │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  On hover/click (expanded detail card):                 │
│  ┌─────────────────────────────────────────────────┐    │
│  │                                                 │    │
│  │    ●────────────◉────────────●────────────●     │    │
│  │                 │                               │    │
│  │         ┌──────────────────────────┐            │    │
│  │         │  Senior Engineer         │            │    │
│  │         │  Company Name            │            │    │
│  │         │  Jan 2022 - Present      │            │    │
│  │         │                          │            │    │
│  │         │  • Led team of 5 devs    │            │    │
│  │         │  • Built microservices   │            │    │
│  │         │  • Reduced latency 40%   │            │    │
│  │         │                          │            │    │
│  │         │  Tech: Go, K8s, AWS      │            │    │
│  │         │  Projects: API Platform  │            │    │
│  │         └──────────────────────────┘            │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                       SKILLS                            │
│  Languages:    [Python] [TypeScript] [Go] [Rust]        │
│  Frameworks:   [React] [Node.js] [FastAPI]              │
│  Tools:        [Docker] [K8s] [AWS] [Terraform]         │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                      PROJECTS                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │
│  │ ┌─────────┐ │  │ ┌─────────┐ │  │ ┌─────────┐ │      │
│  │ │ Image   │ │  │ │ Image   │ │  │ │ Image   │ │      │
│  │ └─────────┘ │  │ └─────────┘ │  │ └─────────┘ │      │
│  │ Project 1   │  │ Project 2   │  │ Project 3   │      │
│  │ Description │  │ Description │  │ Description │      │
│  │ [GH] [Demo] │  │ [GH] [Demo] │  │ [GH] [Demo] │      │
│  └─────────────┘  └─────────────┘  └─────────────┘      │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                      CONTACT                            │
│        [Email]    [LinkedIn]    [GitHub]                │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  © 2024 Abram Stamper    [Switch to Terminal]           │
└─────────────────────────────────────────────────────────┘
```

**Mobile (<768px)**:
```
┌───────────────────────┐
│  LOGO           [☰]   │  ← Hamburger menu
├───────────────────────┤
│                       │
│    Abram Stamper      │
│   Software Engineer   │
│                       │
│   [View Resume]       │
│   [Contact Me]        │
│                       │
├───────────────────────┤
│       ABOUT           │
│  Bio text stacked     │
│  vertically...        │
│                       │
├───────────────────────┤
│     EXPERIENCE        │
│                       │
│  ●──●──●──●  (horiz)  │  ← Compact timeline
│                       │
│  ┌─────────────────┐  │
│  │ ▼ Company 1     │  │  ← Tap to expand
│  │   Title         │  │
│  ├─────────────────┤  │
│  │ Description...  │  │  ← Expanded content
│  │ • Achievement   │  │
│  │ Tech: Go, AWS   │  │
│  └─────────────────┘  │
│  ┌─────────────────┐  │
│  │ ▶ Company 2     │  │  ← Collapsed
│  │   Title         │  │
│  └─────────────────┘  │
│                       │
├───────────────────────┤
│       SKILLS          │
│  [Python] [TS] [Go]   │  ← Tags wrap
│  [React] [Node]       │
│                       │
├───────────────────────┤
│      PROJECTS         │
│  ┌─────────────────┐  │
│  │  Project 1      │  │  ← Full width cards
│  └─────────────────┘  │
│  ┌─────────────────┐  │
│  │  Project 2      │  │
│  └─────────────────┘  │
│                       │
├───────────────────────┤
│      CONTACT          │
│  [Email] [LI] [GH]    │
│                       │
├───────────────────────┤
│  © 2024  [Terminal]   │
└───────────────────────┘
```

### Mode Detection & Switching

```typescript
// Detect initial mode
const getInitialMode = (): 'terminal' | 'nav' => {
  // Check localStorage first
  const saved = localStorage.getItem('preferredMode');
  if (saved) return saved as 'terminal' | 'nav';

  // Default: mobile → nav, desktop → terminal
  const isMobile = window.innerWidth < 768;
  return isMobile ? 'nav' : 'terminal';
};

// Persist preference
const setMode = (mode: 'terminal' | 'nav') => {
  localStorage.setItem('preferredMode', mode);
  // Update state
};
```

---

## Command System

### Design Philosophy
Commands should behave like real Linux/BusyBox utilities where practical. Users familiar with Unix terminals should feel at home. Not every flag needs to be implemented, but common patterns should work as expected.

### Universal Flags (All Commands)
```
-h, --help     Show help message with usage and options
```

### Core Commands

#### help
Display available commands.
```bash
help              # List all commands with descriptions
help <command>    # Show detailed help for specific command
```

#### man
Display manual page for a command (alias for detailed help).
```bash
man <command>     # Show detailed help for command
man ls            # Show ls manual page
man man           # Show man manual page
```
**Behavior**: `man <command>` is equivalent to `<command> --help` but formatted like a manual page with sections (NAME, SYNOPSIS, DESCRIPTION, OPTIONS).

#### ls
List available sections (like listing files).
```bash
ls                # List all sections
ls -l             # Long format with descriptions
ls -a             # Include hidden sections (easter eggs)
ls <section>      # Error if section doesn't exist (sections are files, not directories)
```
**Important**: Display sections as files (no `/` suffix). There are no directories to navigate.

#### cat
Display section contents (primary way to view content).
```bash
cat <section>           # Display section content
cat about experience    # Display multiple sections
cat -n <section>        # Show with line numbers (optional)
```
**Sections**: about, experience, skills, projects, contact, resume

#### cd
Informational only - no actual directory navigation.
```bash
cd                # Print hint: "Use 'cat <section>' to view contents"
cd <section>      # Same hint, no state change
```
**Rationale**: Maintains terminal familiarity without complex state management.

#### pwd
Print working directory.
```bash
pwd               # Output: /home/guest or ~
```

#### clear
Clear the terminal screen.
```bash
clear             # Clear all output
# Also: Ctrl+L
```

#### history
Show command history.
```bash
history           # List previous commands with numbers
history -c        # Clear history (optional)
history <n>       # Show last n commands (optional)
```

#### echo
Display a message.
```bash
echo <message>    # Print message
echo -n <msg>     # Print without newline (optional)
echo              # Print empty line
```

#### whoami
Display current user.
```bash
whoami            # Output: guest
```

#### hostname
Display system hostname.
```bash
hostname          # Output: abramstamper.com (or current domain)
```
**Implementation**: Use `window.location.hostname`

#### id
Display user identity.
```bash
id                # Output: uid=1000(guest) gid=1000(guest) groups=1000(guest)
```
**Note**: Username should match whatever `whoami` returns.

#### exit / logout
Exit the terminal (Rick Roll).
```bash
exit              # Redirects to https://youtu.be/dQw4w9WgXcQ
logout            # Same behavior
```
**Implementation**: `window.location.href = 'https://youtu.be/dQw4w9WgXcQ?si=Q1MpJ6ll3cuuVw8E'`

#### date
Display current date/time.
```bash
date              # Current date/time in locale format
date +%Y-%m-%d    # Custom format (optional, BusyBox style)
date -u           # UTC time (optional)
```

#### uname
System information (repurposed for project info).
```bash
uname             # Project name and version
uname -a          # All info: project, versions, dependencies
uname -s          # System name (project name)
uname -r          # Release (version from package.json)
uname -v          # Version details
uname -m          # Machine (shows "browser")
uname -n          # Node/hostname (browser info: UA, viewport, platform)
```

#### ifconfig
Display client network information.
```bash
ifconfig          # Show public IP address and basic info
```
**Implementation**: Requires async fetch to external API. Shows loading state while fetching. Cache result for session.

**API**: Use `https://ifconfig.me/all.json` (CORS confirmed working)
```typescript
fetch('https://ifconfig.me/all.json')
// Returns: { ip_addr, remote_host, user_agent, port, ... }
```

**Example output**:
```
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>
      inet 203.0.113.42
      origin: San Francisco, CA, US (if using ipinfo.io)
```

#### uptime
Show time since site was built/deployed.
```bash
uptime            # "up 3 days, 14 hours, 22 minutes (built 2024-01-15 10:30:00)"
uptime -p         # Pretty format: "up 3 days, 14 hours"
uptime -s         # Build timestamp: "2024-01-15 10:30:00"
```
**Implementation**: Build timestamp is injected at build time via Vite's `define` or an environment variable. Calculate difference from current time.

#### theme
Manage terminal themes.
```bash
theme             # Show current theme name and description
theme -l          # List all available themes
theme <name>      # Switch to named theme
theme -s <name>   # Same as above (set theme)
```

#### motd
Message of the day (welcome banner).
```bash
motd              # Display ASCII art banner
```

#### export
Download resume.
```bash
export            # Trigger resume PDF download
export resume     # Same as above
```

### Shell Operators

| Operator | Behavior |
|----------|----------|
| `&&` | Chain commands, stop on first error |
| `\|` | Error: "Pipes are not supported in this terminal" |
| `&` | Error: "Background execution is not supported" |
| `;` | Optional: chain commands, continue on error |

### Keyboard Shortcuts
- **Enter**: Execute command
- **Up/Down**: Navigate command history
- **Tab**: Autocomplete command, section, or theme name
- **Ctrl+C**: Clear current input
- **Ctrl+Z**: Clear current input
- **Ctrl+L**: Clear screen (same as `clear`)

### Easter Egg Commands (Phase 2)
```bash
sudo              # Witty denial message or unlock secret theme
sl                # ASCII train animation
cowsay <msg>      # ASCII cow with message (default message is "Linux is great!")
matrix            # Brief Matrix rain animation (aka cmatrix)
coffee            # ASCII coffee cup
neofetch          # System info in stylized format
fortune           # gives some quotes that I admire
cal               # ASCII calendar for current month
```

---

## Theme System

### Critical Requirement: Color Distinctness

**THE MOST IMPORTANT RULE**: Every color in a theme MUST be visually distinct from every other color. This was a major bug in initial implementation where `text`, `success`, and `link` were all the same shade of green.

Think of themes like an IDE color scheme:
- Keywords are one color
- Strings are another
- Comments are muted but visible
- Errors are clearly red
- Each syntax element is immediately distinguishable

### Color Roles and Usage

| Color | Purpose | Usage Examples |
|-------|---------|----------------|
| `bg` | Background | Terminal background |
| `text` | Primary text | Command output, general content |
| `prompt` | Prompts/labels | The `~` in prompt, section headers |
| `accent` | Secondary highlight | Emphasis, borders |
| `error` | Error messages | Command not found, invalid args |
| `success` | Success/commands | The `guest` username, command names in help |
| `link` | Interactive elements | The `portfolio` hostname, clickable links |
| `muted` | Subtle elements | The `@`, `:`, `$` separators, comments |

### Prompt Color Mapping
```
guest@portfolio:~$
  │  │    │     │ │
  │  │    │     │ └─ muted (gray)
  │  │    │     └─── prompt (amber/orange)
  │  │    └───────── link (blue)
  │  └────────────── muted (gray)
  └───────────────── success (green)
```

### Theme Definitions

Each theme must have 8 distinct, visually differentiable colors:

#### green (Classic CRT)
```javascript
{
  bg: '#0a0a0a',           // Near black
  text: '#00ff00',         // Bright green (primary)
  prompt: '#ffb000',       // Amber (clearly different from green)
  accent: '#00ffff',       // Cyan
  error: '#ff4444',        // Red
  success: '#44ff88',      // Lighter/different green than text
  link: '#00aaff',         // Blue
  muted: '#669966',        // Muted green (visible but subtle)
  effects: { scanlines: true, glow: true }
}
```

#### amber
```javascript
{
  bg: '#0a0a0a',
  text: '#ffb000',         // Amber
  prompt: '#ff6600',       // Orange (distinct from amber)
  accent: '#ffdd44',       // Yellow
  error: '#ff4444',        // Red
  success: '#88cc44',      // Green (contrasts with amber)
  link: '#ffcc66',         // Light amber
  muted: '#997744',        // Muted amber
  effects: { scanlines: true, glow: true }
}
```

#### blue
```javascript
{
  bg: '#0a0a14',
  text: '#00aaff',         // Blue
  prompt: '#00ffff',       // Cyan
  accent: '#88ddff',       // Light blue
  error: '#ff4466',        // Red
  success: '#00ff88',      // Green
  link: '#66ccff',         // Lighter blue
  muted: '#4477aa',        // Muted blue
  effects: { scanlines: true, glow: true }
}
```

#### matrix
```javascript
{
  bg: '#000000',
  text: '#00ff41',         // Matrix green
  prompt: '#88ff88',       // Lighter green
  accent: '#00ff41',
  error: '#ff0000',        // Red
  success: '#33ff77',      // Different green
  link: '#66ffaa',         // Cyan-green
  muted: '#338833',        // Dark green
  effects: { scanlines: false, glow: true }
}
```

#### high-contrast (Windows/JetBrains style)
```javascript
{
  bg: '#000000',           // Pure black
  text: '#ffffff',         // Pure white
  prompt: '#ffff00',       // Yellow
  accent: '#00ffff',       // Cyan
  error: '#ff0000',        // Pure red
  success: '#00ff00',      // Pure green
  link: '#00ffff',         // Cyan
  muted: '#888888',        // Gray
  effects: { scanlines: false, glow: false }
}
```

#### light
```javascript
{
  bg: '#f5f5f5',           // Light gray
  text: '#1a1a1a',         // Near black
  prompt: '#0066cc',       // Blue
  accent: '#cc6600',       // Orange
  error: '#cc0000',        // Red
  success: '#008800',      // Green
  link: '#0066cc',         // Blue
  muted: '#666666',        // Gray
  effects: { scanlines: false, glow: false }
}
```

#### rainbow
```javascript
{
  bg: '#0f0f1a',
  text: '#ffffff',         // White
  prompt: '#ff0000',       // Pure red
  accent: '#ff8800',       // Orange
  error: '#ff0055',        // Magenta-red
  success: '#00ff00',      // Pure green
  link: '#00aaff',         // Bright blue
  muted: '#aa00ff',        // Purple/violet
  effects: { scanlines: false, glow: true }
}
```

### Theme Implementation

#### CSS Variables Approach
Themes work by setting CSS custom properties on the document root:

```typescript
// ThemeContext.tsx
useEffect(() => {
  const theme = themes[themeId];
  const root = document.documentElement;

  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });
}, [themeId]);
```

#### Tailwind Configuration
```javascript
// tailwind.config.js
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
  },
}
```

#### Theme Registry Pattern
Command handlers (non-React code) need access to theme functions. Use a registry:

```typescript
// lib/themeRegistry.ts
let themeCallback: ((id: string) => void) | null = null;
let currentThemeId: string = 'green';

export function registerThemeCallback(callback: (id: string) => void, initialId: string) {
  themeCallback = callback;
  currentThemeId = initialId;
}

export function setTheme(id: string) {
  themeCallback?.(id);
  currentThemeId = id;
}

export function getCurrentThemeId(): string {
  return currentThemeId;
}
```

---

## Content Structure

### Sections
1. **about**: Bio, interests, personal statement
2. **experience**: Work history (role, company, period, description, highlights, technologies)
3. **skills**: Technologies grouped by category
4. **projects**: Personal/open source projects (can show "coming soon")
5. **certifications**: Patents, certifications, credentials with logos
6. **contact**: Email, GitHub, LinkedIn with clickable links
7. **resume**: Download link, last updated date

### Content Configuration
All content lives in a single config file for easy updates:
```
src/config/data/site-data.ts   # Actual content
src/config/content.ts          # Type definitions
```

### Actual Content (Abram Stamper)

**Profile:**
- Name: Abram Stamper
- Title: Sr Full Stack Software Engineer
- Bio: Entrepreneurial-minded full stack software engineer who employs inventive thinking to solve tomorrow's challenges today. A generalist by nature with production experience in a variety of domains: Advertising, Automotive, Cybersecurity, & IoT.

**Experience:**

1. **Principal Software Engineer** @ Palo Alto Networks (Oct 2023 - Present)
   - Architected an internal data enrichment application from the ground up
   - Guided the development team through project milestones and code reviews
   - Broke down epics into actionable tickets for less experienced developers
   - Technologies: Python, FastAPI, React, PostgreSQL, Kubernetes, GCP

2. **Sr Staff Software Engineer** @ Palo Alto Networks (May 2022 - Oct 2023)
   - Built uniform query & dashboard tool for Threat Researchers
   - Crafted universal data search to improve researcher productivity
   - Upleveled team observability, alerting, and metrics tooling
   - Technologies: Python, React, Redis, PostgreSQL, Kubernetes

3. **Cloud Architect** @ Aptiv Connected Services (Apr 2021 - May 2022)
   - Architected cloud abstraction layer between partner clouds and internal platform
   - Collaborated across 10 teams to deliver integrated solutions
   - Completed numerous PoCs from design concept to production release
   - Technologies: Azure, AWS, Kubernetes, Python, NodeJS

4. **Advanced Software Engineer** @ Aptiv PLC (May 2018 - Mar 2021)
   - Architected cloud components for pre-production IoT software product
   - Designed real-time ECU data acquisition and analysis systems
   - Awarded patent for Electronic Device Intrusion Detection (US11341238B2)
   - Technologies: Azure, PostgreSQL, NodeJS, React, Python

5. **Software Engineer** @ Vibenomics (Fuzic Media) (May 2017 - May 2018)
   - Built location-aware audio advertisement targeting system
   - Developed real-time analytics dashboard for ad performance
   - Technologies: Python, JavaScript, PostgreSQL, AWS

6. **Software Developer Intern** @ Taylor University (2016 - 2017)
   - Developed internal tools and web applications
   - Technologies: PHP, JavaScript, MySQL

**Skills:**
- Languages: Python 3.10+, TypeScript, JavaScript/ES6+, Java, SQL
- Backend: FastAPI, Flask, NodeJS, REST APIs, Redis
- Frontend: React, Redux, HTML/CSS, Tailwind CSS
- Databases: PostgreSQL, MySQL, Redis, DynamoDB
- Cloud & Infrastructure: AWS, GCP, Azure, Kubernetes, Docker
- Tools & Practices: Git/GitHub, Agile/Scrum, Jira, Linux, CI/CD

**Education:**
- BS of Computer Science (2018) - Taylor University
- Concentration in Software Engineering
- Cumulative GPA 3.8

**Certifications & Patents:**
1. **US Patent** - Electronic Device Intrusion Detection (US11341238B2) - 2022
2. **Azure Fundamentals** - Microsoft (AZ-900) - 2021
3. **Certified Secure Developer** - Security Journey (HackEDU) - 2021
4. **Certified Kubernetes Application Developer** - Linux Foundation (CKAD) - 2020
5. **Idea Factory Champion** - SmallBox - 2018

**Contact:**
- Email: abram.j.stamper@me.com
- GitHub: github.com/abramjstamper
- LinkedIn: linkedin.com/in/abramstamper
- Website: abramstamper.com

---

## Directory Structure

```
terminal-portfolio/
├── public/
│   ├── assets/
│   │   └── resume.pdf
│   └── logos/                        # Company and certification logos
│       ├── paloalto.svg
│       ├── aptiv.svg
│       ├── vibenomics.svg
│       ├── taylor.svg
│       ├── patent.svg
│       ├── azure.svg
│       ├── linuxfoundation.svg
│       ├── smallbox.svg
│       └── securityjourney.svg
├── src/
│   ├── components/
│   │   ├── terminal/
│   │   │   ├── Terminal.tsx          # Main container, handles submit
│   │   │   ├── TerminalInput.tsx     # Input with cursor, prompt
│   │   │   ├── TerminalOutput.tsx    # Renders output lines
│   │   │   └── index.ts
│   │   └── nav/                      # Navigation mode components
│   │       ├── NavSite.tsx           # Main nav layout
│   │       ├── Header.tsx            # Sticky header with nav + dark mode toggle
│   │       ├── Hero.tsx              # Hero section
│   │       ├── About.tsx             # About section
│   │       ├── Experience.tsx        # Horizontal timeline with logos
│   │       ├── Skills.tsx            # Skills categories
│   │       ├── Projects.tsx          # Project cards
│   │       ├── Certifications.tsx    # Certifications grid with logos
│   │       ├── Contact.tsx           # Contact links
│   │       └── Footer.tsx            # Footer with terminal switch
│   ├── config/
│   │   ├── content.ts                # Type definitions
│   │   ├── themes.ts                 # Terminal theme configurations
│   │   ├── version.ts                # Package version for uname
│   │   └── data/
│   │       └── site-data.ts          # Actual content (experience, skills, etc.)
│   ├── contexts/
│   │   ├── ThemeContext.tsx          # Terminal theme provider
│   │   ├── ModeContext.tsx           # Terminal/nav mode provider
│   │   └── NavThemeContext.tsx       # Nav light/dark mode provider
│   ├── hooks/
│   │   └── useTerminal.ts            # Terminal state (reducer pattern)
│   ├── lib/
│   │   ├── commands/
│   │   │   ├── autocomplete.ts       # Tab completion
│   │   │   ├── handlers.tsx          # Command implementations
│   │   │   ├── handlers.test.tsx     # Handler tests
│   │   │   ├── parser.ts             # Command parsing
│   │   │   └── parser.test.ts        # Parser tests
│   │   └── themeRegistry.ts          # React/command bridge
│   ├── types/
│   │   └── terminal.ts               # Types
│   ├── App.tsx
│   ├── index.css                     # Tailwind + custom styles + dark mode variant
│   └── main.tsx
├── index.html
├── vite.config.ts
├── vitest.config.ts
├── tsconfig.json
└── package.json
```

---

## Critical Implementation Notes

### Pitfall #1: Tailwind @apply with CSS Variables
**PROBLEM**: `@apply` does not work with CSS variable-based colors.

```css
/* THIS WILL FAIL */
.cursor {
  @apply bg-terminal-text;  /* Error: cannot apply dynamic value */
}

/* DO THIS INSTEAD */
.cursor {
  background-color: var(--color-text);
}
```

**Rule**: Use Tailwind utility classes in JSX (`className="text-terminal-prompt"`), but use raw CSS variables in `@layer` definitions.

### Pitfall #2: Stale Closures in Theme Registry
**PROBLEM**: Theme callback becomes stale if not memoized.

```typescript
// BAD - creates new function on every render
const setTheme = (id: string) => {
  if (themes[id]) setThemeId(id);
};

// GOOD - stable reference
const setTheme = useCallback((id: string) => {
  if (themes[id]) setThemeId(id);
}, []);
```

### Pitfall #3: Monochrome Themes with Same Colors
**PROBLEM**: In a "green" theme, making `text`, `success`, and `link` all `#00ff00` means the prompt looks broken.

**SOLUTION**: Even monochrome themes need color variation:
- Use different shades (lighter/darker)
- Use complementary colors for accents (amber in green theme)
- Test by visually checking that every prompt element is distinguishable

### Pitfall #4: Sections Are Files, Not Directories
**PROBLEM**: `ls` showing `about/` implies you can `cd about`.

**SOLUTION**:
- `ls` shows sections without trailing `/`
- `cd` always prints a hint to use `cat`
- No directory state management needed

### Async Commands (ifconfig, etc.)
Some commands need to fetch external data. Handle this by:

1. **Return a loading state immediately**:
```typescript
// Handler returns promise or signals async
handler: async (args) => {
  return { output: 'Fetching...', async: true };
}
```

2. **Update output when data arrives**:
```typescript
// Option A: Command returns a Promise<CommandResult>
// Option B: Command accepts a callback to update output
// Option C: Use React state with useEffect in the output component
```

3. **Cache results** to avoid repeated API calls:
```typescript
let cachedIP: string | null = null;
// Reuse for session
```

4. **Handle errors gracefully**:
```
ifconfig: unable to fetch network information
```

### Build-Time Constants (for uptime command)
Inject the build timestamp at build time via Vite config:

```typescript
// vite.config.ts
export default defineConfig({
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
});

// src/vite-env.d.ts (type declaration)
declare const __BUILD_TIME__: string;

// Usage in uptime handler
const buildTime = new Date(__BUILD_TIME__);
const now = new Date();
const diff = now.getTime() - buildTime.getTime();
// Convert diff to days, hours, minutes
```

---

## Accessibility

### ARIA Implementation
```jsx
<div role="application" aria-label="Terminal">
  <div role="log" aria-live="polite">
    {/* Output lines */}
  </div>
  <input aria-label="Terminal input" />
</div>
```

### Features
- `role="log"` for output area with `aria-live="polite"`
- Skip link to bypass terminal
- Keyboard-only navigation fully supported
- `prefers-reduced-motion` respected (disable animations)
- High contrast theme available

---

## Testing Strategy

### Test Categories
1. **Parser tests**: Command parsing, argument handling, operators
2. **Handler tests**: Each command with various inputs
3. **Integration tests**: Full terminal interaction flows

### Example Test Cases
```typescript
// Parser
- parseCommand('ls -l') → { command: 'ls', args: ['-l'] }
- parseCommand('cat about experience') → { command: 'cat', args: ['about', 'experience'] }
- parseCommand('echo hello && clear') → [cmd1, cmd2] (chained)
- parseCommand('ls | grep') → error result

// Handlers
- help() → lists all commands
- man('ls') → shows ls manual page with NAME, SYNOPSIS, etc.
- man() → error: "What manual page do you want?"
- ls() → lists sections without /
- ls('invalid') → error message
- cat('about') → about content
- theme() → current theme info
- theme('-l') → theme list
- uname('-a') → full system info
- uptime() → shows time since build
- uptime('-s') → shows build timestamp
```

---

## Development Phases

### Phase 1: Core Terminal ✅ COMPLETE
- [x] Project setup (Vite 6.x, React 19, TypeScript 5.x, Tailwind v4)
- [x] Terminal components (Terminal, Input, Output)
- [x] Command parser with operator support (`&&`, `;`)
- [x] All core commands with Linux-style args (help, man, ls, cat, cd, pwd, clear, history, echo, whoami, hostname, id, exit/logout, date, uname, ifconfig, uptime, theme, motd, export)
- [x] Theme system with 7+ themes (green, amber, blue, matrix, high-contrast, light, rainbow)
- [x] Tab completion for commands, sections, and theme names
- [x] Command history with up/down arrow navigation
- [x] Unit tests with Vitest + React Testing Library

### Phase 2: Polish & Easter Eggs ✅ COMPLETE
- [x] ASCII art banner (motd command)
- [x] Easter egg commands:
  - [x] `sudo` - Witty denial message
  - [x] `sl` - ASCII train animation
  - [x] `cowsay` - ASCII cow with message
  - [x] `matrix` - Matrix rain animation
  - [x] `neofetch` - System info in stylized format
  - [x] `fortune` - Random quotes/sayings
  - [x] `cal` - ASCII calendar for current month
- [x] Scanline and CRT glow effects (toggleable per theme)
- [x] Reduced motion support (`prefers-reduced-motion`)

### Phase 3: Navigation Mode ✅ COMPLETE
- [x] Nav mode components:
  - [x] Header with sticky navigation and dark/light mode toggle
  - [x] Hero section with name, title, animated typing terminal, CTA buttons
  - [x] About section with bio and professional highlight cards
  - [x] Experience section with interactive horizontal timeline and company logos
  - [x] Skills section with 9 categorized skill groups (3x3 grid)
  - [x] Projects section with card grid
  - [x] Certifications section with logos and dark mode variants
  - [x] Contact section with email, GitHub, LinkedIn, Stack Overflow
  - [x] Footer with terminal switch and copyright
- [x] Mode toggle between terminal and nav
- [x] Mobile-first responsive design
- [x] Auto-detect mobile → nav mode
- [x] Hamburger menu for mobile navigation
- [x] **Dark/Light Mode**:
  - [x] NavThemeContext for managing color scheme
  - [x] System preference detection via `prefers-color-scheme: dark`
  - [x] LocalStorage persistence of user preference
  - [x] Toggle button in header (sun/moon icons)
  - [x] Class-based dark mode with Tailwind v4 (`@custom-variant dark`)
  - [x] Separate dark mode logo SVGs (text-only color changes, preserving graphic colors)
- [x] **Experience Timeline**:
  - [x] Horizontal scrollable timeline with scroll buttons
  - [x] Company logos (Palo Alto, Aptiv, Vibenomics, Taylor) with dark variants
  - [x] Hover and click states for expanded detail cards
  - [x] Mobile accordion fallback
- [x] **Hero Animated Typing**:
  - [x] Terminal-style code block with red/yellow/green dots
  - [x] Animated typing effect with configurable phrases (`heroTypingPhrases`)
  - [x] Blinking cursor animation
- [x] **Skills Categories**: AI & Automation, Languages, Backend, Frontend, Databases, Cloud Platforms, Infrastructure, Tools, Design
- [x] **Professional Messaging**:
  - [x] Title: "Principal Full Stack Engineer"
  - [x] Highlight cards for recruiters (product-obsessed, force multiplier, accountable leader)
  - [x] "Over a decade of product development experience"

### Phase 4: SEO & Performance
- [ ] SSG pre-rendering
- [ ] Meta tags, Open Graph
- [ ] Sitemap, robots.txt
- [ ] Lighthouse optimization
- [ ] Code splitting for games

### Phase 5: CI/CD ✅ COMPLETE
- [x] GitHub Actions CI (`.github/workflows/ci.yml`)
  - [x] Runs on push/PR to main
  - [x] Lint, test, build pipeline
- [x] GitHub Actions CD to GitHub Pages (`.github/workflows/deploy.yml`)
  - [x] Automatic deployment on push to main
  - [x] Manual trigger support (workflow_dispatch)
  - [x] CNAME file for custom domain
- [x] Custom Domain Configuration
  - [x] Primary domain: `abramstamper.dev`
  - [x] DNS A records pointing to GitHub Pages IPs
  - [x] HTTPS certificate provisioning
  - [x] CNAME file in `/public/CNAME`

---

## Quick Reference

### Commands
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run test         # Run tests in watch mode
npm run test:run     # Run tests once
```

### Testing Theme Colors
After implementing themes, verify by:
1. Switch to each theme
2. Type a command and check prompt: guest (success), @ (:) muted, portfolio (link), ~ (prompt), $ (muted)
3. Run `help` - command names should be different from descriptions
4. Run an invalid command - error should be clearly red
5. Every element should be visually distinct

### Adding a New Command
1. Add to `commands` object in `handlers.tsx`
2. Include `name`, `description`, `usage`, `options`, `handler`
3. Handler receives `(args: string[], history?: string[])`
4. Return `{ output: ReactNode } | { error: string }`
5. Check `hasHelpFlag(args)` first and return help if true
6. Add to autocomplete if needed
7. Write tests

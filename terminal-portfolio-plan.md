# Terminal Portfolio Website - Complete Planning Document

## Project Overview

### Purpose
A React/TypeScript portfolio website with a retro terminal interface to showcase professional skills and experience for career advancement. The site serves as a portfolio for prospective employers with a unique, interactive UX that demonstrates technical capabilities and personality.

### Key Goals
- **Primary**: Provide information about professional background to prospective employers
- **Secondary**: History and accomplishments for job applications
- **SEO**: Rank well when searching for your name on Google
- **Accessibility**: WCAG compliant, screen reader friendly
- **Future**: Architecture supports linking to SMB website (B2B IT consulting) without implementing initially

### Current Website
- Domain: abramstamper.com (and other domains pointing to same content)
- Current stack: React + TypeScript + Bulma CSS + Apache
- Deployment: Manual copy to Apache `/var/www/html`
- Status: Dated, from previous job, hand-assembled
- Issues: Pure client-side React SPA (SEO challenges), no pre-rendering

---

## Technical Stack

### Core Technologies
- **Build Tool**: Vite (modern replacement for Create React App)
- **Framework**: React 18 + TypeScript 5
- **Styling**: Tailwind CSS 3 (utility-first, tree-shakeable)
- **Routing**: React Router 6
- **Testing**: Vitest + React Testing Library
- **SSG**: vite-plugin-ssr or vite-ssg (for SEO pre-rendering)

### Why These Choices
- **Vite**: Fast builds, modern tooling, better than CRA
- **Tailwind**: Utility-first CSS, no opinions on React (vs Bulma), professional choice
- **Pre-rendering**: Generates static HTML at build time for SEO (Google sees full content)
- **TypeScript**: Type safety, shows professional development practices

### Deployment Strategy
- **Server**: Apache (current setup, keep it)
- **CI**: GitHub Actions (lint, test, build on PR/push)
- **CD**: GitHub Actions deploy to Apache via SCP/rsync
- **Process**: Build → Generate static files → Copy to `/var/www/html`
- **SEO Solution**: Pre-render all routes at build time (no server-side runtime needed)

### Client-Side Routing & SEO
**Question**: Is pure Vite with client-side routing bad for SEO?
**Answer**: Yes, it has known issues because search engine crawlers see empty HTML shell initially.

**Solution**: Use Vite SSG plugins to pre-render static HTML files at build time:
- Search engines get pre-rendered HTML with full content
- Client-side routing still works after hydration
- No async server-side data needed
- Deploy static files to Apache as before
- Best of both worlds: SEO + interactivity

### Analytics
- Google Analytics 4 (already in use)
- Track terminal vs nav mode usage
- Track popular commands

---

## Core Concept & Features

### Dual Interface Design

#### 1. Terminal Mode (Primary)
**Default experience** - Interactive command-line interface:
- Green-on-black default theme (classic CRT phosphor)
- Blinking cursor with command input
- Command history (up/down arrows)
- Tab completion for commands
- ASCII art banner on load
- Multiple color themes available
- Optional scanlines and CRT effects
- Simulated typing delay (configurable)

**Available Commands**:
```
Core Commands:
- help              Show all available commands
- ls                List available sections
- cat <section>     Display section content
- clear             Clear terminal screen
- history           Show command history
- man <command>     Manual page for command
- theme [name]      List or switch themes
- motd              Show welcome banner
- export            Download resume PDF

Easter Eggs:
- whoami            Identity poem/message about you
- sudo <cmd>        Witty denial or unlock secret theme
- sl                ASCII train animation (typo of ls)
- cowsay <text>     ASCII cow with speech bubble
- matrix            Brief matrix rain animation
- hack              Fake hacking sequence with progress bars
- coffee            ASCII coffee cup + coding quote
- pong              Simple ASCII pong game
- snake             Simple ASCII snake game
- exit              Switch to nav mode with message
- pwd               Print working directory
- uname             Fake system info
```

**Command Autocomplete**:
- Tab completion for commands
- Tab completion for section names (after `cat`, `man`)
- Tab completion for theme names (after `theme`)
- Fuzzy matching for typos
- Up/down arrow for command history

#### 2. Navigation Mode (Fallback)
**Traditional website experience**:
- Prominent "Skip to Navigation" button at top of terminal
- Clean, modern nav bar: About | Experience | Timeline | Projects | Skills | Resume | Contact
- Smooth scrolling to sections
- Same content, different presentation (cards/grid layout)
- Default mode on mobile devices
- Fully accessible and SEO-friendly

**Toggle**: Users can switch between modes anytime

---

## Content Structure

### Main Sections
1. **About**: Photo, bio, current role, interests
2. **Experience**: Work history with W2 job highlighted
3. **Timeline**: Visual timeline of career with accomplishment nodes (separate from resume)
4. **Projects**: Personal projects with descriptions, tech stack, links
5. **Skills**: Technologies organized by category (languages, frameworks, tools, specialties)
6. **Resume**: Downloadable PDF + inline view option
7. **Contact**: Email, GitHub, LinkedIn, other links

### SMB Business Considerations
- You run a B2B IT consulting business (local small businesses)
- **No conflict** with W2 job
- **Risk concern**: Don't want to link SMB website initially
- **Future option**: Architecture supports linking when comfortable
- **Implementation**: Feature flag to hide/show SMB content

---

## Configuration Architecture

### Main Config Structure (`src/config/content.ts`)

```typescript
export interface SiteConfig {
  personal: PersonalInfo;
  experience: Experience[];
  timeline: TimelineNode[];
  projects: Project[];
  skills: SkillsConfig;
  resume: ResumeConfig;
  social: SocialLinks;
  seo: SEOConfig;
  features: FeatureFlags;
}

interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  photo: {
    url: string;          // "/assets/photo.jpg"
    alt: string;
  };
  location: string;       // "City, State" (optional, for SEO)
  bio: string[];          // Array of paragraphs
  interests: string[];
  pronouns?: string;
}

interface Experience {
  id: string;
  company: string;
  role: string;
  type: 'w2' | 'contract' | 'smb';  // Future: can filter out 'smb'
  period: {
    start: string;        // "2020-01" (YYYY-MM format for sorting)
    end: string | 'present';
  };
  displayPeriod: string;  // "Jan 2020 - Present"
  location?: string;
  description: string[];  // Bullet points
  technologies: string[];
  accomplishments: string[];
  link?: string;          // Future: SMB website link (optional)
  hidden?: boolean;       // Future: hide SMB entry
}

interface TimelineNode {
  id: string;
  date: string;           // "2023-06" for sorting
  displayDate: string;    // "June 2023"
  title: string;
  category: 'career' | 'education' | 'achievement' | 'certification';
  company?: string;
  description: string;
  icon?: string;          // emoji or icon identifier
  link?: string;
}

interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string[];
  tech: string[];
  features?: string[];
  link?: string;
  github?: string;
  image?: string;
  status: 'active' | 'archived' | 'in-progress';
  year: string;
  hidden?: boolean;       // For SMB projects if needed
}

interface SkillsConfig {
  languages: SkillCategory;
  frameworks: SkillCategory;
  tools: SkillCategory;
  specialties: SkillCategory;
}

interface SkillCategory {
  title: string;
  items: Skill[];
}

interface Skill {
  name: string;
  level?: 'expert' | 'proficient' | 'familiar';
  years?: number;
  icon?: string;
}

interface ResumeConfig {
  pdfUrl: string;         // "/assets/resume.pdf"
  lastUpdated: string;    // "2024-12-15"
  filename: string;       // "Abram_Stamper_Resume.pdf"
  versions?: {            // Future: multiple resume versions
    [key: string]: string;
  };
}

interface SocialLinks {
  email: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  portfolio?: string;     // Future: SMB website
  other?: {
    name: string;
    url: string;
    icon?: string;
  }[];
}

interface SEOConfig {
  title: string;          // "Abram Stamper - Senior Software Engineer"
  description: string;
  keywords: string[];
  ogImage: string;        // "/assets/og-image.jpg"
  twitterHandle?: string;
  canonicalUrl: string;   // "https://abramstamper.com"
}

interface FeatureFlags {
  showTimeline: boolean;
  showProjects: boolean;
  showBlog: boolean;      // Future
  showSMBLink: boolean;   // Future: toggle SMB website link
  enableAnalytics: boolean;
}
```

### Theme Configuration (`src/config/themes.ts`)

```typescript
export interface Theme {
  id: string;
  name: string;
  displayName: string;
  description: string;
  colors: {
    bg: string;
    text: string;
    prompt: string;
    accent: string;
    error: string;
    success: string;
    link: string;
  };
  effects: {
    scanlines: boolean;
    glow: boolean;
    glowIntensity?: number;     // 0-1
    cursorBlink: 'fast' | 'slow' | 'none';
    cursorStyle: 'block' | 'underline' | 'bar';
    textShadow: boolean;
  };
  font: {
    family: string;
    size: string;
    lineHeight: string;
  };
  accessibility: {
    contrastRatio: number;      // WCAG compliance level
    reducedMotion: boolean;
  };
}
```

### Available Themes
1. **Green (Classic CRT)** - `#00ff00` on black, scanlines, phosphor glow (default)
2. **Amber** - `#ffb000` on black, warm retro feel
3. **Black & White (Modern)** - `#ffffff` on `#1e1e1e`, no scanlines, sharp LCD aesthetic
4. **Blue** - `#00aaff` on dark blue, cool hacker vibe
5. **High Contrast** - WCAG AAA compliant, accessibility-first
6. **Pride/Rainbow** - Animated gradient text, playful and inclusive
7. **Matrix** - Green rain effect on black (subtle background animation)

**Theme-Effect Relationship**:
- Green theme → scanlines (emblematic of CRT monitors)
- Black & White → no scanlines (modern LCD panels)
- High Contrast → minimal effects, max readability
- User can override in settings

---

## Directory Structure

```
portfolio-terminal/
├── public/
│   ├── assets/
│   │   ├── photo.jpg              # Personal photo
│   │   ├── resume.pdf             # Resume PDF
│   │   └── og-image.jpg           # Social media preview image
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── terminal/
│   │   │   ├── Terminal.tsx
│   │   │   ├── TerminalOutput.tsx
│   │   │   ├── TerminalInput.tsx
│   │   │   ├── TerminalPrompt.tsx
│   │   │   ├── CommandParser.tsx
│   │   │   └── ascii/
│   │   │       ├── Banner.tsx
│   │   │       ├── Train.tsx       # sl command
│   │   │       ├── Cowsay.tsx
│   │   │       ├── Matrix.tsx
│   │   │       ├── Pong.tsx
│   │   │       └── Snake.tsx
│   │   ├── nav/
│   │   │   ├── Navigation.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Timeline.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Skills.tsx
│   │   │   └── Contact.tsx
│   │   ├── shared/
│   │   │   ├── ThemeProvider.tsx
│   │   │   ├── ModeToggle.tsx
│   │   │   ├── SEO.tsx
│   │   │   └── Analytics.tsx
│   │   └── layout/
│   │       ├── Layout.tsx
│   │       └── Footer.tsx
│   ├── hooks/
│   │   ├── useTerminal.ts
│   │   ├── useTheme.ts
│   │   ├── useKeyboard.ts
│   │   ├── useLocalStorage.ts
│   │   └── useAnalytics.ts
│   ├── lib/
│   │   ├── commands/
│   │   │   ├── parser.ts
│   │   │   ├── handlers.ts
│   │   │   ├── autocomplete.ts
│   │   │   └── easter-eggs.ts
│   │   ├── themes.ts
│   │   ├── utils.ts
│   │   └── analytics.ts
│   ├── config/
│   │   ├── content.ts              # Type definitions
│   │   ├── themes.ts               # Theme configurations
│   │   └── data/
│   │       └── site-data.ts        # Actual content data
│   ├── styles/
│   │   ├── globals.css
│   │   ├── terminal-effects.css    # Scanlines, glow, CRT effects
│   │   └── themes.css
│   ├── types/
│   │   ├── config.ts
│   │   ├── commands.ts
│   │   └── theme.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── tests/
│   ├── unit/
│   │   ├── commands.test.ts
│   │   ├── parser.test.ts
│   │   ├── autocomplete.test.ts
│   │   └── utils.test.ts
│   ├── integration/
│   │   └── terminal-flow.test.tsx
│   └── e2e/                        # Optional
│       └── navigation.spec.ts
├── .github/
│   └── workflows/
│       ├── ci.yml                  # Lint, test, build
│       └── deploy.yml              # Deploy to Apache
├── index.html
├── vite.config.ts
├── vitest.config.ts
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## Testing Strategy

### Coverage Goals
- **Command logic**: 100%
- **Components**: 80%+
- **Overall**: 80%+

### Unit Tests (Vitest)
Test business logic:
- Command parser logic
- Autocomplete algorithm
- Theme switching
- localStorage persistence
- All command handlers

Example:
```typescript
// tests/unit/parser.test.ts
describe('Command Parser', () => {
  test('parses simple command', () => {
    expect(parseCommand('help')).toEqual({ cmd: 'help', args: [] });
  });
  
  test('parses command with arguments', () => {
    expect(parseCommand('cat about')).toEqual({ 
      cmd: 'cat', 
      args: ['about'] 
    });
  });
  
  test('handles unknown commands', () => {
    expect(parseCommand('invalid')).toEqual({ 
      cmd: 'invalid', 
      args: [],
      error: 'Command not found' 
    });
  });
});
```

### Component Tests (React Testing Library)
Test user interactions:
- Terminal input/output
- Navigation components
- Theme provider
- Mode toggle

Example:
```typescript
// tests/integration/terminal-flow.test.tsx
describe('Terminal Flow', () => {
  test('displays help on help command', async () => {
    render(<Terminal />);
    const input = screen.getByRole('textbox');
    
    await userEvent.type(input, 'help{enter}');
    
    expect(screen.getByText(/available commands/i)).toBeInTheDocument();
  });
  
  test('switches themes', async () => {
    render(<Terminal />);
    const input = screen.getByRole('textbox');
    
    await userEvent.type(input, 'theme amber{enter}');
    
    expect(screen.getByTestId('terminal')).toHaveClass('theme-amber');
  });
});
```

### E2E Tests (Optional - Playwright)
Test full user journeys:
- Terminal → nav → back
- Command sequences
- Theme switching persistence
- Mobile responsive behavior

---

## CI/CD Pipeline

### GitHub Actions CI (`.github/workflows/ci.yml`)
```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test:coverage
      - uses: codecov/codecov-action@v3
  
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/
```

### GitHub Actions CD (`.github/workflows/deploy.yml`)
```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      
      # Option 1: Deploy via SCP
      - name: Deploy to Apache
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          source: "dist/*"
          target: "/var/www/html"
          strip_components: 1
      
      # Option 2: Deploy via rsync (more efficient)
      - name: Deploy via rsync
        run: |
          rsync -avz --delete dist/ ${{ secrets.USERNAME }}@${{ secrets.HOST }}:/var/www/html/
```

**Secrets to configure in GitHub**:
- `HOST`: Apache server hostname/IP
- `USERNAME`: SSH username
- `SSH_KEY`: Private SSH key for authentication

---

## Accessibility & SEO

### ARIA Compliance

#### Terminal Mode
- `role="log"` for output area (announces new content to screen readers)
- `aria-live="polite"` for command results
- `aria-label` for all interactive elements
- Keyboard trap handled properly (Esc to exit terminal focus)
- Focus management for mode switching
- Skip link to bypass terminal interface

#### Nav Mode
- Semantic HTML (`<nav>`, `<main>`, `<article>`, `<section>`)
- Skip links ("Skip to content")
- Proper heading hierarchy (h1 → h2 → h3)
- Alt text for photo and images
- ARIA labels for icon-only buttons
- Form labels for input fields

### Accessibility Features
- **Reduced motion**: Respect `prefers-reduced-motion` CSS media query
- **High contrast mode**: Detect system preference + manual theme override
- **Configurable animations**: Store preference in localStorage (no UI toggle needed)
- **Screen reader**: All content readable in both terminal and nav modes
- **Keyboard navigation**: Full site usable without mouse
- **Focus indicators**: Clear visual focus states
- **Color contrast**: WCAG AA minimum (AAA for high contrast theme)

### SEO Strategy

#### Pre-rendering
- Use vite-plugin-ssr or vite-ssg
- Generate static HTML for all routes at build time
- Search engines see full content immediately
- Client-side hydration after initial load

#### Meta Tags
```html
<title>Abram Stamper - Senior Software Engineer</title>
<meta name="description" content="Senior Software Engineer specializing in full-stack development..." />
<meta name="keywords" content="Software Engineer, React, Node.js, Python, TypeScript..." />

<!-- Open Graph -->
<meta property="og:title" content="Abram Stamper - Senior Software Engineer" />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://abramstamper.com/assets/og-image.jpg" />
<meta property="og:url" content="https://abramstamper.com" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="..." />
```

#### Structured Data (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Abram Stamper",
  "jobTitle": "Senior Software Engineer",
  "url": "https://abramstamper.com",
  "sameAs": [
    "https://github.com/...",
    "https://linkedin.com/in/..."
  ]
}
```

#### Technical SEO
- Semantic HTML throughout
- Internal linking strategy
- Sitemap.xml (auto-generated)
- Robots.txt
- Canonical URLs
- Fast page load (<3s)
- Mobile-first responsive design
- Image optimization (WebP with fallbacks)
- Lazy loading for non-critical images

### Performance Targets
- **Lighthouse Performance**: >90
- **Lighthouse Accessibility**: 100
- **Lighthouse SEO**: 100
- **Lighthouse Best Practices**: >90
- **Bundle size**: <200kb gzipped
- **First Contentful Paint**: <1.5s
- **Time to Interactive**: <3s

---

## Responsive Design

### Breakpoints
- **Mobile**: <640px
  - Default to nav mode (terminal available via toggle)
  - Simplified ASCII art (or hide completely)
  - Stack layout for all content
  - Touch-optimized buttons (min 44x44px)
  - Larger font sizes
  
- **Tablet**: 640-1024px
  - Both modes fully functional
  - Terminal side-by-side with toggle option
  - Two-column layouts where appropriate
  
- **Desktop**: >1024px
  - Default terminal mode
  - Full ASCII art and effects
  - CRT effects at full quality
  - Multi-column layouts

### Mobile Considerations
- Virtual keyboard handling for terminal input
- Prevent zoom on input focus (`font-size: 16px` minimum)
- Swipe gestures for navigation (optional enhancement)
- Reduced scanline effects for better mobile performance
- Touch-friendly command suggestions
- Landscape orientation support

---

## Performance Optimizations

### Code Splitting
```typescript
// Lazy load games and heavy ASCII art
const Pong = lazy(() => import('./components/terminal/ascii/Pong'));
const Snake = lazy(() => import('./components/terminal/ascii/Snake'));
const Matrix = lazy(() => import('./components/terminal/ascii/Matrix'));
```

### Image Optimization
- Use WebP format with JPEG/PNG fallbacks
- Provide srcset for responsive images
- Lazy load below-the-fold images
- Compress all images
- Use appropriate dimensions

### Font Loading
- Subset monospace fonts (only characters needed)
- Use `font-display: swap` for better perceived performance
- Preload critical fonts

### CSS Optimization
- Tailwind CSS purging (remove unused styles)
- Critical CSS inlining (above-the-fold styles)
- Minimize custom CSS

### Bundle Optimization
- Tree-shaking (Vite handles automatically)
- Code splitting by route
- Lazy load non-critical components
- Use production builds

---

## Easter Egg Details

### `whoami` Command
Output a personal poem/statement. Options:

**Option 1 (Poem)**:
```
A builder of systems, a solver of puzzles,
A senior engineer where code often tussles.
In Node, Python, React, I make my mark,
Turning coffee and keystrokes into digital art.
```

**Option 2 (Profound)**:
```
Just a person who teaches sand to think.
```

**Option 3 (Technical)**:
```
username: abram
groups: software-engineer, coffee-addict, terminal-enthusiast
shell: /bin/zsh
status: perpetually learning
```

### `sudo` Command
Several behavior options:

**Option 1: Playful Denial**
```
> sudo make-me-a-sandwich
[sudo] password for guest: 
Sorry, you don't have sudo privileges on this server.
But I can show you my sandwich-making blog post instead?
```

**Option 2: Unlock Secret Theme**
```
> sudo theme unlock
[sudo] password for guest: *****
Unlocked: 'synthwave' theme
Try: theme synthwave
```

**Option 3: Show "Root" Content**
```
> sudo cat secrets
Access granted.
Favorite debugging technique: console.log('here')
Tabs vs Spaces: [your preference]
Most embarrassing bug: [short funny story]
```

### ASCII Art Commands
- **`sl`**: Classic "Steam Locomotive" that chugs across screen (typo of `ls`)
- **`cowsay <text>`**: ASCII cow says your text in speech bubble
- **`coffee`**: ASCII coffee cup + inspirational coding quote
- **`matrix`**: Brief matrix rain effect overlay

### Simple Games
- **`pong`**: Two-player ASCII pong (WASD vs Arrow keys)
- **`snake`**: Classic snake game in terminal
- Both games should be skippable (Esc key)
- Display high scores in localStorage

---

## SMB Website Integration (Future)

### Current State
- You run a B2B IT consulting business
- Don't want to link SMB website initially (professional separation concern)
- Architecture should support linking in future

### Implementation Plan
When ready to add SMB link:

1. **Update feature flag**:
```typescript
features: {
  showSMBLink: true,  // Enable SMB content
}
```

2. **Add SMB link**:
```typescript
social: {
  portfolio: "https://yoursmb.com",  // Add link
}
```

3. **Optional: Filter experience** (if SMB work is in experience list):
```typescript
const displayExperience = config.experience.filter(exp => 
  !exp.hidden || features.showSMBLink
);
```

4. **Optional: Add dedicated SMB section**:
- New section in nav mode
- Terminal command: `cat business`
- Brief description with external link

### Architecture Support
- `type: 'smb'` field in Experience interface
- `hidden: boolean` field in Experience/Project interfaces
- Feature flag: `showSMBLink: boolean`
- All handled via config, no code changes needed

---

## Open Questions & Decisions Needed

### Content Population
- Need to extract data from current website source code
- Need resume PDF for `/public/assets/`
- Need personal photo for `/public/assets/`
- Decide on `whoami` poem/message
- Decide on `sudo` command behavior

### Design Decisions
- Finalize theme color schemes (7 themes planned)
- Choose monospace font (Fira Code, JetBrains Mono, Source Code Pro?)
- ASCII art for welcome banner
- Command prompt style (`user@host:~$` or simpler?)

### Command Behavior
- How sophisticated should autocomplete be?
- Should games save high scores?
- Additional easter eggs beyond current list?
- Error messages tone (technical vs playful?)

### Technical Decisions
- Specific SSG plugin (vite-plugin-ssr vs vite-ssg)?
- Image format preferences (WebP + fallback)?
- Font loading strategy (self-host vs CDN)?

---

## Next Steps

### Phase 1: Setup & Content
1. Extract content from existing website source code
2. Get resume PDF and personal photo
3. Populate `src/config/data/site-data.ts` with real data
4. Finalize theme color schemes
5. Write `whoami` poem and decide on `sudo` behavior

### Phase 2: Core Implementation
1. Initialize Vite + React + TypeScript project
2. Set up Tailwind CSS
3. Implement theme system
4. Build terminal components
5. Implement command parser and handlers
6. Build nav mode components
7. Implement mode toggle

### Phase 3: Features & Polish
1. Add all easter egg commands
2. Implement ASCII art and games
3. Add animations and effects (scanlines, glow)
4. Implement autocomplete
5. Add keyboard navigation

### Phase 4: Optimization
1. Set up testing (unit + component)
2. Achieve >80% test coverage
3. Implement SSG for SEO
4. Optimize performance (code splitting, lazy loading)
5. Lighthouse audit and optimization

### Phase 5: Deployment
1. Set up GitHub Actions CI/CD
2. Configure Apache deployment
3. Test deployment pipeline
4. Deploy to production
5. Submit sitemap to Google Search Console

---

## Resources & References

### Documentation
- Vite: https://vitejs.dev/
- React: https://react.dev/
- Tailwind CSS: https://tailwindcss.com/
- Vitest: https://vitest.dev/
- React Testing Library: https://testing-library.com/react

### Inspiration
- Terminal portfolio sites (for reference)
- Classic Unix/Linux command aesthetics
- Retro CRT monitor effects

### Tools
- Lighthouse (performance auditing)
- Chrome DevTools (debugging)
- React DevTools (component debugging)
- GitHub Actions (CI/CD)

---

## Project Values & Principles

### Code Quality
- TypeScript for type safety
- Unit tests for business logic
- Component tests for UI
- Linting and formatting (ESLint + Prettier)
- Code reviews via PRs

### User Experience
- Fast, responsive, accessible
- Works without JavaScript (nav mode pre-rendered)
- Mobile-first design
- Clear error messages
- Intuitive navigation

### Professional Presentation
- Clean, modern design
- Shows technical skills
- Demonstrates attention to detail
- Balance professionalism with personality
- SEO optimized for discoverability

---

## Summary

This is a comprehensive portfolio website project that showcases both technical skills and personality through:
- **Dual interface**: Terminal mode (primary) + Nav mode (fallback)
- **Modern stack**: Vite + React + TypeScript + Tailwind
- **SEO optimized**: Pre-rendered static site generation
- **Fully accessible**: WCAG compliant, screen reader friendly
- **Well tested**: >80% code coverage with Vitest
- **CI/CD ready**: GitHub Actions for automated deployment
- **Future-proof**: Architecture supports SMB link when ready

The terminal interface demonstrates technical knowledge while providing a unique, memorable experience. The traditional nav mode ensures accessibility and usability for all users.

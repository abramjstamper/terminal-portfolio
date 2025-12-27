import { siteConfig } from '@/config/data/site-data'

function App() {
  return (
    <div className="min-h-screen bg-terminal-bg p-8 font-mono">
      {/* Skip link for accessibility */}
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <main id="main" className="max-w-4xl mx-auto">
        {/* ASCII Banner */}
        <pre className="text-terminal-green text-xs sm:text-sm mb-8 text-glow-sm">
{String.raw`
    _   _                       ____  _
   / \ | |__  _ __ __ _ _ __ __/ ___|| |_ __ _ _ __ ___  _ __   ___ _ __
  / _ \| '_ \| '__/ _' | '_ ' _\___ \| __/ _' | '_ ' _ \| '_ \ / _ \ '__|
 / ___ \ |_) | | | (_| | | | | |___) | || (_| | | | | | | |_) |  __/ |
/_/   \_\.__/|_|  \__,_|_| |_| |____/ \__\__,_|_| |_| |_| .__/ \___|_|
                                                       |_|
`}
        </pre>

        {/* Welcome message */}
        <div className="text-terminal-green space-y-4">
          <p className="text-glow-sm">
            <span className="text-terminal-amber">guest@portfolio</span>
            <span className="text-white">:</span>
            <span className="text-terminal-blue">~</span>
            <span className="text-white">$ </span>
            <span>cat welcome.txt</span>
          </p>

          <div className="pl-4 border-l-2 border-terminal-green/30">
            <p className="text-lg font-bold">{siteConfig.personal.name}</p>
            <p className="text-terminal-amber">{siteConfig.personal.title}</p>
            <p className="mt-2 text-gray-400">{siteConfig.personal.tagline}</p>
          </div>

          <p className="text-glow-sm mt-8">
            <span className="text-terminal-amber">guest@portfolio</span>
            <span className="text-white">:</span>
            <span className="text-terminal-blue">~</span>
            <span className="text-white">$ </span>
            <span className="cursor"></span>
          </p>

          <p className="text-gray-500 text-sm mt-8">
            Terminal interface coming soon. Type <span className="text-terminal-green">help</span> for available commands.
          </p>
        </div>
      </main>

      {/* Scanlines effect */}
      <div className="scanlines" aria-hidden="true"></div>
    </div>
  )
}

export default App

import { useMode } from '../../contexts/ModeContext'
import { siteData } from '../../config/data/site-data'

export function Footer() {
  const { toggleMode } = useMode()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} {siteData.name}. Built with React + TypeScript.
          </p>
          <button
            onClick={toggleMode}
            className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1"
          >
            <span className="font-mono">{'>'}_</span>
            Switch to Terminal
          </button>
        </div>
      </div>
    </footer>
  )
}

import { siteData } from '../../config/data/site-data'

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
          {siteData.name}
        </h1>
        <p className="text-xl sm:text-2xl text-gray-600 mb-8">
          {siteData.title}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={siteData.resume.url}
            download
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            View Resume
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition-colors font-medium"
          >
            Contact Me
          </a>
        </div>
        <div className="mt-16 animate-bounce">
          <a href="#about" className="text-gray-400 hover:text-gray-600">
            <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

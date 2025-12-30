import { siteData } from '../../config/data/site-data'

export function About() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          About Me
        </h2>
        <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300">
          {siteData.about.bio.split('\n').map((paragraph, i) => (
            <p key={i} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {siteData.about.highlights.map((highlight, i) => (
            <div
              key={i}
              className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 text-center"
            >
              <span className="text-gray-700 dark:text-gray-200 font-medium">{highlight}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { siteData } from '../../config/data/site-data'

export function Skills() {
  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteData.skills.map((category, index) => (
            <div
              key={index}
              className="p-6 bg-gray-50 rounded-lg border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 text-sm font-medium bg-white text-gray-700 rounded-full border border-gray-200 hover:border-gray-300 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

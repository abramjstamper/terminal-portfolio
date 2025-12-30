import { useState } from 'react'
import { siteData } from '../../config/data/site-data'

export function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Experience
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 transform md:-translate-x-1/2" />

          {siteData.experience.map((exp, index) => (
            <div
              key={index}
              className={`relative mb-8 ${
                index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'
              }`}
            >
              {/* Timeline dot */}
              <div
                className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-4 border-white transform -translate-x-1/2 z-10 ${
                  expandedIndex === index ? 'bg-gray-900' : 'bg-gray-400'
                }`}
                style={{ top: '1.5rem' }}
              />

              {/* Card */}
              <div
                className={`ml-12 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                }`}
              >
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className={`w-full text-left p-6 bg-white rounded-lg shadow-sm border transition-all ${
                    expandedIndex === index
                      ? 'border-gray-300 shadow-md'
                      : 'border-gray-100 hover:border-gray-200 hover:shadow'
                  }`}
                >
                  <div className={`${index % 2 === 0 ? 'md:text-right' : ''}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {exp.title}
                      </h3>
                      <svg
                        className={`w-5 h-5 text-gray-400 transition-transform ${
                          expandedIndex === index ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    <p className="text-gray-600 font-medium">{exp.company}</p>
                    <p className="text-sm text-gray-500">{exp.period}</p>
                  </div>

                  {/* Expanded content */}
                  {expandedIndex === index && (
                    <div className={`mt-4 pt-4 border-t border-gray-100 ${index % 2 === 0 ? 'md:text-left' : ''}`}>
                      <p className="text-gray-600 mb-4">{exp.description}</p>
                      <ul className="space-y-2 mb-4">
                        {exp.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-600">
                            <span className="text-green-500 mt-1">•</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

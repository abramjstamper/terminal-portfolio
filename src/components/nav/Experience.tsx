import { useState, useRef, useEffect } from 'react'
import { siteData } from '../../config/data/site-data'

// Company logo mappings with dark mode settings
const COMPANY_LOGOS: Record<string, { url: string; darkInvert?: boolean; scale?: number }> = {
  'Palo Alto Networks': { url: '/logos/paloalto.svg' },
  'Aptiv Connected Services': { url: '/logos/aptiv.svg', darkInvert: true },
  'Aptiv PLC': { url: '/logos/aptiv.svg', darkInvert: true },
  'Vibenomics (Fuzic Media)': { url: '/logos/vibenomics.svg' },
  'Taylor University': { url: '/logos/taylor.svg', darkInvert: true, scale: 1.5 },
}

const NODE_WIDTH = 180

export function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isScrollingLeft, setIsScrollingLeft] = useState(false)
  const [isScrollingRight, setIsScrollingRight] = useState(false)
  const timelineRef = useRef<HTMLDivElement>(null)
  const scrollIntervalRef = useRef<number | null>(null)

  const activeIndex = expandedIndex ?? hoveredIndex
  const activeExp = activeIndex !== null ? siteData.experience[activeIndex] : null

  const handleNodeClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  // Scroll one full node on click
  const scrollOneNode = (direction: 'left' | 'right') => {
    // Stop continuous scroll during click animation
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current)
      scrollIntervalRef.current = null
    }

    if (timelineRef.current) {
      timelineRef.current.scrollBy({
        left: direction === 'left' ? -NODE_WIDTH : NODE_WIDTH,
        behavior: 'smooth',
      })
    }

    // Resume continuous scroll after animation if still hovering
    setTimeout(() => {
      if ((direction === 'left' && isScrollingLeft) || (direction === 'right' && isScrollingRight)) {
        startContinuousScroll(direction)
      }
    }, 300)
  }

  // Start continuous scroll
  const startContinuousScroll = (direction: 'left' | 'right') => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current)
    }
    scrollIntervalRef.current = window.setInterval(() => {
      if (timelineRef.current) {
        timelineRef.current.scrollBy({
          left: direction === 'left' ? -2 : 2,
          behavior: 'auto',
        })
      }
    }, 16)
  }

  // Slow continuous scroll on hover (with delay to allow click first)
  useEffect(() => {
    if (isScrollingLeft || isScrollingRight) {
      // Small delay before starting continuous scroll to allow click to register first
      const timeoutId = setTimeout(() => {
        startContinuousScroll(isScrollingLeft ? 'left' : 'right')
      }, 200)

      return () => {
        clearTimeout(timeoutId)
        if (scrollIntervalRef.current) {
          clearInterval(scrollIntervalRef.current)
          scrollIntervalRef.current = null
        }
      }
    }

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current)
        scrollIntervalRef.current = null
      }
    }
  }, [isScrollingLeft, isScrollingRight])

  // Placeholder logo component
  const CompanyLogo = ({ company }: { company: string }) => {
    const logoInfo = COMPANY_LOGOS[company]
    const initials = company.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

    // Color based on company name hash for variety
    const colors = [
      'bg-blue-600', 'bg-green-600', 'bg-purple-600',
      'bg-orange-600', 'bg-red-600', 'bg-teal-600'
    ]
    const colorIndex = company.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length

    if (logoInfo) {
      const scaleStyle = logoInfo.scale ? { transform: `scale(${logoInfo.scale})` } : undefined
      return (
        <div className="h-10 w-20 flex items-center justify-center">
          <img
            src={logoInfo.url}
            alt={`${company} logo`}
            className={`max-h-10 max-w-20 object-contain ${logoInfo.darkInvert ? 'dark:invert' : ''}`}
            style={scaleStyle}
            onError={(e) => {
              // Fallback to initials if logo fails to load
              e.currentTarget.style.display = 'none'
              e.currentTarget.nextElementSibling?.classList.remove('hidden')
            }}
          />
        </div>
      )
    }

    return (
      <div className={`w-10 h-10 ${colors[colorIndex]} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
        {initials}
      </div>
    )
  }

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          Experience
        </h2>

        {/* Desktop: Horizontal Scrollable Timeline */}
        <div className="hidden md:block">
          {/* Timeline with scroll buttons */}
          <div className="relative">
            {/* Left scroll button */}
            <button
              onClick={() => scrollOneNode('left')}
              onMouseEnter={() => setIsScrollingLeft(true)}
              onMouseLeave={() => setIsScrollingLeft(false)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-white dark:bg-gray-700 rounded-full shadow-md border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 hover:shadow-lg transition-all -ml-4"
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right scroll button */}
            <button
              onClick={() => scrollOneNode('right')}
              onMouseEnter={() => setIsScrollingRight(true)}
              onMouseLeave={() => setIsScrollingRight(false)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-white dark:bg-gray-700 rounded-full shadow-md border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 hover:shadow-lg transition-all -mr-4"
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Scrollable timeline container */}
            <div
              ref={timelineRef}
              className="overflow-x-auto scrollbar-hide scroll-smooth px-8"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="relative min-w-max py-4">
                {/* Horizontal line */}
                <div
                  className="absolute top-8 h-0.5 bg-gray-300 dark:bg-gray-600"
                  style={{
                    left: '60px',
                    right: '60px',
                  }}
                />

                {/* Timeline nodes */}
                <div className="flex">
                  {siteData.experience.map((exp, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center cursor-pointer group px-4"
                      style={{ minWidth: `${NODE_WIDTH}px` }}
                      onClick={() => handleNodeClick(index)}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {/* Node dot */}
                      <div
                        className={`relative z-10 w-5 h-5 rounded-full border-4 border-gray-50 dark:border-gray-800 transition-all duration-200 ${
                          activeIndex === index
                            ? 'bg-gray-900 dark:bg-white scale-125 shadow-lg'
                            : 'bg-gray-400 dark:bg-gray-500 group-hover:bg-gray-600 dark:group-hover:bg-gray-300 group-hover:scale-110'
                        }`}
                      />

                      {/* Brief info card */}
                      <div
                        className={`mt-4 text-center transition-all duration-200 p-3 rounded-lg w-full ${
                          activeIndex === index
                            ? 'bg-white dark:bg-gray-700 shadow-md border border-gray-200 dark:border-gray-600'
                            : 'group-hover:bg-white dark:group-hover:bg-gray-700 group-hover:shadow-sm'
                        }`}
                      >
                        {/* Company logo */}
                        <div className="flex justify-center mb-2">
                          <CompanyLogo company={exp.company} />
                        </div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">
                          {exp.company}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mt-0.5 h-8">
                          {exp.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {exp.period.split(' - ')[0]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Expanded detail card */}
          <div
            className={`mt-8 transition-all duration-300 ease-in-out overflow-hidden ${
              activeExp ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            {activeExp && (
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <CompanyLogo company={activeExp.company} />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {activeExp.title}
                      </h3>
                      <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
                        {activeExp.company}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 md:mt-0">
                    {activeExp.period}
                  </p>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {activeExp.description}
                </p>

                <ul className="space-y-2 mb-4">
                  {activeExp.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                      <span className="text-green-500 mt-0.5">•</span>
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Tech:</span>
                  {activeExp.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile: Accordion style for all experiences */}
        <div className="md:hidden space-y-3">
          {siteData.experience.map((exp, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full p-4 text-left flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <CompanyLogo company={exp.company} />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{exp.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{exp.company}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{exp.period}</p>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-400 dark:text-gray-500 transition-transform flex-shrink-0 ${
                    expandedIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Expanded content */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-300 my-3">{exp.description}</p>
                  <ul className="space-y-2 mb-4">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <span className="text-green-500 mt-0.5">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

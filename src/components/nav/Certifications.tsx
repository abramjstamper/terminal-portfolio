import { siteData } from '../../config/data/site-data'
import { useNavTheme } from '../../contexts/NavThemeContext'

// Logo mappings for certifications with light and dark mode URLs
const CERT_LOGOS: Record<string, { light: string; dark?: string; scale?: number }> = {
  'US Patent': { light: '/logos/patent.svg', dark: '/logos/patent-dark.svg' },
  'Microsoft': { light: '/logos/azure.svg' },
  'The Linux Foundation': { light: '/logos/linuxfoundation.svg', dark: '/logos/linuxfoundation-dark.svg' },
  'SmallBox': { light: '/logos/smallbox.svg' },
  'Security Journey': { light: '/logos/securityjourney.svg', dark: '/logos/securityjourney-dark.svg', scale: 1.3 },
}

// Get logo info from issuer name
const getLogoInfo = (issuer: string): { light: string; dark?: string; scale?: number } | null => {
  for (const [key, info] of Object.entries(CERT_LOGOS)) {
    if (issuer.includes(key)) return info
  }
  return null
}

export function Certifications() {
  const { colorScheme } = useNavTheme()

  return (
    <section id="certifications" className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Certifications & Patents
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {siteData.certifications.map((cert, index) => {
            const logoInfo = getLogoInfo(cert.issuer)
            return (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-600 p-2">
                  {logoInfo ? (
                    <img
                      src={colorScheme === 'dark' && logoInfo.dark ? logoInfo.dark : logoInfo.light}
                      alt={`${cert.issuer} logo`}
                      className="max-w-full max-h-full object-contain"
                      style={logoInfo.scale ? { transform: `scale(${logoInfo.scale})` } : undefined}
                    />
                  ) : cert.issuer.includes('Patent') ? (
                    <svg className="w-8 h-8 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ) : (
                    <svg className="w-8 h-8 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {cert.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">{cert.issuer}</p>
                  {cert.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{cert.description}</p>
                  )}
                  <div className="flex items-center gap-4 mt-3">
                    {cert.year && (
                      <span className="text-xs text-gray-400 dark:text-gray-500">{cert.year}</span>
                    )}
                    {cert.url && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        View
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
          })}
        </div>
      </div>
    </section>
  )
}

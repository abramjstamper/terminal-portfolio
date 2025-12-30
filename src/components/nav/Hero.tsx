import { useState, useEffect } from 'react'
import { siteData } from '../../config/data/site-data'

const TYPING_SPEED = 50
const DELETE_SPEED = 30
const PAUSE_DURATION = 3000

export function Hero() {
  const [displayText, setDisplayText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentPhrase = siteData.heroTypingPhrases[phraseIndex]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentPhrase.length) {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1))
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), PAUSE_DURATION)
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setPhraseIndex((prev) => (prev + 1) % siteData.heroTypingPhrases.length)
        }
      }
    }, isDeleting ? DELETE_SPEED : TYPING_SPEED)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, phraseIndex])

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
          {siteData.name}
        </h1>
        <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-6">
          {siteData.title}
        </p>

        {/* Animated code block */}
        <div className="mb-8 flex justify-center">
          <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 shadow-lg border border-gray-700 inline-block text-left min-w-[320px] sm:min-w-[400px]">
            {/* Terminal header dots */}
            <div className="flex gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            {/* Code content */}
            <div className="font-mono text-sm sm:text-base">
              <span className="text-gray-500">{'>'} </span>
              <span className="text-green-400">{displayText}</span>
              <span className="inline-block w-2 h-5 bg-green-400 ml-1 animate-pulse"></span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={siteData.resume.url}
            download
            className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors font-medium"
          >
            View Resume
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-lg hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors font-medium"
          >
            Contact Me
          </a>
        </div>
        <div className="mt-16 animate-bounce">
          <a href="#about" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

import { Header } from './Header'
import { Hero } from './Hero'
import { About } from './About'
import { Experience } from './Experience'
import { Skills } from './Skills'
import { Projects } from './Projects'
import { Certifications } from './Certifications'
import { Contact } from './Contact'
import { Footer } from './Footer'

export function NavSite() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        {__SHOW_PROJECTS__ && <Projects />}
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

import { siteData } from '../../config/data/site-data'
import { useNavTheme } from '../../contexts/NavThemeContext'

// Map skill names to Simple Icons slugs (https://simpleicons.org)
const SKILL_ICONS: Record<string, string> = {
  // AI & Automation
  'Claude Code': 'claude',
  'ChatGPT': 'openai',
  'Claude': 'claude',
  'Gemini': 'googlegemini',
  'MCP Servers': 'modelcontextprotocol',
  'Prompt Engineering': 'openai',
  // Tools
  'Git/GitHub': 'github',
  'VS Code': 'visualstudiocode',
  'PyCharm': 'pycharm',
  'Bash': 'gnubash',
  'Linux/Ubuntu': 'ubuntu',
  'Jira': 'jira',
  'Confluence': 'confluence',
  'Markdown': 'markdown',
  // Design
  'Figma': 'figma',
  'Sketch': 'sketch',
  'Adobe Photoshop': 'adobephotoshop',
  'Adobe Illustrator': 'adobeillustrator',
  'Final Cut Pro': 'apple',
  // Languages
  'Python 3.10+': 'python',
  'TypeScript': 'typescript',
  'JavaScript/ES6+': 'javascript',
  'Java': 'gradle',
  'SQL': 'postgresql',
  'Ruby': 'ruby',
  // Frontend
  'React': 'react',
  'Redux': 'redux',
  'HTML/CSS': 'html5',
  'Tailwind CSS': 'tailwindcss',
  'Material UI': 'mui',
  'Bootstrap': 'bootstrap',
  'Bulma': 'bulma',
  // Backend
  'FastAPI': 'fastapi',
  'Flask': 'flask',
  'NodeJS': 'nodedotjs',
  'Pydantic': 'pydantic',
  'Ruby on Rails': 'rubyonrails',
  'REST APIs': 'openapiinitiative',
  // Databases
  'PostgreSQL': 'postgresql',
  'MariaDB/MySQL': 'mysql',
  'MongoDB': 'mongodb',
  'Redis': 'redis',
  'Elasticsearch': 'elasticsearch',
  'SQLite': 'sqlite',
  // Cloud Platforms
  'AWS': 'icloud',
  'GCP': 'googlecloud',
  'Azure': 'icloud',
  'Digital Ocean': 'digitalocean',
  'Firebase': 'firebase',
  // Infrastructure
  'Kubernetes': 'kubernetes',
  'Helm': 'helm',
  'Docker': 'docker',
  'CI/CD': 'githubactions',
  'systemd': 'linux',
  'Raspberry Pi': 'raspberrypi',
  'Datadog': 'datadog',
  'NGINX': 'nginx'
}

function SkillIcon({ skill, isDark }: { skill: string; isDark: boolean }) {
  const iconSlug = SKILL_ICONS[skill]

  if (!iconSlug) {
    return null
  }

  // Simple Icons CDN with color - use white for dark mode, default color for light
  const iconUrl = isDark
    ? `https://cdn.simpleicons.org/${iconSlug}/ffffff`
    : `https://cdn.simpleicons.org/${iconSlug}`

  return (
    <img
      src={iconUrl}
      alt=""
      className="w-4 h-4 flex-shrink-0"
      loading="lazy"
      onError={(e) => {
        // Hide broken images
        e.currentTarget.style.display = 'none'
      }}
    />
  )
}

export function Skills() {
  const { colorScheme } = useNavTheme()
  const isDark = colorScheme === 'dark'

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteData.skills.map((category, index) => (
            <div
              key={index}
              className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full border-2 border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md hover:scale-105 transition-all duration-200 cursor-default"
                  >
                    <SkillIcon skill={skill} isDark={isDark} />
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

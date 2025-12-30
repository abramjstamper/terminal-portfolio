import type { CommandDefinition } from '../../types/terminal'
import { hasHelpFlag, formatHelp } from './parser'
import { themes, themeIds } from '../../config/themes'
import { siteData } from '../../config/data/site-data'
import { setTheme, getCurrentThemeId } from '../themeRegistry'

// ASCII art banner
const ASCII_BANNER = `
██╗    ██╗██╗  ██╗ ██████╗  █████╗ ███╗   ███╗██╗
██║    ██║██║  ██║██╔═══██╗██╔══██╗████╗ ████║██║
██║ █╗ ██║███████║██║   ██║███████║██╔████╔██║██║
██║███╗██║██╔══██║██║   ██║██╔══██║██║╚██╔╝██║██║
╚███╔███╔╝██║  ██║╚██████╔╝██║  ██║██║ ╚═╝ ██║██║
 ╚══╝╚══╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝
`

// Available sections
const SECTIONS = ['about', 'experience', 'skills', 'projects', 'certifications', 'contact', 'resume'] as const
type Section = typeof SECTIONS[number]

// Section content generators
function getSectionContent(section: Section): string {
  switch (section) {
    case 'about':
      return [
        siteData.about.bio,
        '',
        'Highlights:',
        ...siteData.about.highlights.map((h) => `  • ${h}`),
      ].join('\n')

    case 'experience':
      return siteData.experience
        .map((exp) => [
          `${exp.title} @ ${exp.company}`,
          `${exp.period}`,
          '',
          exp.description,
          '',
          ...exp.highlights.map((h) => `  • ${h}`),
          '',
          `Technologies: ${exp.technologies.join(', ')}`,
          '',
          '---',
        ].join('\n'))
        .join('\n')

    case 'skills':
      return siteData.skills
        .map((cat) => `${cat.name}:\n  ${cat.skills.join(', ')}`)
        .join('\n\n')

    case 'projects':
      return siteData.projects
        .map((proj) => {
          const lines = [proj.name, proj.description]
          if (proj.technologies.length > 0) {
            lines.push(`Technologies: ${proj.technologies.join(', ')}`)
          }
          if (proj.github) {
            lines.push(`GitHub: ${proj.github}`)
          }
          if (proj.demo) {
            lines.push(`Demo: ${proj.demo}`)
          }
          lines.push('')
          return lines.join('\n')
        })
        .join('\n')

    case 'contact': {
      const lines: string[] = []
      lines.push(`Email: ${siteData.contact.email}`)
      if (siteData.contact.github) {
        lines.push(`GitHub: ${siteData.contact.github}`)
      }
      if (siteData.contact.linkedin) {
        lines.push(`LinkedIn: ${siteData.contact.linkedin}`)
      }
      if (siteData.contact.website) {
        lines.push(`Website: ${siteData.contact.website}`)
      }
      return lines.join('\n')
    }

    case 'certifications':
      return siteData.certifications
        .map((cert) => {
          const lines = [`${cert.name}`]
          lines.push(`  Issued by: ${cert.issuer}`)
          if (cert.year) lines.push(`  Year: ${cert.year}`)
          if (cert.url) lines.push(`  URL: ${cert.url}`)
          return lines.join('\n')
        })
        .join('\n\n')

    case 'resume':
      return [
        `Resume available at: ${siteData.resume.url}`,
        `Last updated: ${siteData.resume.lastUpdated}`,
        '',
        "Use 'export' command to download.",
      ].join('\n')
  }
}

// Command definitions
export const commands: Record<string, CommandDefinition> = {
  help: {
    name: 'help',
    description: 'Display available commands',
    usage: 'help [command]',
    options: [],
    handler: (args) => {
      if (hasHelpFlag(args)) {
        return formatHelp('help', 'Display available commands', 'help [command]')
      }

      if (args.length > 0) {
        const cmdName = args[0]
        const cmd = commands[cmdName]
        if (cmd) {
          return formatHelp(cmd.name, cmd.description, cmd.usage, cmd.options)
        }
        return { error: `help: no help topics match '${cmdName}'` }
      }

      const helpText = [
        'Available commands:',
        '',
        ...Object.values(commands).map(
          (cmd) => `  ${cmd.name.padEnd(12)} ${cmd.description}`
        ),
        '',
        "Type 'help <command>' for more information on a specific command.",
      ]
      return { output: helpText.join('\n') }
    },
  },

  man: {
    name: 'man',
    description: 'Display manual page for a command',
    usage: 'man <command>',
    handler: (args) => {
      if (hasHelpFlag(args)) {
        return formatHelp('man', 'Display manual page for a command', 'man <command>')
      }

      if (args.length === 0) {
        return { error: 'What manual page do you want?' }
      }

      const cmdName = args[0]
      const cmd = commands[cmdName]
      if (!cmd) {
        return { error: `No manual entry for ${cmdName}` }
      }

      return formatHelp(cmd.name, cmd.description, cmd.usage, cmd.options)
    },
  },

  ls: {
    name: 'ls',
    description: 'List available sections',
    usage: 'ls [-l] [-a]',
    options: [
      { flag: '-l', description: 'Use long listing format' },
      { flag: '-a', description: 'Include hidden sections' },
    ],
    handler: (args) => {
      if (hasHelpFlag(args)) {
        return formatHelp('ls', 'List available sections', 'ls [-l] [-a]', [
          { flag: '-l', description: 'Use long listing format' },
          { flag: '-a', description: 'Include hidden sections' },
        ])
      }

      const longFormat = args.includes('-l')
      const showHidden = args.includes('-a')

      // Check for invalid section argument
      const nonFlagArgs = args.filter((a) => !a.startsWith('-'))
      if (nonFlagArgs.length > 0) {
        return { error: `ls: cannot access '${nonFlagArgs[0]}': Not a directory` }
      }

      let sections = [...SECTIONS]
      if (showHidden) {
        sections = [...sections, '.secrets']
      }

      if (longFormat) {
        const output = sections
          .map((s) => {
            const desc = s === '.secrets' ? 'Hidden easter eggs' : `${s.charAt(0).toUpperCase()}${s.slice(1)} section`
            return `-rw-r--r--  1 ${siteData.username}  staff  ${desc}`
          })
          .join('\n')
        return { output }
      }

      return { output: sections.join('  ') }
    },
  },

  cat: {
    name: 'cat',
    description: 'Display section content',
    usage: 'cat <section> [section...]',
    options: [{ flag: '-n', description: 'Number output lines' }],
    handler: (args) => {
      if (hasHelpFlag(args)) {
        return formatHelp('cat', 'Display section content', 'cat <section> [section...]', [
          { flag: '-n', description: 'Number output lines' },
        ])
      }

      const showLineNumbers = args.includes('-n')
      const sections = args.filter((a) => !a.startsWith('-'))

      if (sections.length === 0) {
        return { error: 'cat: missing operand' }
      }

      const outputs: string[] = []
      for (const section of sections) {
        if (!SECTIONS.includes(section as Section)) {
          return { error: `cat: ${section}: No such file or directory` }
        }
        outputs.push(getSectionContent(section as Section))
      }

      let output = outputs.join('\n\n')
      if (showLineNumbers) {
        output = output
          .split('\n')
          .map((line, i) => `${String(i + 1).padStart(6)}  ${line}`)
          .join('\n')
      }

      return { output }
    },
  },

  cd: {
    name: 'cd',
    description: 'Change directory (hint only)',
    usage: 'cd [section]',
    handler: (args) => {
      if (hasHelpFlag(args)) {
        return formatHelp('cd', 'Change directory (hint only)', 'cd [section]')
      }
      return { output: "Hint: Use 'cat <section>' to view section contents. Try 'ls' to see available sections." }
    },
  },

  pwd: {
    name: 'pwd',
    description: 'Print working directory',
    usage: 'pwd',
    handler: (args) => {
      if (hasHelpFlag(args)) {
        return formatHelp('pwd', 'Print working directory', 'pwd')
      }
      return { output: `/home/${siteData.username}` }
    },
  },

  clear: {
    name: 'clear',
    description: 'Clear the terminal screen',
    usage: 'clear',
    handler: (args) => {
      if (hasHelpFlag(args)) {
        return formatHelp('clear', 'Clear the terminal screen', 'clear')
      }
      return { clearScreen: true }
    },
  },

  history: {
    name: 'history',
    description: 'Show command history',
    usage: 'history [-c] [n]',
    options: [{ flag: '-c', description: 'Clear history' }],
    handler: (args, history) => {
      if (hasHelpFlag(args)) {
        return formatHelp('history', 'Show command history', 'history [-c] [n]', [
          { flag: '-c', description: 'Clear history' },
        ])
      }

      if (args.includes('-c')) {
        return { output: 'History cleared' }
      }

      const numArg = args.find((a) => /^\d+$/.test(a))
      const limit = numArg ? parseInt(numArg, 10) : history.length

      const output = history
        .slice(-limit)
        .map((cmd, i) => `${String(i + 1).padStart(5)}  ${cmd}`)
        .join('\n')

      return { output: output || 'No commands in history' }
    },
  },

  echo: {
    name: 'echo',
    description: 'Display a message',
    usage: 'echo [message...]',
    options: [{ flag: '-n', description: 'Do not output trailing newline' }],
    handler: (args) => {
      if (hasHelpFlag(args)) {
        return formatHelp('echo', 'Display a message', 'echo [message...]', [
          { flag: '-n', description: 'Do not output trailing newline' },
        ])
      }

      const noNewline = args[0] === '-n'
      const message = noNewline ? args.slice(1).join(' ') : args.join(' ')
      return { output: message }
    },
  },

  whoami: {
    name: 'whoami',
    description: 'Display current user',
    usage: 'whoami',
    handler: (args) => {
      if (hasHelpFlag(args)) {
        return formatHelp('whoami', 'Display current user', 'whoami')
      }
      return { output: siteData.username }
    },
  },

  hostname: {
    name: 'hostname',
    description: 'Display system hostname',
    usage: 'hostname',
    handler: (args) => {
      if (hasHelpFlag(args)) {
        return formatHelp('hostname', 'Display system hostname', 'hostname')
      }
      return { output: typeof window !== 'undefined' ? window.location.hostname : siteData.hostname }
    },
  },

  id: {
    name: 'id',
    description: 'Display user identity',
    usage: 'id',
    handler: (args) => {
      if (hasHelpFlag(args)) {
        return formatHelp('id', 'Display user identity', 'id')
      }
      return {
        output: `uid=1000(${siteData.username}) gid=1000(${siteData.username}) groups=1000(${siteData.username})`,
      }
    },
  },

  exit: {
    name: 'exit',
    description: 'Exit the terminal',
    usage: 'exit',
    handler: (args) => {
      if (hasHelpFlag(args)) {
        return formatHelp('exit', 'Exit the terminal', 'exit')
      }
      if (typeof window !== 'undefined') {
        window.location.href = 'https://youtu.be/dQw4w9WgXcQ?si=Q1MpJ6ll3cuuVw8E'
      }
      return { output: 'Goodbye!' }
    },
  },

  logout: {
    name: 'logout',
    description: 'Log out of the terminal',
    usage: 'logout',
    handler: (args) => {
      if (hasHelpFlag(args)) {
        return formatHelp('logout', 'Log out of the terminal', 'logout')
      }
      if (typeof window !== 'undefined') {
        window.location.href = 'https://youtu.be/dQw4w9WgXcQ?si=Q1MpJ6ll3cuuVw8E'
      }
      return { output: 'Goodbye!' }
    },
  },

  date: {
    name: 'date',
    description: 'Display current date and time',
    usage: 'date [-u]',
    options: [{ flag: '-u', description: 'Display UTC time' }],
    handler: (args) => {
      if (hasHelpFlag(args)) {
        return formatHelp('date', 'Display current date and time', 'date [-u]', [
          { flag: '-u', description: 'Display UTC time' },
        ])
      }

      const useUTC = args.includes('-u')
      const now = new Date()
      const output = useUTC ? now.toUTCString() : now.toString()
      return { output }
    },
  },

  uname: {
    name: 'uname',
    description: 'Display system information',
    usage: 'uname [-a] [-s] [-r] [-v] [-m] [-n]',
    options: [
      { flag: '-a', description: 'Display all information' },
      { flag: '-s', description: 'System name' },
      { flag: '-r', description: 'Release version' },
      { flag: '-v', description: 'Version details' },
      { flag: '-m', description: 'Machine type' },
      { flag: '-n', description: 'Node/hostname info' },
    ],
    handler: (args) => {
      if (hasHelpFlag(args)) {
        return formatHelp('uname', 'Display system information', 'uname [-a] [-s] [-r] [-v] [-m] [-n]', [
          { flag: '-a', description: 'Display all information' },
          { flag: '-s', description: 'System name' },
          { flag: '-r', description: 'Release version' },
          { flag: '-v', description: 'Version details' },
          { flag: '-m', description: 'Machine type' },
          { flag: '-n', description: 'Node/hostname info' },
        ])
      }

      const system = 'TerminalPortfolio'
      const release = '1.0.0'
      const version = `Built with React + TypeScript + Vite`
      const machine = 'browser'
      const node = typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown'

      if (args.includes('-a')) {
        return { output: `${system} ${release} ${version} ${machine}` }
      }
      if (args.includes('-s')) return { output: system }
      if (args.includes('-r')) return { output: release }
      if (args.includes('-v')) return { output: version }
      if (args.includes('-m')) return { output: machine }
      if (args.includes('-n')) return { output: node }

      return { output: system }
    },
  },

  ifconfig: {
    name: 'ifconfig',
    description: 'Display network information',
    usage: 'ifconfig',
    handler: async () => {
      try {
        const response = await fetch('https://ifconfig.me/all.json')
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()

        const output = [
          'eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>',
          `      inet ${data.ip_addr || 'unknown'}`,
          `      remote host: ${data.remote_host || 'unknown'}`,
          `      port: ${data.port || 'unknown'}`,
        ].join('\n')

        return { output }
      } catch {
        return { error: 'ifconfig: unable to fetch network information' }
      }
    },
  },

  uptime: {
    name: 'uptime',
    description: 'Show time since site was built',
    usage: 'uptime [-p] [-s]',
    options: [
      { flag: '-p', description: 'Pretty format' },
      { flag: '-s', description: 'Build timestamp' },
    ],
    handler: (args) => {
      if (hasHelpFlag(args)) {
        return formatHelp('uptime', 'Show time since site was built', 'uptime [-p] [-s]', [
          { flag: '-p', description: 'Pretty format' },
          { flag: '-s', description: 'Build timestamp' },
        ])
      }

      const buildTime = new Date(__BUILD_TIME__)
      const now = new Date()
      const diff = now.getTime() - buildTime.getTime()

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

      if (args.includes('-s')) {
        return { output: buildTime.toISOString() }
      }

      if (args.includes('-p')) {
        return { output: `up ${days} days, ${hours} hours, ${minutes} minutes` }
      }

      return {
        output: `up ${days} days, ${hours} hours, ${minutes} minutes (built ${buildTime.toLocaleString()})`,
      }
    },
  },

  theme: {
    name: 'theme',
    description: 'Manage terminal themes',
    usage: 'theme [-l] [name]',
    options: [
      { flag: '-l', description: 'List available themes' },
      { flag: '-s <name>', description: 'Set theme' },
    ],
    handler: (args) => {
      if (hasHelpFlag(args)) {
        return formatHelp('theme', 'Manage terminal themes', 'theme [-l] [name]', [
          { flag: '-l', description: 'List available themes' },
          { flag: '-s <name>', description: 'Set theme' },
        ])
      }

      if (args.includes('-l')) {
        const output = themeIds
          .map((id) => {
            const t = themes[id]
            const current = id === getCurrentThemeId() ? ' (current)' : ''
            return `  ${id.padEnd(16)} ${t.description}${current}`
          })
          .join('\n')
        return { output: `Available themes:\n${output}` }
      }

      const setIndex = args.indexOf('-s')
      const themeName = setIndex !== -1 ? args[setIndex + 1] : args[0]

      if (themeName) {
        if (!themes[themeName]) {
          return { error: `theme: '${themeName}' not found. Use 'theme -l' to list themes.` }
        }
        setTheme(themeName)
        return { output: `Theme set to '${themeName}'` }
      }

      const current = themes[getCurrentThemeId()]
      return { output: `Current theme: ${current.name} - ${current.description}` }
    },
  },

  motd: {
    name: 'motd',
    description: 'Display message of the day',
    usage: 'motd',
    handler: (args) => {
      if (hasHelpFlag(args)) {
        return formatHelp('motd', 'Display message of the day', 'motd')
      }

      const output = [
        ASCII_BANNER,
        '',
        `Welcome to ${siteData.name}'s terminal portfolio`,
        '',
        "Type 'help' to see available commands",
        "Type 'cat about' to learn more about me",
      ].join('\n')

      return { output }
    },
  },

  export: {
    name: 'export',
    description: 'Download resume',
    usage: 'export [resume]',
    handler: (args) => {
      if (hasHelpFlag(args)) {
        return formatHelp('export', 'Download resume', 'export [resume]')
      }

      if (typeof window !== 'undefined') {
        const link = document.createElement('a')
        link.href = siteData.resume.url
        link.download = 'resume.pdf'
        link.click()
      }

      return { output: 'Downloading resume...' }
    },
  },

  // ============================================
  // Easter Egg Commands
  // ============================================

  sudo: {
    name: 'sudo',
    description: 'Execute command as superuser',
    usage: 'sudo <command>',
    handler: (args) => {
      if (hasHelpFlag(args)) {
        return formatHelp('sudo', 'Execute command as superuser', 'sudo <command>')
      }

      const responses = [
        `${siteData.username} is not in the sudoers file. This incident will be reported.`,
        'Nice try, but you are not root here.',
        'Permission denied: This is a portfolio, not a real server!',
        'sudo: unable to initialize admin privileges: Too cool for school',
        'Access denied. Have you tried asking nicely?',
      ]
      const response = responses[Math.floor(Math.random() * responses.length)]
      return { error: response }
    },
  },

  sl: {
    name: 'sl',
    description: 'Steam locomotive',
    usage: 'sl',
    handler: (args) => {
      if (hasHelpFlag(args)) {
        return formatHelp('sl', 'Steam locomotive (you meant ls, right?)', 'sl')
      }

      const train = `
      ====        ________                ___________
  _D _|  |_______/        \\__I_I_____===__|_________|
   |(_)---  |   H\\________/ |   |        =|___ ___|
   /     |  |   H  |  |     |   |         ||_| |_||
  |      |  |   H  |__--------------------| [___] |
  | ________|___H__/__|_____/[][]~\\_______|       |
  |/ |   |-----------I_____I [][] []  D   |=======|_
__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__
 |/-=|___|=O=====O=====O=====O   |_____/~\\___/
  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/

                      You meant 'ls', right?
`
      return { output: train }
    },
  },

  cowsay: {
    name: 'cowsay',
    description: 'Cow says moo',
    usage: 'cowsay [message]',
    handler: (args) => {
      if (hasHelpFlag(args)) {
        return formatHelp('cowsay', 'Generate an ASCII cow with a message', 'cowsay [message]')
      }

      const message = args.length > 0 ? args.join(' ') : 'Moo! Linux is great!'
      const maxLen = Math.min(message.length, 40)
      const lines: string[] = []

      // Word wrap message
      for (let i = 0; i < message.length; i += maxLen) {
        lines.push(message.slice(i, i + maxLen))
      }

      const borderLen = Math.max(...lines.map(l => l.length)) + 2
      const top = ' ' + '_'.repeat(borderLen)
      const bottom = ' ' + '-'.repeat(borderLen)

      let bubble: string
      if (lines.length === 1) {
        bubble = `${top}\n< ${lines[0].padEnd(borderLen - 2)} >\n${bottom}`
      } else {
        const middle = lines.map((line, i) => {
          const prefix = i === 0 ? '/' : i === lines.length - 1 ? '\\' : '|'
          const suffix = i === 0 ? '\\' : i === lines.length - 1 ? '/' : '|'
          return `${prefix} ${line.padEnd(borderLen - 2)} ${suffix}`
        }).join('\n')
        bubble = `${top}\n${middle}\n${bottom}`
      }

      const cow = `
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`

      return { output: bubble + cow }
    },
  },

  matrix: {
    name: 'matrix',
    description: 'Enter the Matrix',
    usage: 'matrix',
    handler: (args) => {
      if (hasHelpFlag(args)) {
        return formatHelp('matrix', 'Display Matrix-style digital rain', 'matrix')
      }

      const chars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789'
      const width = 60
      const height = 15
      const lines: string[] = []

      for (let y = 0; y < height; y++) {
        let line = ''
        for (let x = 0; x < width; x++) {
          if (Math.random() > 0.7) {
            line += chars[Math.floor(Math.random() * chars.length)]
          } else {
            line += ' '
          }
        }
        lines.push(line)
      }

      const output = [
        '',
        ...lines,
        '',
        '       Wake up, Neo...',
        '       The Matrix has you...',
        '',
      ].join('\n')

      return { output }
    },
  },

  coffee: {
    name: 'coffee',
    description: 'Get some coffee',
    usage: 'coffee',
    handler: (args) => {
      if (hasHelpFlag(args)) {
        return formatHelp('coffee', 'Display ASCII coffee cup', 'coffee')
      }

      const coffee = `
        ( (
         ) )
      .______.
      |      |]
      \\      /
       \`----'

   Here's your coffee!
   Now get back to work.
`
      return { output: coffee }
    },
  },

  neofetch: {
    name: 'neofetch',
    description: 'Display system information',
    usage: 'neofetch',
    handler: (args) => {
      if (hasHelpFlag(args)) {
        return formatHelp('neofetch', 'Display system information stylized', 'neofetch')
      }

      const logo = [
        '        .',
        '       /#\\',
        '      /###\\       ',
        '     /p]]]y\\      ',
        '    /##q]]]w##\\   ',
        '   /#####]]]####\\',
        '  /######]]]#####\\',
        ' /#######]]]######\\',
        '/########]]]#######\\',
        '         ]]]',
        '         ]]]',
        '         ]]]',
      ]

      const info = [
        `${siteData.username}@portfolio`,
        '-'.repeat(20),
        `OS: TerminalPortfolio 1.0.0`,
        `Host: ${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}`,
        `Kernel: React 19`,
        `Shell: bash 5.0`,
        `Theme: ${getCurrentThemeId()}`,
        `Terminal: Web Browser`,
        `CPU: JavaScript V8`,
        `Memory: ${typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || '?' : '?'} cores`,
        '',
        '',
      ]

      const combined = logo.map((line, i) => {
        const infoLine = info[i] || ''
        return `${line.padEnd(25)} ${infoLine}`
      }).join('\n')

      return { output: combined }
    },
  },

  fortune: {
    name: 'fortune',
    description: 'Display a random quote',
    usage: 'fortune',
    handler: (args) => {
      if (hasHelpFlag(args)) {
        return formatHelp('fortune', 'Display a random inspirational quote', 'fortune')
      }

      const fortunes = [
        '"The best way to predict the future is to invent it." - Alan Kay',
        '"Simplicity is the ultimate sophistication." - Leonardo da Vinci',
        '"First, solve the problem. Then, write the code." - John Johnson',
        '"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
        '"Make it work, make it right, make it fast." - Kent Beck',
        '"The only way to do great work is to love what you do." - Steve Jobs',
        '"Talk is cheap. Show me the code." - Linus Torvalds',
        '"Programming isn\'t about what you know; it\'s about what you can figure out." - Chris Pine',
        '"The computer was born to solve problems that did not exist before." - Bill Gates',
        '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." - Martin Fowler',
        '"Debugging is twice as hard as writing the code in the first place." - Brian Kernighan',
        '"It\'s not a bug, it\'s a feature." - Anonymous',
        '"There are only two hard things in Computer Science: cache invalidation and naming things." - Phil Karlton',
      ]

      const fortune = fortunes[Math.floor(Math.random() * fortunes.length)]
      return { output: `\n${fortune}\n` }
    },
  },

  cal: {
    name: 'cal',
    description: 'Display a calendar',
    usage: 'cal',
    handler: (args) => {
      if (hasHelpFlag(args)) {
        return formatHelp('cal', 'Display calendar for current month', 'cal')
      }

      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth()
      const today = now.getDate()

      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ]

      const firstDay = new Date(year, month, 1).getDay()
      const daysInMonth = new Date(year, month + 1, 0).getDate()

      const header = `${monthNames[month]} ${year}`.padStart(13 + Math.floor(monthNames[month].length / 2)).padEnd(20)
      const dayHeaders = 'Su Mo Tu We Th Fr Sa'

      const lines: string[] = [header, dayHeaders]
      let week = '   '.repeat(firstDay)

      for (let day = 1; day <= daysInMonth; day++) {
        const dayStr = day === today ? `[${day.toString().padStart(2)}]` : day.toString().padStart(2) + ' '
        week += dayStr.slice(0, 3)

        if ((firstDay + day) % 7 === 0 || day === daysInMonth) {
          lines.push(week.trimEnd())
          week = ''
        }
      }

      return { output: lines.join('\n') }
    },
  },
}

// Get all command names for autocomplete
export const commandNames = Object.keys(commands)

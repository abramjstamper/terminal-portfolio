import type { Command, CommandResult } from '@/types/terminal';
import { siteConfig } from '@/config/data/site-data';
import type { Skill } from '@/config/content';
import { themes, getThemeIds } from '@/config/themes';
import { setTheme as setThemeRegistry, getCurrentThemeId } from '@/lib/themeRegistry';
import { versionInfo } from '@/config/version';

// Available sections for cat command
const SECTIONS = ['about', 'experience', 'skills', 'projects', 'contact', 'resume'] as const;
type Section = typeof SECTIONS[number];

// Helper to create styled output
function createSection(title: string, content: React.ReactNode): React.ReactNode {
  return (
    <div className="my-2">
      <div className="text-terminal-prompt font-bold mb-1">{title}</div>
      <div className="pl-2 border-l border-terminal-text/30">{content}</div>
    </div>
  );
}

// Command implementations
const helpCommand: Command = {
  name: 'help',
  description: 'Show available commands',
  handler: (_args: string[]) => {
    const commandList = Object.values(commands)
      .filter(cmd => !cmd.name.startsWith('_'))
      .map(cmd => (
        <div key={cmd.name} className="flex gap-4">
          <span className="text-terminal-success w-20">{cmd.name}</span>
          <span className="text-terminal-muted">{cmd.description}</span>
        </div>
      ));

    return {
      output: (
        <div className="space-y-1">
          <div className="text-terminal-prompt mb-2">Available Commands:</div>
          {commandList}
          <div className="mt-4 text-terminal-muted text-sm">
            Tip: Use Tab for autocomplete, ↑/↓ for history
          </div>
        </div>
      ),
    };
  },
};

const lsCommand: Command = {
  name: 'ls',
  description: 'List available sections',
  usage: 'ls [section]',
  handler: (args: string[]) => {
    // If no args, list all sections
    if (args.length === 0) {
      return {
        output: (
          <div className="flex flex-wrap gap-4">
            {SECTIONS.map(section => (
              <span key={section} className="text-terminal-link">{section}</span>
            ))}
          </div>
        ),
      };
    }

    // If arg provided, check if it's a valid section
    const section = args[0].toLowerCase();
    if (!SECTIONS.includes(section as Section)) {
      return {
        output: `ls: cannot access '${args[0]}': No such file or directory\nAvailable: ${SECTIONS.join(', ')}`,
        isError: true,
      };
    }

    // Valid section - hint to use cat
    return {
      output: `Use 'cat ${section}' to view contents`,
    };
  },
};

const cdCommand: Command = {
  name: 'cd',
  description: 'Change directory (limited support)',
  usage: 'cd [section]',
  handler: (args: string[]) => {
    if (args.length === 0) {
      return {
        output: `This is a flat file system. Use 'cat <section>' to view contents.\nAvailable sections: ${SECTIONS.join(', ')}`,
      };
    }

    const section = args[0].toLowerCase();
    if (SECTIONS.includes(section as Section)) {
      return {
        output: `Use 'cat ${section}' to view contents`,
      };
    }

    return {
      output: `cd: ${args[0]}: No such file or directory`,
      isError: true,
    };
  },
};

const catCommand: Command = {
  name: 'cat',
  description: 'Display section content',
  usage: 'cat <section>',
  handler: (args) => {
    const section = args[0]?.toLowerCase() as Section;

    if (!section) {
      return {
        output: `Usage: cat <section>\nAvailable sections: ${SECTIONS.join(', ')}`,
        isError: true,
      };
    }

    if (!SECTIONS.includes(section)) {
      return {
        output: `Section not found: ${section}\nAvailable sections: ${SECTIONS.join(', ')}`,
        isError: true,
      };
    }

    switch (section) {
      case 'about':
        return {
          output: (
            <div className="space-y-4">
              {createSection('About Me', (
                <div className="space-y-2">
                  {siteConfig.personal.bio.map((paragraph, i) => (
                    <p key={i} className="text-terminal-text">{paragraph}</p>
                  ))}
                </div>
              ))}
              {createSection('Interests', (
                <ul className="list-disc list-inside text-terminal-text">
                  {siteConfig.personal.interests.map((interest, i) => (
                    <li key={i}>{interest}</li>
                  ))}
                </ul>
              ))}
            </div>
          ),
        };

      case 'experience':
        return {
          output: (
            <div className="space-y-4">
              {siteConfig.experience.map(exp => (
                <div key={exp.id} className="border-l border-terminal-text/30 pl-3">
                  <div className="text-terminal-prompt font-bold">{exp.role}</div>
                  <div className="text-terminal-link">{exp.company}</div>
                  <div className="text-terminal-muted text-sm">{exp.displayPeriod} • {exp.location}</div>
                  <ul className="mt-2 text-terminal-text text-sm space-y-1">
                    {exp.description.slice(0, 3).map((desc, i) => (
                      <li key={i}>• {desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ),
        };

      case 'skills':
        return {
          output: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(siteConfig.skills).map(([key, category]) => (
                <div key={key}>
                  <div className="text-terminal-prompt font-bold">{category.title}</div>
                  <div className="text-terminal-text text-sm">
                    {category.items.map((skill: Skill) => skill.name).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          ),
        };

      case 'projects':
        if (siteConfig.projects.length === 0) {
          return {
            output: (
              <div className="text-terminal-muted">
                Projects section coming soon...
              </div>
            ),
          };
        }
        return {
          output: (
            <div className="space-y-4">
              {siteConfig.projects.map(project => (
                <div key={project.id} className="border-l border-terminal-text/30 pl-3">
                  <div className="text-terminal-prompt font-bold">{project.name}</div>
                  <div className="text-terminal-muted text-sm">{project.tagline}</div>
                  <div className="text-terminal-link text-sm mt-1">
                    {project.tech.join(' • ')}
                  </div>
                </div>
              ))}
            </div>
          ),
        };

      case 'contact':
        return {
          output: (
            <div className="space-y-2">
              <div className="flex gap-2">
                <span className="text-terminal-prompt w-20">Email:</span>
                <a href={`mailto:${siteConfig.social.email}`} className="text-terminal-link hover:underline">
                  {siteConfig.social.email}
                </a>
              </div>
              {siteConfig.social.github && (
                <div className="flex gap-2">
                  <span className="text-terminal-prompt w-20">GitHub:</span>
                  <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="text-terminal-link hover:underline">
                    {siteConfig.social.github.replace('https://', '')}
                  </a>
                </div>
              )}
              {siteConfig.social.linkedin && (
                <div className="flex gap-2">
                  <span className="text-terminal-prompt w-20">LinkedIn:</span>
                  <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-terminal-link hover:underline">
                    {siteConfig.social.linkedin.replace('https://', '')}
                  </a>
                </div>
              )}
            </div>
          ),
        };

      case 'resume':
        return {
          output: (
            <div className="space-y-2">
              <p className="text-terminal-text">Download my resume:</p>
              <a
                href={siteConfig.resume.pdfUrl}
                download={siteConfig.resume.filename}
                className="inline-block text-terminal-link hover:underline"
              >
                {siteConfig.resume.filename}
              </a>
              <p className="text-terminal-muted text-sm">Last updated: {siteConfig.resume.lastUpdated}</p>
              <p className="text-terminal-muted text-sm mt-2">
                Or use the <span className="text-terminal-success">export</span> command to download directly.
              </p>
            </div>
          ),
        };

      default:
        return { output: 'Section not found', isError: true };
    }
  },
};

const clearCommand: Command = {
  name: 'clear',
  description: 'Clear terminal screen',
  handler: (_args: string[]) => {
    return { output: '', clear: true };
  },
};

const historyCommand: Command = {
  name: 'history',
  description: 'Show command history',
  handler: (_args: string[], history?: string[]) => {
    if (!history || history.length === 0) {
      return { output: 'No commands in history' };
    }
    return {
      output: (
        <div className="space-y-1">
          {history.map((cmd, i) => (
            <div key={i} className="flex gap-4">
              <span className="text-terminal-muted w-8 text-right">{i + 1}</span>
              <span className="text-terminal-text">{cmd}</span>
            </div>
          ))}
        </div>
      ),
    };
  },
};

const exportCommand: Command = {
  name: 'export',
  description: 'Download resume PDF',
  handler: (_args: string[]) => {
    // Trigger download
    const link = document.createElement('a');
    link.href = siteConfig.resume.pdfUrl;
    link.download = siteConfig.resume.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return {
      output: `Downloading ${siteConfig.resume.filename}...`,
    };
  },
};

const motdCommand: Command = {
  name: 'motd',
  description: 'Show welcome message',
  handler: (_args: string[]) => {
    return {
      output: (
        <div className="space-y-2">
          <pre className="text-terminal-text text-xs">
{String.raw`    _   _                       ____  _
   / \ | |__  _ __ __ _ _ __ __/ ___|| |_ __ _ _ __ ___  _ __   ___ _ __
  / _ \| '_ \| '__/ _' | '_ ' _\___ \| __/ _' | '_ ' _ \| '_ \ / _ \ '__|
 / ___ \ |_) | | | (_| | | | | |___) | || (_| | | | | | | |_) |  __/ |
/_/   \_\.__/|_|  \__,_|_| |_| |____/ \__\__,_|_| |_| |_| .__/ \___|_|
                                                       |_|`}
          </pre>
          <div className="text-terminal-muted">
            Welcome to my terminal portfolio!
          </div>
          <div className="text-terminal-muted text-sm">
            Type <span className="text-terminal-success">help</span> for available commands.
          </div>
        </div>
      ),
    };
  },
};

const whoamiCommand: Command = {
  name: 'whoami',
  description: 'Display user identity',
  handler: (_args: string[]) => {
    return {
      output: (
        <div className="space-y-1 text-terminal-text">
          <div><span className="text-terminal-prompt">username:</span> guest</div>
          <div><span className="text-terminal-prompt">host:</span> {siteConfig.personal.name.toLowerCase().replace(/\s+/g, '-')}-portfolio</div>
          <div><span className="text-terminal-prompt">shell:</span> /bin/portfolio</div>
          <div className="mt-2 text-terminal-muted italic">
            "Just a person who teaches sand to think."
          </div>
        </div>
      ),
    };
  },
};

const pwdCommand: Command = {
  name: 'pwd',
  description: 'Print working directory',
  handler: (_args: string[]) => {
    return { output: '/home/guest/portfolio' };
  },
};

const dateCommand: Command = {
  name: 'date',
  description: 'Display current date and time',
  handler: (_args: string[]) => {
    return { output: new Date().toString() };
  },
};

const echoCommand: Command = {
  name: 'echo',
  description: 'Display a message',
  usage: 'echo <message>',
  handler: (args) => {
    return { output: args.join(' ') || '' };
  },
};

const themeCommand: Command = {
  name: 'theme',
  description: 'List or switch terminal themes',
  usage: 'theme [name]',
  handler: (args: string[]) => {
    const themeIds = getThemeIds();
    const currentId = getCurrentThemeId();

    // No args - list available themes
    if (args.length === 0) {
      return {
        output: (
          <div className="space-y-2">
            <div className="text-terminal-prompt font-bold">Available themes:</div>
            <div className="space-y-1">
              {themeIds.map(id => {
                const theme = themes[id];
                const isCurrent = id === currentId;
                return (
                  <div key={id} className="flex gap-2">
                    <span className={isCurrent ? 'text-terminal-success' : 'text-terminal-link'}>
                      {isCurrent ? '* ' : '  '}{id}
                    </span>
                    <span className="text-terminal-muted">- {theme.description}</span>
                  </div>
                );
              })}
            </div>
            <div className="text-terminal-muted text-sm mt-2">
              Use 'theme &lt;name&gt;' to switch themes
            </div>
          </div>
        ),
      };
    }

    // Switch theme
    const themeId = args[0].toLowerCase();
    if (!themeIds.includes(themeId)) {
      return {
        output: `Unknown theme: ${args[0]}\nAvailable: ${themeIds.join(', ')}`,
        isError: true,
      };
    }

    const success = setThemeRegistry(themeId);
    if (!success) {
      return {
        output: 'Failed to set theme (theme provider not initialized)',
        isError: true,
      };
    }

    const theme = themes[themeId];
    return {
      output: `Theme switched to: ${theme.name}`,
    };
  },
};

const unameCommand: Command = {
  name: 'uname',
  description: 'Display system information',
  usage: 'uname [-a]',
  handler: (args: string[]) => {
    const showAll = args.includes('-a');

    if (!showAll) {
      return {
        output: `${versionInfo.name} v${versionInfo.version}`,
      };
    }

    return {
      output: (
        <div className="space-y-2">
          <div className="text-terminal-prompt font-bold">System Information:</div>
          <div className="space-y-1">
            <div>
              <span className="text-terminal-prompt">Project:</span>{' '}
              <span className="text-terminal-text">{versionInfo.name} v{versionInfo.version}</span>
            </div>
            <div>
              <span className="text-terminal-prompt">Platform:</span>{' '}
              <span className="text-terminal-text">Web Browser</span>
            </div>
          </div>

          <div className="text-terminal-prompt font-bold mt-3">Core Dependencies:</div>
          <div className="space-y-1">
            {Object.entries(versionInfo.dependencies).map(([name, version]) => (
              <div key={name}>
                <span className="text-terminal-link">{name}:</span>{' '}
                <span className="text-terminal-text">{version}</span>
              </div>
            ))}
          </div>

          <div className="text-terminal-prompt font-bold mt-3">Dev Tools:</div>
          <div className="space-y-1">
            {Object.entries(versionInfo.devDependencies).map(([name, version]) => (
              <div key={name}>
                <span className="text-terminal-link">{name}:</span>{' '}
                <span className="text-terminal-text">{version}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    };
  },
};

// Registry of all commands
export const commands: Record<string, Command> = {
  help: helpCommand,
  ls: lsCommand,
  cd: cdCommand,
  cat: catCommand,
  clear: clearCommand,
  history: historyCommand,
  export: exportCommand,
  motd: motdCommand,
  whoami: whoamiCommand,
  pwd: pwdCommand,
  date: dateCommand,
  echo: echoCommand,
  theme: themeCommand,
  uname: unameCommand,
};

// Execute a command
export function executeCommand(
  commandStr: string,
  args: string[],
  history?: string[]
): CommandResult {
  const command = commands[commandStr];

  if (!command) {
    return {
      output: `Command not found: ${commandStr}\nType 'help' for available commands.`,
      isError: true,
    };
  }

  // Special handling for history command
  if (commandStr === 'history') {
    return command.handler(args, history);
  }

  return command.handler(args);
}

// Get command names for autocomplete
export function getCommandNames(): string[] {
  return Object.keys(commands);
}

// Get section names for autocomplete
export function getSectionNames(): string[] {
  return [...SECTIONS];
}

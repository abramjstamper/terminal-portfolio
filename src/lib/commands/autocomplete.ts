import { getCommandNames, getSectionNames } from './handlers';
import { getThemeIds } from '@/config/themes';

interface AutocompleteResult {
  completed: string;
  suggestions: string[];
}

export function autocomplete(input: string): AutocompleteResult {
  const trimmed = input.trimStart();
  const parts = trimmed.split(/\s+/);
  const commandNames = getCommandNames();

  // If we're still typing the command (first word)
  if (parts.length === 1) {
    const partial = parts[0].toLowerCase();
    const matches = commandNames.filter(cmd => cmd.startsWith(partial));

    if (matches.length === 1) {
      return {
        completed: matches[0] + ' ',
        suggestions: [],
      };
    }

    return {
      completed: input,
      suggestions: matches,
    };
  }

  // We have a command and potentially arguments
  const command = parts[0].toLowerCase();
  const argPartial = parts[parts.length - 1].toLowerCase();

  // Handle cat command - complete section names
  if (command === 'cat' || command === 'man') {
    const sections = getSectionNames();
    const matches = sections.filter(s => s.startsWith(argPartial));

    if (matches.length === 1) {
      const beforeArg = parts.slice(0, -1).join(' ');
      return {
        completed: beforeArg + ' ' + matches[0],
        suggestions: [],
      };
    }

    return {
      completed: input,
      suggestions: matches,
    };
  }

  // Handle theme command
  if (command === 'theme') {
    const themeIds = getThemeIds();
    const matches = themeIds.filter(t => t.startsWith(argPartial));

    if (matches.length === 1) {
      const beforeArg = parts.slice(0, -1).join(' ');
      return {
        completed: beforeArg + ' ' + matches[0],
        suggestions: [],
      };
    }

    return {
      completed: input,
      suggestions: matches,
    };
  }

  return {
    completed: input,
    suggestions: [],
  };
}

export function getCommonPrefix(strings: string[]): string {
  if (strings.length === 0) return '';
  if (strings.length === 1) return strings[0];

  let prefix = strings[0];
  for (let i = 1; i < strings.length; i++) {
    while (!strings[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (prefix === '') return '';
    }
  }
  return prefix;
}

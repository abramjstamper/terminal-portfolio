import type { ParsedCommand, ParsedInput } from '@/types/terminal';

/**
 * Parse a single command string into command and args
 */
export function parseCommand(input: string): ParsedCommand {
  const trimmed = input.trim();
  const parts = trimmed.split(/\s+/).filter(Boolean);

  return {
    command: parts[0]?.toLowerCase() || '',
    args: parts.slice(1),
    raw: trimmed,
  };
}

/**
 * Parse input that may contain shell operators
 * Handles: && (chain), | (pipe - error), & (background - error)
 */
export function parseInput(input: string): ParsedInput {
  const trimmed = input.trim();

  // Check for unsupported pipe operator
  if (trimmed.includes('|') && !trimmed.includes('||')) {
    return {
      type: 'error',
      error: 'Pipes are not supported in this terminal',
    };
  }

  // Check for background operator (& at end, but not &&)
  if (/[^&]&\s*$/.test(trimmed) || /^&\s*$/.test(trimmed)) {
    return {
      type: 'error',
      error: 'Background execution is not supported in this terminal',
    };
  }

  // Check for || (or operator)
  if (trimmed.includes('||')) {
    return {
      type: 'error',
      error: 'The || operator is not supported in this terminal',
    };
  }

  // Handle && (command chaining)
  if (trimmed.includes('&&')) {
    const commandStrings = trimmed.split('&&').map(s => s.trim()).filter(Boolean);

    if (commandStrings.length === 0) {
      return {
        type: 'error',
        error: 'Syntax error: empty command',
      };
    }

    const commands = commandStrings.map(parseCommand);

    return {
      type: 'chain',
      commands,
    };
  }

  // Single command
  const parsed = parseCommand(trimmed);

  return {
    type: 'single',
    commands: [parsed],
  };
}

export function formatArgs(args: string[]): string {
  return args.join(' ');
}

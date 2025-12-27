export interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'system';
  content: string | React.ReactNode;
  timestamp: number;
}

export interface ParsedCommand {
  command: string;
  args: string[];
  raw: string;
}

export interface ParsedInput {
  type: 'single' | 'chain' | 'error';
  commands?: ParsedCommand[];
  error?: string;
}

export interface CommandResult {
  output: string | React.ReactNode;
  isError?: boolean;
  clear?: boolean;
}

export interface CommandOption {
  flag: string;
  description: string;
}

export interface Command {
  name: string;
  description: string;
  usage?: string;
  options?: CommandOption[];
  handler: (args: string[], history?: string[]) => CommandResult;
}

export interface TerminalState {
  lines: TerminalLine[];
  history: string[];
  historyIndex: number;
  currentInput: string;
}

export type TerminalAction =
  | { type: 'ADD_LINE'; payload: Omit<TerminalLine, 'id' | 'timestamp'> }
  | { type: 'CLEAR' }
  | { type: 'SET_INPUT'; payload: string }
  | { type: 'ADD_TO_HISTORY'; payload: string }
  | { type: 'NAVIGATE_HISTORY'; payload: 'up' | 'down' }
  | { type: 'RESET_HISTORY_INDEX' };

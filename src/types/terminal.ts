import type { ReactNode } from 'react'

export interface OutputLine {
  id: string
  type: 'command' | 'output' | 'error' | 'system'
  content: ReactNode
  prompt?: string
}

export interface CommandResult {
  output?: ReactNode
  error?: string
  clearScreen?: boolean
}

export interface ParsedCommand {
  command: string
  args: string[]
}

export interface CommandDefinition {
  name: string
  description: string
  usage: string
  options?: { flag: string; description: string }[]
  handler: (args: string[], history: string[]) => CommandResult | Promise<CommandResult>
}

export type TerminalAction =
  | { type: 'ADD_OUTPUT'; payload: OutputLine }
  | { type: 'CLEAR_OUTPUT' }
  | { type: 'SET_HISTORY'; payload: string[] }
  | { type: 'ADD_TO_HISTORY'; payload: string }

export interface TerminalState {
  output: OutputLine[]
  history: string[]
  historyIndex: number
}

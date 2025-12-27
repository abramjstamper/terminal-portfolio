import { useReducer, useCallback } from 'react';
import type { TerminalState, TerminalAction, TerminalLine } from '@/types/terminal';

const initialState: TerminalState = {
  lines: [],
  history: [],
  historyIndex: -1,
  currentInput: '',
};

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function terminalReducer(state: TerminalState, action: TerminalAction): TerminalState {
  switch (action.type) {
    case 'ADD_LINE':
      return {
        ...state,
        lines: [
          ...state.lines,
          {
            ...action.payload,
            id: generateId(),
            timestamp: Date.now(),
          } as TerminalLine,
        ],
      };

    case 'CLEAR':
      return {
        ...state,
        lines: [],
      };

    case 'SET_INPUT':
      return {
        ...state,
        currentInput: action.payload,
      };

    case 'ADD_TO_HISTORY':
      // Don't add empty commands or duplicates of the last command
      if (!action.payload.trim() || action.payload === state.history[state.history.length - 1]) {
        return {
          ...state,
          historyIndex: -1,
        };
      }
      return {
        ...state,
        history: [...state.history, action.payload],
        historyIndex: -1,
      };

    case 'NAVIGATE_HISTORY': {
      if (state.history.length === 0) return state;

      let newIndex: number;
      if (action.payload === 'up') {
        // Going back in history
        if (state.historyIndex === -1) {
          newIndex = state.history.length - 1;
        } else {
          newIndex = Math.max(0, state.historyIndex - 1);
        }
      } else {
        // Going forward in history
        if (state.historyIndex === -1) {
          return state;
        }
        newIndex = state.historyIndex + 1;
        if (newIndex >= state.history.length) {
          return {
            ...state,
            historyIndex: -1,
            currentInput: '',
          };
        }
      }

      return {
        ...state,
        historyIndex: newIndex,
        currentInput: state.history[newIndex] || '',
      };
    }

    case 'RESET_HISTORY_INDEX':
      return {
        ...state,
        historyIndex: -1,
      };

    default:
      return state;
  }
}

export function useTerminal() {
  const [state, dispatch] = useReducer(terminalReducer, initialState);

  const addLine = useCallback((type: TerminalLine['type'], content: string | React.ReactNode) => {
    dispatch({ type: 'ADD_LINE', payload: { type, content } });
  }, []);

  const addInput = useCallback((content: string) => {
    addLine('input', content);
  }, [addLine]);

  const addOutput = useCallback((content: string | React.ReactNode) => {
    addLine('output', content);
  }, [addLine]);

  const addError = useCallback((content: string) => {
    addLine('error', content);
  }, [addLine]);

  const addSystem = useCallback((content: string | React.ReactNode) => {
    addLine('system', content);
  }, [addLine]);

  const clear = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);

  const setInput = useCallback((value: string) => {
    dispatch({ type: 'SET_INPUT', payload: value });
  }, []);

  const addToHistory = useCallback((command: string) => {
    dispatch({ type: 'ADD_TO_HISTORY', payload: command });
  }, []);

  const navigateHistory = useCallback((direction: 'up' | 'down') => {
    dispatch({ type: 'NAVIGATE_HISTORY', payload: direction });
  }, []);

  return {
    lines: state.lines,
    history: state.history,
    currentInput: state.currentInput,
    addInput,
    addOutput,
    addError,
    addSystem,
    clear,
    setInput,
    addToHistory,
    navigateHistory,
  };
}

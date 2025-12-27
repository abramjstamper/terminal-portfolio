import { useEffect, useRef, useCallback } from 'react';
import { useTerminal } from '@/hooks/useTerminal';
import { TerminalOutput } from './TerminalOutput';
import { TerminalInput } from './TerminalInput';
import { parseInput } from '@/lib/commands/parser';
import { executeCommand } from '@/lib/commands/handlers';
import { autocomplete } from '@/lib/commands/autocomplete';

interface TerminalProps {
  showWelcome?: boolean;
}

export function Terminal({ showWelcome = true }: TerminalProps) {
  const {
    lines,
    history,
    currentInput,
    addInput,
    addOutput,
    addError,
    clear,
    setInput,
    addToHistory,
    navigateHistory,
  } = useTerminal();

  const containerRef = useRef<HTMLDivElement>(null);
  const hasShownWelcome = useRef(false);

  // Show welcome message on mount
  useEffect(() => {
    if (showWelcome && !hasShownWelcome.current) {
      hasShownWelcome.current = true;
      const result = executeCommand('motd', [], []);
      if (result.output) {
        addOutput(result.output);
      }
    }
  }, [showWelcome, addOutput]);

  // Auto-scroll to bottom when new lines are added
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  const handleSubmit = useCallback((input: string) => {
    const trimmedInput = input.trim();

    // Add the input line to display
    if (trimmedInput) {
      addInput(trimmedInput);
      addToHistory(trimmedInput);
    } else {
      // Show empty prompt line
      addInput('');
    }

    // Clear the input
    setInput('');

    // If empty, just show new prompt
    if (!trimmedInput) {
      return;
    }

    // Parse input (handles operators like &&, |, &)
    const parsed = parseInput(trimmedInput);

    // Handle parse errors (unsupported operators)
    if (parsed.type === 'error') {
      addError(parsed.error || 'Parse error');
      return;
    }

    // Execute command(s)
    const commands = parsed.commands || [];

    for (const cmd of commands) {
      const result = executeCommand(cmd.command, cmd.args, history);

      // Handle clear command
      if (result.clear) {
        clear();
        continue;
      }

      // Display result
      if (result.output) {
        if (result.isError) {
          addError(result.output as string);
          // Stop chain on error (like real &&)
          if (parsed.type === 'chain') {
            break;
          }
        } else {
          addOutput(result.output);
        }
      }
    }
  }, [addInput, addToHistory, setInput, history, clear, addError, addOutput]);

  const handleHistoryUp = useCallback(() => {
    navigateHistory('up');
  }, [navigateHistory]);

  const handleHistoryDown = useCallback(() => {
    navigateHistory('down');
  }, [navigateHistory]);

  const handleAutocomplete = useCallback(() => {
    const result = autocomplete(currentInput);

    if (result.completed !== currentInput) {
      setInput(result.completed);
    } else if (result.suggestions.length > 0) {
      // Show suggestions
      addInput(currentInput);
      addOutput(
        <div className="flex flex-wrap gap-4">
          {result.suggestions.map(s => (
            <span key={s} className="text-terminal-blue">{s}</span>
          ))}
        </div>
      );
    }
  }, [currentInput, setInput, addInput, addOutput]);

  const handleInputChange = useCallback((value: string) => {
    setInput(value);
  }, [setInput]);

  // Handle click on terminal to focus input
  const handleTerminalClick = useCallback(() => {
    // Focus is handled by TerminalInput
  }, []);

  return (
    <div
      ref={containerRef}
      className="terminal h-full overflow-y-auto p-4 cursor-text"
      onClick={handleTerminalClick}
      role="application"
      aria-label="Interactive terminal"
    >
      <TerminalOutput lines={lines} />
      <TerminalInput
        value={currentInput}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        onHistoryUp={handleHistoryUp}
        onHistoryDown={handleHistoryDown}
        onAutocomplete={handleAutocomplete}
      />
    </div>
  );
}

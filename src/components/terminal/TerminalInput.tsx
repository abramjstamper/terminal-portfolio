import { useRef, useEffect, type KeyboardEvent, type ChangeEvent } from 'react';

interface TerminalInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  onHistoryUp: () => void;
  onHistoryDown: () => void;
  onAutocomplete: () => void;
  disabled?: boolean;
}

export function TerminalInput({
  value,
  onChange,
  onSubmit,
  onHistoryUp,
  onHistoryDown,
  onAutocomplete,
  disabled = false,
}: TerminalInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input
  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  // Keep focus on input when clicking anywhere in terminal
  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        onSubmit(value);
        break;

      case 'ArrowUp':
        e.preventDefault();
        onHistoryUp();
        break;

      case 'ArrowDown':
        e.preventDefault();
        onHistoryDown();
        break;

      case 'Tab':
        e.preventDefault();
        onAutocomplete();
        break;

      case 'c':
        if (e.ctrlKey) {
          e.preventDefault();
          onChange('');
        }
        break;

      case 'l':
        if (e.ctrlKey) {
          e.preventDefault();
          onSubmit('clear');
        }
        break;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div
      className="flex items-center cursor-text"
      onClick={handleContainerClick}
    >
      <Prompt />
      <div className="flex-1 relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="w-full bg-transparent text-terminal-text outline-none caret-transparent font-mono"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="Terminal input"
        />
        {/* Visual cursor overlay */}
        <div
          className="absolute top-0 left-0 pointer-events-none text-terminal-text font-mono whitespace-pre"
          aria-hidden="true"
        >
          {value}
          <span className="animate-blink bg-terminal-text text-terminal-bg">
            &nbsp;
          </span>
        </div>
      </div>
    </div>
  );
}

function Prompt() {
  return (
    <span className="mr-2 shrink-0 select-none">
      <span className="text-terminal-prompt">guest</span>
      <span className="text-terminal-text">@</span>
      <span className="text-terminal-link">portfolio</span>
      <span className="text-terminal-text">:~$ </span>
    </span>
  );
}

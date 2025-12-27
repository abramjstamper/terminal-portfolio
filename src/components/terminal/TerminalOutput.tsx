import type { TerminalLine } from '@/types/terminal';

interface TerminalOutputProps {
  lines: TerminalLine[];
}

export function TerminalOutput({ lines }: TerminalOutputProps) {
  return (
    <div className="space-y-1" role="log" aria-live="polite">
      {lines.map(line => (
        <TerminalLineDisplay key={line.id} line={line} />
      ))}
    </div>
  );
}

interface TerminalLineDisplayProps {
  line: TerminalLine;
}

function TerminalLineDisplay({ line }: TerminalLineDisplayProps) {
  switch (line.type) {
    case 'input':
      return (
        <div className="flex">
          <Prompt />
          <span className="text-terminal-green">{line.content}</span>
        </div>
      );

    case 'output':
      return (
        <div className="text-gray-300 pl-0">
          {line.content}
        </div>
      );

    case 'error':
      return (
        <div className="text-red-500 pl-0">
          {line.content}
        </div>
      );

    case 'system':
      return (
        <div className="text-terminal-amber pl-0">
          {line.content}
        </div>
      );

    default:
      return null;
  }
}

function Prompt() {
  return (
    <span className="mr-2 shrink-0">
      <span className="text-terminal-amber">guest</span>
      <span className="text-white">@</span>
      <span className="text-terminal-blue">portfolio</span>
      <span className="text-white">:~$ </span>
    </span>
  );
}

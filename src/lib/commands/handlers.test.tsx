import { describe, it, expect } from 'vitest';
import { executeCommand, getCommandNames, getSectionNames } from './handlers';

describe('executeCommand', () => {
  describe('unknown commands', () => {
    it('returns error for unknown command', () => {
      const result = executeCommand('foobar', []);
      expect(result.isError).toBe(true);
      expect(result.output).toContain('Command not found');
    });
  });

  describe('help command', () => {
    it('returns help output', () => {
      const result = executeCommand('help', []);
      expect(result.isError).toBeFalsy();
      expect(result.output).toBeTruthy();
    });
  });

  describe('ls command', () => {
    it('lists sections without args', () => {
      const result = executeCommand('ls', []);
      expect(result.isError).toBeFalsy();
      expect(result.output).toBeTruthy();
    });

    it('returns error for invalid section', () => {
      const result = executeCommand('ls', ['invalid']);
      expect(result.isError).toBe(true);
      expect(result.output).toContain('No such file or directory');
    });

    it('gives hint for valid section', () => {
      const result = executeCommand('ls', ['about']);
      expect(result.isError).toBeFalsy();
      expect(result.output).toContain('cat about');
    });
  });

  describe('cd command', () => {
    it('gives hint when no args', () => {
      const result = executeCommand('cd', []);
      expect(result.isError).toBeFalsy();
      expect(result.output).toContain('flat file system');
    });

    it('gives hint for valid section', () => {
      const result = executeCommand('cd', ['about']);
      expect(result.isError).toBeFalsy();
      expect(result.output).toContain('cat about');
    });

    it('returns error for invalid section', () => {
      const result = executeCommand('cd', ['invalid']);
      expect(result.isError).toBe(true);
      expect(result.output).toContain('No such file or directory');
    });
  });

  describe('cat command', () => {
    it('returns error without args', () => {
      const result = executeCommand('cat', []);
      expect(result.isError).toBe(true);
    });

    it('returns error for invalid section', () => {
      const result = executeCommand('cat', ['invalid']);
      expect(result.isError).toBe(true);
      expect(result.output).toContain('Section not found');
    });

    it('returns content for valid section', () => {
      const result = executeCommand('cat', ['about']);
      expect(result.isError).toBeFalsy();
      expect(result.output).toBeTruthy();
    });

    it('returns content for experience section', () => {
      const result = executeCommand('cat', ['experience']);
      expect(result.isError).toBeFalsy();
    });

    it('returns content for skills section', () => {
      const result = executeCommand('cat', ['skills']);
      expect(result.isError).toBeFalsy();
    });

    it('returns content for contact section', () => {
      const result = executeCommand('cat', ['contact']);
      expect(result.isError).toBeFalsy();
    });
  });

  describe('clear command', () => {
    it('returns clear flag', () => {
      const result = executeCommand('clear', []);
      expect(result.clear).toBe(true);
    });
  });

  describe('history command', () => {
    it('shows no history message when empty', () => {
      const result = executeCommand('history', [], []);
      expect(result.output).toContain('No commands in history');
    });

    it('shows history when provided', () => {
      const result = executeCommand('history', [], ['ls', 'help', 'cat about']);
      expect(result.isError).toBeFalsy();
      expect(result.output).toBeTruthy();
    });
  });

  describe('pwd command', () => {
    it('returns working directory', () => {
      const result = executeCommand('pwd', []);
      expect(result.output).toContain('/home/guest/portfolio');
    });
  });

  describe('date command', () => {
    it('returns current date', () => {
      const result = executeCommand('date', []);
      expect(result.output).toBeTruthy();
      // Should be a valid date string
      expect(typeof result.output).toBe('string');
    });
  });

  describe('echo command', () => {
    it('returns empty string with no args', () => {
      const result = executeCommand('echo', []);
      expect(result.output).toBe('');
    });

    it('returns joined args', () => {
      const result = executeCommand('echo', ['hello', 'world']);
      expect(result.output).toBe('hello world');
    });
  });

  describe('whoami command', () => {
    it('returns identity info', () => {
      const result = executeCommand('whoami', []);
      expect(result.isError).toBeFalsy();
      expect(result.output).toBeTruthy();
    });
  });

  describe('motd command', () => {
    it('returns welcome message', () => {
      const result = executeCommand('motd', []);
      expect(result.isError).toBeFalsy();
      expect(result.output).toBeTruthy();
    });
  });
});

describe('getCommandNames', () => {
  it('returns array of command names', () => {
    const names = getCommandNames();
    expect(Array.isArray(names)).toBe(true);
    expect(names).toContain('help');
    expect(names).toContain('ls');
    expect(names).toContain('cat');
    expect(names).toContain('cd');
    expect(names).toContain('clear');
  });
});

describe('getSectionNames', () => {
  it('returns array of section names', () => {
    const names = getSectionNames();
    expect(Array.isArray(names)).toBe(true);
    expect(names).toContain('about');
    expect(names).toContain('experience');
    expect(names).toContain('skills');
    expect(names).toContain('contact');
  });
});

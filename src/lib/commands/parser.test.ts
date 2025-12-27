import { describe, it, expect } from 'vitest';
import { parseCommand, parseInput } from './parser';

describe('parseCommand', () => {
  it('parses a simple command', () => {
    const result = parseCommand('help');
    expect(result).toEqual({
      command: 'help',
      args: [],
      raw: 'help',
    });
  });

  it('parses a command with single argument', () => {
    const result = parseCommand('cat about');
    expect(result).toEqual({
      command: 'cat',
      args: ['about'],
      raw: 'cat about',
    });
  });

  it('parses a command with multiple arguments', () => {
    const result = parseCommand('echo hello world');
    expect(result).toEqual({
      command: 'echo',
      args: ['hello', 'world'],
      raw: 'echo hello world',
    });
  });

  it('converts command to lowercase', () => {
    const result = parseCommand('HELP');
    expect(result.command).toBe('help');
  });

  it('handles leading/trailing whitespace', () => {
    const result = parseCommand('  help  ');
    expect(result.command).toBe('help');
    expect(result.raw).toBe('help');
  });

  it('handles multiple spaces between args', () => {
    const result = parseCommand('cat   about');
    expect(result.args).toEqual(['about']);
  });

  it('returns empty command for empty input', () => {
    const result = parseCommand('');
    expect(result.command).toBe('');
    expect(result.args).toEqual([]);
  });
});

describe('parseInput', () => {
  describe('single commands', () => {
    it('parses a single command', () => {
      const result = parseInput('help');
      expect(result.type).toBe('single');
      expect(result.commands).toHaveLength(1);
      expect(result.commands?.[0].command).toBe('help');
    });
  });

  describe('pipe operator', () => {
    it('returns error for pipe operator', () => {
      const result = parseInput('ls | grep test');
      expect(result.type).toBe('error');
      expect(result.error).toContain('Pipes are not supported');
    });

    it('returns error for single pipe', () => {
      const result = parseInput('cat about | head');
      expect(result.type).toBe('error');
    });
  });

  describe('background operator', () => {
    it('returns error for background operator at end', () => {
      const result = parseInput('sleep 10 &');
      expect(result.type).toBe('error');
      expect(result.error).toContain('Background execution is not supported');
    });

    it('returns error for standalone &', () => {
      const result = parseInput('&');
      expect(result.type).toBe('error');
    });

    it('does not error on && (not background)', () => {
      const result = parseInput('ls && pwd');
      expect(result.type).toBe('chain');
    });
  });

  describe('|| operator', () => {
    it('returns error for || operator', () => {
      const result = parseInput('false || echo fallback');
      expect(result.type).toBe('error');
      expect(result.error).toContain('|| operator is not supported');
    });
  });

  describe('&& chaining', () => {
    it('parses two commands chained with &&', () => {
      const result = parseInput('ls && pwd');
      expect(result.type).toBe('chain');
      expect(result.commands).toHaveLength(2);
      expect(result.commands?.[0].command).toBe('ls');
      expect(result.commands?.[1].command).toBe('pwd');
    });

    it('parses three commands chained with &&', () => {
      const result = parseInput('help && ls && pwd');
      expect(result.type).toBe('chain');
      expect(result.commands).toHaveLength(3);
    });

    it('handles whitespace around &&', () => {
      const result = parseInput('ls  &&  pwd');
      expect(result.type).toBe('chain');
      expect(result.commands?.[0].command).toBe('ls');
      expect(result.commands?.[1].command).toBe('pwd');
    });

    it('preserves arguments in chained commands', () => {
      const result = parseInput('cat about && echo hello world');
      expect(result.type).toBe('chain');
      expect(result.commands?.[0].args).toEqual(['about']);
      expect(result.commands?.[1].args).toEqual(['hello', 'world']);
    });
  });
});

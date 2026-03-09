import { describe, it, expect } from 'vitest';
import { formatCurrency } from '../formatCurrency';

describe('formatCurrency', () => {
  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('$0');
  });

  it('formats small amounts without commas', () => {
    expect(formatCurrency(500)).toBe('$500');
  });

  it('formats thousands with commas', () => {
    expect(formatCurrency(1000)).toBe('$1,000');
    expect(formatCurrency(16000)).toBe('$16,000');
  });

  it('formats large amounts', () => {
    expect(formatCurrency(125000)).toBe('$125,000');
    expect(formatCurrency(1000000)).toBe('$1,000,000');
  });
});

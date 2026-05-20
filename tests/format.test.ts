import { describe, it, expect } from 'vitest';
import { formatPercent, formatAddress, formatUSD } from '../src/utils/format';

describe('formatPercent', () => {
  it('formats with two decimals by default', () => {
    expect(formatPercent(98.756)).toBe('98.76%');
  });

  it('respects digits override', () => {
    expect(formatPercent(98.756, 0)).toBe('99%');
  });
});

describe('formatAddress', () => {
  it('truncates long addresses', () => {
    expect(formatAddress('0x1234567890abcdef1234567890abcdef12345678')).toBe('0x1234…5678');
  });

  it('leaves short strings untouched', () => {
    expect(formatAddress('0xabc')).toBe('0xabc');
  });
});

describe('formatUSD', () => {
  it('formats millions', () => {
    expect(formatUSD('1500000')).toBe('$1.50M');
  });

  it('formats thousands', () => {
    expect(formatUSD('2500')).toBe('$2.50K');
  });

  it('formats small numbers', () => {
    expect(formatUSD('42')).toBe('$42.00');
  });

  it('returns input for non-numeric', () => {
    expect(formatUSD('not a number')).toBe('not a number');
  });
});

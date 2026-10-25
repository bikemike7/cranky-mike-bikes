import { describe, it, expect } from 'vitest';
import { getTiming } from '@/lib/sheetEvents';

const now = new Date(2026, 9, 25, 15, 0);

describe('getTiming', () => {
  it('today is Upcoming', () => expect(getTiming(new Date(2026, 9, 25), now)).toBe('Upcoming'));
  it('future is Upcoming', () => expect(getTiming(new Date(2026, 9, 30), now)).toBe('Upcoming'));
  it('yesterday is Past', () => expect(getTiming(new Date(2026, 9, 24), now)).toBe('Past'));
});

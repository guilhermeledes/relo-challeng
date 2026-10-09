import { describe, it, expect } from 'vitest';
import { CATEGORY } from './category-strategies';

describe('Given CATEGORY identifiers', () => {
  describe('When replacing Regular with Ages is attempted', () => {
    it('Then rejects the write and preserves Regular', () => {
      const written = Reflect.set(CATEGORY, 'REGULAR', 'Ages');

      expect(written).toBe(false);
      expect(CATEGORY.REGULAR).toBe('Regular');
    });
  });
});

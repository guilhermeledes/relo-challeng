import { describe, it, expect } from 'vitest';
import { CATEGORY, selectStrategyByCategory } from './category-strategies';

describe('Given CATEGORY identifiers', () => {
  describe('When replacing Regular with Ages is attempted', () => {
    it('Then rejects the write and preserves Regular', () => {
      const written = Reflect.set(CATEGORY, 'REGULAR', 'Ages');

      expect(written).toBe(false);
      expect(CATEGORY.REGULAR).toBe('Regular');
    });
  });
});

describe('Given Category Strategy selection', () => {
  describe('When Regular is requested', () => {
    it('Then returns a Strategy identifying itself as Regular', () => {
      const strategy = selectStrategyByCategory(CATEGORY.REGULAR);

      expect(strategy.category).toBe('Regular');
    });
  });
});

describe('Given Category Strategy selection', () => {
  describe('When Ages is requested', () => {
    it('Then returns a Strategy identifying itself as Ages', () => {
      const strategy = selectStrategyByCategory(CATEGORY.AGES);

      expect(strategy.category).toBe('Ages');
    });
  });
});

describe('Given Category Strategy selection', () => {
  describe('When BackstagePasses is requested', () => {
    it('Then returns a Strategy identifying itself as BackstagePasses', () => {
      const strategy = selectStrategyByCategory(CATEGORY.BACKSTAGE_PASSES);

      expect(strategy.category).toBe('BackstagePasses');
    });
  });
});

describe('Given Category Strategy selection', () => {
  describe('When Legendary is requested', () => {
    it('Then returns a Strategy identifying itself as Legendary', () => {
      const strategy = selectStrategyByCategory(CATEGORY.LEGENDARY);

      expect(strategy.category).toBe('Legendary');
    });
  });
});

describe('Given Category Strategy selection', () => {
  describe('When Conjured is requested', () => {
    it('Then returns a Strategy identifying itself as Conjured', () => {
      const strategy = selectStrategyByCategory(CATEGORY.CONJURED);

      expect(strategy.category).toBe('Conjured');
    });
  });
});

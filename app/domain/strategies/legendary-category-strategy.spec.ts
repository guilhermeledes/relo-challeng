import { describe, expect, it } from 'vitest';
import { Quality } from '../quality';
import type { DailyItemState } from './category-strategy';
import { LegendaryCategoryStrategy } from './legendary-category-strategy';

describe('LegendaryCategoryStrategy', () => {
  describe('Given the daily update operation', () => {
    describe('When a Legendary item has 5 days remaining and quality 80', () => {
      it('Then quality never changes', () => {
        const state: DailyItemState = { sellIn: 5, quality: new Quality(80) };
        const strategy = new LegendaryCategoryStrategy();

        const result = strategy.update(state);

        expect(result.quality.value).toBe(80);
        expect(result.sellIn).toBe(5);
        expect(state.sellIn).toBe(5);
        expect(state.quality.value).toBe(80);
      });
    });

    describe('When a Legendary item has 5 days remaining and quality 80', () => {
      it('Then sellIn never changes', () => {
        const state: DailyItemState = { sellIn: 5, quality: new Quality(80) };
        const strategy = new LegendaryCategoryStrategy();

        const result = strategy.update(state);

        expect(result.sellIn).toBe(5);
        expect(result.quality.value).toBe(80);
        expect(state.sellIn).toBe(5);
        expect(state.quality.value).toBe(80);
      });
    });

    describe('When a Legendary item has 0 days remaining and quality 80', () => {
      it('Then preserves its legendary quality and deadline', () => {
        const state: DailyItemState = { sellIn: 0, quality: new Quality(80) };
        const strategy = new LegendaryCategoryStrategy();

        const result = strategy.update(state);

        expect(result.quality.value).toBe(80);
        expect(result.sellIn).toBe(0);
        expect(state.sellIn).toBe(0);
        expect(state.quality.value).toBe(80);
      });
    });

    describe('When a Legendary item has -1 day remaining and quality 80', () => {
      it('Then preserves its legendary quality and expired deadline', () => {
        const state: DailyItemState = { sellIn: -1, quality: new Quality(80) };
        const strategy = new LegendaryCategoryStrategy();

        const result = strategy.update(state);

        expect(result.quality.value).toBe(80);
        expect(result.sellIn).toBe(-1);
        expect(state.sellIn).toBe(-1);
        expect(state.quality.value).toBe(80);
      });
    });

    describe('When a Legendary state has -1 day remaining and quality -1', () => {
      it('Then preserves its received quality and expired deadline', () => {
        const state: DailyItemState = { sellIn: -1, quality: new Quality(-1) };
        const strategy = new LegendaryCategoryStrategy();

        const result = strategy.update(state);

        expect(result.quality.value).toBe(-1);
        expect(result.sellIn).toBe(-1);
        expect(state.quality.value).toBe(-1);
        expect(state.sellIn).toBe(-1);
      });
    });
  });
});

describe('Given Legendary Category identification', () => {
  describe('When a Legendary Strategy is created', () => {
    it('Then identifies itself as Legendary', () => {
      const strategy = new LegendaryCategoryStrategy();

      expect(strategy.category).toBe('Legendary');
    });
  });
});

describe('Given Legendary Category identification', () => {
  describe('When replacing its Category is attempted', () => {
    it('Then rejects the write and preserves Legendary', () => {
      const strategy = new LegendaryCategoryStrategy();

      const written = Reflect.set(strategy, 'category', 'Regular');

      expect(written).toBe(false);
      expect(strategy.category).toBe('Legendary');
    });
  });
});

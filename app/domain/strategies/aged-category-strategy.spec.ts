import { describe, expect, it } from 'vitest';
import { Quality } from '../quality';
import type { DailyItemState } from './category-strategy';
import { AgedCategoryStrategy } from './aged-category-strategy';

describe('AgedCategoryStrategy', () => {
  describe('Given the daily update operation', () => {
    describe('When a Ages item has 5 days remaining and quality 20', () => {
      it('Then increases quality by 1 per day', () => {
        const state: DailyItemState = { sellIn: 5, quality: new Quality(20) };
        const strategy = new AgedCategoryStrategy();

        const result = strategy.update(state);

        expect(result.quality.value).toBe(21);
        expect(result.sellIn).toBe(4);
        expect(state.sellIn).toBe(5);
        expect(state.quality.value).toBe(20);
      });
    });

    describe('When a Ages item has 0 days remaining and quality 20', () => {
      it('Then increases quality by 2 after the sell date', () => {
        const state: DailyItemState = { sellIn: 0, quality: new Quality(20) };
        const strategy = new AgedCategoryStrategy();

        const result = strategy.update(state);

        expect(result.quality.value).toBe(22);
        expect(result.sellIn).toBe(-1);
        expect(state.sellIn).toBe(0);
        expect(state.quality.value).toBe(20);
      });
    });

    describe('When a Ages item has 5 days remaining and quality 50', () => {
      it('Then quality never exceeds 50', () => {
        const state: DailyItemState = { sellIn: 5, quality: new Quality(50) };
        const strategy = new AgedCategoryStrategy();

        const result = strategy.update(state);

        expect(result.quality.value).toBe(50);
        expect(result.sellIn).toBe(4);
        expect(state.sellIn).toBe(5);
        expect(state.quality.value).toBe(50);
      });
    });

    describe('When a Ages item has 1 day remaining and quality 20', () => {
      it('Then increases quality by 1 and leaves no days remaining', () => {
        const state: DailyItemState = { sellIn: 1, quality: new Quality(20) };
        const strategy = new AgedCategoryStrategy();

        const result = strategy.update(state);

        expect(result.quality.value).toBe(21);
        expect(result.sellIn).toBe(0);
        expect(state.sellIn).toBe(1);
        expect(state.quality.value).toBe(20);
      });
    });

    describe('When a Ages item has 0 days remaining and quality 49', () => {
      it('Then caps quality at 50 and decreases sellIn', () => {
        const state: DailyItemState = { sellIn: 0, quality: new Quality(49) };
        const strategy = new AgedCategoryStrategy();

        const result = strategy.update(state);

        expect(result.quality.value).toBe(50);
        expect(result.sellIn).toBe(-1);
        expect(state.sellIn).toBe(0);
        expect(state.quality.value).toBe(49);
      });
    });

    describe('When a Ages item has -1 day remaining and quality 20', () => {
      it('Then gains two quality points and advances its expired deadline', () => {
        const state: DailyItemState = { sellIn: -1, quality: new Quality(20) };
        const strategy = new AgedCategoryStrategy();

        const result = strategy.update(state);

        expect(result.quality.value).toBe(22);
        expect(result.sellIn).toBe(-2);
        expect(state.sellIn).toBe(-1);
        expect(state.quality.value).toBe(20);
      });
    });

    describe('When a Ages item has 5 days remaining and quality 49', () => {
      it('Then reaches quality 50 and reduces the remaining deadline', () => {
        const state: DailyItemState = { sellIn: 5, quality: new Quality(49) };
        const strategy = new AgedCategoryStrategy();

        const result = strategy.update(state);

        expect(result.quality.value).toBe(50);
        expect(result.sellIn).toBe(4);
        expect(state.sellIn).toBe(5);
        expect(state.quality.value).toBe(49);
      });
    });

    describe('When a Ages item has 0 days remaining and quality 50', () => {
      it('Then preserves the quality ceiling and advances its deadline', () => {
        const state: DailyItemState = { sellIn: 0, quality: new Quality(50) };
        const strategy = new AgedCategoryStrategy();

        const result = strategy.update(state);

        expect(result.quality.value).toBe(50);
        expect(result.sellIn).toBe(-1);
        expect(state.sellIn).toBe(0);
        expect(state.quality.value).toBe(50);
      });
    });
  });
});

describe('Given Ages Category identification', () => {
  describe('When a Ages Strategy is created', () => {
    it('Then identifies itself as Ages', () => {
      const strategy = new AgedCategoryStrategy();

      expect(strategy.category).toBe('Ages');
    });
  });
});

describe('Given Ages Category identification', () => {
  describe('When replacing its Category is attempted', () => {
    it('Then rejects the write and preserves Ages', () => {
      const strategy = new AgedCategoryStrategy();

      const written = Reflect.set(strategy, 'category', 'Regular');

      expect(written).toBe(false);
      expect(strategy.category).toBe('Ages');
    });
  });
});

import { describe, expect, it } from 'vitest';
import { Quality } from '../quality';
import type { DailyItemState } from './category-strategy';
import { RegularCategoryStrategy } from './regular-category-strategy';

describe('RegularCategoryStrategy', () => {
  describe('Given the daily update operation', () => {
    describe('When a Regular item has 5 days remaining and quality 10', () => {
      it('Then decreases quality by 1 per day', () => {
        const state: DailyItemState = { sellIn: 5, quality: new Quality(10) };
        const strategy = new RegularCategoryStrategy();

        const result = strategy.update(state);

        expect(result.quality.value).toBe(9);
        expect(result.sellIn).toBe(4);
        expect(state.quality.value).toBe(10);
        expect(state.sellIn).toBe(5);
      });
    });

    describe('When a Regular item has 5 days remaining and quality 10', () => {
      it('Then decreases sellIn by 1 per day', () => {
        const state: DailyItemState = { sellIn: 5, quality: new Quality(10) };
        const strategy = new RegularCategoryStrategy();

        const result = strategy.update(state);

        expect(result.sellIn).toBe(4);
        expect(result.quality.value).toBe(9);
        expect(state.sellIn).toBe(5);
        expect(state.quality.value).toBe(10);
      });
    });

    describe('When a Regular item has 5 days remaining and quality 0', () => {
      it('Then quality never drops below 0', () => {
        const state: DailyItemState = { sellIn: 5, quality: new Quality(0) };
        const strategy = new RegularCategoryStrategy();

        const result = strategy.update(state);

        expect(result.quality.value).toBe(0);
        expect(result.sellIn).toBe(4);
        expect(state.sellIn).toBe(5);
        expect(state.quality.value).toBe(0);
      });
    });

    describe('When a Regular item has 1 day remaining and quality 10', () => {
      it('Then quality degrades by 1 when there is one day remaining', () => {
        const state: DailyItemState = { sellIn: 1, quality: new Quality(10) };
        const strategy = new RegularCategoryStrategy();

        const result = strategy.update(state);

        expect(result.quality.value).toBe(9);
        expect(result.sellIn).toBe(0);
        expect(state.sellIn).toBe(1);
        expect(state.quality.value).toBe(10);
      });
    });

    describe('When a Regular item has 0 days remaining and quality 10', () => {
      it('Then decreases quality by 2 and sellIn by 1', () => {
        const state: DailyItemState = { sellIn: 0, quality: new Quality(10) };
        const strategy = new RegularCategoryStrategy();

        const result = strategy.update(state);

        expect(result.quality.value).toBe(8);
        expect(result.sellIn).toBe(-1);
        expect(state.sellIn).toBe(0);
        expect(state.quality.value).toBe(10);
      });
    });

    describe('When a Regular item has 0 days remaining and quality 1', () => {
      it('Then keeps quality at zero and decreases sellIn', () => {
        const state: DailyItemState = { sellIn: 0, quality: new Quality(1) };
        const strategy = new RegularCategoryStrategy();

        const result = strategy.update(state);

        expect(result.quality.value).toBe(0);
        expect(result.sellIn).toBe(-1);
        expect(state.sellIn).toBe(0);
        expect(state.quality.value).toBe(1);
      });
    });

    describe('When a Regular item has -1 day remaining and quality 10', () => {
      it('Then degrades twice and advances its expired deadline', () => {
        const state: DailyItemState = { sellIn: -1, quality: new Quality(10) };
        const strategy = new RegularCategoryStrategy();

        const result = strategy.update(state);

        expect(result.quality.value).toBe(8);
        expect(result.sellIn).toBe(-2);
        expect(state.sellIn).toBe(-1);
        expect(state.quality.value).toBe(10);
      });
    });

    describe('When a Regular item has -1 day remaining and quality 0', () => {
      it('Then preserves the quality floor and advances its deadline', () => {
        const state: DailyItemState = { sellIn: -1, quality: new Quality(0) };
        const strategy = new RegularCategoryStrategy();

        const result = strategy.update(state);

        expect(result.quality.value).toBe(0);
        expect(result.sellIn).toBe(-2);
        expect(state.sellIn).toBe(-1);
        expect(state.quality.value).toBe(0);
      });
    });
  });
});

describe('Given Regular Category identification', () => {
  describe('When a Regular Strategy is created', () => {
    it('Then identifies itself as Regular', () => {
      const strategy = new RegularCategoryStrategy();

      expect(strategy.category).toBe('Regular');
    });
  });
});

describe('Given Regular Category identification', () => {
  describe('When replacing its Category is attempted', () => {
    it('Then rejects the write and preserves Regular', () => {
      const strategy = new RegularCategoryStrategy();

      const written = Reflect.set(strategy, 'category', 'Ages');

      expect(written).toBe(false);
      expect(strategy.category).toBe('Regular');
    });
  });
});

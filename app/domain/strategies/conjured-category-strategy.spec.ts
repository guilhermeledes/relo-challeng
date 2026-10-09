import { describe, expect, it } from 'vitest';
import { Quality } from '../quality';
import type { DailyItemState } from './category-strategy';
import { ConjuredCategoryStrategy } from './conjured-category-strategy';

describe('ConjuredCategoryStrategy', () => {
  describe('Given the daily update operation', () => {
    describe('When a Conjured item has 5 days remaining and quality 10', () => {
      it('Then decreases quality by 2 and sellIn by 1', () => {
        const state: DailyItemState = { sellIn: 5, quality: new Quality(10) };
        const strategy = new ConjuredCategoryStrategy();

        const result = strategy.update(state);

        expect(result.quality.value).toBe(8);
        expect(result.sellIn).toBe(4);
        expect(state.sellIn).toBe(5);
        expect(state.quality.value).toBe(10);
      });
    });

    describe('When a Conjured item has 0 days remaining and quality 10', () => {
      it('Then decreases quality by 4 and sellIn by 1', () => {
        const state: DailyItemState = { sellIn: 0, quality: new Quality(10) };
        const strategy = new ConjuredCategoryStrategy();

        const result = strategy.update(state);

        expect(result.quality.value).toBe(6);
        expect(result.sellIn).toBe(-1);
        expect(state.sellIn).toBe(0);
        expect(state.quality.value).toBe(10);
      });
    });

    describe('When a Conjured item has -1 day remaining and quality 10', () => {
      it('Then decreases quality by 4 and advances its expired deadline', () => {
        const state: DailyItemState = { sellIn: -1, quality: new Quality(10) };
        const strategy = new ConjuredCategoryStrategy();

        const result = strategy.update(state);

        expect(result.quality.value).toBe(6);
        expect(result.sellIn).toBe(-2);
        expect(state.sellIn).toBe(-1);
        expect(state.quality.value).toBe(10);
      });
    });

    describe('When a Conjured item has 1 day remaining and quality 10', () => {
      it('Then decreases quality by 2 and leaves no days remaining', () => {
        const state: DailyItemState = { sellIn: 1, quality: new Quality(10) };
        const strategy = new ConjuredCategoryStrategy();

        const result = strategy.update(state);

        expect(result.quality.value).toBe(8);
        expect(result.sellIn).toBe(0);
        expect(state.sellIn).toBe(1);
        expect(state.quality.value).toBe(10);
      });
    });

    describe('When a Conjured item has 5 days remaining and quality 1', () => {
      it('Then stops quality at zero and reduces the remaining deadline', () => {
        const state: DailyItemState = { sellIn: 5, quality: new Quality(1) };
        const strategy = new ConjuredCategoryStrategy();

        const result = strategy.update(state);

        expect(result.quality.value).toBe(0);
        expect(result.sellIn).toBe(4);
        expect(state.sellIn).toBe(5);
        expect(state.quality.value).toBe(1);
      });
    });

    describe('When a Conjured item has 0 days remaining and quality 3', () => {
      it('Then stops quality at zero and advances its expired deadline', () => {
        const state: DailyItemState = { sellIn: 0, quality: new Quality(3) };
        const strategy = new ConjuredCategoryStrategy();

        const result = strategy.update(state);

        expect(result.quality.value).toBe(0);
        expect(result.sellIn).toBe(-1);
        expect(state.sellIn).toBe(0);
        expect(state.quality.value).toBe(3);
      });
    });

    describe('When a Conjured item has -1 day remaining and quality 0', () => {
      it('Then preserves zero quality and advances its expired deadline', () => {
        const state: DailyItemState = { sellIn: -1, quality: new Quality(0) };
        const strategy = new ConjuredCategoryStrategy();

        const result = strategy.update(state);

        expect(result.quality.value).toBe(0);
        expect(result.sellIn).toBe(-2);
        expect(state.sellIn).toBe(-1);
        expect(state.quality.value).toBe(0);
      });
    });
  });
});

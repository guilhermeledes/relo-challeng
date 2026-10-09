import { describe, expect, it } from 'vitest';
import { Quality } from '../quality';
import type { DailyItemState } from './category-strategy';
import { BackstagePassesCategoryStrategy } from './backstage-passes-category-strategy';

describe('BackstagePassesCategoryStrategy', () => {
  describe('Given the daily update operation', () => {
    describe('When a BackstagePasses item has 15 days remaining and quality 20', () => {
      it('Then increases quality by 1 when more than 10 days remain', () => {
        const state: DailyItemState = { sellIn: 15, quality: new Quality(20) };
        const strategy = new BackstagePassesCategoryStrategy();

        const result = strategy.update(state);

        expect(result.quality.value).toBe(21);
        expect(result.sellIn).toBe(14);
        expect(state.sellIn).toBe(15);
        expect(state.quality.value).toBe(20);
      });
    });

    describe('When a BackstagePasses item has 10 days remaining and quality 20', () => {
      it('Then increases quality by 2 when 10 or fewer days remain', () => {
        const state: DailyItemState = { sellIn: 10, quality: new Quality(20) };
        const strategy = new BackstagePassesCategoryStrategy();

        const result = strategy.update(state);

        expect(result.quality.value).toBe(22);
        expect(result.sellIn).toBe(9);
        expect(state.sellIn).toBe(10);
        expect(state.quality.value).toBe(20);
      });
    });

    describe('When a BackstagePasses item has 5 days remaining and quality 20', () => {
      it('Then increases quality by 3 when 5 or fewer days remain', () => {
        const state: DailyItemState = { sellIn: 5, quality: new Quality(20) };
        const strategy = new BackstagePassesCategoryStrategy();

        const result = strategy.update(state);

        expect(result.quality.value).toBe(23);
        expect(result.sellIn).toBe(4);
        expect(state.sellIn).toBe(5);
        expect(state.quality.value).toBe(20);
      });
    });

    describe('When a BackstagePasses item has 0 days remaining and quality 20', () => {
      it('Then quality drops to 0 after the concert', () => {
        const state: DailyItemState = { sellIn: 0, quality: new Quality(20) };
        const strategy = new BackstagePassesCategoryStrategy();

        const result = strategy.update(state);

        expect(result.quality.value).toBe(0);
        expect(result.sellIn).toBe(-1);
        expect(state.sellIn).toBe(0);
        expect(state.quality.value).toBe(20);
      });
    });

    describe('When a BackstagePasses item has 5 days remaining and quality 49', () => {
      it('Then quality never exceeds 50', () => {
        const state: DailyItemState = { sellIn: 5, quality: new Quality(49) };
        const strategy = new BackstagePassesCategoryStrategy();

        const result = strategy.update(state);

        expect(result.quality.value).toBe(50);
        expect(result.sellIn).toBe(4);
        expect(state.sellIn).toBe(5);
        expect(state.quality.value).toBe(49);
      });
    });

    describe('When a BackstagePasses item has 11 days remaining and quality 20', () => {
      it('Then increases quality by 1 and leaves ten days remaining', () => {
        const state: DailyItemState = { sellIn: 11, quality: new Quality(20) };
        const strategy = new BackstagePassesCategoryStrategy();

        const result = strategy.update(state);

        expect(result.quality.value).toBe(21);
        expect(result.sellIn).toBe(10);
        expect(state.sellIn).toBe(11);
        expect(state.quality.value).toBe(20);
      });
    });

    describe('When a BackstagePasses item has 6 days remaining and quality 20', () => {
      it('Then increases quality by 2 and leaves five days remaining', () => {
        const state: DailyItemState = { sellIn: 6, quality: new Quality(20) };
        const strategy = new BackstagePassesCategoryStrategy();

        const result = strategy.update(state);

        expect(result.quality.value).toBe(22);
        expect(result.sellIn).toBe(5);
        expect(state.sellIn).toBe(6);
        expect(state.quality.value).toBe(20);
      });
    });

    describe('When a BackstagePasses item has 1 day remaining and quality 20', () => {
      it('Then increases quality by 3 and leaves no days remaining', () => {
        const state: DailyItemState = { sellIn: 1, quality: new Quality(20) };
        const strategy = new BackstagePassesCategoryStrategy();

        const result = strategy.update(state);

        expect(result.quality.value).toBe(23);
        expect(result.sellIn).toBe(0);
        expect(state.sellIn).toBe(1);
        expect(state.quality.value).toBe(20);
      });
    });

    describe('When a BackstagePasses item has -1 day remaining and quality 20', () => {
      it('Then loses all quality and advances its expired deadline', () => {
        const state: DailyItemState = { sellIn: -1, quality: new Quality(20) };
        const strategy = new BackstagePassesCategoryStrategy();

        const result = strategy.update(state);

        expect(result.quality.value).toBe(0);
        expect(result.sellIn).toBe(-2);
        expect(state.sellIn).toBe(-1);
        expect(state.quality.value).toBe(20);
      });
    });

    describe('When a BackstagePasses item has 11 days remaining and quality 49', () => {
      it('Then reaches quality 50 and leaves ten days remaining', () => {
        const state: DailyItemState = { sellIn: 11, quality: new Quality(49) };
        const strategy = new BackstagePassesCategoryStrategy();

        const result = strategy.update(state);

        expect(result.quality.value).toBe(50);
        expect(result.sellIn).toBe(10);
        expect(state.sellIn).toBe(11);
        expect(state.quality.value).toBe(49);
      });
    });

    describe('When a BackstagePasses item has 10 days remaining and quality 49', () => {
      it('Then caps its two-point gain at quality 50 and reduces its deadline', () => {
        const state: DailyItemState = { sellIn: 10, quality: new Quality(49) };
        const strategy = new BackstagePassesCategoryStrategy();

        const result = strategy.update(state);

        expect(result.quality.value).toBe(50);
        expect(result.sellIn).toBe(9);
        expect(state.sellIn).toBe(10);
        expect(state.quality.value).toBe(49);
      });
    });

    describe('When a BackstagePasses item has 5 days remaining and quality 48', () => {
      it('Then caps its three-point gain at quality 50 and reduces its deadline', () => {
        const state: DailyItemState = { sellIn: 5, quality: new Quality(48) };
        const strategy = new BackstagePassesCategoryStrategy();

        const result = strategy.update(state);

        expect(result.quality.value).toBe(50);
        expect(result.sellIn).toBe(4);
        expect(state.sellIn).toBe(5);
        expect(state.quality.value).toBe(48);
      });
    });
  });
});

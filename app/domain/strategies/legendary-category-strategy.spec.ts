import { describe, expect, it } from 'vitest';
import { CATEGORY } from '../category';
import { Item } from '../item';
import { LegendaryCategoryStrategy } from './legendary-category-strategy';

describe('LegendaryCategoryStrategy', () => {
  describe('Given the daily update operation', () => {
    describe('When a Legendary item has 5 days remaining and quality 80', () => {
      it('Then quality never changes', () => {
        const item = new Item('Sulfuras, Hand of Ragnaros', 5, 80, CATEGORY.LEGENDARY);
        const strategy = new LegendaryCategoryStrategy();

        strategy.update(item);

        expect(item.quality).toBe(80);
      });
    });

    describe('When a Legendary item has 5 days remaining and quality 80', () => {
      it('Then sellIn never changes', () => {
        const item = new Item('Sulfuras, Hand of Ragnaros', 5, 80, CATEGORY.LEGENDARY);
        const strategy = new LegendaryCategoryStrategy();

        strategy.update(item);

        expect(item.sellIn).toBe(5);
      });
    });

    describe('When a Legendary item has 0 days remaining and quality 80', () => {
      it('Then preserves its legendary quality and deadline', () => {
        const item = new Item('Sulfuras, Hand of Ragnaros', 0, 80, CATEGORY.LEGENDARY);
        const strategy = new LegendaryCategoryStrategy();

        strategy.update(item);

        expect(item.quality).toBe(80);
        expect(item.sellIn).toBe(0);
      });
    });

    describe('When a Legendary item has -1 day remaining and quality 80', () => {
      it('Then preserves its legendary quality and expired deadline', () => {
        const item = new Item('Sulfuras, Hand of Ragnaros', -1, 80, CATEGORY.LEGENDARY);
        const strategy = new LegendaryCategoryStrategy();

        strategy.update(item);

        expect(item.quality).toBe(80);
        expect(item.sellIn).toBe(-1);
      });
    });
  });
});

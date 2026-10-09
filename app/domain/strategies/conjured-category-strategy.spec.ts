import { describe, expect, it } from 'vitest';
import { CATEGORY } from '../category';
import { Item } from '../item';
import { ConjuredCategoryStrategy } from './conjured-category-strategy';

describe('ConjuredCategoryStrategy', () => {
  describe('Given the daily update operation', () => {
    describe('When a Conjured item has 5 days remaining and quality 10', () => {
      it('Then decreases quality by 2 and sellIn by 1', () => {
        const item = new Item('Conjured Mana Cake', 5, 10, CATEGORY.CONJURED);
        const strategy = new ConjuredCategoryStrategy();

        strategy.update(item);

        expect(item.quality).toBe(8);
        expect(item.sellIn).toBe(4);
      });
    });

    describe('When a Conjured item has 0 days remaining and quality 10', () => {
      it('Then decreases quality by 4 and sellIn by 1', () => {
        const item = new Item('Conjured Mana Cake', 0, 10, CATEGORY.CONJURED);
        const strategy = new ConjuredCategoryStrategy();

        strategy.update(item);

        expect(item.quality).toBe(6);
        expect(item.sellIn).toBe(-1);
      });
    });

    describe('When a Conjured item has -1 day remaining and quality 10', () => {
      it('Then decreases quality by 4 and advances its expired deadline', () => {
        const item = new Item('Conjured Mana Cake', -1, 10, CATEGORY.CONJURED);
        const strategy = new ConjuredCategoryStrategy();

        strategy.update(item);

        expect(item.quality).toBe(6);
        expect(item.sellIn).toBe(-2);
      });
    });

    describe('When a Conjured item has 1 day remaining and quality 10', () => {
      it('Then decreases quality by 2 and leaves no days remaining', () => {
        const item = new Item('Conjured Mana Cake', 1, 10, CATEGORY.CONJURED);
        const strategy = new ConjuredCategoryStrategy();

        strategy.update(item);

        expect(item.quality).toBe(8);
        expect(item.sellIn).toBe(0);
      });
    });

    describe('When a Conjured item has 5 days remaining and quality 1', () => {
      it('Then stops quality at zero and reduces the remaining deadline', () => {
        const item = new Item('Conjured Mana Cake', 5, 1, CATEGORY.CONJURED);
        const strategy = new ConjuredCategoryStrategy();

        strategy.update(item);

        expect(item.quality).toBe(0);
        expect(item.sellIn).toBe(4);
      });
    });

    describe('When a Conjured item has 0 days remaining and quality 3', () => {
      it('Then stops quality at zero and advances its expired deadline', () => {
        const item = new Item('Conjured Mana Cake', 0, 3, CATEGORY.CONJURED);
        const strategy = new ConjuredCategoryStrategy();

        strategy.update(item);

        expect(item.quality).toBe(0);
        expect(item.sellIn).toBe(-1);
      });
    });

    describe('When a Conjured item has -1 day remaining and quality 0', () => {
      it('Then preserves zero quality and advances its expired deadline', () => {
        const item = new Item('Conjured Mana Cake', -1, 0, CATEGORY.CONJURED);
        const strategy = new ConjuredCategoryStrategy();

        strategy.update(item);

        expect(item.quality).toBe(0);
        expect(item.sellIn).toBe(-2);
      });
    });
  });
});

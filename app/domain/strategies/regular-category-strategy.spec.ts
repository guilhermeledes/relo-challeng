import { describe, expect, it } from 'vitest';
import { CATEGORY } from '../category';
import { Item } from '../item';
import { RegularCategoryStrategy } from './regular-category-strategy';

describe('RegularCategoryStrategy', () => {
  describe('Given the daily update operation', () => {
    describe('When a Regular item has 5 days remaining and quality 10', () => {
      it('Then decreases quality by 1 per day', () => {
        const item = new Item('foo', 5, 10);
        const strategy = new RegularCategoryStrategy();

        strategy.update(item);

        expect(item.quality).toBe(9);
      });
    });

    describe('When a Regular item has 5 days remaining and quality 10', () => {
      it('Then decreases sellIn by 1 per day', () => {
        const item = new Item('foo', 5, 10);
        const strategy = new RegularCategoryStrategy();

        strategy.update(item);

        expect(item.sellIn).toBe(4);
      });
    });

    describe('When a Regular item has 5 days remaining and quality 0', () => {
      it('Then quality never drops below 0', () => {
        const item = new Item('foo', 5, 0);
        const strategy = new RegularCategoryStrategy();

        strategy.update(item);

        expect(item.quality).toBe(0);
      });
    });

    describe('When a Regular item has 1 day remaining and quality 10', () => {
      it('Then quality degrades by 1 when there is one day remaining', () => {
        const item = new Item('foo', 1, 10);
        const strategy = new RegularCategoryStrategy();

        strategy.update(item);

        expect(item.quality).toBe(9);
      });
    });

    describe('When a Regular item has 0 days remaining and quality 10', () => {
      it('Then decreases quality by 2 and sellIn by 1', () => {
        const item = new Item('foo', 0, 10);
        const strategy = new RegularCategoryStrategy();

        strategy.update(item);

        expect(item.quality).toBe(8);
        expect(item.sellIn).toBe(-1);
      });
    });

    describe('When a Regular item has 0 days remaining and quality 1', () => {
      it('Then keeps quality at zero and decreases sellIn', () => {
        const item = new Item('foo', 0, 1);
        const strategy = new RegularCategoryStrategy();

        strategy.update(item);

        expect(item.quality).toBe(0);
        expect(item.sellIn).toBe(-1);
      });
    });

    describe('When a Regular item has -1 day remaining and quality 10', () => {
      it('Then degrades twice and advances its expired deadline', () => {
        const item = new Item('foo', -1, 10, CATEGORY.REGULAR);
        const strategy = new RegularCategoryStrategy();

        strategy.update(item);

        expect(item.quality).toBe(8);
        expect(item.sellIn).toBe(-2);
      });
    });

    describe('When a Regular item has -1 day remaining and quality 0', () => {
      it('Then preserves the quality floor and advances its deadline', () => {
        const item = new Item('foo', -1, 0, CATEGORY.REGULAR);
        const strategy = new RegularCategoryStrategy();

        strategy.update(item);

        expect(item.quality).toBe(0);
        expect(item.sellIn).toBe(-2);
      });
    });
  });
});

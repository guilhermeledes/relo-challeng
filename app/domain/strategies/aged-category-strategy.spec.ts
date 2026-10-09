import { describe, expect, it } from 'vitest';
import { CATEGORY } from '../category';
import { Item } from '../item';
import { AgedCategoryStrategy } from './aged-category-strategy';

describe('AgedCategoryStrategy', () => {
  describe('Given the daily update operation', () => {
    describe('When a Ages item has 5 days remaining and quality 20', () => {
      it('Then increases quality by 1 per day', () => {
        const item = new Item('Aged Brie', 5, 20, CATEGORY.AGES);
        const strategy = new AgedCategoryStrategy();

        strategy.update(item);

        expect(item.quality).toBe(21);
      });
    });

    describe('When a Ages item has 0 days remaining and quality 20', () => {
      it('Then increases quality by 2 after the sell date', () => {
        const item = new Item('Aged Brie', 0, 20, CATEGORY.AGES);
        const strategy = new AgedCategoryStrategy();

        strategy.update(item);

        expect(item.quality).toBe(22);
      });
    });

    describe('When a Ages item has 5 days remaining and quality 50', () => {
      it('Then quality never exceeds 50', () => {
        const item = new Item('Aged Brie', 5, 50, CATEGORY.AGES);
        const strategy = new AgedCategoryStrategy();

        strategy.update(item);

        expect(item.quality).toBe(50);
      });
    });

    describe('When a Ages item has 1 day remaining and quality 20', () => {
      it('Then increases quality by 1 and leaves no days remaining', () => {
        const item = new Item('Aged Brie', 1, 20, CATEGORY.AGES);
        const strategy = new AgedCategoryStrategy();

        strategy.update(item);

        expect(item.quality).toBe(21);
        expect(item.sellIn).toBe(0);
      });
    });

    describe('When a Ages item has 0 days remaining and quality 49', () => {
      it('Then caps quality at 50 and decreases sellIn', () => {
        const item = new Item('Aged Brie', 0, 49, CATEGORY.AGES);
        const strategy = new AgedCategoryStrategy();

        strategy.update(item);

        expect(item.quality).toBe(50);
        expect(item.sellIn).toBe(-1);
      });
    });

    describe('When a Ages item has -1 day remaining and quality 20', () => {
      it('Then gains two quality points and advances its expired deadline', () => {
        const item = new Item('Aged Brie', -1, 20, CATEGORY.AGES);
        const strategy = new AgedCategoryStrategy();

        strategy.update(item);

        expect(item.quality).toBe(22);
        expect(item.sellIn).toBe(-2);
      });
    });

    describe('When a Ages item has 5 days remaining and quality 49', () => {
      it('Then reaches quality 50 and reduces the remaining deadline', () => {
        const item = new Item('Aged Brie', 5, 49, CATEGORY.AGES);
        const strategy = new AgedCategoryStrategy();

        strategy.update(item);

        expect(item.quality).toBe(50);
        expect(item.sellIn).toBe(4);
      });
    });

    describe('When a Ages item has 0 days remaining and quality 50', () => {
      it('Then preserves the quality ceiling and advances its deadline', () => {
        const item = new Item('Aged Brie', 0, 50, CATEGORY.AGES);
        const strategy = new AgedCategoryStrategy();

        strategy.update(item);

        expect(item.quality).toBe(50);
        expect(item.sellIn).toBe(-1);
      });
    });
  });
});

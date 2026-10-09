import { describe, expect, it } from 'vitest';
import { CATEGORY } from '../category';
import { Item } from '../item';
import { BackstagePassesCategoryStrategy } from './backstage-passes-category-strategy';

describe('BackstagePassesCategoryStrategy', () => {
  describe('Given the daily update operation', () => {
    describe('When a BackstagePasses item has 15 days remaining and quality 20', () => {
      it('Then increases quality by 1 when more than 10 days remain', () => {
        const item = new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20, CATEGORY.BACKSTAGE_PASSES);
        const strategy = new BackstagePassesCategoryStrategy();

        strategy.update(item);

        expect(item.quality).toBe(21);
      });
    });

    describe('When a BackstagePasses item has 10 days remaining and quality 20', () => {
      it('Then increases quality by 2 when 10 or fewer days remain', () => {
        const item = new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20, CATEGORY.BACKSTAGE_PASSES);
        const strategy = new BackstagePassesCategoryStrategy();

        strategy.update(item);

        expect(item.quality).toBe(22);
      });
    });

    describe('When a BackstagePasses item has 5 days remaining and quality 20', () => {
      it('Then increases quality by 3 when 5 or fewer days remain', () => {
        const item = new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20, CATEGORY.BACKSTAGE_PASSES);
        const strategy = new BackstagePassesCategoryStrategy();

        strategy.update(item);

        expect(item.quality).toBe(23);
      });
    });

    describe('When a BackstagePasses item has 0 days remaining and quality 20', () => {
      it('Then quality drops to 0 after the concert', () => {
        const item = new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20, CATEGORY.BACKSTAGE_PASSES);
        const strategy = new BackstagePassesCategoryStrategy();

        strategy.update(item);

        expect(item.quality).toBe(0);
      });
    });

    describe('When a BackstagePasses item has 5 days remaining and quality 49', () => {
      it('Then quality never exceeds 50', () => {
        const item = new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49, CATEGORY.BACKSTAGE_PASSES);
        const strategy = new BackstagePassesCategoryStrategy();

        strategy.update(item);

        expect(item.quality).toBe(50);
      });
    });

    describe('When a BackstagePasses item has 11 days remaining and quality 20', () => {
      it('Then increases quality by 1 and leaves ten days remaining', () => {
        const item = new Item('Backstage passes to a TAFKAL80ETC concert', 11, 20, CATEGORY.BACKSTAGE_PASSES);
        const strategy = new BackstagePassesCategoryStrategy();

        strategy.update(item);

        expect(item.quality).toBe(21);
        expect(item.sellIn).toBe(10);
      });
    });

    describe('When a BackstagePasses item has 6 days remaining and quality 20', () => {
      it('Then increases quality by 2 and leaves five days remaining', () => {
        const item = new Item('Backstage passes to a TAFKAL80ETC concert', 6, 20, CATEGORY.BACKSTAGE_PASSES);
        const strategy = new BackstagePassesCategoryStrategy();

        strategy.update(item);

        expect(item.quality).toBe(22);
        expect(item.sellIn).toBe(5);
      });
    });

    describe('When a BackstagePasses item has 1 day remaining and quality 20', () => {
      it('Then increases quality by 3 and leaves no days remaining', () => {
        const item = new Item('Backstage passes to a TAFKAL80ETC concert', 1, 20, CATEGORY.BACKSTAGE_PASSES);
        const strategy = new BackstagePassesCategoryStrategy();

        strategy.update(item);

        expect(item.quality).toBe(23);
        expect(item.sellIn).toBe(0);
      });
    });

    describe('When a BackstagePasses item has -1 day remaining and quality 20', () => {
      it('Then loses all quality and advances its expired deadline', () => {
        const item = new Item('Backstage passes', -1, 20, CATEGORY.BACKSTAGE_PASSES);
        const strategy = new BackstagePassesCategoryStrategy();

        strategy.update(item);

        expect(item.quality).toBe(0);
        expect(item.sellIn).toBe(-2);
      });
    });

    describe('When a BackstagePasses item has 11 days remaining and quality 49', () => {
      it('Then reaches quality 50 and leaves ten days remaining', () => {
        const item = new Item('Backstage passes', 11, 49, CATEGORY.BACKSTAGE_PASSES);
        const strategy = new BackstagePassesCategoryStrategy();

        strategy.update(item);

        expect(item.quality).toBe(50);
        expect(item.sellIn).toBe(10);
      });
    });

    describe('When a BackstagePasses item has 10 days remaining and quality 49', () => {
      it('Then caps its two-point gain at quality 50 and reduces its deadline', () => {
        const item = new Item('Backstage passes', 10, 49, CATEGORY.BACKSTAGE_PASSES);
        const strategy = new BackstagePassesCategoryStrategy();

        strategy.update(item);

        expect(item.quality).toBe(50);
        expect(item.sellIn).toBe(9);
      });
    });

    describe('When a BackstagePasses item has 5 days remaining and quality 48', () => {
      it('Then caps its three-point gain at quality 50 and reduces its deadline', () => {
        const item = new Item('Backstage passes', 5, 48, CATEGORY.BACKSTAGE_PASSES);
        const strategy = new BackstagePassesCategoryStrategy();

        strategy.update(item);

        expect(item.quality).toBe(50);
        expect(item.sellIn).toBe(4);
      });
    });
  });
});

import { describe, expect, it } from 'vitest';
import { GildedRose } from './gilded-rose';
import { CATEGORY } from './domain/strategies/category-strategies';
import { Item } from './domain/item';

describe('GildedRose', () => {
  describe('given updateInventory', () => {
    describe('when Conjured and default Regular at sellIn 1 and quality 10 across successive days', () => {
      it('then degrades Conjured twice as fast while preserving inventory references', () => {
        const conjured = new Item('foo', 1, 10, CATEGORY.CONJURED);
        const regular = new Item('Conjured Mana Cake', 1, 10);
        const items = [conjured, regular];
        const sut = new GildedRose(items);

        const firstDay = sut.updateInventory();

        expect(firstDay).toBe(items);
        expect(conjured.quality).toBe(8);
        expect(conjured.sellIn).toBe(0);
        expect(regular.quality).toBe(9);
        expect(regular.sellIn).toBe(0);

        const secondDay = sut.updateInventory();

        expect(secondDay).toBe(items);
        expect(secondDay[0]).toBe(conjured);
        expect(secondDay[1]).toBe(regular);
        expect(conjured.quality).toBe(4);
        expect(conjured.sellIn).toBe(-1);
        expect(regular.quality).toBe(7);
        expect(regular.sellIn).toBe(-1);
      });
    });

    describe('when an empty inventory', () => {
      it('then returns the original empty array', () => {
        const items: Item[] = [];
        const sut = new GildedRose(items);

        const result = sut.updateInventory();

        expect(result).toBe(items);
        expect(result).toEqual([]);
      });
    });

    describe('when all five categories with Regular and Ages at sellIn 0, quality 10 and 20; BackstagePasses at sellIn 5, quality 20; Legendary at sellIn 0, quality 80; Conjured at sellIn 0, quality 10', () => {
      it('then updates each item in place while preserving every reference', () => {
        const regular = new Item('foo', 0, 10, CATEGORY.REGULAR);
        const aged = new Item('Aged Brie', 0, 20, CATEGORY.AGES);
        const backstage = new Item('Backstage passes', 5, 20, CATEGORY.BACKSTAGE_PASSES);
        const legendary = new Item('Sulfuras', 0, 80, CATEGORY.LEGENDARY);
        const conjured = new Item('Conjured Mana Cake', 0, 10, CATEGORY.CONJURED);
        const items = [regular, aged, backstage, legendary, conjured];
        const sut = new GildedRose(items);

        const result = sut.updateInventory();

        expect(result).toBe(items);
        expect(result[0]).toBe(regular);
        expect(result[1]).toBe(aged);
        expect(result[2]).toBe(backstage);
        expect(result[3]).toBe(legendary);
        expect(result[4]).toBe(conjured);
        expect(regular.quality).toBe(8);
        expect(regular.sellIn).toBe(-1);
        expect(aged.quality).toBe(22);
        expect(aged.sellIn).toBe(-1);
        expect(backstage.quality).toBe(23);
        expect(backstage.sellIn).toBe(4);
        expect(legendary.quality).toBe(80);
        expect(legendary.sellIn).toBe(0);
        expect(conjured.quality).toBe(6);
        expect(conjured.sellIn).toBe(-1);
      });
    });

    describe('when all five categories at sellIn 1 with Regular and Conjured quality 10, Ages and BackstagePasses quality 20, and Legendary quality 80 across successive days', () => {
      it('then applies expiration only after each final unexpired day', () => {
        const regular = new Item('foo', 1, 10, CATEGORY.REGULAR);
        const aged = new Item('Aged Brie', 1, 20, CATEGORY.AGES);
        const backstage = new Item('Backstage passes', 1, 20, CATEGORY.BACKSTAGE_PASSES);
        const legendary = new Item('Sulfuras', 1, 80, CATEGORY.LEGENDARY);
        const conjured = new Item('Conjured Mana Cake', 1, 10, CATEGORY.CONJURED);
        const sut = new GildedRose([regular, aged, backstage, legendary, conjured]);

        sut.updateInventory();

        expect(regular.quality).toBe(9);
        expect(regular.sellIn).toBe(0);
        expect(aged.quality).toBe(21);
        expect(aged.sellIn).toBe(0);
        expect(backstage.quality).toBe(23);
        expect(backstage.sellIn).toBe(0);
        expect(legendary.quality).toBe(80);
        expect(legendary.sellIn).toBe(1);
        expect(conjured.quality).toBe(8);
        expect(conjured.sellIn).toBe(0);

        sut.updateInventory();

        expect(regular.quality).toBe(7);
        expect(regular.sellIn).toBe(-1);
        expect(aged.quality).toBe(23);
        expect(aged.sellIn).toBe(-1);
        expect(backstage.quality).toBe(0);
        expect(backstage.sellIn).toBe(-1);
        expect(legendary.quality).toBe(80);
        expect(legendary.sellIn).toBe(1);
        expect(conjured.quality).toBe(4);
        expect(conjured.sellIn).toBe(-1);
      });
    });

    describe('when Aged Brie, Backstage passes and Sulfuras names with explicit Regular category, sellIn 5 and quality 20', () => {
      it('then degrades every item according to its category rather than its name', () => {
        const agedName = new Item('Aged Brie', 5, 20, CATEGORY.REGULAR);
        const backstageName = new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20, CATEGORY.REGULAR);
        const legendaryName = new Item('Sulfuras, Hand of Ragnaros', 5, 20, CATEGORY.REGULAR);
        const sut = new GildedRose([agedName, backstageName, legendaryName]);

        sut.updateInventory();

        expect(agedName.quality).toBe(19);
        expect(agedName.sellIn).toBe(4);
        expect(backstageName.quality).toBe(19);
        expect(backstageName.sellIn).toBe(4);
        expect(legendaryName.quality).toBe(19);
        expect(legendaryName.sellIn).toBe(4);
      });
    });

    describe('when ordinary names with Ages and BackstagePasses at sellIn 5, quality 20 and Legendary at sellIn 5, quality 80', () => {
      it('then applies aging, backstage and legendary rules despite their ordinary names', () => {
        const aged = new Item('foo', 5, 20, CATEGORY.AGES);
        const backstage = new Item('bar', 5, 20, CATEGORY.BACKSTAGE_PASSES);
        const legendary = new Item('baz', 5, 80, CATEGORY.LEGENDARY);
        const sut = new GildedRose([aged, backstage, legendary]);

        sut.updateInventory();

        expect(aged.quality).toBe(21);
        expect(aged.sellIn).toBe(4);
        expect(backstage.quality).toBe(23);
        expect(backstage.sellIn).toBe(4);
        expect(legendary.quality).toBe(80);
        expect(legendary.sellIn).toBe(5);
      });
    });
  });
});

import { describe, it, expect } from 'vitest';
import { GildedRose } from '@/gilded-rose';
import { CATEGORY, type Category } from '@/domain/category';
import { Item } from '@/domain/item';

function createItemMock(name: string = 'foo', sellIn: number = 10, quality: number = 10, category?: Category): Item {
  return new Item(name, sellIn, quality, category);
}

describe('GildedRose', () => {
  describe('given a conjured item alongside a Regular item with one day remaining', () => {
    describe('when the inventory is updated on successive days', () => {
      it('then degrades Conjured twice as fast while preserving inventory references', () => {
        const conjured = createItemMock('foo', 1, 10, CATEGORY.CONJURED);
        const regular = createItemMock('Conjured Mana Cake', 1, 10);
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
  });

  describe('given an empty inventory', () => {
    describe('when the inventory is updated', () => {
      it('then returns the original empty array', () => {
        const items: Item[] = [];
        const sut = new GildedRose(items);

        const result = sut.updateInventory();

        expect(result).toBe(items);
        expect(result).toEqual([]);
      });
    });
  });

  describe('given an inventory containing all existing categories', () => {
    describe('when the inventory is updated', () => {
      it('then updates each item in place while preserving every reference', () => {
        const regular = createItemMock('foo', 0, 10, CATEGORY.REGULAR);
        const aged = createItemMock('Aged Brie', 0, 20, CATEGORY.AGES);
        const backstage = createItemMock('Backstage passes', 5, 20, CATEGORY.BACKSTAGE_PASSES);
        const legendary = createItemMock('Sulfuras', 0, 80, CATEGORY.LEGENDARY);
        const items = [regular, aged, backstage, legendary];
        const sut = new GildedRose(items);

        const result = sut.updateInventory();

        expect(result).toBe(items);
        expect(result[0]).toBe(regular);
        expect(result[1]).toBe(aged);
        expect(result[2]).toBe(backstage);
        expect(result[3]).toBe(legendary);
        expect(regular.quality).toBe(8);
        expect(regular.sellIn).toBe(-1);
        expect(aged.quality).toBe(22);
        expect(aged.sellIn).toBe(-1);
        expect(backstage.quality).toBe(23);
        expect(backstage.sellIn).toBe(4);
        expect(legendary.quality).toBe(80);
        expect(legendary.sellIn).toBe(0);
      });
    });
  });

  describe('given an inventory with one day remaining for every category', () => {
    describe('when the inventory is updated on successive days', () => {
      it('then applies expiration only after each final unexpired day', () => {
        const regular = createItemMock('foo', 1, 10, CATEGORY.REGULAR);
        const aged = createItemMock('Aged Brie', 1, 20, CATEGORY.AGES);
        const backstage = createItemMock('Backstage passes', 1, 20, CATEGORY.BACKSTAGE_PASSES);
        const legendary = createItemMock('Sulfuras', 1, 80, CATEGORY.LEGENDARY);
        const sut = new GildedRose([regular, aged, backstage, legendary]);

        sut.updateInventory();

        expect(regular.quality).toBe(9);
        expect(regular.sellIn).toBe(0);
        expect(aged.quality).toBe(21);
        expect(aged.sellIn).toBe(0);
        expect(backstage.quality).toBe(23);
        expect(backstage.sellIn).toBe(0);
        expect(legendary.quality).toBe(80);
        expect(legendary.sellIn).toBe(1);

        sut.updateInventory();

        expect(regular.quality).toBe(7);
        expect(regular.sellIn).toBe(-1);
        expect(aged.quality).toBe(23);
        expect(aged.sellIn).toBe(-1);
        expect(backstage.quality).toBe(0);
        expect(backstage.sellIn).toBe(-1);
        expect(legendary.quality).toBe(80);
        expect(legendary.sellIn).toBe(1);
      });
    });
  });

  describe('given commercial names with an explicit Regular category', () => {
    describe('when the inventory is updated', () => {
      it('then degrades every item according to its category rather than its name', () => {
        const agedName = createItemMock('Aged Brie', 5, 20, CATEGORY.REGULAR);
        const backstageName = createItemMock('Backstage passes to a TAFKAL80ETC concert', 5, 20, CATEGORY.REGULAR);
        const legendaryName = createItemMock('Sulfuras, Hand of Ragnaros', 5, 20, CATEGORY.REGULAR);
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
  });

  describe('given ordinary names with explicit special categories', () => {
    describe('when the inventory is updated', () => {
      it('then applies aging, backstage and legendary rules despite their ordinary names', () => {
        const aged = createItemMock('foo', 5, 20, CATEGORY.AGES);
        const backstage = createItemMock('bar', 5, 20, CATEGORY.BACKSTAGE_PASSES);
        const legendary = createItemMock('baz', 5, 80, CATEGORY.LEGENDARY);
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

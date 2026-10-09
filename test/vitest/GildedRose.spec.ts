import { describe, it, expect } from 'vitest';
import { CATEGORY, Category, GildedRose, Item } from '@/gilded-rose';

function createItemMock(name: string = 'foo', sellIn: number = 10, quality: number = 10, category?: Category): Item {
  return new Item(name, sellIn, quality, category);
}

describe('GildedRose', () => {
  describe('normal items', () => {
    it('decreases quality by 1 per day', () => {
      const itemMock = createItemMock('foo', 5, 10);
      const sut = new GildedRose([itemMock]);

      const [item] = sut.updateInventory();

      expect(item.quality).toBe(9);
    });

    it('decreases sellIn by 1 per day', () => {
      const itemMock = createItemMock('foo', 5, 10);
      const sut = new GildedRose([itemMock]);

      const [item] = sut.updateInventory();

      expect(item.sellIn).toBe(4);
    });

    it('quality never drops below 0', () => {
      const itemMock = createItemMock('foo', 5, 0);
      const sut = new GildedRose([itemMock]);

      const [item] = sut.updateInventory();

      expect(item.quality).toBe(0);
    });

    it('quality degrades by 1 when there is one day remaining', () => {
      const itemMock = createItemMock('foo', 1, 10);
      const sut = new GildedRose([itemMock]);

      const [item] = sut.updateInventory();

      expect(item.quality).toBe(9);
    });
  });

  describe('Aged Brie', () => {
    it('increases quality by 1 per day', () => {
      const itemMock = createItemMock('Aged Brie', 5, 20, CATEGORY.AGES);
      const sut = new GildedRose([itemMock]);

      const [item] = sut.updateInventory();

      expect(item.quality).toBe(21);
    });

    it('increases quality by 2 after the sell date', () => {
      const itemMock = createItemMock('Aged Brie', 0, 20, CATEGORY.AGES);
      const sut = new GildedRose([itemMock]);

      const [item] = sut.updateInventory();

      expect(item.quality).toBe(22);
    });

    it('quality never exceeds 50', () => {
      const itemMock = createItemMock('Aged Brie', 5, 50, CATEGORY.AGES);
      const sut = new GildedRose([itemMock]);

      const [item] = sut.updateInventory();

      expect(item.quality).toBe(50);
    });
  });

  describe('Backstage passes to a TAFKAL80ETC concert', () => {
    it('increases quality by 1 when more than 10 days remain', () => {
      const itemMock = createItemMock('Backstage passes to a TAFKAL80ETC concert', 15, 20, CATEGORY.BACKSTAGE_PASSES);
      const sut = new GildedRose([itemMock]);

      const [item] = sut.updateInventory();

      expect(item.quality).toBe(21);
    });

    it('increases quality by 2 when 10 or fewer days remain', () => {
      const itemMock = createItemMock('Backstage passes to a TAFKAL80ETC concert', 10, 20, CATEGORY.BACKSTAGE_PASSES);
      const sut = new GildedRose([itemMock]);

      const [item] = sut.updateInventory();

      expect(item.quality).toBe(22);
    });

    it('increases quality by 3 when 5 or fewer days remain', () => {
      const itemMock = createItemMock('Backstage passes to a TAFKAL80ETC concert', 5, 20, CATEGORY.BACKSTAGE_PASSES);
      const sut = new GildedRose([itemMock]);

      const [item] = sut.updateInventory();

      expect(item.quality).toBe(23);
    });

    it('quality drops to 0 after the concert', () => {
      const itemMock = createItemMock('Backstage passes to a TAFKAL80ETC concert', 0, 20, CATEGORY.BACKSTAGE_PASSES);
      const sut = new GildedRose([itemMock]);

      const [item] = sut.updateInventory();

      expect(item.quality).toBe(0);
    });

    it('quality never exceeds 50', () => {
      const itemMock = createItemMock('Backstage passes to a TAFKAL80ETC concert', 5, 49, CATEGORY.BACKSTAGE_PASSES);
      const sut = new GildedRose([itemMock]);

      const [item] = sut.updateInventory();

      expect(item.quality).toBe(50);
    });
  });

  describe('Sulfuras, Hand of Ragnaros', () => {
    it('quality never changes', () => {
      const itemMock = createItemMock('Sulfuras, Hand of Ragnaros', 5, 80, CATEGORY.LEGENDARY);
      const sut = new GildedRose([itemMock]);

      const [item] = sut.updateInventory();

      expect(item.quality).toBe(80);
    });

    it('sellIn never changes', () => {
      const itemMock = createItemMock('Sulfuras, Hand of Ragnaros', 5, 80, CATEGORY.LEGENDARY);
      const sut = new GildedRose([itemMock]);

      const [item] = sut.updateInventory();

      expect(item.sellIn).toBe(5);
    });
  });
});

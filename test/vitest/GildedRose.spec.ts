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

    describe('given an item with no days remaining', () => {
      describe('when the inventory is updated', () => {
        it('then decreases quality by 2 and sellIn by 1', () => {
          const itemMock = createItemMock('foo', 0, 10);
          const sut = new GildedRose([itemMock]);

          const [item] = sut.updateInventory();

          expect(item.quality).toBe(8);
          expect(item.sellIn).toBe(-1);
        });
      });
    });

    describe('given an expired item with quality 1', () => {
      describe('when the inventory is updated', () => {
        it('then keeps quality at zero and decreases sellIn', () => {
          const itemMock = createItemMock('foo', 0, 1);
          const sut = new GildedRose([itemMock]);

          const [item] = sut.updateInventory();

          expect(item.quality).toBe(0);
          expect(item.sellIn).toBe(-1);
        });
      });
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

    describe('given an aged item with one day remaining', () => {
      describe('when the inventory is updated', () => {
        it('then increases quality by 1 and leaves no days remaining', () => {
          const itemMock = createItemMock('Aged Brie', 1, 20, CATEGORY.AGES);
          const sut = new GildedRose([itemMock]);

          const [item] = sut.updateInventory();

          expect(item.quality).toBe(21);
          expect(item.sellIn).toBe(0);
        });
      });
    });

    describe('given an expired aged item with quality 49', () => {
      describe('when the inventory is updated', () => {
        it('then caps quality at 50 and decreases sellIn', () => {
          const itemMock = createItemMock('Aged Brie', 0, 49, CATEGORY.AGES);
          const sut = new GildedRose([itemMock]);

          const [item] = sut.updateInventory();

          expect(item.quality).toBe(50);
          expect(item.sellIn).toBe(-1);
        });
      });
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

    describe('given a backstage pass with eleven days remaining', () => {
      describe('when the inventory is updated', () => {
        it('then increases quality by 1 and leaves ten days remaining', () => {
          const itemMock = createItemMock('Backstage passes to a TAFKAL80ETC concert', 11, 20, CATEGORY.BACKSTAGE_PASSES);
          const sut = new GildedRose([itemMock]);

          const [item] = sut.updateInventory();

          expect(item.quality).toBe(21);
          expect(item.sellIn).toBe(10);
        });
      });
    });

    describe('given a backstage pass with six days remaining', () => {
      describe('when the inventory is updated', () => {
        it('then increases quality by 2 and leaves five days remaining', () => {
          const itemMock = createItemMock('Backstage passes to a TAFKAL80ETC concert', 6, 20, CATEGORY.BACKSTAGE_PASSES);
          const sut = new GildedRose([itemMock]);

          const [item] = sut.updateInventory();

          expect(item.quality).toBe(22);
          expect(item.sellIn).toBe(5);
        });
      });
    });

    describe('given a backstage pass with one day remaining', () => {
      describe('when the inventory is updated', () => {
        it('then increases quality by 3 and leaves no days remaining', () => {
          const itemMock = createItemMock('Backstage passes to a TAFKAL80ETC concert', 1, 20, CATEGORY.BACKSTAGE_PASSES);
          const sut = new GildedRose([itemMock]);

          const [item] = sut.updateInventory();

          expect(item.quality).toBe(23);
          expect(item.sellIn).toBe(0);
        });
      });
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

  describe('given a Regular item with a negative deadline', () => {
    describe('when the inventory is updated', () => {
      it('then degrades twice and advances its expired deadline', () => {
        const item = createItemMock('foo', -1, 10, CATEGORY.REGULAR);
        const sut = new GildedRose([item]);

        sut.updateInventory();

        expect(item.quality).toBe(8);
        expect(item.sellIn).toBe(-2);
      });
    });
  });

  describe('given a Regular item already at zero quality after expiration', () => {
    describe('when the inventory is updated', () => {
      it('then preserves the quality floor and advances its deadline', () => {
        const item = createItemMock('foo', -1, 0, CATEGORY.REGULAR);
        const sut = new GildedRose([item]);

        sut.updateInventory();

        expect(item.quality).toBe(0);
        expect(item.sellIn).toBe(-2);
      });
    });
  });

  describe('given an aged item with a negative deadline', () => {
    describe('when the inventory is updated', () => {
      it('then gains two quality points and advances its expired deadline', () => {
        const item = createItemMock('Aged Brie', -1, 20, CATEGORY.AGES);
        const sut = new GildedRose([item]);

        sut.updateInventory();

        expect(item.quality).toBe(22);
        expect(item.sellIn).toBe(-2);
      });
    });
  });

  describe('given an aged item with quality 49 before expiration', () => {
    describe('when the inventory is updated', () => {
      it('then reaches quality 50 and reduces the remaining deadline', () => {
        const item = createItemMock('Aged Brie', 5, 49, CATEGORY.AGES);
        const sut = new GildedRose([item]);

        sut.updateInventory();

        expect(item.quality).toBe(50);
        expect(item.sellIn).toBe(4);
      });
    });
  });

  describe('given an aged item at quality 50 after expiration', () => {
    describe('when the inventory is updated', () => {
      it('then preserves the quality ceiling and advances its deadline', () => {
        const item = createItemMock('Aged Brie', 0, 50, CATEGORY.AGES);
        const sut = new GildedRose([item]);

        sut.updateInventory();

        expect(item.quality).toBe(50);
        expect(item.sellIn).toBe(-1);
      });
    });
  });

  describe('given a backstage pass with a negative deadline', () => {
    describe('when the inventory is updated', () => {
      it('then loses all quality and advances its expired deadline', () => {
        const item = createItemMock('Backstage passes', -1, 20, CATEGORY.BACKSTAGE_PASSES);
        const sut = new GildedRose([item]);

        sut.updateInventory();

        expect(item.quality).toBe(0);
        expect(item.sellIn).toBe(-2);
      });
    });
  });

  describe('given a backstage pass near the ceiling with eleven days remaining', () => {
    describe('when the inventory is updated', () => {
      it('then reaches quality 50 and leaves ten days remaining', () => {
        const item = createItemMock('Backstage passes', 11, 49, CATEGORY.BACKSTAGE_PASSES);
        const sut = new GildedRose([item]);

        sut.updateInventory();

        expect(item.quality).toBe(50);
        expect(item.sellIn).toBe(10);
      });
    });
  });

  describe('given a backstage pass near the ceiling with ten days remaining', () => {
    describe('when the inventory is updated', () => {
      it('then caps its two-point gain at quality 50 and reduces its deadline', () => {
        const item = createItemMock('Backstage passes', 10, 49, CATEGORY.BACKSTAGE_PASSES);
        const sut = new GildedRose([item]);

        sut.updateInventory();

        expect(item.quality).toBe(50);
        expect(item.sellIn).toBe(9);
      });
    });
  });

  describe('given a backstage pass with quality 48 and five days remaining', () => {
    describe('when the inventory is updated', () => {
      it('then caps its three-point gain at quality 50 and reduces its deadline', () => {
        const item = createItemMock('Backstage passes', 5, 48, CATEGORY.BACKSTAGE_PASSES);
        const sut = new GildedRose([item]);

        sut.updateInventory();

        expect(item.quality).toBe(50);
        expect(item.sellIn).toBe(4);
      });
    });
  });

  describe('given Sulfuras at quality 80 with no days remaining', () => {
    describe('when the inventory is updated', () => {
      it('then preserves its legendary quality and deadline', () => {
        const item = createItemMock('Sulfuras, Hand of Ragnaros', 0, 80, CATEGORY.LEGENDARY);
        const sut = new GildedRose([item]);

        sut.updateInventory();

        expect(item.quality).toBe(80);
        expect(item.sellIn).toBe(0);
      });
    });
  });

  describe('given Sulfuras at quality 80 with a negative deadline', () => {
    describe('when the inventory is updated', () => {
      it('then preserves its legendary quality and expired deadline', () => {
        const item = createItemMock('Sulfuras, Hand of Ragnaros', -1, 80, CATEGORY.LEGENDARY);
        const sut = new GildedRose([item]);

        sut.updateInventory();

        expect(item.quality).toBe(80);
        expect(item.sellIn).toBe(-1);
      });
    });
  });
});

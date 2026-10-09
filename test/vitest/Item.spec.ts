import { describe, it, expect } from 'vitest';
import { CATEGORY, Item } from '@/gilded-rose';

describe('Item', () => {
  it('sets name from the constructor', () => {
    const item = new Item('Aged Brie', 5, 10);

    expect(item.name).toBe('Aged Brie');
  });

  it('sets sellIn from the constructor', () => {
    const item = new Item('Aged Brie', 5, 10);

    expect(item.sellIn).toBe(5);
  });

  it('sets quality from the constructor', () => {
    const item = new Item('Aged Brie', 5, 10);

    expect(item.quality).toBe(10);
  });

  describe('given no category is supplied', () => {
    describe('when an item is constructed', () => {
      it('then defaults to the Regular category', () => {
        const item = new Item('Aged Brie', 5, 10);

        expect(item.category).toBe(CATEGORY.REGULAR);
      });
    });
  });
});

describe('given quality just below its ceiling', () => {
  describe('when quality increases beyond the ceiling', () => {
    it('then quality stops at 50', () => {
      const item = new Item('Brie', 5, 49, CATEGORY.AGES);

      item.increaseQuality(2);

      expect(item.quality).toBe(50);
    });
  });
});

describe('given quality just above its floor', () => {
  describe('when quality decreases beyond the floor', () => {
    it('then quality stops at zero', () => {
      const item = new Item('Bread', 5, 1);

      item.decreaseQuality(2);

      expect(item.quality).toBe(0);
    });
  });
});

describe('given an item with quality', () => {
  describe('when quality is reset', () => {
    it('then quality becomes zero', () => {
      const item = new Item('Pass', 0, 30, CATEGORY.BACKSTAGE_PASSES);

      item.resetQuality();

      expect(item.quality).toBe(0);
    });
  });
});

describe('given an already expired item', () => {
  describe('when the deadline decreases', () => {
    it('then sellIn decreases by one', () => {
      const item = new Item('Bread', -1, 10);

      item.decreaseSellIn();

      expect(item.sellIn).toBe(-2);
    });
  });
});

describe('given quality at its ceiling', () => {
  describe('when quality increases', () => {
    it('then quality stays at 50', () => {
      const item = new Item('Brie', 5, 50, CATEGORY.AGES);

      item.increaseQuality(1);

      expect(item.quality).toBe(50);
    });
  });
});

describe('given quality at its floor', () => {
  describe('when quality decreases', () => {
    it('then quality stays at zero', () => {
      const item = new Item('Bread', 5, 0);

      item.decreaseQuality(1);

      expect(item.quality).toBe(0);
    });
  });
});

describe('given initial quality above the normal ceiling', () => {
  describe('when quality increases', () => {
    it('then the initial quality is preserved', () => {
      const item = new Item('Unchanged', 5, 80);

      item.increaseQuality(1);

      expect(item.quality).toBe(80);
    });
  });
});

describe('given initial quality below the normal floor', () => {
  describe('when quality decreases', () => {
    it('then the initial quality is preserved', () => {
      const item = new Item('Unchanged', 5, -1);

      item.decreaseQuality(1);

      expect(item.quality).toBe(-1);
    });
  });
});

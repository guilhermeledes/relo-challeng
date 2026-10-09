import { describe, it, expect } from 'vitest';
import { CATEGORY } from '@/domain/category';
import { Item } from '@/domain/item';

describe('Given Item construction', () => {
  describe('When the name is Aged Brie, sellIn is 5 and quality is 10', () => {
    it('Then name is Aged Brie', () => {
      const item = new Item('Aged Brie', 5, 10);

      expect(item.name).toBe('Aged Brie');
    });

    it('Then sellIn is 5', () => {
      const item = new Item('Aged Brie', 5, 10);

      expect(item.sellIn).toBe(5);
    });

    it('Then quality is 10', () => {
      const item = new Item('Aged Brie', 5, 10);

      expect(item.quality).toBe(10);
    });
  });

  describe('When no category is supplied', () => {
    it('Then category defaults to Regular', () => {
      const item = new Item('Aged Brie', 5, 10);

      expect(item.category).toBe(CATEGORY.REGULAR);
    });
  });
});

describe('Given a quality increase', () => {
  describe('When Ages quality is 49 and the increase is 2', () => {
    it('Then quality stops at 50', () => {
      const item = new Item('Brie', 5, 49, CATEGORY.AGES);

      item.increaseQuality(2);

      expect(item.quality).toBe(50);
    });
  });

  describe('When Ages quality is 50 and the increase is 1', () => {
    it('Then quality stays at 50', () => {
      const item = new Item('Brie', 5, 50, CATEGORY.AGES);

      item.increaseQuality(1);

      expect(item.quality).toBe(50);
    });
  });

  describe('When Regular quality is 80 and the increase is 1', () => {
    it('Then initial quality is preserved', () => {
      const item = new Item('Unchanged', 5, 80);

      item.increaseQuality(1);

      expect(item.quality).toBe(80);
    });
  });
});

describe('Given a quality decrease', () => {
  describe('When Regular quality is 1 and the decrease is 2', () => {
    it('Then quality stops at zero', () => {
      const item = new Item('Bread', 5, 1);

      item.decreaseQuality(2);

      expect(item.quality).toBe(0);
    });
  });

  describe('When Regular quality is zero and the decrease is 1', () => {
    it('Then quality stays at zero', () => {
      const item = new Item('Bread', 5, 0);

      item.decreaseQuality(1);

      expect(item.quality).toBe(0);
    });
  });

  describe('When Regular quality is -1 and the decrease is 1', () => {
    it('Then initial quality is preserved', () => {
      const item = new Item('Unchanged', 5, -1);

      item.decreaseQuality(1);

      expect(item.quality).toBe(-1);
    });
  });
});

describe('Given a quality reset', () => {
  describe('When BackstagePasses sellIn is zero and quality is 30', () => {
    it('Then quality becomes zero', () => {
      const item = new Item('Pass', 0, 30, CATEGORY.BACKSTAGE_PASSES);

      item.resetQuality();

      expect(item.quality).toBe(0);
    });
  });
});

describe('Given a deadline decrease', () => {
  describe('When Regular sellIn is -1 and quality is 10', () => {
    it('Then sellIn decreases to -2', () => {
      const item = new Item('Bread', -1, 10);

      item.decreaseSellIn();

      expect(item.sellIn).toBe(-2);
    });
  });
});

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

describe('Given updateDaily', () => {
  describe('When Regular has 5 days remaining and quality 10', () => {
    it('Then applies the next quality and deadline without a result', () => {
      const item = new Item('Bread', 5, 10);

      const result = item.updateDaily();

      expect(item.quality).toBe(9);
      expect(item.sellIn).toBe(4);
      expect(result).toBeUndefined();
    });
  });

  describe('When Ages has 5 days remaining and quality 20', () => {
    it('Then increases quality and reduces the deadline', () => {
      const item = new Item('Ordinary name', 5, 20, CATEGORY.AGES);

      item.updateDaily();

      expect(item.quality).toBe(21);
      expect(item.sellIn).toBe(4);
    });
  });

  describe('When BackstagePasses has 5 days remaining and quality 20', () => {
    it('Then applies its concert gain and reduces the deadline', () => {
      const item = new Item('Ordinary name', 5, 20, CATEGORY.BACKSTAGE_PASSES);

      item.updateDaily();

      expect(item.quality).toBe(23);
      expect(item.sellIn).toBe(4);
    });
  });

  describe('When Legendary has an expired deadline and quality 80', () => {
    it('Then preserves quality and the expired deadline', () => {
      const item = new Item('Ordinary name', -1, 80, CATEGORY.LEGENDARY);

      item.updateDaily();

      expect(item.quality).toBe(80);
      expect(item.sellIn).toBe(-1);
    });
  });

  describe('When Conjured has 5 days remaining and quality 10', () => {
    it('Then applies its doubled loss and reduces the deadline', () => {
      const item = new Item('Ordinary name', 5, 10, CATEGORY.CONJURED);

      item.updateDaily();

      expect(item.quality).toBe(8);
      expect(item.sellIn).toBe(4);
    });
  });

  describe('When Regular has 5 days remaining and quality 80', () => {
    it('Then reduces quality above the normal ceiling to 79', () => {
      const item = new Item('Ordinary name', 5, 80, CATEGORY.REGULAR);

      item.updateDaily();

      expect(item.quality).toBe(79);
      expect(item.sellIn).toBe(4);
    });
  });

  describe('When Ages has 5 days remaining and quality 80', () => {
    it('Then preserves quality above the normal ceiling', () => {
      const item = new Item('Ordinary name', 5, 80, CATEGORY.AGES);

      item.updateDaily();

      expect(item.quality).toBe(80);
      expect(item.sellIn).toBe(4);
    });
  });

  describe('When Ages has 5 days remaining and quality -1', () => {
    it('Then increases negative quality to zero', () => {
      const item = new Item('Ordinary name', 5, -1, CATEGORY.AGES);

      item.updateDaily();

      expect(item.quality).toBe(0);
      expect(item.sellIn).toBe(4);
    });
  });

  describe('When Regular has 5 days remaining and quality -1', () => {
    it('Then preserves negative quality', () => {
      const item = new Item('Ordinary name', 5, -1, CATEGORY.REGULAR);

      item.updateDaily();

      expect(item.quality).toBe(-1);
      expect(item.sellIn).toBe(4);
    });
  });

  describe('When BackstagePasses has no days remaining and quality -1', () => {
    it('Then resets negative quality after the concert', () => {
      const item = new Item('Ordinary name', 0, -1, CATEGORY.BACKSTAGE_PASSES);

      item.updateDaily();

      expect(item.quality).toBe(0);
      expect(item.sellIn).toBe(-1);
    });
  });

  describe('When BackstagePasses has an expired deadline and quality 80', () => {
    it('Then resets quality above the ceiling after the concert', () => {
      const item = new Item('Ordinary name', -1, 80, CATEGORY.BACKSTAGE_PASSES);

      item.updateDaily();

      expect(item.quality).toBe(0);
      expect(item.sellIn).toBe(-2);
    });
  });

  describe('When Regular has an expired deadline and quality 10', () => {
    it('Then advances the expired deadline and applies its expired loss', () => {
      const item = new Item('Ordinary name', -1, 10, CATEGORY.REGULAR);

      item.updateDaily();

      expect(item.quality).toBe(8);
      expect(item.sellIn).toBe(-2);
    });
  });
  describe('When Category changes from Regular to Ages between days', () => {
    it('Then applies the current Category to each daily state', () => {
      const item = new Item('Bread', 1, 10);

      item.updateDaily();

      expect(item.quality).toBe(9);
      expect(item.sellIn).toBe(0);

      item.category = CATEGORY.AGES;
      item.name = 'Brie';
      item.updateDaily();

      expect(item.quality).toBe(11);
      expect(item.sellIn).toBe(-1);
      expect(item.category).toBe(CATEGORY.AGES);
      expect(item.name).toBe('Brie');
    });
  });
});

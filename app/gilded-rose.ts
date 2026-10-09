
export const CATEGORY = {
  LEGENDARY: 'Legendary',
  AGES: 'Ages',
  BACKSTAGE_PASSES: 'BackstagePasses',
  REGULAR: 'Regular',
} as const;

export type Category = typeof CATEGORY[keyof typeof CATEGORY];

export class Item {
  name: string;
  sellIn: number;
  quality: number;
  category: Category;

  constructor(name, sellIn, quality, category: Category) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
    this.category = category;
  }

  updateQuality() {
    if (this.category === CATEGORY.REGULAR) {
      this.updateRegular();
      return;
    }
    
    this.updateNonRegular();
  }

  updateSellIn() {
    this.sellIn = this.sellIn - 1;

    if (this.sellIn < 0) {

      if (this.category === CATEGORY.AGES) {
        if (this.quality < 50) {
          this.quality = this.quality + 1
        }
        return
      }

      if (this.category === CATEGORY.BACKSTAGE_PASSES) {
        this.quality = this.quality - this.quality
        return
      }

      if (this.quality > 0) {
        this.quality = this.quality - 1
      }

    }
  }

  updateRegular() {
    if (this.quality > 0) {
      this.quality = this.quality - 1
    }
  }

  updateNonRegular() {
    if (this.quality < 50) {
      this.quality = this.quality + 1
      if (this.category === CATEGORY.BACKSTAGE_PASSES) {
        if (this.sellIn < 11) {
          if (this.quality < 50) {
            this.quality = this.quality + 1
          }
        }
        if (this.sellIn < 6) {
          if (this.quality < 50) {
            this.quality = this.quality + 1
          }
        }
      }
    }

  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateInventory() {
    this.items.forEach(item => {
      if (item.category === CATEGORY.LEGENDARY) {
        return;
      }
      item.updateQuality();
      item.updateSellIn();
    });

    return this.items;
  }

}

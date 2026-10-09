
export const CATEGORY = {
  LEGENDARY: 'Legendary',
  AGES: 'Ages',
  BACKSTAGE_PASSES: 'BackstagePasses',
  REGULAR: 'Regular',
} as const;

export type Category = typeof CATEGORY[keyof typeof CATEGORY];

export class Item {
  name: string;
  private currentSellIn: number;
  private currentQuality: number;
  category: Category;

  constructor(name, sellIn, quality, category: Category = CATEGORY.REGULAR) {
    this.name = name;
    this.currentSellIn = sellIn;
    this.currentQuality = quality;
    this.category = category;
  }

  get sellIn(): number {
    return this.currentSellIn;
  }

  get quality(): number {
    return this.currentQuality;
  }

  increaseQuality(amount: number) {
    if (this.quality < 50) {
      this.currentQuality = Math.min(50, this.quality + amount);
    }
  }

  decreaseQuality(amount: number) {
    if (this.quality > 0) {
      this.currentQuality = Math.max(0, this.quality - amount);
    }
  }

  resetQuality() {
    this.currentQuality = 0;
  }

  decreaseSellIn() {
    this.currentSellIn -= 1;
  }

  updateQuality() {
    if (this.category === CATEGORY.REGULAR) {
      this.updateRegular();
      return;
    }
    
    this.updateNonRegular();
  }

  updateSellIn() {
    this.decreaseSellIn();

    if (this.sellIn < 0) {

      if (this.category === CATEGORY.AGES) {
        if (this.quality < 50) {
          this.increaseQuality(1);
        }
        return
      }

      if (this.category === CATEGORY.BACKSTAGE_PASSES) {
        this.resetQuality();
        return
      }

      if (this.quality > 0) {
        this.decreaseQuality(1);
      }

    }
  }

  updateRegular() {
    if (this.quality > 0) {
      this.decreaseQuality(1);
    }
  }

  updateNonRegular() {
    if (this.quality < 50) {
      this.increaseQuality(1);
      if (this.category === CATEGORY.BACKSTAGE_PASSES) {
        if (this.sellIn < 11) {
          if (this.quality < 50) {
            this.increaseQuality(1);
          }
        }
        if (this.sellIn < 6) {
          if (this.quality < 50) {
            this.increaseQuality(1);
          }
        }
      }
    }

  }
}

export interface CategoryStrategy {
  update(item: Item): void;
}

class LegacyCategoryStrategy implements CategoryStrategy {
  update(item: Item): void {
    if (item.category === CATEGORY.LEGENDARY) {
      return;
    }

    item.updateQuality();
    item.updateSellIn();
  }
}

const legacyStrategy = new LegacyCategoryStrategy();

const categoryStrategies: Record<Category, CategoryStrategy> = {
  [CATEGORY.REGULAR]: legacyStrategy,
  [CATEGORY.AGES]: legacyStrategy,
  [CATEGORY.BACKSTAGE_PASSES]: legacyStrategy,
  [CATEGORY.LEGENDARY]: legacyStrategy,
};

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateInventory() {
    this.items.forEach(item => {
      categoryStrategies[item.category].update(item);
    });

    return this.items;
  }

}

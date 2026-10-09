import { CATEGORY, type Category } from './domain/category';
import type { Item } from './domain/item';

export interface CategoryStrategy {
  update(item: Item): void;
}

export class RegularCategoryStrategy implements CategoryStrategy {
  update(item: Item): void {
    item.decreaseQuality(item.sellIn > 0 ? 1 : 2);
    item.decreaseSellIn();
  }
}

export class AgedCategoryStrategy implements CategoryStrategy {
  update(item: Item): void {
    item.increaseQuality(item.sellIn > 0 ? 1 : 2);
    item.decreaseSellIn();
  }
}

export class BackstagePassesCategoryStrategy implements CategoryStrategy {
  update(item: Item): void {
    if (item.sellIn <= 0) {
      item.resetQuality();
    } else if (item.sellIn <= 5) {
      item.increaseQuality(3);
    } else if (item.sellIn <= 10) {
      item.increaseQuality(2);
    } else {
      item.increaseQuality(1);
    }

    item.decreaseSellIn();
  }
}

export class LegendaryCategoryStrategy implements CategoryStrategy {
  update(_item: Item): void {
    // Legendary items keep their quality and deadline unchanged.
  }
}

export class ConjuredCategoryStrategy implements CategoryStrategy {
  update(item: Item): void {
    item.decreaseQuality(item.sellIn > 0 ? 2 : 4);
    item.decreaseSellIn();
  }
}

const categoryStrategies: Record<Category, CategoryStrategy> = {
  [CATEGORY.REGULAR]: new RegularCategoryStrategy(),
  [CATEGORY.AGES]: new AgedCategoryStrategy(),
  [CATEGORY.BACKSTAGE_PASSES]: new BackstagePassesCategoryStrategy(),
  [CATEGORY.LEGENDARY]: new LegendaryCategoryStrategy(),
  [CATEGORY.CONJURED]: new ConjuredCategoryStrategy(),
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

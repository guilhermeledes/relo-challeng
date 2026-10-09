import { CATEGORY, type Category } from './domain/category';
import type { Item } from './domain/item';
import type { CategoryStrategy } from './domain/strategies/category-strategy';
import { RegularCategoryStrategy } from './domain/strategies/regular-category-strategy';
import { AgedCategoryStrategy } from './domain/strategies/aged-category-strategy';
import { BackstagePassesCategoryStrategy } from './domain/strategies/backstage-passes-category-strategy';
import { LegendaryCategoryStrategy } from './domain/strategies/legendary-category-strategy';
import { ConjuredCategoryStrategy } from './domain/strategies/conjured-category-strategy';

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

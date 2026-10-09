import type { Item } from './domain/item';
import { categoryStrategies } from './domain/strategies/category-strategies';

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

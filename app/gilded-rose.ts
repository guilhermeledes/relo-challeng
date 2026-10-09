import type { Item } from './domain/item';

export class GildedRose {
  items: Array<Item>;

  constructor(items: Item[] = []) {
    this.items = items;
  }

  updateInventory() {
    this.items.forEach(item => {
      item.updateDaily();
    });

    return this.items;
  }
}

import type { Item } from '../item';
import type { CategoryStrategy } from './category-strategy';

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

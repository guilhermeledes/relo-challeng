import type { Item } from '../item';
import type { CategoryStrategy } from './category-strategy';

export class AgedCategoryStrategy implements CategoryStrategy {
  update(item: Item): void {
    item.increaseQuality(item.sellIn > 0 ? 1 : 2);
    item.decreaseSellIn();
  }
}

import type { Item } from '../item';
import type { CategoryStrategy } from './category-strategy';

export class RegularCategoryStrategy implements CategoryStrategy {
  update(item: Item): void {
    item.decreaseQuality(item.sellIn > 0 ? 1 : 2);
    item.decreaseSellIn();
  }
}

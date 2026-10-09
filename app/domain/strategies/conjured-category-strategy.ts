import type { Item } from '../item';
import type { CategoryStrategy } from './category-strategy';

export class ConjuredCategoryStrategy implements CategoryStrategy {
  update(item: Item): void {
    item.decreaseQuality(item.sellIn > 0 ? 2 : 4);
    item.decreaseSellIn();
  }
}

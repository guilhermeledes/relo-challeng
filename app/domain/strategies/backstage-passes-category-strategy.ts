import type { Item } from '../item';
import type { CategoryStrategy } from './category-strategy';

const FINAL_CONCERT_DAYS = 5;
const NEAR_CONCERT_DAYS = 10;

export class BackstagePassesCategoryStrategy implements CategoryStrategy {
  update(item: Item): void {
    if (item.sellIn <= 0) {
      item.resetQuality();
    } else if (item.sellIn <= FINAL_CONCERT_DAYS) {
      item.increaseQuality(3);
    } else if (item.sellIn <= NEAR_CONCERT_DAYS) {
      item.increaseQuality(2);
    } else {
      item.increaseQuality(1);
    }

    item.decreaseSellIn();
  }
}

import type { Item } from '../item';
import type { CategoryStrategy } from './category-strategy';

export class LegendaryCategoryStrategy implements CategoryStrategy {
  update(_item: Item): void {
    // Legendary items keep their quality and deadline unchanged.
  }
}

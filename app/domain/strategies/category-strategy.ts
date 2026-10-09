import type { Item } from '../item';

export interface CategoryStrategy {
  update(item: Item): void;
}

import type { Category } from '../category';
import type { Quality } from '../quality';

export interface DailyItemState {
  readonly sellIn: number;
  readonly quality: Quality;
}

export interface CategoryStrategy {
  readonly category: Category;
  update(state: DailyItemState): DailyItemState;
}

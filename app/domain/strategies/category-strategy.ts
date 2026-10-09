import type { Quality } from '../quality';

export interface DailyItemState {
  readonly sellIn: number;
  readonly quality: Quality;
}

export interface CategoryStrategy {
  update(state: DailyItemState): DailyItemState;
}

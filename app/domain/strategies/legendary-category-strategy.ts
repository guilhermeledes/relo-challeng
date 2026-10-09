import type { CategoryStrategy, DailyItemState } from './category-strategy';

export class LegendaryCategoryStrategy implements CategoryStrategy {
  update(state: DailyItemState): DailyItemState {
    return state;
  }
}

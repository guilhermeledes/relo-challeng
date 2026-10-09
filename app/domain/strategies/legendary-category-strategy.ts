import { CATEGORY, type Category } from '../category';
import type { CategoryStrategy, DailyItemState } from './category-strategy';

export class LegendaryCategoryStrategy implements CategoryStrategy {
  get category(): Category {
    return CATEGORY.LEGENDARY;
  }

  update(state: DailyItemState): DailyItemState {
    return state;
  }
}

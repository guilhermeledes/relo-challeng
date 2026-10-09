import { CATEGORY, type Category } from '../category';
import type { CategoryStrategy, DailyItemState } from './category-strategy';

export class RegularCategoryStrategy implements CategoryStrategy {
  get category(): Category {
    return CATEGORY.REGULAR;
  }

  update(state: DailyItemState): DailyItemState {
    return {
      sellIn: state.sellIn - 1,
      quality: state.quality.decrease(state.sellIn > 0 ? 1 : 2),
    };
  }
}

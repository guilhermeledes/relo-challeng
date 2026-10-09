import { CATEGORY, type Category } from '../category';
import type { CategoryStrategy, DailyItemState } from './category-strategy';

export class ConjuredCategoryStrategy implements CategoryStrategy {
  get category(): Category {
    return CATEGORY.CONJURED;
  }

  update(state: DailyItemState): DailyItemState {
    return {
      sellIn: state.sellIn - 1,
      quality: state.quality.decrease(state.sellIn > 0 ? 2 : 4),
    };
  }
}

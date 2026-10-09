import type { CategoryStrategy, DailyItemState } from './category-strategy';

export class ConjuredCategoryStrategy implements CategoryStrategy {
  update(state: DailyItemState): DailyItemState {
    return {
      sellIn: state.sellIn - 1,
      quality: state.quality.decrease(state.sellIn > 0 ? 2 : 4),
    };
  }
}

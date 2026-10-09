import type { CategoryStrategy, DailyItemState } from './category-strategy';

export class RegularCategoryStrategy implements CategoryStrategy {
  update(state: DailyItemState): DailyItemState {
    return {
      sellIn: state.sellIn - 1,
      quality: state.quality.decrease(state.sellIn > 0 ? 1 : 2),
    };
  }
}

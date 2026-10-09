import type { CategoryStrategy, DailyItemState } from './category-strategy';

export class AgedCategoryStrategy implements CategoryStrategy {
  update(state: DailyItemState): DailyItemState {
    return {
      sellIn: state.sellIn - 1,
      quality: state.quality.increase(state.sellIn > 0 ? 1 : 2),
    };
  }
}

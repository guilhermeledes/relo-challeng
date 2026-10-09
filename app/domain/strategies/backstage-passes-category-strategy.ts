import type { CategoryStrategy, DailyItemState } from './category-strategy';

const FINAL_CONCERT_DAYS = 5;
const NEAR_CONCERT_DAYS = 10;

export class BackstagePassesCategoryStrategy implements CategoryStrategy {
  update(state: DailyItemState): DailyItemState {
    let quality;
    if (state.sellIn <= 0) {
      quality = state.quality.reset();
    } else if (state.sellIn <= FINAL_CONCERT_DAYS) {
      quality = state.quality.increase(3);
    } else if (state.sellIn <= NEAR_CONCERT_DAYS) {
      quality = state.quality.increase(2);
    } else {
      quality = state.quality.increase(1);
    }

    return { sellIn: state.sellIn - 1, quality };
  }
}

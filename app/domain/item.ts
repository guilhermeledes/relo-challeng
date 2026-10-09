import { CATEGORY, type Category } from './category';
import { Quality } from './quality';
import { categoryStrategies } from './strategies/category-strategies';
import type { DailyItemState } from './strategies/category-strategy';

export class Item {
  name: string;
  #currentState: DailyItemState;
  category: Category;

  constructor(name: string, sellIn: number, quality: number, category: Category = CATEGORY.REGULAR) {
    this.name = name;
    this.#currentState = { sellIn, quality: new Quality(quality) };
    this.category = category;
  }

  get sellIn(): number {
    return this.#currentState.sellIn;
  }

  get quality(): number {
    return this.#currentState.quality.value;
  }

  updateDaily(): void {
    this.#currentState = categoryStrategies[this.category].update(this.#currentState);
  }
}

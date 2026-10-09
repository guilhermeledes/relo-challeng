import { Quality } from './quality';
import { CATEGORY, selectStrategyByCategory, type Category } from './strategies/category-strategies';
import type { CategoryStrategy, DailyItemState } from './strategies/category-strategy';

export class Item {
  name: string;
  #currentState: DailyItemState;
  #strategy: CategoryStrategy;

  constructor(name: string, sellIn: number, quality: number, category: Category = CATEGORY.REGULAR) {
    this.name = name;
    this.#currentState = Object.freeze({ sellIn, quality: new Quality(quality) });
    this.#strategy = selectStrategyByCategory(category);
  }

  get category(): Category {
    return this.#strategy.category;
  }

  set category(category: Category) {
    this.#strategy = selectStrategyByCategory(category);
  }

  get sellIn(): number {
    return this.#currentState.sellIn;
  }

  get quality(): number {
    return this.#currentState.quality.value;
  }

  updateDaily(): void {
    const nextState = this.#strategy.update(this.#currentState);
    this.#currentState = Object.freeze({ sellIn: nextState.sellIn, quality: nextState.quality });
  }
}

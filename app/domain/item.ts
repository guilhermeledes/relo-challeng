import { CATEGORY, type Category } from './category';
import { Quality } from './quality';

export class Item {
  name: string;
  #currentSellIn: number;
  #currentQuality: Quality;
  category: Category;

  constructor(name: string, sellIn: number, quality: number, category: Category = CATEGORY.REGULAR) {
    this.name = name;
    this.#currentSellIn = sellIn;
    this.#currentQuality = new Quality(quality);
    this.category = category;
  }

  get sellIn(): number {
    return this.#currentSellIn;
  }

  get quality(): number {
    return this.#currentQuality.value;
  }

  increaseQuality(amount: number) {
    this.#currentQuality = this.#currentQuality.increase(amount);
  }

  decreaseQuality(amount: number) {
    this.#currentQuality = this.#currentQuality.decrease(amount);
  }

  resetQuality() {
    this.#currentQuality = this.#currentQuality.reset();
  }

  decreaseSellIn() {
    this.#currentSellIn -= 1;
  }
}

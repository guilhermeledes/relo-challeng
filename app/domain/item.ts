import { CATEGORY, type Category } from './category';

const MIN_QUALITY = 0;
const MAX_NORMAL_QUALITY = 50;

export class Item {
  name: string;
  #currentSellIn: number;
  #currentQuality: number;
  category: Category;

  constructor(name, sellIn, quality, category: Category = CATEGORY.REGULAR) {
    this.name = name;
    this.#currentSellIn = sellIn;
    this.#currentQuality = quality;
    this.category = category;
  }

  get sellIn(): number {
    return this.#currentSellIn;
  }

  get quality(): number {
    return this.#currentQuality;
  }

  increaseQuality(amount: number) {
    if (this.quality < MAX_NORMAL_QUALITY) {
      this.#currentQuality = Math.min(MAX_NORMAL_QUALITY, this.quality + amount);
    }
  }

  decreaseQuality(amount: number) {
    if (this.quality > MIN_QUALITY) {
      this.#currentQuality = Math.max(MIN_QUALITY, this.quality - amount);
    }
  }

  resetQuality() {
    this.#currentQuality = MIN_QUALITY;
  }

  decreaseSellIn() {
    this.#currentSellIn -= 1;
  }
}

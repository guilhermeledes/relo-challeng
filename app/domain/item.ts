import { CATEGORY, type Category } from './category';

export class Item {
  name: string;
  private currentSellIn: number;
  private currentQuality: number;
  category: Category;

  constructor(name, sellIn, quality, category: Category = CATEGORY.REGULAR) {
    this.name = name;
    this.currentSellIn = sellIn;
    this.currentQuality = quality;
    this.category = category;
  }

  get sellIn(): number {
    return this.currentSellIn;
  }

  get quality(): number {
    return this.currentQuality;
  }

  increaseQuality(amount: number) {
    if (this.quality < 50) {
      this.currentQuality = Math.min(50, this.quality + amount);
    }
  }

  decreaseQuality(amount: number) {
    if (this.quality > 0) {
      this.currentQuality = Math.max(0, this.quality - amount);
    }
  }

  resetQuality() {
    this.currentQuality = 0;
  }

  decreaseSellIn() {
    this.currentSellIn -= 1;
  }
}

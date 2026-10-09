export type Category = 'Legendary' | 'Ages' | 'Regular';

export class Item {
  name: string;
  sellIn: number;
  quality: number;
  category: Category;

  constructor(name, sellIn, quality, category: Category) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
    this.category = category;
  }

  updateQuality() {
    if (this.category === 'Legendary') {
      return;
    }
    if (this.category === 'Regular') {
      this.updateRegular();
    } else {
      this.updateAged();
    }
    this.updateSellIn();
  }

  updateSellIn() {
    this.sellIn = this.sellIn - 1;

    if (this.sellIn < 0) {

      if (this.name === 'Aged Brie') {
        if (this.quality < 50) {
          this.quality = this.quality + 1
        }
        return
      }

      if (this.name === 'Backstage passes to a TAFKAL80ETC concert') {
        this.quality = this.quality - this.quality
        return
      }

      if (this.quality > 0) {
        if (this.name != 'Sulfuras, Hand of Ragnaros') {
          this.quality = this.quality - 1
        }
      }

    }
  }

  updateRegular() {
    if (this.quality > 0) {
      if (this.name != 'Sulfuras, Hand of Ragnaros') {
        this.quality = this.quality - 1
      }
    }
  }

  updateAged() {
    if (this.quality < 50) {
      this.quality = this.quality + 1
      if (this.name == 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.sellIn < 11) {
          if (this.quality < 50) {
            this.quality = this.quality + 1
          }
        }
        if (this.sellIn < 6) {
          if (this.quality < 50) {
            this.quality = this.quality + 1
          }
        }
      }
    }

  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateInventory() {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].updateQuality();
    }
    return this.items;
  }

}

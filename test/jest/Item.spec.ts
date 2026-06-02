import { describe, it, expect } from '@jest/globals';
import { Item } from '@/gilded-rose';

describe('Item', () => {
  it('sets name from the constructor', () => {
    const item = new Item('Aged Brie', 5, 10);

    expect(item.name).toBe('Aged Brie');
  });

  it('sets sellIn from the constructor', () => {
    const item = new Item('Aged Brie', 5, 10);

    expect(item.sellIn).toBe(5);
  });

  it('sets quality from the constructor', () => {
    const item = new Item('Aged Brie', 5, 10);

    expect(item.quality).toBe(10);
  });
});

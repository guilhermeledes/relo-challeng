import { describe, it } from 'mocha';
import { expect } from 'chai';
import { Item } from '@/gilded-rose';

describe('Item', () => {
  it('sets name from the constructor', () => {
    const item = new Item('Aged Brie', 5, 10);

    expect(item.name).to.equal('Aged Brie');
  });

  it('sets sellIn from the constructor', () => {
    const item = new Item('Aged Brie', 5, 10);

    expect(item.sellIn).to.equal(5);
  });

  it('sets quality from the constructor', () => {
    const item = new Item('Aged Brie', 5, 10);

    expect(item.quality).to.equal(10);
  });
});

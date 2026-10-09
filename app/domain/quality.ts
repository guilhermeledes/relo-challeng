const MIN_QUALITY = 0;
const MAX_NORMAL_QUALITY = 50;

export class Quality {
  #value: number;

  constructor(value: number) {
    this.#value = value;
  }

  get value(): number {
    return this.#value;
  }

  increase(amount: number): Quality {
    if (this.value < MAX_NORMAL_QUALITY) {
      return new Quality(Math.min(MAX_NORMAL_QUALITY, this.value + amount));
    }
    return this;
  }

  decrease(amount: number): Quality {
    if (this.value > MIN_QUALITY) {
      return new Quality(Math.max(MIN_QUALITY, this.value - amount));
    }
    return this;
  }

  reset(): Quality {
    return new Quality(MIN_QUALITY);
  }
}

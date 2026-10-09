import { describe, it, expect } from 'vitest';
import { Quality } from './quality';

describe('Given Quality construction', () => {
  describe('When quality is 80', () => {
    it('Then the initial value is preserved', () => {
      const quality = new Quality(80);

      expect(quality.value).toBe(80);
    });
  });

  describe('When quality is -1', () => {
    it('Then the initial value stays -1', () => {
      const quality = new Quality(-1);

      expect(quality.value).toBe(-1);
    });
  });

  describe('When quality is 1.5', () => {
    it('Then the initial value stays 1.5', () => {
      const quality = new Quality(1.5);

      expect(quality.value).toBe(1.5);
    });
  });
});

describe('Given Quality.increase', () => {
  describe('When quality is 10 and the increase is 2', () => {
    it('Then the result is 12 and the initial quality stays 10', () => {
      const quality = new Quality(10);

      const result = quality.increase(2);

      expect(result.value).toBe(12);
      expect(quality.value).toBe(10);
    });
  });

  describe('When quality is 49 and the increase is 2', () => {
    it('Then the result stops at 50 and the initial quality stays 49', () => {
      const quality = new Quality(49);

      const result = quality.increase(2);

      expect(result.value).toBe(50);
      expect(quality.value).toBe(49);
    });
  });

  describe('When quality is 80 and the increase is 1', () => {
    it('Then the result and the initial quality stay 80', () => {
      const quality = new Quality(80);

      const result = quality.increase(1);

      expect(result.value).toBe(80);
      expect(quality.value).toBe(80);
    });
  });

  describe('When quality is -1 and the increase is 1', () => {
    it('Then the result is zero and the initial quality stays -1', () => {
      const quality = new Quality(-1);

      const result = quality.increase(1);

      expect(result.value).toBe(0);
      expect(quality.value).toBe(-1);
    });
  });

  describe('When quality is 50 and the increase is 1', () => {
    it('Then the result and initial quality stay 50', () => {
      const quality = new Quality(50);

      const result = quality.increase(1);

      expect(result.value).toBe(50);
      expect(quality.value).toBe(50);
    });
  });
});

describe('Given Quality.decrease', () => {
  describe('When quality is 80 and the decrease is 1', () => {
    it('Then the result is 79 and the initial quality stays 80', () => {
      const quality = new Quality(80);

      const result = quality.decrease(1);

      expect(result.value).toBe(79);
      expect(quality.value).toBe(80);
    });
  });

  describe('When quality is 1 and the decrease is 2', () => {
    it('Then the result stops at zero and the initial quality stays 1', () => {
      const quality = new Quality(1);

      const result = quality.decrease(2);

      expect(result.value).toBe(0);
      expect(quality.value).toBe(1);
    });
  });

  describe('When quality is -1 and the decrease is 1', () => {
    it('Then the result and the initial quality stay -1', () => {
      const quality = new Quality(-1);

      const result = quality.decrease(1);

      expect(result.value).toBe(-1);
      expect(quality.value).toBe(-1);
    });
  });

  describe('When quality is zero and the decrease is 1', () => {
    it('Then the result and initial quality stay zero', () => {
      const quality = new Quality(0);

      const result = quality.decrease(1);

      expect(result.value).toBe(0);
      expect(quality.value).toBe(0);
    });
  });
});

describe('Given Quality.reset', () => {
  describe('When quality is -1', () => {
    it('Then the result is zero and the initial quality stays -1', () => {
      const quality = new Quality(-1);

      const result = quality.reset();

      expect(result.value).toBe(0);
      expect(quality.value).toBe(-1);
    });
  });

  describe('When quality is 80', () => {
    it('Then the result is zero and the initial quality stays 80', () => {
      const quality = new Quality(80);

      const result = quality.reset();

      expect(result.value).toBe(0);
      expect(quality.value).toBe(80);
    });
  });

  describe('When quality is 30', () => {
    it('Then the result is zero and the initial quality stays 30', () => {
      const quality = new Quality(30);

      const result = quality.reset();

      expect(result.value).toBe(0);
      expect(quality.value).toBe(30);
    });
  });
});

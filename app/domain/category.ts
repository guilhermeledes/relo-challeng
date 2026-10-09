export const CATEGORY = Object.freeze({
  LEGENDARY: 'Legendary',
  AGES: 'Ages',
  BACKSTAGE_PASSES: 'BackstagePasses',
  REGULAR: 'Regular',
  CONJURED: 'Conjured',
} as const);

export type Category = typeof CATEGORY[keyof typeof CATEGORY];

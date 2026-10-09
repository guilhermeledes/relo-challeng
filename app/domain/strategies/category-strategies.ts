import type { CategoryStrategy, DailyItemState } from './category-strategy';
import { RegularCategoryStrategy } from './regular-category-strategy';
import { AgedCategoryStrategy } from './aged-category-strategy';
import { BackstagePassesCategoryStrategy } from './backstage-passes-category-strategy';
import { LegendaryCategoryStrategy } from './legendary-category-strategy';
import { ConjuredCategoryStrategy } from './conjured-category-strategy';

export const CATEGORY = Object.freeze({
  LEGENDARY: 'Legendary',
  AGES: 'Ages',
  BACKSTAGE_PASSES: 'BackstagePasses',
  REGULAR: 'Regular',
  CONJURED: 'Conjured',
} as const);

export type Category = typeof CATEGORY[keyof typeof CATEGORY];

const categoryStrategies: Record<Category, CategoryStrategy> = {
  [CATEGORY.REGULAR]: new RegularCategoryStrategy(),
  [CATEGORY.AGES]: new AgedCategoryStrategy(),
  [CATEGORY.BACKSTAGE_PASSES]: new BackstagePassesCategoryStrategy(),
  [CATEGORY.LEGENDARY]: new LegendaryCategoryStrategy(),
  [CATEGORY.CONJURED]: new ConjuredCategoryStrategy(),
};

export function updateDailyByCategory(category: Category, state: DailyItemState): DailyItemState {
  return categoryStrategies[category].update(state);
}

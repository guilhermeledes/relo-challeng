import { CATEGORY, type Category } from '../category';
import type { CategoryStrategy } from './category-strategy';
import { RegularCategoryStrategy } from './regular-category-strategy';
import { AgedCategoryStrategy } from './aged-category-strategy';
import { BackstagePassesCategoryStrategy } from './backstage-passes-category-strategy';
import { LegendaryCategoryStrategy } from './legendary-category-strategy';
import { ConjuredCategoryStrategy } from './conjured-category-strategy';

export const categoryStrategies: Record<Category, CategoryStrategy> = {
  [CATEGORY.REGULAR]: new RegularCategoryStrategy(),
  [CATEGORY.AGES]: new AgedCategoryStrategy(),
  [CATEGORY.BACKSTAGE_PASSES]: new BackstagePassesCategoryStrategy(),
  [CATEGORY.LEGENDARY]: new LegendaryCategoryStrategy(),
  [CATEGORY.CONJURED]: new ConjuredCategoryStrategy(),
};

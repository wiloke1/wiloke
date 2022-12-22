import * as CategoryController from './CategoryController';
import * as ChangelogController from './ChangelogController';
import * as SectionController from './SectionController';
import * as EnvatoController from './EnvatoController';

export const adminApi = {
  sections: SectionController,
  changelogs: ChangelogController,
  category: CategoryController,
  envato: EnvatoController,
};

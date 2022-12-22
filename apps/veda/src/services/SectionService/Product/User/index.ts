import * as ChangelogController from './ChangelogController';
import * as CategoryController from './CategoryController';
import * as SectionController from './SectionController';
import * as EnvatoController from './EnvatoController';

export const userApi = {
  changelogs: ChangelogController,
  category: CategoryController,
  sections: SectionController,
  envato: EnvatoController,
};

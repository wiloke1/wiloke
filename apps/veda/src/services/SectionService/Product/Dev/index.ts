import * as CategoryController from './CategoryController';
import * as ChangelogController from './ChangelogController';
import * as SectionController from './SectionController';
import * as EnvatoController from './EnvatoController';

export const devApi = {
  sections: SectionController,
  changelogs: ChangelogController,
  category: CategoryController,
  envato: EnvatoController,
};

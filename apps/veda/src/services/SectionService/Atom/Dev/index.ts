import * as CategoryController from './CategoryController';
import * as ChangelogController from './ChangelogController';
import * as MegamenuController from './MegamenuController';
import * as SectionController from './SectionController';

export const devApi = {
  sections: SectionController,
  megaMenu: MegamenuController,
  changelogs: ChangelogController,
  category: CategoryController,
};

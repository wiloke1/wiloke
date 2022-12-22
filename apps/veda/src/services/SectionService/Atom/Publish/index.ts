import * as SectionController from './SectionController';
import * as ChangelogController from './ChangelogController';
import * as MegamenuController from './MegamenuController';
import * as CategoryController from './CategoryController';

export const publishApi = {
  sections: SectionController,
  changelogs: ChangelogController,
  megaMenu: MegamenuController,
  category: CategoryController,
};

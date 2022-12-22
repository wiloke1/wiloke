import * as CategoryController from './CategoryController';
import * as ChangelogController from './ChangelogController';
import * as MegaMenuController from './MegaMenuController';

export const publishApi = {
  mega_menu: MegaMenuController,
  changelogs: ChangelogController,
  category: CategoryController,
};

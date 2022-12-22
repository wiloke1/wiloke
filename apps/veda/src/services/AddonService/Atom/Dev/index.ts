import * as CategoryController from './CategoryController';
import * as ChangelogController from './ChangelogController';
import * as AddonController from './AddonController';

export const devApi = {
  addons: AddonController,
  changelogs: ChangelogController,
  category: CategoryController,
};

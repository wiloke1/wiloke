import * as CategoryController from './CategoryController';
import * as PageController from './PageController';
import * as TagController from './TagController';

export const publishApi = {
  category: CategoryController,
  page: PageController,
  tag: TagController,
};

import * as CategoryController from './CategoryController';
import * as ThemeController from './ThemeController';
import * as TagController from './TagController';

export const adminApi = {
  category: CategoryController,
  theme: ThemeController,
  tag: TagController,
};

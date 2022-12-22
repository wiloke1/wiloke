import * as Atom from './Atom';
import * as Product from './Product';
import * as Client from './Client';

import * as Categories from './Logic/Categories';
import * as Changelogs from './Logic/Changelogs';
import * as MegaMenus from './Logic/MegaMenus';

export const megaMenuApiController = {
  atom: Atom,
  product: Product,
  client: Client,
};

export const megaMenuService = {
  mega_menu: MegaMenus,
  changelogs: Changelogs,
  categories: Categories,
};

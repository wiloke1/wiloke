import * as Atom from './Atom';
import * as Product from './Product';
import * as Client from './Client';

import * as Addons from './Logic/Addons';
import * as Categories from './Logic/Categories';
import * as Changelogs from './Logic/Changelogs';

export const addonApiController = {
  atom: Atom,
  product: Product,
  client: Client,
};

export const addonService = {
  addons: Addons,
  categories: Categories,
  changelogs: Changelogs,
};

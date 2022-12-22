import * as Atom from './Atom';
import * as Product from './Product';
import * as Client from './Client/';

import * as Sections from './Logic/Sections';
import * as Categories from './Logic/Categories';
import * as Changelogs from './Logic/Changelogs';
import * as MegaMenus from './Logic/MegaMenu';
import * as Envato from './Logic/Envato';

export const sectionApiController = {
  atom: Atom,
  product: Product,
  client: Client,
};

export const sectionService = {
  sections: Sections,
  categories: Categories,
  changelogs: Changelogs,
  megaMenus: MegaMenus,
  envato: Envato,
};

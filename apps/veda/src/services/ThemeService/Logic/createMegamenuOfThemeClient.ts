import { clone } from 'ramda';
import { megaMenuApiController } from 'services/MegaMenuService';
import { SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';

interface CreateMegamenuOfThemeClient {
  megamenu: SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client;
}

export const createMegamenuOfThemeClient = async ({ megamenu }: CreateMegamenuOfThemeClient) => {
  const megamenu_ = clone(megamenu);
  delete megamenu_.commandId;
  const response = await megaMenuApiController.client.clientApi.mega_menus.createClient({ megamenu: megamenu_ });
  return response.info;

  // const { role } = getUserInfo();
  // if (role === 'admin') {
  //   throw new Error('Chưa lắp api');
  // }
  // if (role === 'user') {
  //   const megamenu_ = clone(megamenu);
  //   delete megamenu_.commandId;
  //   const response = await megaMenuApiController.client.clientApi.mega_menus.createClient({ megamenu: megamenu_ });
  //   return response.info;
  // }
  // throw new RoleException();
};

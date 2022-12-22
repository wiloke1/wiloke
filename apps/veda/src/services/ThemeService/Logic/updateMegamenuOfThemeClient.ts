import { megaMenuApiController } from 'services/MegaMenuService';
import { SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';

interface UpdateMegamenuOfThemeClient {
  megamenu: SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client;
}

export const updateMegamenuOfThemeClient = async ({ megamenu }: UpdateMegamenuOfThemeClient) => {
  const megamenu_ = megamenu as Parameters<typeof megaMenuApiController.client.clientApi.mega_menus.updateClient>[0]['megamenu'];
  const response = await megaMenuApiController.client.clientApi.mega_menus.updateClient({ megamenu: megamenu_ });
  return response.info;

  // const { role } = getUserInfo();
  // if (role === 'admin') {
  //   throw new Error('Chưa lắp api');
  // }
  // if (role === 'user') {
  // const megamenu_ = megamenu as Parameters<typeof megaMenuApiController.client.clientApi.mega_menus.updateClient>[0]['megamenu'];
  // const response = await megaMenuApiController.client.clientApi.mega_menus.updateClient({ megamenu: megamenu_ });
  // return response.info;
  // }
  // throw new RoleException();
};

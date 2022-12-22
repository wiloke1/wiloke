import { clone } from 'ramda';
import { sectionApiController } from 'services/SectionService';
import { SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';

interface CreateHeaderOrFooterOfThemeClient {
  headerOrFooter: SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client;
}

export const createHeaderOrFooterOfThemeClient = async ({ headerOrFooter }: CreateHeaderOrFooterOfThemeClient) => {
  const headerOrFooter_ = clone(headerOrFooter);
  delete headerOrFooter_.commandId;
  const response = await sectionApiController.client.clientApi.section.createClient({ section: headerOrFooter_ });
  return response.info;

  // const { role } = getUserInfo();
  // if (role === 'admin') {
  //   throw new Error('Chưa lắp api');
  // }
  // if (role === 'user') {
  //   const headerOrFooter_ = clone(headerOrFooter);
  //   delete headerOrFooter_.commandId;
  //   const response = await sectionApiController.client.clientApi.section.createClient({ section: headerOrFooter_ })
  //   return response.info;
  // }
  // throw new RoleException();
};

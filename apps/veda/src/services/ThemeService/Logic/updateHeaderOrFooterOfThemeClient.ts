import { sectionApiController } from 'services/SectionService';
import { SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';

interface UpdateHeaderOrFooterOfThemeClient {
  headerOrFooter: SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client;
}

export const updateHeaderOrFooterOfThemeClient = async ({ headerOrFooter }: UpdateHeaderOrFooterOfThemeClient) => {
  const headerOrFooter_ = headerOrFooter as Parameters<typeof sectionApiController.client.clientApi.section.updateClient>[0]['section'];
  const response = await sectionApiController.client.clientApi.section.updateClient({ section: headerOrFooter_ });
  return response.info;

  // const { role } = getUserInfo();
  // const headerOrFooter_ = headerOrFooter as Parameters<typeof sectionApiController.client.clientApi.section.updateClient>[0]['section'];
  // if (role === 'admin') {
  //   throw new Error('Chưa lắp api');
  // }
  // if (role === 'user') {
  //   const response = await sectionApiController.client.clientApi.section.updateClient({ section: headerOrFooter_ });
  //   return response.info;
  // }
  // throw new RoleException();
};

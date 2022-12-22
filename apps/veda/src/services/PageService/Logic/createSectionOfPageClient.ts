import { clone } from 'ramda';
import { sectionApiController } from 'services/SectionService';
import { SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';

interface CreateSectionOfPageClient {
  section: SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client;
}

export const createSectionOfPageClient = async ({ section }: CreateSectionOfPageClient) => {
  const section_ = clone(section);
  delete section_.commandId;
  const response = await sectionApiController.client.clientApi.section.createClient({
    section: section_,
  });
  return response.info;

  // const { role } = getUserInfo();
  // if (role === 'admin') {
  //   throw new Error('Chưa lắp api');
  // }
  // if (role === 'user') {
  //   const section_ = clone(section);
  //   delete section_.commandId;
  //   const response = await sectionApiController.client.clientApi.section.createClient({
  //     section: section_,
  //   });
  //   return response.info;
  // }
  // throw new RoleException();
};

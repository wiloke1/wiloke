import { SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { pageApis } from '../apis';

interface UpdateSectionOfPageDraft {
  section: SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client;
}

export const updateSectionOfPageDraft = async ({ section }: UpdateSectionOfPageDraft) => {
  const { role } = getUserInfo();
  const section_ = section as Parameters<typeof pageApis.atom.adminApi.section.updateSectionOfDraft>[0]['section'];
  if (role === 'admin') {
    const response = await pageApis.atom.adminApi.section.updateSectionOfDraft({ section: section_ });
    return response.info;
  }
  if (role === 'dev') {
    const response = await pageApis.atom.devApi.section.updateSectionOfDraft({ section: section_ });
    return response.info;
  }
  throw new RoleException();
};

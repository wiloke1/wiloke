import { SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { pageApis } from '../apis';

interface UpdateSectionOfPageAtom {
  section: SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client;
}

export const updateSectionOfPageAtom = async ({ section }: UpdateSectionOfPageAtom) => {
  const { role } = getUserInfo();
  const section_ = section as Parameters<typeof pageApis.atom.adminApi.section.updateSectionOfAtom>[0]['section'];
  if (role === 'admin') {
    const response = await pageApis.atom.adminApi.section.updateSectionOfAtom({ section: section_ });
    return response.info;
  }
  throw new RoleException();
};

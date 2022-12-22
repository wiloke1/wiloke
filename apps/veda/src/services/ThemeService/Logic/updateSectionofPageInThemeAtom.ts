import { SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { themeApis } from '../apis';

interface UpdateSectionOfPageInThemeAtom {
  section: SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client;
}

export const updateSectionOfPageInThemeAtom = async ({ section }: UpdateSectionOfPageInThemeAtom) => {
  const { role } = getUserInfo();
  const section_ = section as Parameters<typeof themeApis.atom.adminApi.section.updateSectionOfAtom>[0]['section'];
  if (role === 'admin') {
    const response = await themeApis.atom.adminApi.section.updateSectionOfAtom({ section: section_ });
    return response.info;
  }
  throw new RoleException();
};

import { clone } from 'ramda';
import { SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { themeApis } from '../apis';

interface CreateSectionOfPageInThemeAtom {
  section: SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client;
}

export const createSectionOfPageInThemeAtom = async ({ section }: CreateSectionOfPageInThemeAtom) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const section_ = clone(section);
    delete section_.commandId;
    const response = await themeApis.atom.adminApi.section.createSectionOfAtom({ section: section_ });
    return response.info;
  }
  throw new RoleException();
};

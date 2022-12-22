import { SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { themeApis } from '../apis';

interface UpdateMegamenuOfThemeAtom {
  megamenu: SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client;
}

export const updateMegamenuOfThemeAtom = async ({ megamenu }: UpdateMegamenuOfThemeAtom) => {
  const { role } = getUserInfo();
  const megamenu_ = megamenu as Parameters<typeof themeApis.atom.adminApi.megamenu.updateMegamenuOfAtom>[0]['megamenu'];
  if (role === 'admin') {
    const response = await themeApis.atom.adminApi.megamenu.updateMegamenuOfAtom({ megamenu: megamenu_ });
    return response.info;
  }
  throw new RoleException();
};

import { SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { themeApis } from '../apis';

interface UpdateMegamenuOfThemeDraft {
  megamenu: SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client;
}

export const updateMegamenuOfThemeDraft = async ({ megamenu }: UpdateMegamenuOfThemeDraft) => {
  const { role } = getUserInfo();
  const megamenu_ = megamenu as Parameters<
    typeof themeApis.atom.adminApi.megamenu.updateMegamenuOfDraft | typeof themeApis.atom.devApi.megamenu.updateMegamenuOfDraft
  >[0]['megamenu'];
  if (role === 'admin') {
    const response = await themeApis.atom.adminApi.megamenu.updateMegamenuOfDraft({ megamenu: megamenu_ });
    return response.info;
  }
  if (role === 'dev') {
    const response = await themeApis.atom.devApi.megamenu.updateMegamenuOfDraft({ megamenu: megamenu_ });
    return response.info;
  }
  throw new RoleException();
};

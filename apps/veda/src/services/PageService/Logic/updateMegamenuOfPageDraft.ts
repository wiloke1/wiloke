import { SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { pageApis } from '../apis';

interface UpdateMegamenuOfPageDraft {
  megamenu: SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client;
}

export const updateMegamenuOfPageDraft = async ({ megamenu }: UpdateMegamenuOfPageDraft) => {
  const { role } = getUserInfo();
  const megamenu_ = megamenu as Parameters<typeof pageApis.atom.adminApi.megamenu.updateMegamenuOfDraft>[0]['megamenu'];
  if (role === 'admin') {
    const response = await pageApis.atom.adminApi.megamenu.updateMegamenuOfDraft({ megamenu: megamenu_ });
    return response.info;
  }
  if (role === 'dev') {
    const response = await pageApis.atom.devApi.megamenu.updateMegamenuOfDraft({ megamenu: megamenu_ });
    return response.info;
  }
  throw new RoleException();
};

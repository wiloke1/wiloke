import { clone } from 'ramda';
import { SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { pageApis } from '../apis';

interface CreateMegamenuOfPageAtom {
  megamenu: SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client;
}

export const createMegamenuOfPageAtom = async ({ megamenu }: CreateMegamenuOfPageAtom) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const megamenu_ = clone(megamenu);
    delete megamenu_.commandId;
    const response = await pageApis.atom.adminApi.megamenu.createMegamenuOfAtom({ megamenu: megamenu_ });
    return response.info;
  }
  throw new RoleException();
};

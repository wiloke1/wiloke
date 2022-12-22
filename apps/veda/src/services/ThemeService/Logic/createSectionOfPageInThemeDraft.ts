import { clone } from 'ramda';
import { SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { themeApis } from '../apis';

interface CreateSectionOfPageInThemeDraft {
  section: SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client;
}

export const createSectionOfPageInThemeDraft = async ({ section }: CreateSectionOfPageInThemeDraft) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const section_ = clone(section);
    delete section_.commandId;
    const response = await themeApis.atom.adminApi.section.createSectionOfDraft({ section: section_ });
    return response.info;
  }
  if (role === 'dev') {
    const section_ = clone(section);
    delete section_.commandId;
    const response = await themeApis.atom.devApi.section.createSectionOfDraft({ section: section_ });
    return response.info;
  }
  throw new RoleException();
};

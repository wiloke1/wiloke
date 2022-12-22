import { SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { themeApis } from '../apis';

interface UpdateHeaderOrFooterOfThemeDraft {
  headerOrFooter: SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client;
}

export const updateHeaderOrFooterOfThemeDraft = async ({ headerOrFooter }: UpdateHeaderOrFooterOfThemeDraft) => {
  const { role } = getUserInfo();
  const headerOrFooter_ = headerOrFooter as Parameters<typeof themeApis.atom.adminApi.section.updateSectionOfDraft>[0]['section'];
  if (role === 'admin') {
    const response = await themeApis.atom.adminApi.section.updateSectionOfDraft({ section: headerOrFooter_ });
    return response.info;
  }
  if (role === 'dev') {
    const response = await themeApis.atom.devApi.section.updateSectionOfDraft({ section: headerOrFooter_ });
    return response.info;
  }
  throw new RoleException();
};

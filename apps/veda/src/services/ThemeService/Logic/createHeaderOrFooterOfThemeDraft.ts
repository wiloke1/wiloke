import { clone } from 'ramda';
import { SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { themeApis } from '../apis';

interface CreateHeaderOrFooterOfThemeDraft {
  headerOrFooter: SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client;
}

export const createHeaderOrFooterOfThemeDraft = async ({ headerOrFooter }: CreateHeaderOrFooterOfThemeDraft) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const headerOrFooter_ = clone(headerOrFooter);
    delete headerOrFooter_.commandId;
    const response = await themeApis.atom.adminApi.section.createSectionOfDraft({ section: headerOrFooter_ });
    return response.info;
  }
  if (role === 'dev') {
    const headerOrFooter_ = clone(headerOrFooter);
    delete headerOrFooter_.commandId;
    const response = await themeApis.atom.devApi.section.createSectionOfDraft({ section: headerOrFooter_ });
    return response.info;
  }
  throw new RoleException();
};

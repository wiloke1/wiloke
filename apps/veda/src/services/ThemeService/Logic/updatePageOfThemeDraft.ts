import { PageOfThemeService } from 'types/Page';
import { PageSettings } from 'types/Result';
import { SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { themeApis } from '../apis';

interface UpdatePageOfThemeDraft {
  page: PageOfThemeService;
  pageSettings: PageSettings;
}

export const updatePageOfThemeDraft = ({ page, pageSettings }: UpdatePageOfThemeDraft) => {
  const { role } = getUserInfo();
  const { sections, label, type, commandId, parentCommandId } = page;

  if (role === 'admin') {
    return themeApis.atom.adminApi.page.updatePageOfDraft({
      page: {
        commandId,
        parentCommandId,
        pageSettings,
        label,
        sectionCommandIds: sections.reduce<string[]>((result, section) => {
          const section_ = section as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client;
          if (section_.commandId) {
            return result.concat(section_.commandId);
          }
          return result;
        }, []),
        type,
      },
    });
  }

  if (role === 'dev') {
    return themeApis.atom.devApi.page.updatePageOfDraft({
      page: {
        commandId,
        parentCommandId,
        pageSettings,
        label,
        sectionCommandIds: sections.reduce<string[]>((result, section) => {
          const section_ = section as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client;
          if (section_.commandId) {
            return result.concat(section_.commandId);
          }
          return result;
        }, []),
        type,
      },
    });
  }
  throw new RoleException();
};

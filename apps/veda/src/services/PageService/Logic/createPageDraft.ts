import { DevPage } from 'types/Page';
import { PageSettings } from 'types/Result';
import { SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { pageApis } from '../apis';

interface CreatePageDraft {
  page: Omit<DevPage, 'commandId'>;
  pageSettings: PageSettings;
}

export const createPageDraft = ({ page, pageSettings }: CreatePageDraft) => {
  const { role } = getUserInfo();
  const { sections, image, label, type, enable } = page;
  if (role === 'dev') {
    return pageApis.atom.devApi.page.createDraftOfDev({
      page: {
        pageSettings,
        image,
        label,
        sectionCommandIds: sections.reduce<string[]>((result, section) => {
          const section_ = section as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client;
          if (section_.commandId) {
            return result.concat(section_.commandId);
          }
          return result;
        }, []),
        type,
        enable,
      },
    });
  }
  throw new RoleException();
};

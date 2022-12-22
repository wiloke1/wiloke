import { AdminPage } from 'types/Page';
import { PageSettings } from 'types/Result';
import { SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { pageApis } from '../apis';

interface UpdatePageAtom {
  page: AdminPage;
  pageSettings: PageSettings;
}

export const updatePageAtom = ({ page, pageSettings }: UpdatePageAtom) => {
  const { role } = getUserInfo();
  const { sections, image, label, type, commandId, enable } = page;

  if (role === 'admin') {
    return pageApis.atom.adminApi.page.updateAtom({
      page: {
        commandId,
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

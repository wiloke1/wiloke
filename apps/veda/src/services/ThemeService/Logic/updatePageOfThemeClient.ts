import { pageApis } from 'services/PageService/apis';
import { PageOfThemeService } from 'types/Page';
import { PageSettings } from 'types/Result';
import { SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';

interface UpdatePageOfThemeClient {
  page: PageOfThemeService;
  pageSettings: PageSettings;
}

export const updatePageOfThemeClient = ({ page, pageSettings }: UpdatePageOfThemeClient) => {
  const { sections, label, type, commandId, parentCommandId } = page;
  return pageApis.vedaApplication.userApi.page.updateClient({
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

  // const { role } = getUserInfo();
  // const { sections, label, type, commandId, parentCommandId } = page;

  // if (role === 'admin') {
  //   throw new Error('Chưa lắp api');
  // }
  // if (role === 'user') {
  //   return pageApis.vedaApplication.userApi.page.updateClient({
  //     page: {
  //       commandId,
  //       parentCommandId,
  //       pageSettings,
  //       label,
  //       sectionCommandIds: sections.reduce<string[]>((result, section) => {
  //         const section_ = section as SectionOfPageAtomOrThemeAtom;
  //         if (section_.commandId) {
  //           return result.concat(section_.commandId);
  //         }
  //         return result;
  //       }, []),
  //       type,
  //     },
  //   });
  // }

  // throw new RoleException();
};

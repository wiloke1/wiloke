import { AdminPage } from 'types/Page';
import { PageSettings } from 'types/Result';
import { SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';
import { pageApis } from '../apis';

interface CreatePageClient {
  page: Omit<AdminPage, 'commandId'>;
  pageSettings: PageSettings;
}

export const createPageClient = ({ page, pageSettings }: CreatePageClient) => {
  const { sections, image, label, type, enable } = page;
  return pageApis.vedaApplication.userApi.page.createClient({
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
  // const { role } = getUserInfo();
  // const { sections, image, label, type } = page;

  // if (role === 'admin') {
  //   throw new Error('Chưa lắp api');
  // }
  // if (role === 'user') {
  //   return pageApis.vedaApplication.userApi.page.createClient({
  //     page: {
  //       pageSettings,
  //       image,
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

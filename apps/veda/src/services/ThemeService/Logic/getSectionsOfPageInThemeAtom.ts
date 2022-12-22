import { PageSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { themeApis } from '../apis';

interface GetSectionsOfPageInThemeAtom {
  sectionCommandIds: string[];
}

export const getSectionsOfPageInThemeAtom = async ({ sectionCommandIds }: GetSectionsOfPageInThemeAtom): Promise<PageSection[]> => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const responses = await themeApis.atom.adminApi.section.getSectionsOfAtom({ commandIds: sectionCommandIds });
    return responses.reduce<PageSection[]>((res, info) => {
      if (info) {
        return res.concat(info);
      }
      return res;
    }, []);
  }
  throw new RoleException();
};

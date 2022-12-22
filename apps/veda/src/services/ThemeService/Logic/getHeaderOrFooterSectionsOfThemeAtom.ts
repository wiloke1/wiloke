import { PageSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { themeApis } from '../apis';

interface GetHeaderOrFooterSectionsOfThemeAtom {
  commandIds: string[];
}

export const getHeaderOrFooterSectionsOfThemeAtom = async ({ commandIds }: GetHeaderOrFooterSectionsOfThemeAtom): Promise<PageSection[]> => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const responses = await themeApis.atom.adminApi.section.getSectionsOfAtom({ commandIds });
    return responses.reduce<PageSection[]>((res, info) => {
      if (info) {
        return res.concat(info);
      }
      return res;
    }, []);
  }
  throw new RoleException();
};

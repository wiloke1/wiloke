import { adapterGetMegaMenus } from 'services/MegaMenuService/Adapters/adapterGetMegaMenus';
import { PageSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { themeApis } from '../apis';

interface GetMegamenusOfPageInThemeAtom {
  megamenuCommandIds: string[];
}

export const getMegamenusOfSectionInThemeAtom = async ({ megamenuCommandIds }: GetMegamenusOfPageInThemeAtom): Promise<PageSection[]> => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const responses = await themeApis.atom.adminApi.megamenu.getMegamenusOfAtom({ commandIds: megamenuCommandIds });
    return adapterGetMegaMenus(
      responses.reduce<PageSection[]>((res, info) => {
        if (info) {
          return res.concat(info);
        }
        return res;
      }, []),
    );
  }
  throw new RoleException();
};

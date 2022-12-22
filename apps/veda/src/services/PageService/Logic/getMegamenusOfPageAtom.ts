import { adapterGetMegaMenus } from 'services/MegaMenuService/Adapters/adapterGetMegaMenus';
import { PageSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { pageApis } from '../apis';

interface GetMegamenusOfPageAtom {
  megamenuCommandIds: string[];
}

export const getMegamenusOfPageAtom = async ({ megamenuCommandIds }: GetMegamenusOfPageAtom) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const responses = await pageApis.atom.adminApi.megamenu.getMegamenusOfAtom({
      commandIds: megamenuCommandIds,
    });
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

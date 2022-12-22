import { adapterGetMegaMenus } from 'services/MegaMenuService/Adapters/adapterGetMegaMenus';
import { PageSection } from 'types/Sections';
import { pageApis } from '../apis';

interface GetMegamenusOfPageClient {
  megamenuCommandIds: string[];
}

export const getMegaMenusOfPageClientUseAtomTemplate = async ({ megamenuCommandIds }: GetMegamenusOfPageClient) => {
  const responses = await pageApis.atom.userApi.megamenu.getMegamenusOfAtom({ commandIds: megamenuCommandIds });

  return adapterGetMegaMenus(
    responses.reduce<PageSection[]>((res, info) => {
      if (info) {
        return res.concat(info);
      }
      return res;
    }, []),
  );
};

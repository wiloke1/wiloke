import { adapterGetMegaMenus } from 'services/MegaMenuService/Adapters/adapterGetMegaMenus';
import { PageSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { pageApis } from '../apis';

interface GetMegamenusOfPageDraft {
  megamenuCommandIds: string[];
}

export const getMegamenusOfPageDraft = async ({ megamenuCommandIds }: GetMegamenusOfPageDraft) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const responses = await Promise.all(
      megamenuCommandIds.map(megamenuCommandId => {
        return pageApis.atom.adminApi.megamenu.getMegamenuOfDraft({ commandId: megamenuCommandId });
      }),
    );
    return adapterGetMegaMenus(
      responses.reduce<PageSection[]>((res, { info }) => {
        if (info) {
          return res.concat(info);
        }
        return res;
      }, []),
    );
  }
  if (role === 'dev') {
    const responses = await Promise.all(
      megamenuCommandIds.map(megamenuCommandId => {
        return pageApis.atom.devApi.megamenu.getMegamenuOfDraft({ commandId: megamenuCommandId });
      }),
    );
    return adapterGetMegaMenus(
      responses.reduce<PageSection[]>((res, { info }) => {
        if (info) {
          return res.concat(info);
        }
        return res;
      }, []),
    );
  }
  throw new RoleException();
};

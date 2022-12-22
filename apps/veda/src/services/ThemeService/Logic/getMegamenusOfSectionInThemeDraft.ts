import { adapterGetMegaMenus } from 'services/MegaMenuService/Adapters/adapterGetMegaMenus';
import { PageSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { themeApis } from '../apis';

interface GetMegamenusOfThemeDraft {
  megamenuCommandIds: string[];
}

export const getMegamenusOfSectionInThemeDraft = async ({ megamenuCommandIds }: GetMegamenusOfThemeDraft): Promise<PageSection[]> => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const responses = await Promise.all(
      megamenuCommandIds.map(megamenuCommandId => {
        return themeApis.atom.adminApi.megamenu.getMegamenuOfDraft({ commandId: megamenuCommandId });
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
        return themeApis.atom.devApi.megamenu.getMegamenuOfDraft({ commandId: megamenuCommandId });
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

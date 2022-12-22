import { PageSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { themeApis } from '../apis';

interface GetHeaderOrFooterSectionsOfThemeDraft {
  commandIds: string[];
}

export const getHeaderOrFooterSectionsOfThemeDraft = async ({ commandIds }: GetHeaderOrFooterSectionsOfThemeDraft): Promise<PageSection[]> => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const responses = await Promise.all(
      commandIds.map(commandId => {
        return themeApis.atom.adminApi.section.getSectionOfDraft({ commandId });
      }),
    );
    return responses.reduce<PageSection[]>((res, { info }) => {
      if (info) {
        return res.concat(info);
      }
      return res;
    }, []);
  }
  if (role === 'dev') {
    const responses = await Promise.all(
      commandIds.map(commandId => {
        return themeApis.atom.devApi.section.getSectionOfDraft({ commandId });
      }),
    );
    return responses.reduce<PageSection[]>((res, { info }) => {
      if (info) {
        return res.concat(info);
      }
      return res;
    }, []);
  }
  throw new RoleException();
};

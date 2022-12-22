import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { themeApis } from '../apis';

interface GetPageOfThemeDraft {
  commandId: string;
}

export const getPageOfThemeDraft = async ({ commandId }: GetPageOfThemeDraft) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await themeApis.atom.adminApi.page.getPageOfDraft({ commandId });
    return response.info;
  }
  if (role === 'dev') {
    const response = await themeApis.atom.devApi.page.getPageOfDraft({ commandId });
    return response.info;
  }
  throw new RoleException();
};

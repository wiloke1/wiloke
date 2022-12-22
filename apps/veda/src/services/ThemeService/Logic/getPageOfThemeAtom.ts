import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { themeApis } from '../apis';

interface GetPageOfThemeAtom {
  commandId: string;
}

export const getPageOfThemeAtom = async ({ commandId }: GetPageOfThemeAtom) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await themeApis.atom.adminApi.page.getPageOfAtom({ commandId });
    return response.info;
  }
  throw new RoleException();
};

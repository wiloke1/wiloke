import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { themeApis } from '../apis';

export const deleteSectionOfThemeAtom = async ({ commandId }: { commandId: string }) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return themeApis.atom.adminApi.section.deleteSectionOfAtom({ commandId });
  }
  throw new RoleException();
};

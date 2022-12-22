import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { themeApis } from '../apis';

interface DeleteThemeAtom {
  commandId: string;
}

export const deleteThemeAtom = ({ commandId }: DeleteThemeAtom) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return themeApis.atom.adminApi.theme.deleteAtom({ commandId });
  }
  throw new RoleException();
};

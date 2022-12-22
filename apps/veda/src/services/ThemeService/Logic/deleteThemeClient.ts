import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { themeApis } from '../apis';

interface DeleteThemeAtom {
  commandId: string;
}

export const deleteClientThemeAPI = ({ commandId }: DeleteThemeAtom) => {
  const { role } = getUserInfo();
  if (role === 'user' || role === 'admin' || role === 'dev') {
    return themeApis.vedaApplication.userApi.theme.deleteClient({ commandId });
  }
  throw new RoleException();
};

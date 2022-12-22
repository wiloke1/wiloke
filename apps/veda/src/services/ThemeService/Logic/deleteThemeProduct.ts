import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { themeApis } from '../apis';

interface DeleteThemeProduct {
  commandId: string;
}

export const deleteThemeProductService = ({ commandId }: DeleteThemeProduct) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return themeApis.vedaApplication.adminApi.theme.deleteProducts({ commandId });
  }
  throw new RoleException();
};

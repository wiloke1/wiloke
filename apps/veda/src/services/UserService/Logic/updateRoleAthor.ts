import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { userApis } from '../apis';

export const updateRoleAuthor = async ({ role, userId }: { userId: number; role: string }) => {
  const { role: _role } = getUserInfo();
  if (_role === 'admin') {
    return userApis.user.adminApi.updateRoleUser({ role, userId });
  }

  throw new RoleException();
};

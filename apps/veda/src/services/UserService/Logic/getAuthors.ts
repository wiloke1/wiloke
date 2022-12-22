import { Role } from 'routes/types';
import { userApis } from '../apis';

interface GetAuthors {
  page: number;
  role?: Role;
}

export const getAuthors = async ({ page, role }: GetAuthors) => {
  const response = await userApis.user.adminApi.getUsers({
    page,
    role,
  });
  return response.info;
};

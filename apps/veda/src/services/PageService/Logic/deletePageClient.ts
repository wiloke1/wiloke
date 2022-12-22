import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { pageApis } from '../apis';

interface DeletePageAtom {
  commandId: string;
}

export const deletePageClient = ({ commandId }: DeletePageAtom) => {
  const { role } = getUserInfo();
  // if (role === 'admin') {
  //   return pageApis.vedaApplication.adminApi.page.deleteProducts({ commandId });
  // }
  if (role === 'user' || role === 'admin' || role === 'dev') {
    return pageApis.vedaApplication.userApi.page.deleteClient({ commandId });
  }
  throw new RoleException();
};

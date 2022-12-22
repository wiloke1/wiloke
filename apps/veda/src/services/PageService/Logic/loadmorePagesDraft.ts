import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { pageApis } from '../apis';

interface LoadmorePagesDraft {
  cursor: string;
}

export const loadmorePagesDraft = ({ cursor }: LoadmorePagesDraft) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return pageApis.atom.adminApi.page.getDraftsOfDev({
      type: 'LOADMORE',
      cursor,
    });
  }
  if (role === 'dev') {
    return pageApis.atom.devApi.page.getDraftsOfDev({
      type: 'LOADMORE',
      cursor,
    });
  }
  throw new RoleException();
};

import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { pageApis } from '../apis';

interface LoadmorePagesAtom {
  cursor: string;
}

export const loadmorePagesAtom = ({ cursor }: LoadmorePagesAtom) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return pageApis.atom.adminApi.page.getAtoms({
      type: 'LOADMORE',
      cursor,
    });
  }
  if (role === 'dev') {
    return pageApis.atom.devApi.page.getAtoms({
      type: 'LOADMORE',
      cursor,
    });
  }
  throw new RoleException();
};

import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { pageApis } from '../apis';

export const getPagesAtom = () => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return pageApis.atom.adminApi.page.getAtoms({
      type: 'GET FIRST PAGE',
    });
  }
  if (role === 'dev') {
    return pageApis.atom.devApi.page.getAtoms({
      type: 'GET FIRST PAGE',
    });
  }
  throw new RoleException();
};

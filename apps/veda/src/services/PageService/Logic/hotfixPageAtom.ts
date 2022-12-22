import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { pageApis } from '../apis';

type HotfixPageAtom = Parameters<typeof pageApis.atom.adminApi.page.rejectAtom>[0];

export const hotfixPageAtom = (params: HotfixPageAtom) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return pageApis.atom.adminApi.page.rejectAtom(params);
  }
  throw new RoleException();
};

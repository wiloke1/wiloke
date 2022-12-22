import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { pageApis } from '../apis';

interface DeletePageAtom {
  commandId: string;
}

export const deletePageAtom = ({ commandId }: DeletePageAtom) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return pageApis.atom.adminApi.page.deleteAtom({ commandId });
  }
  throw new RoleException();
};

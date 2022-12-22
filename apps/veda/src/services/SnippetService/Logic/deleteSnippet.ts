import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { snippetApis } from '..';

interface params {
  fileName: string;
}

export const deleteSnippet = async ({ fileName }: params) => {
  const { role } = getUserInfo();
  if (role === 'admin' || role === 'dev') {
    return snippetApis.atom.deleteSnippet({ fileName });
  }
  throw new RoleException();
};

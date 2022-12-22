import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { snippetApis } from '..';

interface DataBody {
  newFileName: string;
  oldFileName: string;
}

export const updateSnippetFileName = async ({ newFileName, oldFileName }: DataBody) => {
  const { role } = getUserInfo();
  if (role === 'admin' || role === 'dev') {
    return snippetApis.atom.updateSnippetFileName({ newFileName, oldFileName });
  }
  throw new RoleException();
};

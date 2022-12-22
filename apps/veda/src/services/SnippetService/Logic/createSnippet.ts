import { SnippetContent } from 'store/global/globalSnippets/sliceGlobalSnippets';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { snippetApis } from '..';

interface DataBody {
  label?: string;
  keyword?: string[];
  fileName: string;
  data: SnippetContent;
}

export const createSnippet = async (params: DataBody) => {
  const { role } = getUserInfo();
  if (role === 'admin' || role === 'dev') {
    return snippetApis.atom.createSnippet({ ...params });
  }
  throw new RoleException();
};

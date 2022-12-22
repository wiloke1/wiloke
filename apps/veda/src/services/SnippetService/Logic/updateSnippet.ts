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

export const updateSnippet = async (params: DataBody) => {
  const { role } = getUserInfo();
  if (role === 'admin' || role === 'dev') {
    return snippetApis.atom.updateSnippet({ ...params });
  }
  throw new RoleException();
};

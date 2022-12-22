import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { snippetApis } from '..';

interface GetParams {
  keyword?: string;
  fileNames?: string[];
  size?: number;
}

interface LoadMoreParams extends GetParams {
  page: number;
}

export const getSnipptes = async (params: GetParams) => {
  const { role } = getUserInfo();
  if (role === 'admin' || role === 'dev') {
    return snippetApis.atom.getSnippets({ type: 'Get first page', ...params });
  }
  if (role === 'user') {
    return snippetApis.client.getSnippets({ type: 'Get first page', ...params });
  }
  throw new RoleException();
};

export const loadMoreSnippets = async (params: LoadMoreParams) => {
  const { role } = getUserInfo();
  if (role === 'admin' || role === 'dev') {
    return snippetApis.atom.getSnippets({ type: 'Load more', ...params });
  }
  if (role === 'user') {
    return snippetApis.client.getSnippets({ type: 'Load more', ...params });
  }
  throw new RoleException();
};

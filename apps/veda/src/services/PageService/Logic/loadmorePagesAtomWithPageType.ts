import { PageType } from 'types/Page';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { pageApis } from '../apis';

interface LoadmorePagesAtomWithPageType {
  pageType: PageType;
  cursor: string;
}

export const loadmorePagesAtomWithPageType = ({ pageType, cursor }: LoadmorePagesAtomWithPageType) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return pageApis.atom.adminApi.page.searchAtoms({
      type: 'LOADMORE',
      cursor,
      searchParams: {
        type: pageType,
      },
    });
  }
  if (role === 'dev') {
    return pageApis.atom.devApi.page.searchAtoms({
      type: 'LOADMORE',
      cursor,
      searchParams: {
        type: pageType,
      },
    });
  }
  throw new RoleException();
};

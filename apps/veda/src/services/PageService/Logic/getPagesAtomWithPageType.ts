import { PageType } from 'types/Page';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { pageApis } from '../apis';

interface GetPagesAtomWithPageType {
  pageType: PageType;
}

export const getPagesAtomWithPageType = ({ pageType }: GetPagesAtomWithPageType) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return pageApis.atom.adminApi.page.searchAtoms({
      type: 'GET FIRST PAGE',
      searchParams: {
        type: pageType,
      },
    });
  }
  if (role === 'dev') {
    return pageApis.atom.devApi.page.searchAtoms({
      type: 'GET FIRST PAGE',
      searchParams: {
        type: pageType,
      },
    });
  }
  throw new RoleException();
};

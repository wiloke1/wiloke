import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { pageApis } from '../apis';

interface GetPageAtom {
  commandId: string;
}

export const getPageAtom = async ({ commandId }: GetPageAtom) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await pageApis.atom.adminApi.page.getAtom({ commandId });
    return {
      ...response.info,
      type: (response.info as any).type === 'default' ? 'page' : response.info.type, // be đang trả về sai type
    };
  }
  if (role === 'user') {
    const response = await pageApis.atom.userApi.page.getAtom({ commandId });
    return {
      ...response.info,
      type: (response.info as any).type === 'default' ? 'page' : response.info.type, // be đang trả về sai type
    };
  }
  throw new RoleException();
};

import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { pageApis } from '../apis';

interface GetPageDraft {
  commandId: string;
}

export const getPageDraft = async ({ commandId }: GetPageDraft) => {
  const { role } = getUserInfo();
  if (role === 'dev') {
    const response = await pageApis.atom.devApi.page.getDraftOfDev({ commandId });
    return {
      ...response.info,
      type: (response.info as any).type === 'default' ? 'page' : response.info.type, // be đang trả về sai type
    };
  }
  if (role === 'admin') {
    const response = await pageApis.atom.adminApi.page.getDraftOfDev({ commandId });
    return {
      ...response.info,
      type: (response.info as any).type === 'default' ? 'page' : response.info.type, // be đang trả về sai type
    };
  }
  throw new RoleException();
};

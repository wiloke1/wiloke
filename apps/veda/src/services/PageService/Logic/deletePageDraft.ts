import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { pageApis } from '../apis';

interface DeletePageDraft {
  commandId: string;
}

export const deletePageDraft = ({ commandId }: DeletePageDraft) => {
  const { role } = getUserInfo();
  if (role === 'dev') {
    return pageApis.atom.devApi.page.deleteDraftOfDev({ commandId });
  }
  throw new RoleException();
};

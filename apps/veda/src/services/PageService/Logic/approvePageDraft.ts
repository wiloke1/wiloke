import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { pageApis } from '../apis';

interface ApprovePageDraft {
  commandId: string;
}

export const approvePageDraft = ({ commandId }: ApprovePageDraft) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return pageApis.atom.adminApi.page.approveDraftToAtom({ devCommandId: commandId });
  }
  throw new RoleException();
};

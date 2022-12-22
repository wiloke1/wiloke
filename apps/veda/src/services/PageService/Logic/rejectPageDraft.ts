import { DevPageDatabase } from 'services/ResultService/atomTypes';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { pageApis } from '../apis';

interface RejectPageDraft {
  page: DevPageDatabase;
  message: string;
}

export const rejectPageDraft = ({ page, message }: RejectPageDraft) => {
  const { role } = getUserInfo();
  const { commandId, image, label, pageSettings, sectionCommandIds, type } = page;
  if (role === 'admin') {
    return pageApis.atom.adminApi.page.updateDraftOfDev({
      page: {
        commandId,
        image,
        label,
        pageSettings,
        sectionCommandIds,
        type,
        status: 'draft',
        comment: message,
      },
    });
  }
  throw new RoleException();
};

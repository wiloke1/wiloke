import { DevPageDatabase } from 'services/ResultService/atomTypes';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { pageApis } from '../apis';

interface CommitPageDraft {
  page: DevPageDatabase;
  message: string;
}

export const commitPageDraft = ({ page, message }: CommitPageDraft) => {
  const { role } = getUserInfo();
  const { commandId, image, label, pageSettings, sectionCommandIds, type } = page;
  if (role === 'dev') {
    return pageApis.atom.devApi.page.updateDraftOfDev({
      page: {
        commandId,
        image,
        label,
        pageSettings,
        sectionCommandIds,
        type,
        status: 'pending',
        changelog: message,
      },
    });
  }
  throw new RoleException();
};

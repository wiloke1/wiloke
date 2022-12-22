import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { themeApis } from '../apis';

interface DeleteThemeDraft {
  commandId: string;
}

export const deleteThemeDraft = ({ commandId }: DeleteThemeDraft) => {
  const { role } = getUserInfo();
  if (role === 'dev') {
    return themeApis.atom.devApi.theme.deleteDraftOfDev({ commandId });
  }
  throw new RoleException();
};

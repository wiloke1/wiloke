import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { themeApis } from '../apis';

export const deleteSectionOfThemeDraft = async ({ commandId }: { commandId: string }) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return themeApis.atom.adminApi.section.deleteSectionOfDraft({ commandId });
  }
  if (role === 'dev') {
    return themeApis.atom.devApi.section.deleteSectionOfDraft({ commandId });
  }
  throw new RoleException();
};

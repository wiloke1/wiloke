import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { pageApis } from '../apis';

export const deleteSectionsOfPageDraft = async ({ commandId }: { commandId: string }) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return pageApis.atom.adminApi.section.deleteSectionOfDraft({ commandId });
  }

  if (role === 'dev') {
    return pageApis.atom.devApi.section.deleteSectionOfDraft({ commandId });
  }

  throw new RoleException();
};

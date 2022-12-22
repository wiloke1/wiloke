import { megaMenuApiController } from 'services/MegaMenuService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getChangelogsOfAtom = async (sectionCommandId: string) => {
  const { role } = getUserInfo();
  try {
    if (role === 'user') {
      const response = await megaMenuApiController.atom.publishApi.changelogs.getChangelogsOfAtom({ sectionCommandId });
      return {
        sectionCommandId,
        data: response.info.sort((a, b) => {
          if (!!a.createdDateTimestamp && !!b.createdDateTimestamp) {
            return b.createdDateTimestamp - a.createdDateTimestamp;
          }
          return 0;
        }),
      };
    }
    if (role === 'admin') {
      const response = await megaMenuApiController.atom.adminApi.changelogs.getChangelogsOfAtom({ sectionCommandId });
      return {
        sectionCommandId,
        data: response.info.sort((a, b) => {
          if (!!a.createdDateTimestamp && !!b.createdDateTimestamp) {
            return b.createdDateTimestamp - a.createdDateTimestamp;
          }
          return 0;
        }),
      };
    }
    if (role === 'dev') {
      const response = await megaMenuApiController.atom.devApi.changelogs.getChangelogsOfDraft({ sectionCommandId });
      return {
        sectionCommandId,
        data: response.info.sort((a, b) => {
          if (a.createdDateTimestamp && b.createdDateTimestamp) {
            return b.createdDateTimestamp - a.createdDateTimestamp;
          }
          return 0;
        }),
      };
    }
  } catch {
    return {
      sectionCommandId,
      data: [],
    };
  }
  throw new RoleException();
};

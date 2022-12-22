import { addonApiController } from 'services/AddonService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getChangelogsOfAtom = async (addonCommandId: string) => {
  const { role } = getUserInfo();
  try {
    if (role === 'user') {
      const response = await addonApiController.atom.publishApi.changelogs.getChangelogsOfAtom({ addonCommandId });
      return {
        data: response.info.sort((a, b) => {
          if (!!a.createdDateTimestamp && !!b.createdDateTimestamp) {
            return b.createdDateTimestamp - a.createdDateTimestamp;
          }
          return 0;
        }),
        addonCommandId,
      };
    }
    if (role === 'admin') {
      const response = await addonApiController.atom.adminApi.changelogs.getChangelogsOfAtom({ addonCommandId });
      return {
        data: response.info.sort((a, b) => {
          if (!!a.createdDateTimestamp && !!b.createdDateTimestamp) {
            return b.createdDateTimestamp - a.createdDateTimestamp;
          }
          return 0;
        }),
        addonCommandId,
      };
    }
    if (role === 'dev') {
      const response = await addonApiController.atom.adminApi.changelogs.getChangelogsOfAtom({ addonCommandId });
      return {
        data: response.info.sort((a, b) => {
          if (!!a.createdDateTimestamp && !!b.createdDateTimestamp) {
            return b.createdDateTimestamp - a.createdDateTimestamp;
          }
          return 0;
        }),
        addonCommandId,
      };
    }
  } catch {
    return {
      addonCommandId,
      data: [],
    };
  }
  throw new RoleException();
};

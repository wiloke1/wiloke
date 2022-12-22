import { getUserInfo } from 'utils/functions/getUserInfo';
import { pageApis } from '../apis';

interface Params {
  commandId: string;
}

export const deletePageFavorite = async ({ commandId }: Params) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return pageApis.vedaApplication.adminApi.page.deleteFavorite({ commandId });
  } else {
    return pageApis.vedaApplication.userApi.page.deleteFavorite({ commandId });
  }
};

import { PageType, PreviewImage } from 'types/Page';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { pageApis } from '../apis';

interface Params {
  name: string;
  /**  Đây là id của product service.  */
  parentCommandId: string;
  categories: string[];
  image: PreviewImage;
  pageType: PageType;
}

export const savePageToFavorite = async ({ categories, image, name, parentCommandId, pageType }: Params) => {
  const { role, id } = getUserInfo();
  if (role === 'admin') {
    return pageApis.vedaApplication.adminApi.page.saveToFavorite({ userId: id, categories, image, name, parentCommandId, pageType });
  } else {
    return pageApis.vedaApplication.userApi.page.saveToFavorite({ userId: id, categories, image, name, parentCommandId, pageType });
  }
};

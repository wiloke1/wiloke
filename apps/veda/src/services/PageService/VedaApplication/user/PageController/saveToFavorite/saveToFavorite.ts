import { AxiosResponse } from 'axios';
import configureApp from 'configureApp';
import { BE_PageProduct } from 'services/PageService/VedaApplication/types';
import { PageType, PreviewImage } from 'types/Page';
import fetchAPI from 'utils/functions/fetchAPI';

interface Params {
  userId: number;
  name: string;
  /**  Đây là id của product service.  */
  parentCommandId: string;
  categories: string[];
  image: PreviewImage;
  pageType: PageType;
}

interface ResponseSuccess {
  info: BE_PageProduct;
  message: string;
}

export const saveToFavorite = async ({ categories, name, parentCommandId, userId, image, pageType }: Params) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${configureApp.endpoint.clients}/me/favorites`,
    method: 'POST',
    data: {
      categories,
      name,
      parentCommandId,
      userId,
      favoriteType: 'PAGE',
      image,
      pageType: pageType.toUpperCase(),
    },
  });
  return response.data;
};

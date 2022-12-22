import { AxiosResponse } from 'axios';
import configureApp from 'configureApp';
import { PreviewImage } from 'types/Page';
import { PageSection } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';

interface Params {
  userId: number;
  name: string;
  /**  Đây là id của product service.  */
  parentCommandId: string;
  categories: string[];
  image: PreviewImage;
}

interface ResponseSuccess {
  info: PageSection;
  message: string;
}

export const saveToFavorite = async ({ categories, name, parentCommandId, userId, image }: Params) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${configureApp.endpoint.clients}/me/favorites`,
    method: 'POST',
    data: {
      categories,
      name,
      parentCommandId,
      userId,
      favoriteType: 'SECTION',
      image,
    },
  });
  return response.data;
};

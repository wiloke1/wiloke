import { sectionApiController } from 'services/SectionService';
import { PreviewImage } from 'types/Page';
import { getUserInfo } from 'utils/functions/getUserInfo';

interface Params {
  name: string;
  /**  Đây là id của product service.  */
  parentCommandId: string;
  categories: string[];
  image: PreviewImage;
}

export const saveToFavorite = async ({ name, categories, parentCommandId, image }: Params) => {
  const { role, id } = getUserInfo();
  if (role === 'admin') {
    return sectionApiController.client.adminApi.section.saveToFavorite({ categories, name, parentCommandId, userId: id, image });
  } else {
    return sectionApiController.client.clientApi.section.saveToFavorite({ categories, name, parentCommandId, userId: id, image });
  }
};

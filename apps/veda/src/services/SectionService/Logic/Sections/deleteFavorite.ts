import { sectionApiController } from 'services/SectionService';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const deleteFavorite = async ({ commandId }: { commandId: string }) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return sectionApiController.client.adminApi.section.deleteFavorite({ commandId });
  } else {
    return sectionApiController.client.clientApi.section.deleteFavorite({ commandId });
  }
};

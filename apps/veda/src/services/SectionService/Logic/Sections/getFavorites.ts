import { sectionApiController } from 'services/SectionService';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getFavorites = async ({ categories }: { categories: string[] }) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await sectionApiController.client.adminApi.section.getFavorites({ type: 'Get first page', categories });
    if (response.info) {
      return response.info.map(item => ({ ...item, label: item.name }));
    }
    return [];
  } else {
    const response = await sectionApiController.client.clientApi.section.getFavorites({ type: 'Get first page', categories });
    if (response.info) {
      return response.info.map(item => ({ ...item, label: item.name }));
    }
    return [];
  }
};

export const loadMoreFavorites = async ({ categories, cursor }: { categories: string[]; cursor: string }) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await sectionApiController.client.adminApi.section.getFavorites({ type: 'Load more', categories, cursor });
    if (response.info) {
      return response.info.map(item => ({ ...item, label: item.name }));
    }
    return [];
  } else {
    const response = await sectionApiController.client.clientApi.section.getFavorites({ type: 'Load more', categories, cursor });
    if (response.info) {
      return response.info.map(item => ({ ...item, label: item.name }));
    }
    return [];
  }
};

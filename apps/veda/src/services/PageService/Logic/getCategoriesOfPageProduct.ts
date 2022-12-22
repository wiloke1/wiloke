import { SectionCategoryForFrontend } from 'services/SectionService/types';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { pageApis } from '../apis';

export const getCategoriesOfPageProduct = async () => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await pageApis.vedaApplication.adminApi.category.getCategories({});

    const mapResponse = response.info.map<SectionCategoryForFrontend>(item => {
      return {
        quantity: '',
        quantityLeft: '',
        slug: item.name,
        title: item.description ? item.description : item.name,
        commandId: item.commandId,
      };
    });

    return mapResponse;
  }
  if (role === 'user') {
    const response = await pageApis.vedaApplication.userApi.category.getCategories({});
    const mapResponse = response.info.map<SectionCategoryForFrontend>(item => {
      return {
        quantity: '',
        quantityLeft: '',
        slug: item.name,
        title: item.description ? item.description : item.name,
        commandId: item.commandId,
      };
    });

    return mapResponse;
  }
  throw new RoleException();
};

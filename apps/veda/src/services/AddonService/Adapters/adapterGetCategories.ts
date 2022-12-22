import { CategoryDataResponse } from 'services/SectionService/types';
import { SectionCategoryForFrontend } from 'types/Sections';

export const adapterGetCategories = (categoriesResponse: CategoryDataResponse[]) => {
  return categoriesResponse.map<SectionCategoryForFrontend>(item => {
    return {
      quantity: item.count ? item.count.toString() : '',
      quantityLeft: '',
      slug: item.name,
      title: item.description ? item.description : item.name,
      commandId: item.commandId,
    };
  });
};

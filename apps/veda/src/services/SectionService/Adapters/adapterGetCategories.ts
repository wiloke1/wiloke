import { SectionCategoryForFrontend } from 'types/Sections';
import { CategoryDataResponse } from '../types';

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

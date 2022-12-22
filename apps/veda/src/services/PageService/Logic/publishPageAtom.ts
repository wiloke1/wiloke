import { AdminPageDatabase } from 'services/ResultService/atomTypes';
import { SectionCategoryForFrontend } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { pageApis } from '../apis';

interface PublishPageAtom {
  pageAtom: AdminPageDatabase;
  categoryOfProduct: SectionCategoryForFrontend | undefined;
}
export const publishPageAtom = ({ pageAtom, categoryOfProduct }: PublishPageAtom) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return pageApis.vedaApplication.adminApi.page.createProduct({
      page: {
        parentCommandId: pageAtom.commandId,
        label: pageAtom.label,
        type: pageAtom.type,
        downloadedCount: 0,
        plan: undefined,
        image: pageAtom.image,
        category: categoryOfProduct
          ? {
              commandId: categoryOfProduct.commandId,
              name: categoryOfProduct.slug,
              description: categoryOfProduct.title,
            }
          : undefined,
      },
    });
  }

  throw new RoleException();
};

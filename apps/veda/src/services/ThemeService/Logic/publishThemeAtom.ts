import { SectionCategoryForFrontend } from 'types/Sections';
import { AdminTheme } from 'types/Theme';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { themeApis } from '../apis';

interface PublishThemeAtom {
  themeAtom: AdminTheme;
  categoryOfProduct: SectionCategoryForFrontend | undefined;
}
export const publishThemeAtom = ({ themeAtom, categoryOfProduct }: PublishThemeAtom) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return themeApis.vedaApplication.adminApi.theme.createProduct({
      theme: {
        featuredImage: themeAtom.featuredImage,
        parentCommandId: themeAtom.commandId,
        downloadedCount: 0,
        plan: undefined,
        tags: [],
        label: themeAtom.label,
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

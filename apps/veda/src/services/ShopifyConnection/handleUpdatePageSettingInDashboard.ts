import { AdminPageData } from 'containers/Admin/types';
import { getAllScriptOfPage, getCssFromSectionsScss_PageScss_SectionsInlinesCss, getVendorsOfPage } from 'generate/utils/getFilesForSave';
import { PageSettings } from 'types/Result';
import { GetAdditionalDataRelateToShopify_BEExpectResponse } from './services/getAdditionalDataRelateToShopify';
import { WriteGlobalOfPageToShopify_BEExpectParameters } from './services/writeGlobalOfPageToShopify';
import { getIdOfGlobalCssFile, getIdOfGlobalJsFile, getIdOfVendorsCssFile, getIdOfVendorsJsFile, getShopifyPages } from './utils';

type RT = DeepPartial<WriteGlobalOfPageToShopify_BEExpectParameters>;
type File = WriteGlobalOfPageToShopify_BEExpectParameters['assets']['files'][number];

interface HandleUpdatePageSettingInDashboard {
  data: AdminPageData;
  eventId: string | undefined;
  isOverrideIndividualPages: GetAdditionalDataRelateToShopify_BEExpectResponse['info']['isOverrideIndividualPages'];
}

/** Function thực hiện lấy ra parameters để bắn lên api OutputOfBuilderService và cái tên đang thể hiện lên vị trí mà function được gọi */
export const handleUpdatePageSettingInDashboard = async ({
  data,
  eventId,
  isOverrideIndividualPages,
}: HandleUpdatePageSettingInDashboard): Promise<RT> => {
  const { shopifyPages, pageSettings, commandId, enable, type, label } = data;
  const { globalJs, globalScss, generalSettings, vendors } = pageSettings as PageSettings;
  // NOTE: Tạm thời chuyển sang dùng label của page
  const { headerFooterEnabled, metaDescription, metaTitle, socialShareImage, handle } = generalSettings;
  // const { headerFooterEnabled, metaDescription, metaTitle, socialShareImage, handle, label } = generalSettings;

  let result: RT = {
    pageType: type,
    pageName: label,
    isIncludeThemeHeaderFooter: headerFooterEnabled,
    pageCommandId: commandId,
    eventId,
    eventType: 'Ghi file khi update page settings ngoài dashboard',
    assets: {
      files: [
        ...getAllScriptOfPage({ variant: 'Dùng ở watchUpdatePageSettings.ts', globalJs, lazyload: generalSettings.lazyload }),
        ...(await getCssFromSectionsScss_PageScss_SectionsInlinesCss({ variant: 'Dùng ở watchUpdatePageSettings.ts', globalScss })),
        ...getVendorsOfPage({ vendors, lazyload: generalSettings.lazyload }),
      ].reduce<File[]>((result, file) => {
        if (file.type === 'globalJs của page - bảo gồm globalJs và lazyLoadJs của page') {
          return result.concat({
            content: file.content,
            id: getIdOfGlobalJsFile(data),
            name: getIdOfGlobalJsFile(data),
            type: 'js',
          });
        }
        if (file.type === 'globalCss của page - chỉ bảo gồm globalCss của page') {
          return result.concat({
            content: file.content,
            id: getIdOfGlobalCssFile(data),
            name: getIdOfGlobalCssFile(data),
            type: 'css',
          });
        }
        if (file.type === 'vendors css tổng của page') {
          return result.concat({
            content: file.content,
            id: getIdOfVendorsCssFile(data),
            name: getIdOfVendorsCssFile(data),
            type: 'vendorsCss',
          });
        }
        if (file.type === 'vendors js tổng của page') {
          return result.concat({
            content: file.content,
            id: getIdOfVendorsJsFile(data),
            name: getIdOfVendorsJsFile(data),
            type: 'vendorsJs',
          });
        }
        return result;
      }, []),
    },
  };

  if (type === 'page') {
    result = {
      ...result,
      page: {
        handle: handle ? handle : undefined,
        isPublished: enable,
        pageName: label,
        seo: {
          description: metaDescription,
          title: metaTitle,
          featuredImage: socialShareImage,
        },
      },
      isIncludeThemeHeaderFooter: headerFooterEnabled,
    };
  } else if (type === 'product' || type === 'collection' || type === 'article') {
    result = {
      ...result,
      [type]: {
        // Với regular page handle rỗng là không thể
        handle: handle ? handle : undefined,
        isApplyToAll: shopifyPages === 'all' ? true : false,
        isPublished: enable,
        isOverrideIndividualPages,
        pageName: label,
        seo: undefined, // Chỉ có "Page" mới cần update SEO nên đang để "seo: undefined"
        shopifyPages: getShopifyPages(data),
      },
      isIncludeThemeHeaderFooter: headerFooterEnabled,
    };
  } else if (
    type === 'home' ||
    type === 'cart' ||
    type === 'pageNotFound' ||
    type === 'password' ||
    type === 'search' ||
    type === 'collections' ||
    type === 'account' ||
    type === 'activateAccount' ||
    type === 'addresses' ||
    type === 'login' ||
    type === 'order' ||
    type === 'register' ||
    type === 'resetPassword' ||
    type === 'giftCard'
  ) {
    result = {
      ...result,
      [type]: {
        handle: handle ? handle : undefined,
        isPublished: enable,
        pageName: label,
      },
      isIncludeThemeHeaderFooter: headerFooterEnabled,
    };
  } else {
    throw new Error('handleUpdatePageSettingInDashboard -> thêm type');
  }

  return result;
};

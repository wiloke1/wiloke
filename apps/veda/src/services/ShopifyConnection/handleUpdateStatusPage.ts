import { AdminPageData } from 'containers/Admin/types';
import { CollectionPageLiquidVariable, ProductPageLiquidVariable } from 'types/Page';
import { PageSettings } from 'types/Result';
import { GetAdditionalDataRelateToShopify_BEExpectResponse } from './services/getAdditionalDataRelateToShopify';
import { WritePageToShopify_BEExpectParameters } from './services/writePageToShopify';
import { getShopifyPages } from './utils';

type PageParamsExpect = DeepPartial<WritePageToShopify_BEExpectParameters>;
interface HandleUpdateStatusPage {
  data: AdminPageData;
  eventId: string | undefined;
  isOverrideIndividualPages: GetAdditionalDataRelateToShopify_BEExpectResponse['info']['isOverrideIndividualPages'];
  isPublished: boolean;
}

/** Function thực hiện lấy ra parameters để bắn lên api OutputOfBuilderService và cái tên đang thể hiện lên vị trí mà function được gọi */
export const handleUpdateStatusPage = ({ eventId, data, isOverrideIndividualPages, isPublished }: HandleUpdateStatusPage): PageParamsExpect => {
  const { shopifyPages, commandId, type, label, pageSettings } = data;
  // NOTE: Tạm thời chuyển sang dùng label của page
  const {
    handle,
    headerFooterEnabled,
    metaDescription,
    metaTitle,
    socialShareImage,
  } = pageSettings?.generalSettings as PageSettings['generalSettings'];
  if (type === 'page') {
    return {
      eventId,
      eventType: 'Publish | Unpublish page ngoài dashboard',
      pageCommandId: commandId,
      pageType: type,
      pageName: label,
      page: {
        isPublished,
        // Với regular page handle rỗng là không thể
        handle: handle ? handle : undefined,
        pageName: label,
        seo: {
          description: metaDescription,
          featuredImage: socialShareImage,
          title: metaTitle,
        },
      },
      isIncludeThemeHeaderFooter: headerFooterEnabled,
    };
  } else if (type === 'product' || type === 'collection' || type === 'article') {
    const _shopifyPages = shopifyPages as Array<ProductPageLiquidVariable | CollectionPageLiquidVariable> | 'all' | undefined;
    return {
      eventId,
      eventType: 'Publish | Unpublish page ngoài dashboard',
      pageCommandId: commandId,
      pageType: type,
      pageName: label,
      [type]: {
        isPublished,
        isApplyToAll: _shopifyPages === 'all' ? true : false,
        isOverrideIndividualPages,
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
    return {
      eventId,
      eventType: 'Publish | Unpublish page ngoài dashboard',
      pageCommandId: commandId,
      pageType: type,
      pageName: label,
      [type]: {
        isPublished,
      },
      isIncludeThemeHeaderFooter: headerFooterEnabled,
    };
  } else {
    throw new Error('handleUpdateStatusPage');
  }
};

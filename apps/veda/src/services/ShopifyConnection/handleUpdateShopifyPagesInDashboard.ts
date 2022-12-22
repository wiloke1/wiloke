import { AdminPageData } from 'containers/Admin/types';
import { PageSettings } from 'types/Result';
import { GetAdditionalDataRelateToShopify_BEExpectResponse } from './services/getAdditionalDataRelateToShopify';
import { WritePageToShopify_BEExpectParameters } from './services/writePageToShopify';
import { getShopifyPages } from './utils';

interface HandleUpdateShopifyPagesInDashboard {
  prevData: AdminPageData;
  data: AdminPageData;
  eventId: string | undefined;
  isOverrideIndividualPages: GetAdditionalDataRelateToShopify_BEExpectResponse['info']['isOverrideIndividualPages'];
}

type RT = DeepPartial<WritePageToShopify_BEExpectParameters>;

/** Function thực hiện lấy ra parameters để bắn lên api OutputOfBuilderService và cái tên đang thể hiện lên vị trí mà function được gọi */
export const handleUpdateShopifyPagesInDashboard = ({
  prevData,
  data,
  eventId,
  isOverrideIndividualPages,
}: HandleUpdateShopifyPagesInDashboard): { unpublishAllParameters: RT | undefined; updateShopifyPagesParameters: RT } => {
  const { shopifyPages, commandId, enable, type, label, pageSettings } = data;
  // NOTE: Tạm thời chuyển sang dùng label của page
  const { headerFooterEnabled } = pageSettings?.generalSettings as PageSettings['generalSettings'];
  // const { label, headerFooterEnabled } = pageSettings.generalSettings;
  let unpublishAllParameters: RT | undefined = undefined;
  // NOTE: @tuong -> "Article Page" chỉ có thể chọn 1 blog để chứa, "Home Page" và "Regular Page" không có chọn shopifyPages  -> Không có trường hợp "unpublish all"
  if (prevData.shopifyPages === 'all' && shopifyPages !== 'all' && (type === 'product' || type === 'collection' || type === 'article')) {
    unpublishAllParameters = {
      eventId,
      eventType: 'Update shopifyPages ngoài dashboard/Từ "all" -> 1 vài => Unpublish tất cả',
      pageType: type,
      pageName: label,
      pageCommandId: commandId,
      [type]: {
        // @tuong -> HỢP TÌNH HỢP LÝ: Disable cái mà "applyAll" -> "applyAll" vẫn là true và "published" phải là false
        isPublished: false,
        isApplyToAll: true,
        // @tuong -> Fix lỗi: {"pageCommandId":"6284d63cb7c8854b4f3b4af6","message":"iterable","step":"END","previewUrls":null,"templateSuffix":null,"extraInfo":null,"eventType":"Update shopifyPages ngoài dashboard/Từ \"all\" -> 1 vài => Unpublish tất cả","status":"ERROR"}
        shopifyPages: getShopifyPages(data),
      },
    };
  }

  let result: RT = {
    pageType: type,
    pageName: label,
    pageCommandId: commandId,
    eventId,
    eventType: 'Update shopifyPages ngoài dashboard',
  };

  if (type === 'product' || type === 'collection' || type === 'article') {
    result = {
      ...result,
      [type]: {
        isApplyToAll: shopifyPages === 'all' ? true : false,
        isPublished: enable,
        isOverrideIndividualPages,
        pageName: label,
        shopifyPages: getShopifyPages(data),
      },
      isIncludeThemeHeaderFooter: headerFooterEnabled,
    };
  } else {
    throw new Error('handleUpdateShopifyPagesInDashboard -> thêm type');
  }

  return { unpublishAllParameters, updateShopifyPagesParameters: result };
};

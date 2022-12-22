import { Page, PageLiquidVariable } from 'types/Page';
import { PageSection } from 'types/Sections';

export interface LocationStates {
  '/'?: undefined;
  '/page'?: undefined;
  '/page/templates'?: undefined;
  '/page/collection'?: undefined;
  '/page/article'?: undefined;
  '/page/products'?: undefined;
  '/page/home'?: undefined;
  '/page/cart'?: undefined;
  '/page/search'?: undefined;
  '/page/password'?: undefined;
  '/page/notfound'?: undefined;
  '/page/customer-login'?: undefined;
  '/page/customer-reset-password'?: undefined;
  '/page/customer-activate-account'?: undefined;
  '/page/customer-register'?: undefined;
  '/page/customer-account'?: undefined;
  '/page/customer-order'?: undefined;
  '/page/customer-addresses'?: undefined;
  '/page/gift-card'?: undefined;
  '/page/collection-listing'?: undefined;
  '/home'?: undefined;
  '/builder'?: {
    label: string;
    backToPage?: keyof LocationStates;
    headerFooterEnabled?: boolean;
    type?: Page['type'];
    // NOTE: @tuong -> "shopifyRepresentPage vaf shopifyPages" chỉ được bắn qua location state KHI VÀ CHỈ KHI page mới tinh
    // Vì khi vào "Builder Page" sẽ có 1 api để lấy về thông tin "shopifyRepresentPage và shopifyPages" -> Nếu page đã được tạo thì chắc chắn sẽ có thông tin "shopifyRepresentPage và shopifyPages"
    shopifyRepresentPage?: PageLiquidVariable;
    shopifyPages?: PageLiquidVariable[] | 'all';
    isCreate: boolean;
    /**
      Note: @duong 28/7 -> param này dùng để check nếu user hoặc bất kì ai dùng template page do admin tạo ra thì lúc nhận response get page xong nếu page đấy trả về addonCommandIds hoặc sectionCommandIds thì sẽ dùng api publish để get sections/addons chứ không dùng api admin/me
     */
    isAdminTemplate?: boolean;
    entityVariant?: EntityType;
  };
  '/iframe'?: undefined;
  '/test': undefined;
  '/embeddedtest': undefined;
  '/page/blank'?: undefined;
  '/theme/templates'?: undefined;
  '/theme'?: {
    justInstalled?: boolean;
  };
  '/theme/settings'?: undefined;
  '/preset-styles'?: undefined;
  '/preview'?: {
    sections: PageSection[];
  };
  '/account'?: undefined;
  '/notifications'?: undefined;
  '/login'?: undefined;
  '/notfound'?: undefined;
  '/manager-users'?: undefined;
  '/manager-page'?: undefined;
  '/manager-theme'?: undefined;
  '/manager-plan'?: undefined;
  '/pricing'?: undefined;
  '/maintainance'?: undefined;
}

import { Schema, SectionSettings, SettingArticlePicker, SettingCollectionPicker, SettingSingleProductPicker } from './Schema';
import { PageSection, SectionCategoryTag } from './Sections';

export type Plan = undefined | string;

/** NOTE: @tuong -> Khi thêm PageType cần update các file handleSaveInBuilderPage, handleUpdatePageSettingInDashboard, handleUpdateShopifyPagesInDashboard, handleUpdateStatusPage */
export type PageType =
  | 'home'
  | 'product'
  | 'collection'
  | 'article'
  | 'page'
  | 'cart'
  | 'search'
  | 'pageNotFound'
  | 'password'
  | 'login'
  | 'resetPassword'
  | 'activateAccount'
  | 'register'
  | 'account'
  | 'order'
  | 'addresses'
  | 'giftCard'
  | 'collections';

export type PageId = string;

/**
 * thuộc tính "id" dùng để request product, collection vì "handle" là không search uniq đc (chi tiết test tại graphql shopify), còn ở "BlogPicker" và "ArticlePicker" tạm thời thêm để đồng bộ giữa những field này
 * thuộc tính "handle" dùng để lấy dữ liệu trong reducer để đổ vào twig render ra html
 * thuộc tính "blogId" và "blogHandle" của "SettingArticlePicker" dùng để lấy dữ liệu trong reducer để đổ vào twig render ra html khi tạo page "article"
 * NOTE: @tuong -> Có thể đổi tên để tăng độ tường minh vì:
 * 1. Có "id" của "SettingBlogPicker" và "SettingArticlePicker" là không cần thiết
 * 2. Vấn đề type
 * 3. Code sẽ đẹp hơn tại các file watchGet...Objects.ts
 */

export interface RegularPageLiquidVariable {
  // NOTE: @tuong -> handle có giá trị là "undefined" khi "tạo mới"
  handle: string | undefined;
}
export type HomePageLiquidVariable = undefined;
export type ProductPageLiquidVariable = SettingSingleProductPicker['children'];
export type CollectionPageLiquidVariable = SettingCollectionPicker['children'];
export type ArticlePageLiquidVariable = SettingArticlePicker['children'];

export type PageLiquidVariable =
  | ProductPageLiquidVariable
  | CollectionPageLiquidVariable
  | ArticlePageLiquidVariable
  | RegularPageLiquidVariable
  | HomePageLiquidVariable;

export interface PageShopifyHandles {
  id: string;
  handle: string;
}

export interface PageGeneral {
  /** id trong database */
  commandId: PageId;
  /** slug của page */
  handle?: string;
  /** Kiểu page */
  type: PageType;
  /** Tên của page */
  label: string;
  /** Các section trên 1 page */
  sections: PageSection[];
  /** bắn sang cho Tưởng request lấy liquid variables */
  shopifyRepresentPage?: PageLiquidVariable | undefined;
  /** Lưu các id và handle của product, blog, collection của shopify */
  shopifyPages?: PageLiquidVariable[] | 'all' | undefined;
  /** preview image */
  image: PreviewImage;
  /** Trạng thái save vào khu vực saved template ở template pages */
  saved?: boolean;
  /** Trạng thái publish của page */
  enable: boolean;
  /** Thuộc tính này để khách mở preview của page khi lựa chọn template */
  linkPreview?: string;
}

export type Page = DevPage | AdminPage | PageOfThemeService;

export interface DevPage extends PageGeneral {
  status?: 'pending' | 'draft';
  userId?: number;
  parentCommandId?: string;
}

export interface AdminPage extends PageGeneral {
  approvedBy?: number;
  createdBy?: number;
}

export interface PageOfThemeService extends AdminPage {
  /** ID ánh xạ đến Page Atom */
  parentCommandId: string;
}

export interface ClientPage extends AdminPage {
  parentCommandId: string | undefined;
}

export interface ProductPage extends Pick<PageGeneral, 'commandId' | 'label' | 'image'> {
  plan?: Plan;
  downloadedCount?: number;
  tags?: SectionCategoryTag[];
  category?: SectionCategoryTag;
  parentCommandId: string;
}

/** Cấu trúc của section static */
export interface ComponentData {
  /** liquid file */
  liquid: string;
  /** scss file */
  scss?: string;
  /** js file */
  js?: string;
  /**
   * js này hướng đến section template nhưng chỉ cho phép hoạt động tại builder
   * có thể sử dụng các hàm như hiddenFieldAction, redirectTo
   */
  jsHook?: string;
  /** schema giúp tạo ra các trường setting cho component */
  schema: Schema;
  /** Các trường settings của component */
  settings: SectionSettings;
}

export interface PreviewImage {
  src: string;
  width: number;
  height: number;
}

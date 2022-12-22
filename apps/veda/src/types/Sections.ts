import { ComponentData, PageType, Plan, PreviewImage } from './Page';

export type PageSectionType = 'default' | 'built-in-add-ons' | 'embedded-add-ons' | 'third-party-add-ons' | 'megamenu' | 'header' | 'footer';

export type SectionStatus = 'pending' | 'draft';

export type SectionId = string;

export interface SectionChangelog {
  commandId: string;
  /** Đây là section/addon command id */
  versionId: string;
  version: string;
  content: string;
  createdDateTimestamp?: number;
  modifiedDateTimestamp?: number;
}

export interface SectionCategoryTag {
  commandId: string;
  name: string;
  description: string;
  createDateGMT?: number;
  modifiedDateGMT?: number;
}

export interface SectionEnvatoCategory {
  commandId: string;
  envatoItemId: string;
  name: string;
  description: string;
}

/** Cấu trúc của section */
export type PageSection = DevSection | AdminSection | ProductSection | SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client;

export interface DevSection {
  /** id trong database */
  commandId: string;
  /** Section id của FE sinh ra */
  id: SectionId;
  /** Tên section */
  label: string;
  /** Section category */
  category?: SectionCategoryTag;
  /** Trạng thái bật tắt */
  enable: boolean;
  /** Dữ liệu để render ra 1 component */
  data: ComponentData;
  /** Hình ảnh của section */
  image?: PreviewImage;
  /** Xác nhận section này là add-ons hay megamenu hay là header, footer */
  type?: PageSectionType;
  /** Những addons được sử dụng trong section này */
  addonIds?: string[];
  /** Changelog của section */
  changelog: string;
  /** user id của người tạo ra section được trả về khi get từ role dev */
  userId: number;
  /**
   * Status của section
   *  +> status = pending nghĩa là section của dev đang được admin xét duyệt
   *  +> status = draft nghĩa là section này vừa mới được tạo bởi dev hoặc đã bị reject bởi admin
   *  +> status sẽ không tồn tại sau khi được publish
   */
  status: SectionStatus;
  modifiedDateTimestamp?: number;
  createdDateTimestamp?: number;
  megaMenuCommandIds: string[];
  comment?: string;
}

export interface AdminSection {
  /** id trong database */
  commandId: string;
  /** Section id của FE sinh ra */
  id: string;
  /** Tên section */
  label: string;
  /** Section category */
  category?: SectionCategoryTag;
  /** Trạng thái bật tắt */
  enable: boolean;
  /** Dữ liệu để render ra 1 component */
  data: ComponentData;
  /** Hình ảnh của section */
  image?: PreviewImage;
  /** Xác nhận section này là add-ons hay megamenu hay là header, footer */
  type?: PageSectionType;
  /** Những addons được sử dụng trong section này */
  addonIds?: string[];
  /** id của người tạo ra section */
  createdBy?: number;
  /** id của admin approve section */
  approvedBy?: number;
  syncedToServices: string[] | null;
  currentVersion: string;
  modifiedDateTimestamp?: number;
  createdDateTimestamp?: number;
  megaMenuCommandIds?: string[];
  comment?: string;
  userId?: number;
  syncedToProduct?: boolean;
}

export interface SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client extends Omit<AdminSection, 'commandId' | 'category'> {
  /** ID ánh xạ đến Section Atom */
  parentCommandId?: string;
  /** ID của record -> Nếu là tạo mới thì sẽ không có "commandId" */
  commandId?: string;
  /** Dev sử dụng section trong page atom và theme atom sẽ không có category */
  category: undefined;
}

export interface ProductSection extends AdminSection {
  /** id trong database */
  commandId: string;
  /**
   * id của section gốc trong Publish database
   * parentCommandId được trả về khi user chọn section trong modal template
   * */
  parentCommandId: string;
  downloadedCount: number;
  plan: Plan;
  /** Key để xác định section này thuộc page type nào */
  pageTypes: PageType[];
  tags: SectionCategoryTag[] | null;
  currentVersion: string;
  envatoCategories?: SectionEnvatoCategory[];
}

// Biến đổi data của server trả về thành type của fe
export interface SectionCategoryForFrontend {
  commandId: string;
  title: string;
  slug: string;
  // Số lượng section trong category này
  quantity: string;
}

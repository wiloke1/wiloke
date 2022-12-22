import { Page, PageId, Plan } from 'types/Page';
import { Theme, ThemeSettings, ThemeVendors } from './Result';
import { SectionCategoryTag } from './Sections';

export type BuilderType = 'theme' | 'page';

/** Dữ liệu các pages trong theme */
export type ThemeServicePageData = Record<PageId, Page>;

/** Data theme của server trả về ở ngoài dashboard */
export interface ThemeServiceData {
  /** Id */
  commandId: string;
  /** atom id */
  parentCommandId: string;
  /** Tên của theme */
  name: string;
  /** Mô tả của theme */
  description?: string;
  /** Dữ liệu các pages trong theme */
  pages: ThemeServicePageData;
  /** id của các page server trả về để request lấy page data */
  pageIds: string[];
  /** Các pages trong theme */
  createdAt?: string;
  /** Hình ảnh hiển thị mô tả theme */
  featuredImage: string | undefined;
  activate?: boolean;
  sample?: boolean;
}

export interface ThemeGeneral {
  /** Id */
  commandId: string;
  /** Tên của theme */
  label: string;
  /** CommandId của các page thuộc theme */
  pageCommandIds: string[];
  /** Theme settings được lưu trên DB */
  themeSettings: ThemeSettings;
  /** Vendors settings được lưu trên DB */
  vendors: ThemeVendors;
  /** JS settings được lưu trên DB */
  globalJs: Theme['globalJs'];
  /** Scss settings được lưu trên DB */
  globalScss: Theme['globalScss'];
  /** CommandId của các addon được sử dụng trong theme */
  addonCommandIds: string[];
  /** CommandId của các section header được sử dụng trong theme */
  headerSectionCommandIds: string[];
  /** CommandId của các section footer được sử dụng trong theme */
  footerSectionCommandIds: string[];
  /** Ảnh mô tả theme */
  featuredImage?: string;
  /** Người tạo theme */
  userId: number;
  createdDateTimestamp: number;
  modifiedDateTimestamp: number;
}

export interface DevTheme extends ThemeGeneral {
  /** CommandId của theme atom được fork */
  parentCommandId?: string;
  status?: 'pending' | 'draft';
}

export interface AdminTheme extends ThemeGeneral {
  /** Người approve theme */
  approvedBy: number;
}
export interface ClientTheme extends ThemeGeneral {}

export interface ProductTheme extends Pick<ThemeGeneral, 'commandId' | 'label' | 'featuredImage'> {
  commandId: string;
  plan?: Plan;
  tags?: SectionCategoryTag[];
  category?: SectionCategoryTag;
  downloadedCount?: number;
  parentCommandId: string;
}

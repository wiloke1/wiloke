import { Plan, PreviewImage } from './Page';
import { AdminSection, DevSection, ProductSection, SectionCategoryTag, SectionStatus } from './Sections';

interface GeneralSettingsAddon {
  /** fe id */
  id: string;
  /** be id */
  commandId: string;
  /** Kiểu add-ons */
  type: AddonType;
  /** Hình ảnh mô tả add-ons */
  image?: PreviewImage;
  /** Logo của add-ons */
  logo: string;
  /** Tiêu đề hiển thị add-ons */
  label: string;
  /** Mô tả ngắn về add-ons */
  tagLine: string;
  /** Mô tả chi tiết của addons */
  detail?: string;
  /** Id ứng với section trong page với trường addons bật */
  sectionId: string;
  /** Nếu true thì addons này sẽ cho user đặt ở các vị trí khác nhau */
  positionEnabled: boolean;
  /** có thể thêm addon hiện tại nhiều lần trên 1 page */
  canAddMulti?: boolean;
  /** tên tác giả của addons */
  authorName?: string;
  /** Section category */
  category: SectionCategoryTag;
  /**
   *  trường để xác định addons vừa được tạo ra hoặc vừa được edit
   *  mục đích: khi bấm save sẽ chỉ gửi addons có isNew = true
   * */
  isNew?: boolean;
  /** date */
  modifiedDateTimestamp?: number;
  createdDateTimestamp?: number;
  enable: boolean;
}

export type ThemeAddon = DevAddon | AdminAddon | ProductAddon | AddonOfTheme_Atom_N_Client;

export interface DevAddon extends GeneralSettingsAddon {
  /** Id bắn lên cho backend */
  parentCommandId?: string;
  /** status của item do backend trả về */
  status: SectionStatus;
  /** Id của user tạo addons này */
  userId: number;
  /** section */
  body: DevSection;
  /** changelog của dev */
  changelog: string;
}

export interface AdminAddon extends GeneralSettingsAddon {
  /** section */
  body: AdminSection;
  syncedToServices: string[] | null;
  createdBy?: number;
  approvedBy?: number;
  currentVersion: string;
}

export interface AddonOfTheme_Atom_N_Client extends Omit<AdminAddon, 'category'> {
  /** ID ánh xạ đến Section Atom */
  parentCommandId?: string;
  /** Dev sử dụng section trong page atom và theme atom sẽ không có category */
  category: undefined;
}

export interface ProductAddon extends GeneralSettingsAddon {
  /** section */
  body: ProductSection;
  /** Id bắn lên cho backend */
  parentCommandId?: string;
  /** trạng thái của addons đã được install hay chưa */
  saved?: boolean;
  plan: Plan;
  syncedToServices: string[] | null;
  downloadedCount: number;
  currentVersion: string;
}

/** Lấy ra các type của add-on */
export type AddonType = 'built-in' | 'third-party';

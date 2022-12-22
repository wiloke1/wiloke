export const Consts = {
  AppName: 'veda',
  Prefix: 'veda-',
  FakeTags: {
    Shopify: 'shopify',
    Compiler: 'compiler',
    EditCode: 'edit-code',
    AddElement: 'add-element',
    Addons: 'addons',
    // NOTE: @tuong -> Chức năng "Addon Placholder" cần sự kết hợp của nhiều file -> Cần xem xét việc update tất cả các file khi có sự thay đổi nào đó ở 1 file bất kì
    // ["LiquidComponent.tsx", "AddonPosition.tsx", "useAddonsPosition.ts", "reducerPages.ts", "generateHelpers.ts/deleteAddonPlaceholder"]
    AddonsPlaceholder: {
      // Code html để xuất hiện addon placeholder
      tagName: 'addons-placeholder',
      // Attribute để chứa sectionId (Lý do tại sao -> Đọc file "useAddonsPosition.ts", "AddonsPosition.tsx", "LiquidComponent.tsx")
      id_attributeName: 'data-section-id',
      // Attribute để check Element được click là add placeholder (Lý do tại sao -> Đọc file "useAddonsPosition.ts", "AddonsPosition.tsx", "LiquidComponent.tsx")
      isPlaceholder_attributeName: 'data-tag',
      // Attribute để check Element được click là add placeholder (Lý do tại sao -> Đọc file "useAddonsPosition.ts", "AddonsPosition.tsx", "LiquidComponent.tsx")
      isPlaceholder_attributeValue: 'OK',
    },
    AddonsContext: {
      tagName: 'addons-context',
    },
    SignalRefreshJs: {
      // Thẻ html để làm dấu
      tagName: 'button',
      // Attribute để chứa sectionId nhằm phục vụ postMessage
      id_attributeName: 'data-section-id',
      // Attribute để dùng cho việc sử dụng querySelector cũng như check đó chính là "SignalRefreshJs"
      signal_attributeName: 'data-cheat-id',
      // Attribute để dùng cho việc sử dụng querySelector cũng như check đó chính là "SignalRefreshJs"
      signal_attributeValue: (id: string) => `SignalRefreshJs-${id}`,
      // Attribute để dùng cho việc lắng nghe MutationObserver
      signal_needUpdate: 'data-updated-at',
      // Css để ẩn "SignalRefreshJs" đi
      hidden_css: 'display: none',
    },
    Megamenu: 'megamenu',
    ReviewBadge: 'review-badge',
    ShopifyReviewBadge: 'shopify-review-badge',
    RivioReviewBadge: 'rivio-review-badge',
    LooxReviewBadge: 'loox-review-badge',
    AliReviewBadge: 'ali-review-badge',
    StampedReviewBadge: 'stamped-review-badge',
    JudgeMeReviewBadge: 'judge-me-review-badge',
  },
  BlankCommandId: 'blank',
  JsHookComment: '// js_hook_comment',
} as const;

export const TIME_RERENDER = 10;

export const LIMIT_LIQUID_FILE_SIZE = {
  value: 256000,
  humanity: '256 KB',
};

export const TRANSLATION_KEY = 'veda'; // do BE đặt tên

export const MEGA_MENU_PARAMS_NAME = 'mega-menu';

export type GetSectionsAddonsVariant =
  | 'Lấy section/addon của product'
  | 'Lấy section/addon của admin'
  | 'Lấy section/addon của dev'
  | 'Admin lấy section/addon của dev';

export type DeleteAtomVariant =
  | 'Delete section/addon/page của dev'
  | 'Delete section/addon/page của admin'
  | 'Delete section/addon/page của product'
  | 'Admin delete section/addon/page của dev';

export class RoleException extends Error {
  constructor() {
    super();
    this.name = 'RoleException';
    this.message = 'RoleException';
  }
}

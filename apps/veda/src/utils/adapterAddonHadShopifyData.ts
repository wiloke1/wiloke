import { ThemeAddon } from 'types/Addons';
import { SchemaSettingField, SettingArticlePicker, SettingBlogPicker, SettingCollectionPicker, SettingSingleProductPicker } from 'types/Schema';

interface HandleShopifyPickerInSettings extends Omit<AdapterAddonHadShopifyData, 'addon'> {
  setting: SchemaSettingField;
}

const handleShopifyPickerInSettingField = ({ setting, article, blog, collection, product }: HandleShopifyPickerInSettings): SchemaSettingField => {
  if (setting.type === 'articlePicker') {
    return {
      ...setting,
      children: article === 'Không tồn tại' ? undefined : article,
    } as SettingArticlePicker;
  }
  if (setting.type === 'blogPicker') {
    return {
      ...setting,
      children: blog === 'Không tồn tại' ? undefined : blog,
    } as SettingBlogPicker;
  }
  if (setting.type === 'collectionPicker') {
    return {
      ...setting,
      children: collection === 'Không tồn tại' ? undefined : collection,
    } as SettingCollectionPicker;
  }
  if (setting.type === 'productPicker') {
    return {
      ...setting,
      children: product === 'Không tồn tại' ? undefined : product,
    } as SettingSingleProductPicker;
  }
  return setting;
};

interface AdapterAddonHadShopifyData {
  addon: ThemeAddon;
  article: AppState['defaultPickerFieldRelateShopify']['data']['article'];
  blog: AppState['defaultPickerFieldRelateShopify']['data']['blog'];
  collection: AppState['defaultPickerFieldRelateShopify']['data']['collection'];
  product: AppState['defaultPickerFieldRelateShopify']['data']['product'];
}

/**
 * NOTE: Logic như sau
 * Settings và Schema liên quan đến dữ liệu shopify + dữ liệu của shop này không thể tồn tại ở shop khác nên cần transform lại
 * => Hiện tại đang transform khi:
 *    1. Import addon bằng file
 *    2. Import page bằng file
 *    3. Thêm Addons = chức năng "Thêm thành phần" tại trang builder
 *    4. Thêm addons = chức năng "Thêm thành phần" tại trang builder
 *    5. Sử dụng page templates ở "/page/templates" (bằng cách check userId - chi tiết xem tại watchResult.ts)
 *    6. TODO: Sử dụng page templates ở "/theme/templates" -> Header, footer của theme
 */
export const adapterAddonHadShopifyData = ({ addon, article, blog, collection, product }: AdapterAddonHadShopifyData): ThemeAddon => {
  return {
    ...addon,
    body: {
      ...addon.body,
      data: {
        ...addon.body.data,
        settings: addon.body.data.settings.map(setting => {
          if (setting.type === 'object') {
            return {
              ...setting,
              children: setting.children.map(object => handleShopifyPickerInSettingField({ setting: object, article, blog, collection, product })),
            };
          }
          if (setting.type === 'array') {
            return {
              ...setting,
              children: setting.children.map(arrItem => {
                return {
                  ...arrItem,
                  children: arrItem.children.map(object =>
                    handleShopifyPickerInSettingField({ setting: object, article, blog, collection, product }),
                  ),
                };
              }),
            };
          }
          return setting;
        }),
        schema: {
          settings: addon.body.data.schema.settings.map(setting => {
            return handleShopifyPickerInSettingField({ setting, article, blog, collection, product }) as SchemaSettingField;
          }),
          blocks: addon.body.data.schema.blocks.map(block => {
            return {
              ...block,
              children: block.children.map(childSetting => {
                return handleShopifyPickerInSettingField({ setting: childSetting, article, blog, collection, product }) as SchemaSettingField;
              }),
            };
          }),
        },
      },
    },
  } as ThemeAddon;
};

interface AdapterAddonsHadShopifyData extends Omit<AdapterAddonHadShopifyData, 'addon'> {
  addons: ThemeAddon[];
}

/**
 * NOTE: Logic như sau
 * Settings và Schema liên quan đến dữ liệu shopify + dữ liệu của shop này không thể tồn tại ở shop khác nên cần transform lại
 * => Hiện tại đang transform khi:
 *    1. Import addon bằng file
 *    2. Import page bằng file
 *    3. Thêm Addons = chức năng "Thêm thành phần" tại trang builder
 *    4. Thêm addons = chức năng "Thêm thành phần" tại trang builder
 *    5. Sử dụng page templates ở "/page/templates" (bằng cách check userId - chi tiết xem tại watchResult.ts)
 *    6. TODO: Sử dụng page templates ở "/theme/templates" -> Header, footer của theme
 */
export const adapterAddonsHadShopifyData = ({ addons, article, blog, collection, product }: AdapterAddonsHadShopifyData): ThemeAddon[] => {
  return addons.map(addon => {
    return { ...addon, ...adapterAddonHadShopifyData({ addon, article, blog, collection, product }) };
  });
};

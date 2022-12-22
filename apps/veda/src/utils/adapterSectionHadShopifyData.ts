import { SchemaSettingField, SettingArticlePicker, SettingBlogPicker, SettingCollectionPicker, SettingSingleProductPicker } from 'types/Schema';
import { PageSection } from 'types/Sections';

interface HandleShopifyPickerInSettings extends Omit<AdapterSectionHadShopifyData, 'section' | 'isImportAction'> {
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

interface AdapterSectionHadShopifyData {
  section: PageSection;
  article: AppState['defaultPickerFieldRelateShopify']['data']['article'];
  blog: AppState['defaultPickerFieldRelateShopify']['data']['blog'];
  collection: AppState['defaultPickerFieldRelateShopify']['data']['collection'];
  product: AppState['defaultPickerFieldRelateShopify']['data']['product'];
  isImportAction: boolean;
}

/**
 * NOTE: Logic như sau
 * Settings và Schema liên quan đến dữ liệu shopify + dữ liệu của shop này không thể tồn tại ở shop khác nên cần transform lại
 * => Hiện tại đang transform khi:
 *    1. Import section bằng file
 *    2. Import page bằng file
 *    3. Thêm Addons = chức năng "Thêm thành phần" tại trang builder
 *    4. Thêm sections = chức năng "Thêm thành phần" tại trang builder
 *    5. Sử dụng page templates ở "/page/templates" (bằng cách check userId - chi tiết xem tại watchResult.ts)
 *    6. TODO: Sử dụng page templates ở "/theme/templates" -> Header, footer của theme
 */
export const adapterSectionHadShopifyData = ({
  section,
  article,
  blog,
  collection,
  product,
  isImportAction,
}: AdapterSectionHadShopifyData): PageSection => {
  return {
    ...section,
    commandId: isImportAction ? '' : section.commandId ?? '',
    data: {
      ...section.data,
      settings: section.data.settings.map(setting => {
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
                children: arrItem.children.map(object => handleShopifyPickerInSettingField({ setting: object, article, blog, collection, product })),
              };
            }),
          };
        }
        return handleShopifyPickerInSettingField({ setting, article, blog, collection, product });
      }),
      schema: {
        settings: section.data.schema.settings.map(setting => {
          return handleShopifyPickerInSettingField({ setting, article, blog, collection, product }) as SchemaSettingField;
        }),
        blocks: section.data.schema.blocks.map(block => {
          return {
            ...block,
            children: block.children.map(childSetting => {
              return handleShopifyPickerInSettingField({ setting: childSetting, article, blog, collection, product }) as SchemaSettingField;
            }),
          };
        }),
      },
    },
  };
};

interface AdapterSectionsHadShopifyData extends Omit<AdapterSectionHadShopifyData, 'section'> {
  sections: PageSection[];
}

/**
 * NOTE: Logic như sau
 * Settings và Schema liên quan đến dữ liệu shopify + dữ liệu của shop này không thể tồn tại ở shop khác nên cần transform lại
 * => Hiện tại đang transform khi:
 *    1. Import section bằng file
 *    2. Import page bằng file
 *    3. Thêm Addons = chức năng "Thêm thành phần" tại trang builder
 *    4. Thêm sections = chức năng "Thêm thành phần" tại trang builder
 *    5. Sử dụng page templates ở "/page/templates" (bằng cách check userId - chi tiết xem tại watchResult.ts)
 *    6. TODO: Sử dụng page templates ở "/theme/templates" -> Header, footer của theme
 */
export const adapterSectionsHadShopifyData = ({
  sections,
  article,
  blog,
  collection,
  product,
  isImportAction,
}: AdapterSectionsHadShopifyData): PageSection[] => {
  return sections.map(section => {
    return { ...section, ...adapterSectionHadShopifyData({ section, article, blog, collection, product, isImportAction }) };
  });
};

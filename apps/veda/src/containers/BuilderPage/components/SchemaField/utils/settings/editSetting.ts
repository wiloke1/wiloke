import { isUndefined } from 'lodash';
import { equals } from 'ramda';
import { Page } from 'types/Page';
import { SchemaSettingField, SectionSetting, SettingFlexOrder } from 'types/Schema';
import { EditSetting } from '../../SchemaSettings/reducer';

interface ReducerEditSetting {
  section: Page['sections'][number];
  data: EditSetting;
}

/** Yêu cầu:
  * Trường hợp: "defaultValue" các field con được update
    - Trường hợp .1: Nếu "defaultValue" của field đó - tại "settings" trong "schema" - = value hiện tại ở "settings" ngoài builder -> cần update cả 2
    - Trường hợp .2: Nếu "defaultValue" của field đó - tại "settings" trong "schema" - != value hiện tại ở "settings" ngoài builder -> chỉ update "schema", giữ nguyên "settings"

  * Các thuộc tính còn lại theo logic thông thường (tức update cả "schema" cả "settings")
 */
export const reducerEditSetting = ({ section, data }: ReducerEditSetting) => {
  const { settingId, newData } = data.payload;
  // Update "settings"
  section.data.settings = section.data.settings.map(setting => {
    if (setting.id === settingId) {
      // Nếu là thêm hoặc xoá options trong "flexOrder" thì sẽ force update "settings" theo "schema"
      const newDataOfFlexOrder = newData as Partial<SettingFlexOrder>;
      if (
        setting.type === 'flexOrder' &&
        newDataOfFlexOrder.type === undefined &&
        !equals(
          setting.options.map(option => ({ id: option.id, name: option.name })),
          newDataOfFlexOrder.options?.map(option => ({ id: option.id, name: option.name })),
        )
      ) {
        return {
          ...setting,
          ...newData,
          children: newData.children,
        } as SectionSetting;
      } else {
        const defaultChildren = section.data.schema.settings.find(item => item.id === settingId);
        return {
          ...setting,
          ...newData,
          children:
            // Nếu update type thì force update giá trị
            (!isUndefined(newData.type) && newData.type !== setting.type) ||
            // Nếu update giá trị và trước đó giá trị trong schema = giá trị trong settings thì update giá trị mới vào settings
            (!isUndefined(newData.children) && equals(defaultChildren?.children, setting.children as any))
              ? newData.children
              : setting.children,
        } as SectionSetting;
      }
    }

    return setting;
  });

  // Update "schema"
  section.data.schema.settings = section.data.schema.settings.map(setting => {
    if (setting.id === settingId) {
      return { ...setting, ...newData } as SchemaSettingField;
    }
    return setting;
  });
};

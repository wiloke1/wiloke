import { isUndefined } from 'lodash';
import { equals } from 'ramda';
import { Page } from 'types/Page';
import { SchemaSettingField, SettingArray, SettingBlockObject, SettingFlexOrder } from 'types/Schema';
import { EditBlockChild } from '../../SchemaBlocks/reducer';

interface ReducerEditBlockChild {
  section: Page['sections'][number];
  data: EditBlockChild;
}

/** Yêu cầu:
  * Trường hợp: "defaultValue" các field con của "blocks" trong "schema" được update
    - Trường hợp .1: Nếu "defaultValue" của field con - của "blocks" tại "schema" - đó  = value hiện tại ở "settings" ngoài builder -> cần update cả 2
    - Trường hợp .2: Nếu "defaultValue" của field con - của "blocks" tại "schema" - đó != value hiện tại ở "settings" ngoài builder -> chỉ update "schema", giữ nguyên "settings"

  * Các thuộc tính còn lại theo logic thông thường (tức update cả "schema" cả "settings")
 */
export const reducerEditBlockChild = ({ section, data }: ReducerEditBlockChild) => {
  const { blockChildId, blockId, newData } = data.payload;
  const blockChangedIndex = section.data.schema.blocks.findIndex(block => block.id === blockId);
  const blockChanged = section.data.schema.blocks[blockChangedIndex];
  if (blockChanged) {
    const defaultChildren = blockChanged.children.find(item => item.id === blockChildId);
    // Update "settings"
    section.data.settings.forEach(setting => {
      if (setting.id === blockId) {
        const _setting = setting as SettingArray | SettingBlockObject;
        if (_setting.type === 'array') {
          _setting.children.forEach(arrayItem => {
            arrayItem.children = arrayItem.children.map(fieldOfArrayItem => {
              if (fieldOfArrayItem.id === blockChildId) {
                // Nếu là thêm hoặc xoá options trong "flexOrder" thì sẽ force update "settings" theo "schema"
                const newDataOfFlexOrder = newData as Partial<SettingFlexOrder>;
                if (
                  fieldOfArrayItem.type === 'flexOrder' &&
                  newDataOfFlexOrder.type === undefined &&
                  !equals(
                    fieldOfArrayItem.options.map(option => ({ id: option.id, name: option.name })),
                    newDataOfFlexOrder.options?.map(option => ({ id: option.id, name: option.name })),
                  )
                ) {
                  return {
                    ...fieldOfArrayItem,
                    ...newData,
                    children: newData.children,
                  } as SchemaSettingField;
                } else {
                  return {
                    ...fieldOfArrayItem,
                    ...newData,
                    children:
                      // Nếu update type thì force update giá trị
                      (!isUndefined(newData.type) && newData.type !== fieldOfArrayItem.type) ||
                      // Nếu update giá trị và trước đó giá trị trong schema = giá trị trong settings thì update giá trị mới vào settings
                      (!isUndefined(newData.children) && equals(defaultChildren?.children, fieldOfArrayItem.children as any))
                        ? newData.children
                        : fieldOfArrayItem.children,
                  } as SchemaSettingField;
                }
              }
              return fieldOfArrayItem;
            });
          });
        }
        if (_setting.type === 'object') {
          _setting.children = _setting.children.map(field => {
            if (field.id === blockChildId) {
              // Nếu là thêm hoặc xoá options trong "flexOrder" thì sẽ force update "settings" theo "schema"
              const newDataOfFlexOrder = newData as Partial<SettingFlexOrder>;
              if (
                field.type === 'flexOrder' &&
                newDataOfFlexOrder.type === undefined &&
                !equals(
                  field.options.map(option => ({ id: option.id, name: option.name })),
                  newDataOfFlexOrder.options?.map(option => ({ id: option.id, name: option.name })),
                )
              ) {
                return {
                  ...field,
                  ...newData,
                  children: newData.children,
                } as SchemaSettingField;
              } else {
                return {
                  ...field,
                  ...newData,
                  children:
                    // Nếu update type thì force update giá trị
                    (!isUndefined(newData.type) && newData.type !== field.type) ||
                    // Nếu update giá trị và trước đó giá trị trong schema = giá trị trong settings thì update giá trị mới vào settings
                    (!isUndefined(newData.children) && equals(defaultChildren?.children, field.children as any))
                      ? newData.children
                      : field.children,
                } as SchemaSettingField;
              }
            }
            return field;
          });
        }
      }
    });

    // Update "schema"
    blockChanged.children = blockChanged.children.map(blockChild => {
      if (blockChild.id === blockChildId) {
        return {
          ...blockChild,
          ...newData,
        } as SchemaSettingField;
      }
      return blockChild;
    });
  }
};

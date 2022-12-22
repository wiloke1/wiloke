import { equals } from 'ramda';
import { Page } from 'types/Page';
import { SectionSetting } from 'types/Schema';
import { v4 } from 'uuid';
import { EditBlock } from '../../SchemaBlocks/reducer';

interface ReducerEditBlock {
  section: Page['sections'][number];
  data: EditBlock;
}

/** Yêu cầu:
  * Trường hợp: "children" của "blocks" tại "schema" được update
    - Trường hợp .1: Nếu "children" của "blocks" tại "schema" đó tại "schema" = value hiện tại ở "settings" ngoài builder -> cần update cả 2
    - Trường hợp .2: Nếu "children" của "blocks" tại "schema" đó tại "schema" chỉ cần có 1 field có "children" != value hiện tại ở "settings" ngoài builder -> chỉ update "schema", giữ nguyên "settings"

  * Các thuộc tính còn lại theo logic thông thường (tức update cả "schema" cả "settings")
 */
export const reducerEditBlock = ({ section, data }: ReducerEditBlock) => {
  const { blockId, newData } = data.payload;
  // Update "settings"
  section.data.settings = section.data.settings.map(setting => {
    if (setting.id === blockId) {
      const defaultDataOfSetting = section.data.schema.blocks.find(item => item.id === blockId);
      // Từ object sang array
      if (setting.type === 'object' && newData.type === 'array') {
        const _children = !equals(defaultDataOfSetting?.children, setting.children)
          ? setting.children
          : defaultDataOfSetting?.children ?? setting.children;
        return {
          ...setting,
          ...newData,
          type: 'array',
          children: [{ id: v4(), children: _children }],
        } as SectionSetting;
      }
      // Từ array sang object
      if (setting.type === 'array' && newData.type === 'object') {
        return {
          ...setting,
          ...newData,
          type: 'object',
          children: setting.children[0]?.children ?? defaultDataOfSetting?.children,
        } as SectionSetting;
      }

      // Update thông tin chung
      return {
        ...setting,
        ...newData,
      } as SectionSetting;
    }
    return setting;
  });

  // Update "schema"
  section.data.schema.blocks = section.data.schema.blocks.map(block => {
    if (block.id === blockId) {
      return {
        ...block,
        ...newData,
      };
    }
    return block;
  });
};

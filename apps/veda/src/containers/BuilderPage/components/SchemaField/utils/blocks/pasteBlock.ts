import { Page } from 'types/Page';
import { v4 } from 'uuid';
import { PasteBlock } from '../../SchemaBlocks/reducer';

interface ReducerPasteBlock {
  section: Page['sections'][number];
  data: PasteBlock;
}

/** Yêu cầu:
  * Trường hợp: "children" của "blocks" tại "schema" được update
    - Trường hợp .1: Nếu "children" của "blocks" tại "schema" đó tại "schema" = value hiện tại ở "settings" ngoài builder -> cần update cả 2
    - Trường hợp .2: Nếu "children" của "blocks" tại "schema" đó tại "schema" chỉ cần có 1 field có "children" != value hiện tại ở "settings" ngoài builder -> chỉ update "schema", giữ nguyên "settings"

  * Các thuộc tính còn lại theo logic thông thường (tức update cả "schema" cả "settings")
 */
export const reducerPasteBlock = ({ section, data }: ReducerPasteBlock) => {
  const { blockId, newData } = data.payload;
  // Update "settings"
  section.data.settings = section.data.settings.map(setting => {
    if (setting.id === blockId) {
      // Paste block array vào block object
      if (setting.type === 'object' && newData.type === 'array') {
        return {
          ...setting,
          ...newData,
          type: newData.type,
          children: [{ id: v4(), children: newData.children }],
        };
      }

      // paste block object vào block array
      if (setting.type === 'array' && newData.type === 'object') {
        return {
          ...setting,
          ...newData,
          type: newData.type,
          children: newData.children,
        };
      }

      // paste block object vào block object
      if (setting.type === 'object' && newData.type === 'object') {
        return {
          ...setting,
          ...newData,
          type: newData.type,
          children: newData.children,
        };
      }

      // paste block array vào block array
      if (setting.type === 'array' && newData.type === 'array') {
        return {
          ...setting,
          ...newData,
          type: newData.type,
          children: [{ id: v4(), children: newData.children }],
        };
      }

      return setting;
    }
    return setting;
  });

  // Update "schema"
  section.data.schema.blocks = section.data.schema.blocks.map(block => {
    if (block.id === blockId) {
      return {
        ...block,
        ...newData,
        max: block.type === 'array' ? block.max : undefined,
      };
    }
    return block;
  });
};

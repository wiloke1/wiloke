import { insert } from 'ramda';
import { Page } from 'types/Page';
import { SettingArray, SettingBlockObject } from 'types/Schema';
import { InsertBlockChild } from '../../SchemaBlocks/reducer';

interface ReducerInsertBlockChild {
  section: Page['sections'][number];
  data: InsertBlockChild;
}
/** Đẩy là chức năng duplicate */
/** Yêu cầu: Chèn vào ngay sau field nguồn được sử dụng để duplicate ở cả "schema" và "settings" */
export const reducerInsertBlockChild = ({ section, data }: ReducerInsertBlockChild) => {
  const { blockId, index, newBlockChild } = data.payload;
  const blockChangedIndex = section.data.schema.blocks.findIndex(block => block.id === blockId);
  const blockChanged = section.data.schema.blocks[blockChangedIndex];

  // Update "settings"
  section.data.settings.forEach(setting => {
    if (setting.id === blockId) {
      const _setting = setting as SettingArray | SettingBlockObject;
      if (_setting.type === 'array') {
        _setting.children.forEach(item => {
          item.children = insert(index, newBlockChild, item.children);
        });
      }
      if (_setting.type === 'object') {
        _setting.children = insert(index, newBlockChild, _setting.children);
      }
    }
  });

  // Update "schema"
  blockChanged.children = insert(index, newBlockChild, blockChanged.children);
};

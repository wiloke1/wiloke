import { Page } from 'types/Page';
import { SettingArray, SettingBlockObject } from 'types/Schema';
import { AddBlockChild } from '../../SchemaBlocks/reducer';

interface ReducerAddBlockChild {
  section: Page['sections'][number];
  data: AddBlockChild;
}

/** Yêu cầu: khi thêm field con vào "block" của "schema" thì cần đồng thời sinh ra field đó ở "settings" để sinh ra ngoài builder  */
export const reducerAddBlockChild = ({ section, data }: ReducerAddBlockChild) => {
  const { newBlockChild, blockId } = data.payload;
  // Update "settings"
  section.data.settings.forEach(setting => {
    if (setting.id === blockId) {
      const _setting = setting as SettingArray | SettingBlockObject;
      if (_setting.type === 'array') {
        _setting.children.forEach(item => {
          item.children.push(newBlockChild);
        });
      }
      if (_setting.type === 'object') {
        _setting.children.push(newBlockChild);
      }
    }
  });

  // Update "schema"
  section.data.schema.blocks.forEach(block => {
    if (block.id === blockId) {
      block.children.push(newBlockChild);
    }
  });
};

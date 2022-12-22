import { Page } from 'types/Page';
import { SettingArray, SettingBlockObject } from 'types/Schema';
import { DeleteBlockChild } from '../../SchemaBlocks/reducer';

interface ReducerDeleteBlockChild {
  section: Page['sections'][number];
  data: DeleteBlockChild;
}

/** Yêu cầu: khi xoá field con ở "block" của "schema" thì cần đồng thời xoá đi field đó ở "settings" để xoá field đó ngoài builder  */
export const reducerDeleteBlockChild = ({ section, data }: ReducerDeleteBlockChild) => {
  const { blockId, blockChildId } = data.payload;
  // Update "schema"
  section.data.schema.blocks.forEach(block => {
    if (block.id === blockId) {
      block.children = block.children.filter(blockChild => blockChild.id !== blockChildId);
    }
  });

  // Update "settings"
  section.data.settings.forEach(setting => {
    if (setting.id === blockId) {
      const _setting = setting as SettingArray | SettingBlockObject;
      if (_setting.type === 'array') {
        _setting.children.forEach(item => {
          item.children = item.children.filter(item => item.id !== blockChildId);
        });
      }
      if (_setting.type === 'object') {
        _setting.children = _setting.children.filter(item => item.id !== blockChildId);
      }
    }
  });
};

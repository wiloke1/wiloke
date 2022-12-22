import { Page } from 'types/Page';
import { SettingArray, SettingBlockObject } from 'types/Schema';
import reorder from 'utils/functions/reorder';
import { SortBlockChild } from '../../SchemaBlocks/reducer';

interface ReducerSortBlockChild {
  section: Page['sections'][number];
  data: SortBlockChild;
}

/** Yêu cầu: Thứ tự các field được sắp xếp ở cả "schema" và "settings" để đồng bộ thứ tự field */
export const reducerSortBlockChild = ({ section, data }: ReducerSortBlockChild) => {
  const { blockId, sourceIndex, destinationIndex } = data.payload;
  // Update "settings"
  section.data.settings.forEach(setting => {
    if (setting.id === blockId) {
      const _setting = setting as SettingArray | SettingBlockObject;
      if (_setting.type === 'array') {
        _setting.children.forEach(item => {
          item.children = reorder(item.children, sourceIndex, destinationIndex);
        });
      }
      if (_setting.type === 'object') {
        _setting.children = reorder(_setting.children, sourceIndex, destinationIndex);
      }
    }
  });

  // Update "schema"
  section.data.schema.blocks.forEach(block => {
    if (block.id === blockId) {
      block.children = reorder(block.children, sourceIndex, destinationIndex);
    }
  });
};

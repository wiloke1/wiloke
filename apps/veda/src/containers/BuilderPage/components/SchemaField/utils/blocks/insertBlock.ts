import { insert } from 'ramda';
import { Page } from 'types/Page';
import { SectionSetting } from 'types/Schema';
import { v4 } from 'uuid';
import { InsertBlock } from '../../SchemaBlocks/reducer';

interface ReducerInsertBlock {
  section: Page['sections'][number];
  data: InsertBlock;
}

/** Đây là chức năng duplicate */
/** Yêu cầu: Chèn vào ngay sau field "block" nguồn được sử dụng để duplicate ở cả "schema" và "settings" */
export const reducerInsertBlock = ({ section, data }: ReducerInsertBlock) => {
  const { blockId, index, newBlock } = data.payload;
  const indexOfSourceItemInSettings = Math.max(section.data.settings.findIndex(setting => setting.id === blockId) + 1, 1);
  let newItemBlockInSettings: SectionSetting | undefined;
  if (newBlock.type === 'array') {
    newItemBlockInSettings = {
      ...newBlock,
      type: 'array',
      children: [{ id: `id_${v4()}`, children: newBlock.children }],
    };
  }
  if (newBlock.type === 'object') {
    newItemBlockInSettings = {
      ...newBlock,
      type: 'object',
      children: newBlock.children,
    };
  }
  if (newItemBlockInSettings) {
    // Update "settings"
    section.data.settings = insert(indexOfSourceItemInSettings, newItemBlockInSettings, section.data.settings);

    // Update "schema"
    section.data.schema.blocks = insert(index, newBlock, section.data.schema.blocks);
  }
};

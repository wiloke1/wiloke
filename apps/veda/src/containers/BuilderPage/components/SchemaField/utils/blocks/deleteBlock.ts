import { Page } from 'types/Page';
import { DeleteBlock } from '../../SchemaBlocks/reducer';

interface ReducerDeleteBlock {
  section: Page['sections'][number];
  data: DeleteBlock;
}

/** Yêu cầu: Theo logic thông thường -> field "block" sẽ được xoá ở cả "schema" và "settings" */
export const reducerDeleteBlock = ({ section, data }: ReducerDeleteBlock) => {
  const { blockId } = data.payload;
  // Update "settings"
  section.data.settings = section.data.settings.filter(setting => setting.id !== blockId);

  // Update "schema"
  section.data.schema.blocks = section.data.schema.blocks.filter(block => block.id !== blockId);
};

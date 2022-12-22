import { Page } from 'types/Page';
import reorder from 'utils/functions/reorder';
import { SortBlock } from '../../SchemaBlocks/reducer';

interface ReducerSortBlock {
  section: Page['sections'][number];
  data: SortBlock;
}

/** Yêu cầu: Không sort "settings" khi sort "schema" vì có chức năng sắp xếp lại vị trí các field lớn (tức field "block" và "settings" của schema - không bao gồm block children) ở 1 nơi khác */
export const reducerSortBlock = ({ section, data }: ReducerSortBlock) => {
  const { sourceIndex, destinationIndex } = data.payload;
  // const sourceItemId = section.data.schema.blocks[sourceIndex].id;
  // const destinationItemId = section.data.schema.blocks[destinationIndex].id;
  // const sourceIndexInSetitngs = section.data.settings.findIndex(setting => setting.id === sourceItemId);
  // const destinationIndexInSetitngs = section.data.settings.findIndex(setting => setting.id === destinationItemId);
  // section.data.settings = reorder(section.data.settings, sourceIndexInSetitngs, destinationIndexInSetitngs);

  // Update "schema"
  section.data.schema.blocks = reorder(section.data.schema.blocks, sourceIndex, destinationIndex);
};

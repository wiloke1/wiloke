import { insert } from 'ramda';
import { Page } from 'types/Page';
import { SectionSetting, SettingBlock } from 'types/Schema';
import { AddBlock } from '../../SchemaBlocks/reducer';

interface ReducerAddBlock {
  section: Page['sections'][number];
  data: AddBlock;
}

/** Yêu cầu: Theo logic thông thường -> field "block" sẽ được thêm ở cả "schema" và "settings" */
export const reducerAddBlock = ({ section, data }: ReducerAddBlock) => {
  const { newBlock } = data.payload;
  const lastSchemaBlock: SettingBlock | undefined = section.data.schema.blocks[section.data.schema.blocks.length - 1];
  const indexOfLastSchemaBlockInSetting = section.data.settings.findIndex(setting => setting.id === lastSchemaBlock?.id);
  // Update "settings"
  if (indexOfLastSchemaBlockInSetting !== -1) {
    section.data.settings = insert<SectionSetting>(indexOfLastSchemaBlockInSetting + 1, newBlock as SectionSetting, section.data.settings);
  } else {
    section.data.settings.push(newBlock as SectionSetting);
  }

  // Update "schema"
  section.data.schema.blocks.push(newBlock);
};

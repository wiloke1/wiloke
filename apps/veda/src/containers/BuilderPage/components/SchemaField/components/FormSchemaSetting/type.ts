import { BLOCK_TYPES } from 'containers/BuilderPage/components/SchemaField/SchemaBlocks/const';
import { PageSection } from 'types/Sections';
import { SchemaSettingField } from 'types/Schema';

export interface FormSchemaSettingProps {
  data: SchemaSettingField;
  section: PageSection;
  onChange?: <T extends keyof SchemaSettingField>(params: Partial<Record<T, SchemaSettingField[T]>>) => void;
  error?: 'exist' | 'is_shopify_variable';
  variant: 'blocks' | 'settings';
  blockType?: typeof BLOCK_TYPES[number];
}

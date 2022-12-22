import { SettingBlock, SchemaSettingField } from 'types/Schema';
import { VARIABLES_NAME } from 'utils/LiquidSyntaxToTwig';
import { FormSchemaSettingProps } from '../components/FormSchemaSetting/type';
import { getDescriptionOfSettingsField } from '../SchemaSettings/utils';
import { labelOfTypes } from './components/forms/FormBlock/fields/TypeField';

interface GetErrorFormEditBlock {
  variant: 'block';
  blocks: SettingBlock[];
  formEditData: SettingBlock;
  blockId: SettingBlock['id'];
  settings: SchemaSettingField[];
}

interface GetErrorFormEditBlockChild {
  variant: 'blockChild';
  blocks: SettingBlock['children'];
  formEditData: SettingBlock['children'][number];
  blockChildId: SettingBlock['children'][number]['id'];
  blockId: SettingBlock['id'];
}

export const getError = ({
  variant,
  blocks,
  formEditData,
  blockId,
  ...params
}: GetErrorFormEditBlock | GetErrorFormEditBlockChild): FormSchemaSettingProps['error'] => {
  if (variant === 'block' && VARIABLES_NAME.includes(formEditData.name)) {
    return 'is_shopify_variable';
  }
  if (variant === 'block') {
    const isExisted =
      !!formEditData.name &&
      [...blocks, ...(params as GetErrorFormEditBlock).settings].findIndex(block => block.name === formEditData.name && block.id !== blockId) !== -1;
    if (isExisted) {
      return 'exist';
    }
    return undefined;
  }

  const isExisted =
    !!formEditData.name &&
    blocks.findIndex(blockChild => blockChild.name === formEditData.name && blockChild.id !== (params as GetErrorFormEditBlockChild).blockChildId) !==
      -1;
  if (isExisted) {
    return 'exist';
  }
};

interface GetDescriptionBlock {
  variant: 'block';
  data: SettingBlock;
}

interface GetDescriptionBlockChild {
  variant: 'blockChild';
  data: SettingBlock['children'][number];
}
export const getDescriptionOfBlocksField = ({ variant, data }: GetDescriptionBlock | GetDescriptionBlockChild) => {
  if (variant === 'blockChild') {
    return getDescriptionOfSettingsField(data);
  }

  return [data.name, labelOfTypes[data.type], JSON.stringify(data.children)].join(', ');
};

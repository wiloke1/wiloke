import { SchemaSettingField, SettingBlock } from 'types/Schema';
import { VARIABLES_NAME } from 'utils/LiquidSyntaxToTwig';
import { labelOfTypes } from '../components/FormSchemaSetting/fields/TypeField/TypeField';
import { FormSchemaSettingProps } from '../components/FormSchemaSetting/type';

interface GetErrorParams {
  settings: SchemaSettingField[];
  blocks: SettingBlock[];
  formData: SchemaSettingField;
}
export const getError = ({ blocks, formData, settings }: GetErrorParams): FormSchemaSettingProps['error'] => {
  if (VARIABLES_NAME.includes(formData.name)) {
    return 'is_shopify_variable';
  }
  const isExisted =
    !!formData.name && [...settings, ...blocks].findIndex(setting => setting.name === formData.name && setting.id !== formData.id) !== -1;
  if (isExisted) {
    return 'exist';
  }
};

export const getDescriptionOfSettingsField = (data: SchemaSettingField) => {
  const res = data.type === 'divider' ? [labelOfTypes[data.type]] : [data.name, labelOfTypes[data.type]];
  if (data.type === 'date') {
    res.push(new Date(data.children).toLocaleString());
  } else if (data.type === 'navigation') {
    res.push(JSON.stringify(data.children));
  } else if (data.type === 'radioGroup' || data.type === 'select') {
    res.push(data.children);
    res.push(JSON.stringify(data.options));
  } else if (data.type === 'slider') {
    res.push(JSON.stringify(data.children));
    res.push(JSON.stringify(data.max));
    res.push(JSON.stringify(data.min));
  } else if (data.type === 'flexOrder') {
    res.push(JSON.stringify(data.children));
    res.push(JSON.stringify(data.options));
  } else if (data.type === 'responsive') {
    res.push(JSON.stringify(data.children));
    res.push(JSON.stringify(data.min));
    res.push(JSON.stringify(data.max));
  } else {
    res.push(JSON.stringify(data.children));
  }
  return res.join(', ');
};

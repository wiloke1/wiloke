import { SettingSelect } from '../../../SchemaSettings/SettingSelect/@types/SettingSelect';
import { SettingBlockArray } from '../@types/SettingBlockArray';

export const getFieldCategorizeComponent = (array: SettingBlockArray) => {
  return array.children.find(fieldChildren => fieldChildren.type === 'select' && fieldChildren.name === 'component') as SettingSelect | undefined;
};

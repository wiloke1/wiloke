import { SettingBlockArray } from '../../../SchemaBlocks/SettingBlockArray/@types/SettingBlockArray';
import { SettingBlockObject } from '../../../SchemaBlocks/SettingBlockObject/@types/SettingBlockObject';
import { SettingSelect } from './SettingSelect';

export interface ISCHEMA_SettingSelect {
  field: SettingSelect;
  parentField: SettingBlockArray | SettingBlockObject | undefined;
}

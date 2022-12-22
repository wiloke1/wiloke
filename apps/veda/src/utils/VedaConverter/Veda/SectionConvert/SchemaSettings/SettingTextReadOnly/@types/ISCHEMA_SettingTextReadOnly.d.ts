import { SettingBlockArray } from '../../../SchemaBlocks/SettingBlockArray/@types/SettingBlockArray';
import { SettingBlockObject } from '../../../SchemaBlocks/SettingBlockObject/@types/SettingBlockObject';
import { SettingTextReadOnly } from './SettingTextReadOnly';

export interface ISCHEMA_SettingTextReadOnly {
  field: SettingTextReadOnly;
  parentField: SettingBlockArray | SettingBlockObject | undefined;
}

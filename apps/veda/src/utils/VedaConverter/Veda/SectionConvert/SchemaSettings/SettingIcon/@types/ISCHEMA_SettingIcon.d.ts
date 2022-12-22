import { SettingBlockArray } from '../../../SchemaBlocks/SettingBlockArray/@types/SettingBlockArray';
import { SettingBlockObject } from '../../../SchemaBlocks/SettingBlockObject/@types/SettingBlockObject';
import { SettingIcon } from './SettingIcon';

export interface ISCHEMA_SettingIcon {
  field: SettingIcon;
  parentField: SettingBlockArray | SettingBlockObject | undefined;
}

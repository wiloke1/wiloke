import { SettingBlockArray } from '../../../SchemaBlocks/SettingBlockArray/@types/SettingBlockArray';
import { SettingBlockObject } from '../../../SchemaBlocks/SettingBlockObject/@types/SettingBlockObject';
import { SettingRadioGroup } from './SettingRadioGroup';

export interface ISCHEMA_SettingRadioGroup {
  field: SettingRadioGroup;
  parentField: SettingBlockArray | SettingBlockObject | undefined;
}

import { SettingBlockArray } from '../../../SchemaBlocks/SettingBlockArray/@types/SettingBlockArray';
import { SettingBlockObject } from '../../../SchemaBlocks/SettingBlockObject/@types/SettingBlockObject';
import { SettingTags } from './SettingTags';

export interface ISCHEMA_SettingTags {
  field: SettingTags;
  parentField: SettingBlockArray | SettingBlockObject | undefined;
}

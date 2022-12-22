import { SettingBlockArray } from '../../../SchemaBlocks/SettingBlockArray/@types/SettingBlockArray';
import { SettingBlockObject } from '../../../SchemaBlocks/SettingBlockObject/@types/SettingBlockObject';
import { SettingStyleBox } from './SettingStyleBox';

export interface ISCHEMA_SettingStyleBox {
  field: SettingStyleBox;
  parentField: SettingBlockArray | SettingBlockObject | undefined;
}

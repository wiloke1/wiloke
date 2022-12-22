import { SettingBlockArray } from '../../../SchemaBlocks/SettingBlockArray/@types/SettingBlockArray';
import { SettingBlockObject } from '../../../SchemaBlocks/SettingBlockObject/@types/SettingBlockObject';
import { SettingResponsive } from './SettingResponsive';

export interface ISCHEMA_SettingResponsive {
  field: SettingResponsive;
  parentField: SettingBlockArray | SettingBlockObject | undefined;
}

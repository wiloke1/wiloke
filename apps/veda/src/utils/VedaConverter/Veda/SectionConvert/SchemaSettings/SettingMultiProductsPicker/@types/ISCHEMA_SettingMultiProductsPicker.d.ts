import { SettingBlockArray } from '../../../SchemaBlocks/SettingBlockArray/@types/SettingBlockArray';
import { SettingBlockObject } from '../../../SchemaBlocks/SettingBlockObject/@types/SettingBlockObject';
import { SettingMultiProductsPicker } from './SettingMultiProductsPicker';

export interface ISCHEMA_SettingMultiProductsPicker {
  field: SettingMultiProductsPicker;
  parentField: SettingBlockArray | SettingBlockObject | undefined;
}

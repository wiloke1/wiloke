import { ISCHEMA_SettingLinkPicker } from './ISCHEMA_SettingLinkPicker';

export interface ILIQUID_SettingLinkPicker extends ISCHEMA_SettingLinkPicker {
  liquid: string;
  loopVariable: string | undefined;
}

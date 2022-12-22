import { ISCHEMA_SettingSwitch } from './ISCHEMA_SettingSwitch';

export interface ILIQUID_SettingSwitch extends ISCHEMA_SettingSwitch {
  liquid: string;
  loopVariable: string | undefined;
}

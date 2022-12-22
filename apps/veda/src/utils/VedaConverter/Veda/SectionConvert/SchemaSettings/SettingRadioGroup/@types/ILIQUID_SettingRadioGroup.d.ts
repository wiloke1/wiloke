import { ISCHEMA_SettingRadioGroup } from './ISCHEMA_SettingRadioGroup';

export interface ILIQUID_SettingRadioGroup extends ISCHEMA_SettingRadioGroup {
  liquid: string;
  loopVariable: string | undefined;
}

import { ISCHEMA_SettingDivider } from './ISCHEMA_SettingDivider';

export interface ILIQUID_SettingDivider extends ISCHEMA_SettingDivider {
  liquid: string;
  loopVariable: string | undefined;
}

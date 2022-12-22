import { ISCHEMA_SettingHidden } from './ISCHEMA_SettingHidden';

export interface ILIQUID_SettingHidden extends ISCHEMA_SettingHidden {
  liquid: string;
  loopVariable: string | undefined;
}

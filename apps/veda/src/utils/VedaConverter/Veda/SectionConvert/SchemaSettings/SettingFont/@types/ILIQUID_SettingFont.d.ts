import { ISCHEMA_SettingFont } from './ISCHEMA_SettingFont';

export interface ILIQUID_SettingFont extends ISCHEMA_SettingFont {
  liquid: string;
  loopVariable: string | undefined;
}

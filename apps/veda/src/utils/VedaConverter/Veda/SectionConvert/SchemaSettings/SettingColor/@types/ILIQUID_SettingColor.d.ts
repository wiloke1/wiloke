import { ISCHEMA_SettingColor } from './ISCHEMA_SettingColor';

export interface ILIQUID_SettingColor extends ISCHEMA_SettingColor {
  liquid: string;
  loopVariable: string | undefined;
}

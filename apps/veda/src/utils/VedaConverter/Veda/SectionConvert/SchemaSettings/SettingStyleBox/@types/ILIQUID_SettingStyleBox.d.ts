import { ISCHEMA_SettingStyleBox } from './ISCHEMA_SettingStyleBox';

export interface ILIQUID_SettingStyleBox extends ISCHEMA_SettingStyleBox {
  liquid: string;
  loopVariable: string | undefined;
}

import { ISCHEMA_SettingText } from './ISCHEMA_SettingText';

export interface ILIQUID_SettingText extends ISCHEMA_SettingText {
  liquid: string;
  loopVariable: string | undefined;
}

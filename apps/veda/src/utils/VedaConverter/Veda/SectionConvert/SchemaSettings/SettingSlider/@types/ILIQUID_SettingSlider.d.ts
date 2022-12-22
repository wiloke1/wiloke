import { ISCHEMA_SettingSlider } from './ISCHEMA_SettingSlider';

export interface ILIQUID_SettingSlider extends ISCHEMA_SettingSlider {
  liquid: string;
  loopVariable: string | undefined;
}

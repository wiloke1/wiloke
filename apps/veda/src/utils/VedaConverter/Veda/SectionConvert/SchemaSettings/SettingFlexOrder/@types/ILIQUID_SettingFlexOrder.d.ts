import { ISCHEMA_SettingFlexOrder } from './ISCHEMA_SettingFlexOrder';

export interface ILIQUID_SettingFlexOrder extends ISCHEMA_SettingFlexOrder {
  liquid: string;
  loopVariable: string | undefined;
}

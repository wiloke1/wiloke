import { ILIQUID_SettingDragNavigation } from './@types/ILIQUID_SettingDragNavigation';
import { ISCHEMA_SettingDragNavigation } from './@types/ISCHEMA_SettingDragNavigation';
import { ISETTING_SettingDragNavigation } from './@types/ISETTING_SettingDragNavigation';

export const SCHEMA_SettingDragNavigation = (_: ISCHEMA_SettingDragNavigation) => undefined;

export const SETTING_SettingDragNavigation = (_: ISETTING_SettingDragNavigation) => undefined;

export const LIQUID_SettingDragNavigation = ({ liquid }: ILIQUID_SettingDragNavigation) => liquid;

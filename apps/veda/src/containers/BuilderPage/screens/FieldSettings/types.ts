import { ReactNode } from 'react';
import { SchemaSettingField, SectionSetting, SectionSettingType } from 'types/Schema';

export interface FieldContainerProps<T> {
  value: T;
  settingId: string;
  childId?: string;
  grandChildId?: string;
  forceRenderSection?: boolean;
}

export interface FieldsProps {
  setting: SectionSetting;
}

interface Ids {
  settingId: string;
  childId?: string;
  grandChildId?: string;
}

export type SettingDefaultFieldMapping = {
  [P in SchemaSettingField['type']]: (setting: Extract<SchemaSettingField, { type: P }>, ids: Ids) => ReactNode;
};

export type SettingMappingType = { [P in SectionSettingType]: (setting: Extract<SectionSetting, { type: P }>, ids: Ids) => ReactNode };

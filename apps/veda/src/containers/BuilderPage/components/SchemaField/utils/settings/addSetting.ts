import { insert } from 'ramda';
import { Page } from 'types/Page';
import { SchemaSettingField, SectionSetting } from 'types/Schema';
import { AddSetting } from '../../SchemaSettings/reducer';

interface ReducerAddSetting {
  section: Page['sections'][number];
  data: AddSetting;
}

/** Yêu cầu: Theo logic thông thường -> field "settings" sẽ được thêm ở cả "schema" và "settings" */
export const reducerAddSetting = ({ section, data }: ReducerAddSetting) => {
  const { newSetting } = data.payload;
  const lastSchemaSetting: SchemaSettingField | undefined = section.data.schema.settings[section.data.schema.settings.length - 1];
  const indexOfLastSchemaSettingInSetting = section.data.settings.findIndex(setting => setting.id === lastSchemaSetting?.id);

  // Update "settings"
  if (indexOfLastSchemaSettingInSetting !== -1) {
    section.data.settings = insert<SectionSetting>(indexOfLastSchemaSettingInSetting + 1, newSetting as SectionSetting, section.data.settings);
  } else {
    section.data.settings.push(newSetting as SectionSetting);
  }

  // Update "schema"
  section.data.schema.settings.push(newSetting);
};

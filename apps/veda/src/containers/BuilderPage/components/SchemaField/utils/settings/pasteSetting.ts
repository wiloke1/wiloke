import { Page } from 'types/Page';
import { SchemaSettingField } from 'types/Schema';
import { PasteSetting } from '../../SchemaSettings/reducer';

interface ReducerPasteSetting {
  section: Page['sections'][number];
  data: PasteSetting;
}

export const reducerPasteSetting = ({ section, data }: ReducerPasteSetting) => {
  const { settingId, newData } = data.payload;
  // Update "settings"
  section.data.settings = section.data.settings.map(setting => {
    if (setting.id === settingId) {
      return { ...setting, ...newData } as SchemaSettingField;
    }

    return setting;
  });

  // Update "schema"
  section.data.schema.settings = section.data.schema.settings.map(setting => {
    if (setting.id === settingId) {
      return { ...setting, ...newData } as SchemaSettingField;
    }
    return setting;
  });
};

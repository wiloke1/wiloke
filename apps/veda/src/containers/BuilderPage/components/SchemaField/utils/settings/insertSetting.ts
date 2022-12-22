import { insert } from 'ramda';
import { Page } from 'types/Page';
import { InsertSetting } from '../../SchemaSettings/reducer';

interface ReducerInsertSetting {
  section: Page['sections'][number];
  data: InsertSetting;
}

/** Yêu cầu: Chèn vào ngay sau field nguồn được sử dụng để duplicate ở cả "schema" và "settings" */
export const reducerInsertSetting = ({ section, data }: ReducerInsertSetting) => {
  const { settingId, index, newSetting } = data.payload;
  const indexOfSourceItemInSettings = Math.max(section.data.settings.findIndex(setting => setting.id === settingId) + 1, 1);
  // Update "schema"
  section.data.schema.settings = insert(index, newSetting, section.data.schema.settings);

  // Update "settings"
  section.data.settings = insert(indexOfSourceItemInSettings, newSetting, section.data.settings);
};

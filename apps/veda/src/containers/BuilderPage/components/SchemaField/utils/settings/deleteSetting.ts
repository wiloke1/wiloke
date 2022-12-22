import { Page } from 'types/Page';
import { DeleteSetting } from '../../SchemaSettings/reducer';

interface ReducerDeleteSetting {
  section: Page['sections'][number];
  data: DeleteSetting;
}

/** Yêu cầu: Theo logic thông thường -> field "settings" sẽ được xoá ở cả "schema" và "settings" */
export const reducerDeleteSetting = ({ section, data }: ReducerDeleteSetting) => {
  const { settingId } = data.payload;
  // Update "settings"
  section.data.settings = section.data.settings.filter(setting => setting.id !== settingId);

  // Update "schema"
  section.data.schema.settings = section.data.schema.settings.filter(setting => setting.id !== settingId);
};

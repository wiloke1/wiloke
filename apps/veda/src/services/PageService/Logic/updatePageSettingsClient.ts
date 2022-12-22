import { PageSettings } from 'types/Result';
import { pageApis } from '../apis';

interface UpdatePageSettingsClient {
  commandId: string;
  pageSettings: PageSettings;
}

export const updatePageSettingsClient = ({ commandId, pageSettings }: UpdatePageSettingsClient) => {
  return pageApis.vedaApplication.userApi.page.updateClient({
    page: {
      commandId,
      pageSettings,
    },
  });
};

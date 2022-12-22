import { pageApis } from '../apis';

interface UpdatePageClient {
  commandId: string;
  enable: boolean;
}

export const updateStatusPageClientService = ({ commandId, enable }: UpdatePageClient) => {
  return pageApis.vedaApplication.userApi.page.updateClient({
    page: { commandId, enable },
  });
};

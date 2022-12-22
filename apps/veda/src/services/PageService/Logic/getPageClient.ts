import { pageApis } from '../apis';

interface GetPageClient {
  commandId: string;
}

export const getPageClient = async ({ commandId }: GetPageClient) => {
  const response = await pageApis.vedaApplication.userApi.page.getClient({ commandId });
  return {
    ...response.info,
    type: (response.info as any).type === 'default' ? 'page' : response.info.type, // be đang trả về sai type
  };

  // const { role } = getUserInfo();
  // if (role === 'admin') {
  //   // FIXME: Chưa lắp cho admin
  //   throw new Error('Chưa lắp cho admin');
  // }
  // if (role === 'user') {
  //   const response = await pageApis.vedaApplication.userApi.page.getClient({ commandId });
  //   return response.info;
  // }
  // throw new RoleException();
};

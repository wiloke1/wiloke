import { pageApis } from 'services/PageService/apis';

interface GetPageOfThemeClient {
  commandId: string;
}

export const getPageOfThemeClient = async ({ commandId }: GetPageOfThemeClient) => {
  const response = await pageApis.vedaApplication.userApi.page.getClient({ commandId });
  return response.info;

  // const { role } = getUserInfo();
  // if (role === 'admin') {
  //   throw new Error('Chưa lắp api');
  // }
  // if (role === 'user') {
  //   const response = await pageApis.vedaApplication.userApi.page.getClient({ commandId });
  //   return response.info;
  // }
  // throw new RoleException();
};

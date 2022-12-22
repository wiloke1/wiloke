import { AxiosResponse } from 'axios';
import configureApp from 'configureApp';
import fetchAPI from 'utils/functions/fetchAPI';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const cleanAfterSync = async () => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response: AxiosResponse = await fetchAPI.request({
      url: `${configureApp.endpoint['shopify-connections']}/sync/shopify/admin/cleaner`,
      method: 'DELETE',
    });
    return response.data;
  } else {
    const response: AxiosResponse = await fetchAPI.request({
      url: `${configureApp.endpoint['shopify-connections']}/sync/shopify/me/cleaner`,
      method: 'DELETE',
    });
    return response.data;
  }
};

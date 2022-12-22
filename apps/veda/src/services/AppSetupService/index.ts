import configureApp from 'configureApp';
import { Role } from 'routes/types';
import fetchAPI from 'utils/functions/fetchAPI';

export const appSetupService = (role: Role) => {
  // interface ResponseSuccess {
  //   message: 'Setting up Veda Builder';
  // }
  return fetchAPI.request({
    method: 'PUT',
    baseURL: '',
    url:
      role === 'admin'
        ? `${configureApp.endpoint['shopify-connections']}/sync/shopify/admin/setup`
        : `${configureApp.endpoint['shopify-connections']}/sync/shopify/me/setup`,
  });
};

import { AxiosResponse } from 'axios';
import configureApp from 'configureApp';
import { Role } from 'routes/types';
import fetchAPI from 'utils/functions/fetchAPI';
import { ServerResponseAuthService } from '.';

export interface LoginResponseSuccess {
  id: number;
  email: string;
  role: Role;
  shopName?: string;
  username: string;
  password: string;
}

export class AuthService {
  async getRoles() {
    try {
      const response: AxiosResponse<any> = await fetchAPI.request({
        url: `${configureApp.endpoint.users}/roles`,
      });
      console.log({ 'users/roles': response });
    } catch (error) {
      console.log(error);
    }
  }

  async getUserInfo() {
    const response: AxiosResponse<ServerResponseAuthService> = await fetchAPI.request({
      url: `${configureApp.endpoint.users}/me`,
    });

    const { email, id, roles, username, shopName, plan, siteStatus, themeId, themeName } = response.data.info;
    const newResponse = {
      info: {
        role: roles.map<Role>(item => {
          switch (item.name) {
            case 'ADMIN_GLOBAL': {
              return localStorage.getItem('dev') === 'DEV_BACKDOOR' ? 'dev' : 'admin';
            }
            case 'SUPPER_ADMIN': {
              return 'admin';
            }
            case 'DEV_PRIVATE': {
              return 'dev';
            }
            case 'SUPPORT_GLOBAL': {
              return 'partner';
            }
            case 'USER_PRIVATE': {
              return 'user';
            }
            default:
              return 'guest';
          }
        })[0],
        email,
        id,
        shopName,
        username,
        siteStatus: siteStatus === undefined ? null : siteStatus,
        themeId,
        themeName,
        plan,
      },
      message: response.data.message,
    };

    return newResponse;
  }
}

import { Reducers } from 'store/configureStore';

const getUserInfo = () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { store } = require('store/configureStore');
  const {
    global: {
      auth: { accessToken, id, refreshToken, role, plan, shopName },
    },
  } = store.getState() as Reducers;

  return {
    accessToken,
    id,
    refreshToken,
    role,
    shopName,
    plan,
  };
};

const getEndpointRole = () => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return 'admin';
  }
  if (role === 'dev') {
    return 'dev';
  }
  if (role === 'user') {
    return 'me';
  }
  return 'publish';
};

export const getShopName = () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { store } = require('store/configureStore');
  const {
    global: {
      auth: { shopName },
    },
  } = store.getState() as Reducers;

  return shopName;
};

export const getVedaThemeCommandId = () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { store } = require('store/configureStore');
  const {
    adminDashboard: {
      themeBuilder: {
        themeDashboard: { themeActivate },
      },
    },
  } = store.getState() as Reducers;

  return themeActivate.commandId;
};

export { getUserInfo, getEndpointRole };

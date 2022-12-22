import { CANCEL } from '@redux-saga/core';
import configureApp from 'configureApp';
import qs from 'qs';
import { Reducers } from 'store/configureStore';
import ConfigureAxios from './ConfigureAxios';

const axiosConfig = new ConfigureAxios({
  configure: {
    method: 'GET',
    timeout: configureApp.timeout,
    paramsSerializer: qs.stringify,
  },
  setAccessToken() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { store } = require('store/configureStore');
    const {
      global: { auth },
    } = store.getState() as Reducers;
    return `${auth.accessToken}`;
  },
  setRefreshToken() {
    return '';
  },
});

const fetchAPI = axiosConfig.create(CANCEL, () => {
  return {
    baseURL: `${configureApp.baseUrl}/${configureApp.version}/`,
  };
});

export const myFetch = axiosConfig.create(CANCEL, () => {
  return {
    baseURL: 'https://cors-anywhere.vedabuilder.com/https://burst.shopify.com/api',
  };
});

axiosConfig.accessToken({
  setCondition(config) {
    const isAppURL = config?.url?.search(/^http/g) === -1;
    return isAppURL;
  },
});

export default fetchAPI;

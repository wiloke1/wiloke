import { watchCreateCustomerLogin } from './watchCreateCustomerLogin';
import { watchUpdateStatusCustomerLogin } from './watchUpdateStatusCustomerLogin';
import { watchDeleteCustomerLogin } from './watchDeleteCustomerLogin';
import { watchGetCustomerLogins } from './watchGetCustomerLogins';
import { watchLoadMoreCustomerLogins } from './watchLoadMoreCustomerLogins';

export const sagasCustomerLogin = [
  watchCreateCustomerLogin,
  watchUpdateStatusCustomerLogin,
  watchDeleteCustomerLogin,
  watchGetCustomerLogins,
  watchLoadMoreCustomerLogins,
];

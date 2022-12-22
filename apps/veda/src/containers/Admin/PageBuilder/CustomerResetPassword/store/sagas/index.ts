import { watchCreateCustomerResetPassword } from './watchCreateCustomerResetPassword';
import { watchUpdateStatusCustomerResetPassword } from './watchUpdateStatusCustomerResetPassword';
import { watchDeleteCustomerResetPassword } from './watchDeleteCustomerResetPassword';
import { watchGetCustomerResetPasswords } from './watchGetCustomerResetPasswords';
import { watchLoadMoreCustomerResetPasswords } from './watchLoadMoreCustomerResetPasswords';

export const sagasCustomerResetPassword = [
  watchCreateCustomerResetPassword,
  watchUpdateStatusCustomerResetPassword,
  watchDeleteCustomerResetPassword,
  watchGetCustomerResetPasswords,
  watchLoadMoreCustomerResetPasswords,
];

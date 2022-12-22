import { watchCreateCustomerAccount } from './watchCreateCustomerAccount';
import { watchUpdateStatusCustomerAccount } from './watchUpdateStatusCustomerAccount';
import { watchDeleteCustomerAccount } from './watchDeleteCustomerAccount';
import { watchGetCustomerAccounts } from './watchGetCustomerAccounts';
import { watchLoadMoreCustomerAccounts } from './watchLoadMoreCustomerAccounts';

export const sagasCustomerAccount = [
  watchCreateCustomerAccount,
  watchUpdateStatusCustomerAccount,
  watchDeleteCustomerAccount,
  watchGetCustomerAccounts,
  watchLoadMoreCustomerAccounts,
];

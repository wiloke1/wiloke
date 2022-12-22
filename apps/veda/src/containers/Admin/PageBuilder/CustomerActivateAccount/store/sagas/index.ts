import { watchCreateCustomerActivateAccount } from './watchCreateCustomerActivateAccount';
import { watchUpdateStatusCustomerActivateAccount } from './watchUpdateStatusCustomerActivateAccount';
import { watchDeleteCustomerActivateAccount } from './watchDeleteCustomerActivateAccount';
import { watchGetCustomerActivateAccounts } from './watchGetCustomerActivateAccounts';
import { watchLoadMoreCustomerActivateAccounts } from './watchLoadMoreCustomerActivateAccounts';

export const sagasCustomerActivateAccount = [
  watchCreateCustomerActivateAccount,
  watchUpdateStatusCustomerActivateAccount,
  watchDeleteCustomerActivateAccount,
  watchGetCustomerActivateAccounts,
  watchLoadMoreCustomerActivateAccounts,
];

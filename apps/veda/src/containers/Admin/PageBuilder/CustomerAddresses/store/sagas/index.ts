import { watchCreateCustomerAddresses } from './watchCreateCustomerAddresses';
import { watchUpdateStatusCustomerAddresses } from './watchUpdateStatusCustomerAddresses';
import { watchDeleteCustomerAddresses } from './watchDeleteCustomerAddresses';
import { watchGetCustomerAddresses } from './watchGetCustomerAddresses';
import { watchLoadMoreCustomerAddresses } from './watchLoadMoreCustomerAddresses';

export const sagasCustomerAddresses = [
  watchCreateCustomerAddresses,
  watchUpdateStatusCustomerAddresses,
  watchDeleteCustomerAddresses,
  watchGetCustomerAddresses,
  watchLoadMoreCustomerAddresses,
];

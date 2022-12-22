import { watchCreateCustomerRegister } from './watchCreateCustomerRegister';
import { watchUpdateStatusCustomerRegister } from './watchUpdateStatusCustomerRegister';
import { watchDeleteCustomerRegister } from './watchDeleteCustomerRegister';
import { watchGetCustomerRegisters } from './watchGetCustomerRegisters';
import { watchLoadMoreCustomerRegisters } from './watchLoadMoreCustomerRegisters';

export const sagasCustomerRegister = [
  watchCreateCustomerRegister,
  watchUpdateStatusCustomerRegister,
  watchDeleteCustomerRegister,
  watchGetCustomerRegisters,
  watchLoadMoreCustomerRegisters,
];

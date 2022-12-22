import { watchCreateCustomerOrder } from './watchCreateCustomerOrder';
import { watchUpdateStatusCustomerOrder } from './watchUpdateStatusCustomerOrder';
import { watchDeleteCustomerOrder } from './watchDeleteCustomerOrder';
import { watchGetCustomerOrders } from './watchGetCustomerOrders';
import { watchLoadMoreCustomerOrders } from './watchLoadMoreCustomerOrders';

export const sagasCustomerOrder = [
  watchCreateCustomerOrder,
  watchUpdateStatusCustomerOrder,
  watchDeleteCustomerOrder,
  watchGetCustomerOrders,
  watchLoadMoreCustomerOrders,
];

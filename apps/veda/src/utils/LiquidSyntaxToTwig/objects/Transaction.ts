import { TransactionPaymentDetails } from './TransactionPaymentDetails';
import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#transaction */
interface _Transaction {
  amount: number;
  created_at: string;
  gateway: string;
  gateway_display_name: string;
  id: number;
  kind: 'authorization' | 'capture' | 'sale' | 'void' | 'refund';
  name: string;
  payment_details: TransactionPaymentDetails;
  receipt: string;
  status: 'success' | 'pending' | 'failure' | 'error';
  status_label: string;
}

export type Transaction = DeepNullable<_Transaction> | null;

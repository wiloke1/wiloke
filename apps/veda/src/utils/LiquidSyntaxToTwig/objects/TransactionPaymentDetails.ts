import { GiftCard } from './GiftCard';

/** @link https://shopify.dev/api/liquid/objects#transaction_payment_details */
export interface TransactionPaymentDetails {
  credit_card_company: string;
  credit_card_number: GiftCard;
}

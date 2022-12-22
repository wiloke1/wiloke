import { GiftCard } from 'utils/LiquidSyntaxToTwig';
import { GET_CUSTOMER_PLACEHOLDER } from './GET_CUSTOMER_PLACEHOLDER';
import { GET_PRODUCT_PLACEHOLDER } from './GET_PRODUCT_PLACEHOLDER';

export const GET_GIFT_CARD_PLACEHOLDER = (): GiftCard => {
  return {
    balance: 10000,
    code: 'A1B23C4D5E6F7G8H',
    currency: 'XPF',
    customer: GET_CUSTOMER_PLACEHOLDER(),
    enabled: true,
    expired: false,
    expires_on: null,
    initial_value: 10000,
    last_four_characters: '7g8h',
    properties: null,
    qr_identifier: 'shopify-giftcard-v1-A1B23C4D5E6F7G8H',
    template_suffix: null,
    url: 'https://checkout.shopify.com/gift_cards/58627096749/preview',
    pass_url: null,
    product: GET_PRODUCT_PLACEHOLDER(),
  };
};

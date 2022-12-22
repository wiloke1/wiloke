import { Customer } from 'utils/LiquidSyntaxToTwig';
import { randomNumber } from './@utils';
import { GET_ORDER_PLACEHOLDER } from './GET_ORDER_PLACEHOLDER';

// @ts-ignore
export const GET_CUSTOMER_PLACEHOLDER = (): Customer => {
  return {
    accepts_marketing: true,
    addresses: [
      {
        first_name: 'Veda',
        last_name: 'Builder',
        company: null,
        address1: 'Veda Builder',
        address2: 'Myshopkit',
        city: 'HN',
        province: null,
        country: 'Vietnam',
        zip: randomNumber().toString(),
        phone: null,
        name: 'Veda Builder',
        province_code: null,
        country_code: 'VN',
        country_name: 'Vietnam',
        default: true,
      },
      {
        first_name: 'Veda',
        last_name: 'Builder 2',
        company: 'Veda',
        address1: 'Veda Builder 2',
        address2: 'Myshopkit 2',
        city: 'HN',
        province: null,
        country: 'Vietnam',
        zip: randomNumber().toString(),
        phone: null,
        name: 'Veda Builder 2',
        province_code: null,
        country_code: 'VN',
        country_name: 'Vietnam',
        default: false,
      },
    ],
    addresses_count: 2,
    default_address: {
      first_name: 'Veda',
      last_name: 'Builder',
      company: null,
      address1: 'Veda Builder',
      address2: 'Myshopkit',
      city: 'HN',
      province: null,
      country: 'Vietnam',
      zip: randomNumber().toString(),
      phone: null,
      name: 'Veda Builder',
      province_code: null,
      country_code: 'VN',
      country_name: 'Vietnam',
      default: true,
    },
    email: 'vedabuilder@veda.com',
    first_name: 'Veda Builder',
    has_account: true,
    id: randomNumber(),
    last_name: 'Customer',
    last_order: GET_ORDER_PLACEHOLDER(),
    name: 'Veda Builder Customer',
    orders: [GET_ORDER_PLACEHOLDER(), GET_ORDER_PLACEHOLDER(), GET_ORDER_PLACEHOLDER()],
    orders_count: 3,
    phone: null,
    tags: [],
    tax_exempt: false,
    total_spent: 24500,
  };
};

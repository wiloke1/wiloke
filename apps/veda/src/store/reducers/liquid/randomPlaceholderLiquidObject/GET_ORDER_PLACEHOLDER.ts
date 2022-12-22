import { Customer, Order } from 'utils/LiquidSyntaxToTwig';
import { randomNumber } from './@utils';

const GET_CUSTOMER_PLACEHOLDER = (): Customer => {
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
    last_order: null,
    name: 'Veda Builder Customer',
    orders: [],
    orders_count: 3,
    phone: null,
    tags: [],
    tax_exempt: false,
    total_spent: 24500,
  };
};

export const GET_ORDER_PLACEHOLDER = (): Order => {
  return {
    attributes: {},
    billing_address: {
      first_name: '234',
      address1: '1',
      phone: null,
      city: 'HN',
      zip: '4',
      province: null,
      country: 'Vietnam',
      last_name: 'Tuong123',
      address2: '',
      company: null,
      name: 'Tuong123 234',
      country_code: 'VN',
      province_code: null,
    },
    cancelled: false,
    cancelled_at: null,
    cancel_reason: null,
    cancel_reason_label: null,
    cart_level_discount_applications: [],
    created_at: new Date().toString(),
    customer: GET_CUSTOMER_PLACEHOLDER(),
    customer_url: 'https://vedabuilder.myshopify.com/account/orders/bf9476514bfd9c899431c95223dec220',
    email: 'vedabuilder@veda.com',
    financial_status: 'paid',
    financial_status_label: 'Đã thanh toán',
    fulfillment_status: 'fulfilled',
    fulfillment_status_label: 'complete',
    line_items: [
      {
        id: 11019580506285,
        title: '7 Shakra Bracelet 11 - Blue',
        quantity: 1,
        sku: null,
        grams: 0,
        properties: [],
        vendor: 'Company 123',
        requires_shipping: true,
        tax_lines: [
          {
            title: 'VAT',
            price: Number('5'),
            rate: 0.1,
            rate_percentage: 0.1,
          },
        ],
        taxable: true,
        gift_card: false,
        variant_id: 41038975336621,
        variant: {
          id: 41038975336621,
          title: 'Blue',
          price: Number('43.00'),
          sku: null,
          inventory_policy: 'deny',
          compare_at_price: Number('45.00'),
          inventory_management: null,
          option1: 'Blue',
          option2: null,
          option3: null,
          taxable: true,
          barcode: null,
          weight: 0,
          weight_unit: 'kg',
          inventory_quantity: 0,
          requires_shipping: true,
        },
        url: '/products/chain-bracelet?variant=41038975336621',
        product: {
          id: 7051602264237,
          title: '7 Shakra Bracelet 112',
          description: '<p>7 chakra bracelet, in blue or black. </p>',
          vendor: 'Company 123',
          handle: 'chain-bracelet',
          published_at: '2021-11-09T11:09:13+07:00',
          template_suffix: 'pf-75986e20',
          tags: ['Beads'],
          variants: [
            {
              id: 41038975336621,
              title: 'Blue',
              price: Number('43.00'),
              sku: null,
              inventory_policy: 'deny',
              compare_at_price: Number('45.00'),
              inventory_management: null,
              option1: 'Blue',
              option2: null,
              option3: null,
              taxable: true,
              barcode: null,
              weight: 0,
              weight_unit: 'kg',
              inventory_quantity: 0,
              requires_shipping: true,
            },
            {
              id: 41038975369389,
              title: 'Black',
              price: Number('43.00'),
              sku: null,
              inventory_policy: 'deny',
              compare_at_price: Number('45.00'),
              inventory_management: null,
              option1: 'Black',
              option2: null,
              option3: null,
              taxable: true,
              barcode: null,
              weight: 0,
              weight_unit: 'kg',
              inventory_quantity: -1,
              requires_shipping: true,
            },
          ],
          options: [
            {
              id: 9026903310509,
              product_id: 7051602264237,
              name: 'Color',
              position: 1,
              values: ['Blue', 'Black'],
            },
          ],
          images: [
            {
              id: 31201211220141,
              product_id: 7051602264237,
              position: 1,
              alt: '7 Shakra Bracelet 112-Company 123-Beads',
              width: 925,
              height: 1386,
              src:
                'https://cdn.shopify.com/s/files/1/0586/2709/6749/products/7-chakra-bracelet_925x_b963ef97-e355-4b62-b9d6-a605664da913.jpg?v=1646019696',
            },
            {
              id: 31201211252909,
              product_id: 7051602264237,
              position: 2,
              alt: '7 Shakra Bracelet 112-Company 123-Beads',
              width: 925,
              height: 618,
              src:
                'https://cdn.shopify.com/s/files/1/0586/2709/6749/products/navy-blue-chakra-bracelet_925x_2ce18fe4-84c8-48ef-8ed5-869f0aa511e6.jpg?v=1646019696',
            },
            {
              id: 31207273824429,
              product_id: 7051602264237,
              position: 3,
              alt: '7 Shakra Bracelet 112-Company 123-Beads',
              width: 1200,
              height: 1800,
              src: 'https://cdn.shopify.com/s/files/1/0586/2709/6749/products/chair.jpg?v=1646019698',
            },
            {
              id: 31207275102381,
              product_id: 7051602264237,
              position: 4,
              alt: '7 Shakra Bracelet 112-Company 123-Beads',
              width: 2736,
              height: 4104,
              src: 'https://cdn.shopify.com/s/files/1/0586/2709/6749/products/pexels-photo-9671348.jpg?v=1646019703',
            },
            {
              id: 31207276937389,
              product_id: 7051602264237,
              position: 5,
              alt: '7 Shakra Bracelet 112-Company 123-Beads',
              width: 2736,
              height: 4104,
              src:
                'https://cdn.shopify.com/s/files/1/0586/2709/6749/products/pexels-photo-9671348_6db279dd-acbf-4606-9e84-e720461b6f84.jpg?v=1646019704',
            },
            {
              id: 31207278641325,
              product_id: 7051602264237,
              alt: '7 Shakra Bracelet 112-Company 123-Beads',
              width: 3456,
              height: 5184,
              src: 'https://cdn.shopify.com/s/files/1/0586/2709/6749/products/pexels-photo-9731737.jpg?v=1645153656',
            },
            {
              id: 31499821416621,
              product_id: 7051602264237,
              position: 7,
              alt: '7 Shakra Bracelet 112-Company 123-Beads',
              width: 500,
              height: 625,
              src: 'https://cdn.shopify.com/s/files/1/0586/2709/6749/products/pexels-photo-11284548.jpg?v=1646019259',
            },
            {
              id: 31499832000685,
              product_id: 7051602264237,
              position: 8,
              alt: '7 Shakra Bracelet 112-Company 123-Beads',
              width: 1200,
              height: 800,
              src: 'https://cdn.shopify.com/s/files/1/0586/2709/6749/products/couch_2d2cec42-0197-4584-ae98-133a75fd9dd9.jpg?v=1646019699',
            },
          ],
          featured_image: {
            id: 31201211220141,
            product_id: 7051602264237,
            position: 1,
            alt: '7 Shakra Bracelet 112-Company 123-Beads',
            width: 925,
            height: 1386,
            src:
              'https://cdn.shopify.com/s/files/1/0586/2709/6749/products/7-chakra-bracelet_925x_b963ef97-e355-4b62-b9d6-a605664da913.jpg?v=1646019696',
          },
        },
        fulfillment: {
          created_at: '2022-02-08T15:43:42+07:00',
          tracking_company: null,
          fulfillment_line_items: [
            {
              id: 11019580506285,
              variant_id: 41038975336621,
              title: '7 Shakra Bracelet 11',
              quantity: 1,
              sku: null,
              vendor: 'Company 123',
              fulfillment_service: 'manual',
              product_id: 7051602264237,
              requires_shipping: true,
              taxable: true,
              gift_card: false,
              properties: [],
              grams: 0,
              discount_allocations: [],
              tax_lines: [
                {
                  title: 'VAT',
                  price: Number('5'),
                  rate: 0.1,
                  rate_percentage: null,
                },
              ],
            },
            {
              id: 11019580539053,
              variant_id: 41038975369389,
              title: '7 Shakra Bracelet 11',
              quantity: 1,
              sku: null,
              vendor: 'Company 123',
              fulfillment_service: 'manual',
              product_id: 7051602264237,
              requires_shipping: true,
              taxable: true,
              gift_card: false,
              properties: [],
              grams: 0,
              discount_allocations: [],
              tax_lines: [
                {
                  title: 'VAT',
                  price: Number('4'),
                  rate: 0.1,
                  rate_percentage: 0.1,
                },
              ],
            },
          ],
          item_count: 2,
          tracking_number: null,
          tracking_url: null,
        },
        unit_price: Number('43.0'),
        final_line_price: Number('43.0'),
      },
      {
        id: 11019580539053,
        title: '7 Shakra Bracelet 11 - Black',
        quantity: 1,
        sku: null,
        grams: 0,
        properties: [],
        vendor: 'Company 123',
        requires_shipping: true,
        tax_lines: [
          {
            title: 'VAT',
            price: Number('4'),
            rate: 0.1,
            rate_percentage: 0.1,
          },
        ],
        taxable: true,
        gift_card: false,
        variant_id: 41038975369389,
        variant: {
          id: 41038975369389,
          title: 'Black',
          price: Number('43.00'),
          sku: null,
          inventory_policy: 'deny',
          compare_at_price: Number('45.00'),
          inventory_management: null,
          option1: 'Black',
          option2: null,
          option3: null,
          taxable: true,
          barcode: null,
          weight: 0,
          weight_unit: 'kg',
          inventory_quantity: -1,
          requires_shipping: true,
        },
        url: '/products/chain-bracelet?variant=41038975369389',
        product: {
          id: 7051602264237,
          title: '7 Shakra Bracelet 112',
          description: '<p>7 chakra bracelet, in blue or black. </p>',
          vendor: 'Company 123',
          handle: 'chain-bracelet',
          published_at: '2021-11-09T11:09:13+07:00',
          template_suffix: 'pf-75986e20',
          tags: ['Beads'],
          variants: [
            {
              id: 41038975336621,
              title: 'Blue',
              price: Number('43.00'),
              sku: null,
              inventory_policy: 'deny',
              compare_at_price: Number('45.00'),
              inventory_management: null,
              option1: 'Blue',
              option2: null,
              option3: null,
              taxable: true,
              barcode: null,
              weight: 0,
              weight_unit: 'kg',
              inventory_quantity: 0,
              requires_shipping: true,
            },
            {
              id: 41038975369389,

              title: 'Black',
              price: Number('43.00'),
              sku: null,
              inventory_policy: 'deny',
              compare_at_price: Number('45.00'),
              inventory_management: null,
              option1: 'Black',
              option2: null,
              option3: null,
              taxable: true,
              barcode: null,
              weight: 0,
              weight_unit: 'kg',
              inventory_quantity: -1,
              requires_shipping: true,
            },
          ],
          options: [
            {
              id: 9026903310509,
              product_id: 7051602264237,
              name: 'Color',
              position: 1,
              values: ['Blue', 'Black'],
            },
          ],
          images: [
            {
              id: 31201211220141,
              product_id: 7051602264237,
              position: 1,
              alt: '7 Shakra Bracelet 112-Company 123-Beads',
              width: 925,
              height: 1386,
              src:
                'https://cdn.shopify.com/s/files/1/0586/2709/6749/products/7-chakra-bracelet_925x_b963ef97-e355-4b62-b9d6-a605664da913.jpg?v=1646019696',
            },
            {
              id: 31201211252909,
              product_id: 7051602264237,
              position: 2,
              alt: '7 Shakra Bracelet 112-Company 123-Beads',
              width: 925,
              height: 618,
              src:
                'https://cdn.shopify.com/s/files/1/0586/2709/6749/products/navy-blue-chakra-bracelet_925x_2ce18fe4-84c8-48ef-8ed5-869f0aa511e6.jpg?v=1646019696',
            },
            {
              id: 31207273824429,
              product_id: 7051602264237,
              position: 3,
              alt: '7 Shakra Bracelet 112-Company 123-Beads',
              width: 1200,
              height: 1800,
              src: 'https://cdn.shopify.com/s/files/1/0586/2709/6749/products/chair.jpg?v=1646019698',
            },
            {
              id: 31207275102381,
              product_id: 7051602264237,
              position: 4,
              alt: '7 Shakra Bracelet 112-Company 123-Beads',
              width: 2736,
              height: 4104,
              src: 'https://cdn.shopify.com/s/files/1/0586/2709/6749/products/pexels-photo-9671348.jpg?v=1646019703',
            },
            {
              id: 31207276937389,
              product_id: 7051602264237,
              position: 5,
              alt: '7 Shakra Bracelet 112-Company 123-Beads',
              width: 2736,
              height: 4104,
              src:
                'https://cdn.shopify.com/s/files/1/0586/2709/6749/products/pexels-photo-9671348_6db279dd-acbf-4606-9e84-e720461b6f84.jpg?v=1646019704',
            },
            {
              id: 31207278641325,
              product_id: 7051602264237,
              position: 6,
              alt: '7 Shakra Bracelet 112-Company 123-Beads',
              width: 3456,
              height: 5184,
              src: 'https://cdn.shopify.com/s/files/1/0586/2709/6749/products/pexels-photo-9731737.jpg?v=1645153656',
            },
            {
              id: 31499821416621,
              product_id: 7051602264237,
              position: 7,
              alt: '7 Shakra Bracelet 112-Company 123-Beads',
              width: 500,
              height: 625,
              src: 'https://cdn.shopify.com/s/files/1/0586/2709/6749/products/pexels-photo-11284548.jpg?v=1646019259',
            },
            {
              id: 31499832000685,
              product_id: 7051602264237,
              position: 8,
              alt: '7 Shakra Bracelet 112-Company 123-Beads',
              width: 1200,
              height: 800,
              src: 'https://cdn.shopify.com/s/files/1/0586/2709/6749/products/couch_2d2cec42-0197-4584-ae98-133a75fd9dd9.jpg?v=1646019699',
            },
          ],
          featured_image: {
            id: 31201211220141,
            product_id: 7051602264237,
            position: 1,
            alt: '7 Shakra Bracelet 112-Company 123-Beads',
            width: 925,
            height: 1386,
            src:
              'https://cdn.shopify.com/s/files/1/0586/2709/6749/products/7-chakra-bracelet_925x_b963ef97-e355-4b62-b9d6-a605664da913.jpg?v=1646019696',
          },
        },
        fulfillment: {
          created_at: '2022-02-08T15:43:42+07:00',
          tracking_company: null,
          fulfillment_line_items: [
            {
              id: 11019580506285,
              variant_id: 41038975336621,
              title: '7 Shakra Bracelet 11',
              quantity: 1,
              sku: null,
              vendor: 'Company 123',
              fulfillment_service: 'manual',
              product_id: 7051602264237,
              requires_shipping: true,
              taxable: true,
              gift_card: false,
              properties: [],
              grams: 0,
              discount_allocations: [],
              tax_lines: [
                {
                  title: 'VAT',
                  price: Number('5'),
                  rate: 0.1,
                  rate_percentage: 0.1,
                },
              ],
            },
            {
              id: 11019580539053,
              variant_id: 41038975369389,
              title: '7 Shakra Bracelet 11',
              quantity: 1,
              sku: null,
              vendor: 'Company 123',
              fulfillment_service: 'manual',
              product_id: 7051602264237,
              requires_shipping: true,
              taxable: true,
              gift_card: false,
              properties: [],
              grams: 0,
              discount_allocations: [],
              tax_lines: [
                {
                  title: 'VAT',
                  price: Number('4'),
                  rate: 0.1,
                  rate_percentage: 0.1,
                },
              ],
            },
          ],
          item_count: 2,
          tracking_number: null,
          tracking_url: null,
        },
        unit_price: Number('43.0'),
        final_line_price: Number('43.0'),
      },
    ],
    line_items_subtotal_price: 8600,
    name: '#1002',
    note: null,
    order_number: 1002,
    order_status_url:
      'https://lemanhtuong1.myshopify.com/58627096749/orders/bf9476514bfd9c899431c95223dec220/authenticate?key=5e74f3b5603e685bf368866fd98eb8d1',
    phone: null,
    shipping_address: {
      first_name: '234',
      address1: '1',
      phone: null,
      city: 'HN',
      zip: '4',
      province: null,
      country: 'Vietnam',
      last_name: 'Tuong123',
      address2: '',
      company: null,
      name: 'Tuong123 234',
      country_code: 'VN',
      province_code: null,
    },
    shipping_methods: [],
    shipping_price: 0,
    subtotal_price: 8600,
    tags: [],
    tax_lines: [],
    tax_price: 900,
    total_discounts: 0,
    total_net_amount: 9500,
    total_price: 9500,
    total_refunded_amount: 0,
    transactions: [],
  };
};

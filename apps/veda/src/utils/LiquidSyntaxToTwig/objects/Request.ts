import { ShopLocale } from './ShopLocale';
import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#request */
interface _Request {
  design_mode: boolean;
  host: string;
  locale: ShopLocale;
  origin: string;
  page_type:
    | '404'
    | 'article'
    | 'blog'
    | 'cart'
    | 'collection'
    | 'list-collections'
    | 'customers/account'
    | 'customers/activate_account'
    | 'customers/addresses'
    | 'customers/login'
    | 'customers/order'
    | 'customers/register'
    | 'customers/reset_password'
    | 'gift_card'
    | 'index'
    | 'page'
    | 'password'
    | 'product'
    | 'search';
  path: string;
}

export type Request = DeepNullable<_Request> | null;

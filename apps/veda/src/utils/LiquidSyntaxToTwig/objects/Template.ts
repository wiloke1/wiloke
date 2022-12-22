import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#template */
interface _Template {
  directory: string;
  name:
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
  suffix: string;
}

export type Template = DeepNullable<_Template> | null;

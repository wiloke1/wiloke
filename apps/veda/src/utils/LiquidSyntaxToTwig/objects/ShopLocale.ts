import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#shop_locale */
interface _ShopLocale {
  endonym_name: string;
  iso_code: string;
  name: string;
  primary: boolean;
  root_url: string;
}

export type ShopLocale = DeepNullable<_ShopLocale> | null;

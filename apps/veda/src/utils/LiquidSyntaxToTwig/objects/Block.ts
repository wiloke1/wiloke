import { DeepNullable } from './@utils';

type SettingObject = any;
type ShopifyAttributes = any;

/**
 * @link https://shopify.dev/api/liquid/objects#block
 */
interface _Block {
  id: number;
  settings: SettingObject;
  shopify_attributes: ShopifyAttributes;
  type: string;
}

export type Block = DeepNullable<_Block> | null;

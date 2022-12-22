import { Address } from './Address';
import { Metafield } from './Metafield';
import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#location */
interface _Location {
  address: Address;
  id: number;
  latitude: number;
  longitude: number;
  metafields: Metafield;
  name: string;
}

export type Location = DeepNullable<_Location> | null;

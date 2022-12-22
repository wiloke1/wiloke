import { Location } from './Location';
import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#store_availability */
interface _StoreAvailability {
  available: boolean;
  location: Location;
  pick_up_enabled: boolean;
  pick_up_time: string;
}

export type StoreAvailability = DeepNullable<_StoreAvailability> | null;

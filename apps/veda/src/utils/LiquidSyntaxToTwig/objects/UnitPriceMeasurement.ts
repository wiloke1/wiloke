import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#unit_price_measurement */
interface _UnitPriceMeasurement {
  measured_type: 'volume' | 'weight' | 'dimension';
  quantity_unit: string;
  quantity_value: string;
  reference_unit: string;
  reference_value: string;
}

export type UnitPriceMeasurement = DeepNullable<_UnitPriceMeasurement> | null;

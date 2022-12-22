import { PredictiveSearchResources } from './PredictiveSearchResources';
import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#predictive_search */
interface _PredictiveSearch {
  performed: boolean;
  resources: PredictiveSearchResources;
  terms: string;
  types: string[];
}

export type PredictiveSearch = DeepNullable<_PredictiveSearch> | null;

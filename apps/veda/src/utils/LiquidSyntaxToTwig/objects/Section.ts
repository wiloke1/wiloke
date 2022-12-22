import { Block } from './Block';
import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#section */
interface _Section {
  blocks: Block[];
  id: string;
  settings: any[];
}

export type Section = DeepNullable<_Section> | null;

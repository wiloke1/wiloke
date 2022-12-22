import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#tablerowloop */
interface _TableRowLoop {
  col: number;
  col0: number;
  col_first: boolean;
  col_last: boolean;
  first: boolean;
  index: number;
  index0: number;
  last: boolean;
  length: number;
  rindex: number;
  rindex0: number;
  row: number;
}

export type TableRowLoop = DeepNullable<_TableRowLoop> | null;

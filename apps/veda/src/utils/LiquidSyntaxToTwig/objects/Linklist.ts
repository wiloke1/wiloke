import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#linklist */
interface _Linklist {
  handle: string;
  levels: number;
  links: _Linklist[];
  title: string;
}

export type Linklist = DeepNullable<_Linklist> | null;

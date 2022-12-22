/** @link https://shopify.dev/api/liquid/objects#forloop */
interface _Forloop {
  first: boolean;
  index: number;
  index0: number;
  last: boolean;
  length: number;
  parentloop: Forloop;
  rindex: number;
  rindex0: number;
}

export type Forloop = _Forloop;

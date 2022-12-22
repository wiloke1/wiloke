import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#user_agent */
interface _UserAgent {
  directive: any;
  value: string;
}

export type UserAgent = DeepNullable<_UserAgent> | null;

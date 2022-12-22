import { Rule } from './Rule';
import { Sitemap } from './Sitemap';
import { UserAgent } from './UserAgent';
import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#group */
interface _Group {
  rules: Rule[];
  sitemap: Sitemap;
  user_agent: UserAgent;
}

export type Group = DeepNullable<_Group> | null;

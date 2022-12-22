/** @link https://shopify.dev/api/liquid/objects#sort_option */
export type SortOption =
  | {
      name: string;
      value: string;
    }
  | [string, string];

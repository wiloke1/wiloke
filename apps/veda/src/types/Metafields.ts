export type OwnerType = 'PRODUCT' | 'COLLECTION' | 'ARTICLE' | 'BLOG';

export interface Metafield {
  //
  ownerType: OwnerType;
  //
  id: string;
  // The type of data that the metafield will store
  type: {
    category: string;
    name: string;
  };
  // The namespace of the metafield definition
  namespace: string;
  // The key name used to identify a metafield definition within a namespace
  key: string;
  // The human-readable name for the metafield definition.
  name: string;
  //
  description: string;
  //
  cursor: string;
}

/** Những metafields types mà không được dùng trong liquid */
export const Unusable_Metafields = {
  interger: 'Interger',
  json_string: 'Json string',
  string: 'String',
  'list.color': 'Color',
};

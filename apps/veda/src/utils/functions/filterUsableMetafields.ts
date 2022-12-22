import { Unusable_Metafields } from 'types/Metafields';

export const filterUsableMetafields = (type: string) => {
  return !Object.keys(Unusable_Metafields).includes(type);
};

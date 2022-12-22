import { at } from 'utils/at';
import { Collection, Image, NonEmptyValue } from 'utils/LiquidSyntaxToTwig';
import { normalizationProduct, ProductItem } from './Product';

type Collection_ExpectNumberButServerResponseIsString = 'id';
type Collection_ObjectHasUnexpectResponse = 'products' | 'next_product' | 'prev_product' | 'featured_image' | 'image';
type Collection_ExpectExistButServerResponseIsNonExist =
  | 'filters' // cái này dường như không thể lấy được;
  | 'metafieldsAnchor'; // cái này dường như không thể lấy được;

type FeaturedImage_ExpectNumberButServerResponseIsString = 'id';
interface FeaturedImage_RedundantFieldInResponse {
  url?: string;
  variant_ids?: string[];
}
type FeaturedImageItem = Omit<NonEmptyValue<Image>, FeaturedImage_ExpectNumberButServerResponseIsString> &
  Record<FeaturedImage_ExpectNumberButServerResponseIsString, string> &
  FeaturedImage_RedundantFieldInResponse;

export type CollectionItem = Omit<
  NonEmptyValue<Collection>,
  Collection_ExpectNumberButServerResponseIsString | Collection_ObjectHasUnexpectResponse | Collection_ExpectExistButServerResponseIsNonExist
> &
  Record<Collection_ExpectNumberButServerResponseIsString, string> &
  Partial<Record<Extract<Collection_ObjectHasUnexpectResponse, 'products'>, Array<ProductItem>>> &
  Partial<
    Record<Extract<Collection_ObjectHasUnexpectResponse, 'next_product' | 'prev_product'>, ProductItem> &
      Partial<Record<Extract<Collection_ObjectHasUnexpectResponse, 'featured_image'>, FeaturedImageItem>> &
      Partial<Record<Extract<Collection_ObjectHasUnexpectResponse, 'image'>, FeaturedImageItem>>
  >;

/**
 * function chuyển những dữ liệu mà BE trả về sai
 * ví dụ: "id" BE đang trả về string nhưng cái cần là number -> cần transform -> lúc đó function này sẽ đảm nhiệm
 */

export const normalizationCollection = (collection: CollectionItem): Collection => {
  let delta = collection.all_products_count && collection.products ? collection.all_products_count - collection.products.length : 0;
  const products = collection.products ?? [];
  while (delta > 0 && products[0]) {
    products.push(products[0]);
    delta--;
  }
  // @ts-ignore
  return {
    ...collection,
    all_tags: products.reduce<string[]>((tags, product) => {
      if (Array.isArray(product.tags) && product.tags?.length) {
        return tags.concat(product.tags as string[]);
      }
      return tags;
    }, []),
    current_type: at(collection.all_types, 0) ?? null,
    current_vendor: at(collection.all_vendors, 0) ?? null,
    id: Number(collection.id),
    products: products?.map(normalizationProduct),
    next_product: null,
    previous_product: null,
    featured_image: {
      ...collection.featured_image,
      id: !collection.featured_image ? null : Number(collection.featured_image.id),
    },
    image: {
      ...collection.image,
      id: !collection.image ? null : Number(collection.image.id),
    },
  };
};

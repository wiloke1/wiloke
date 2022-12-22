import { at } from 'utils/at';
import { NonEmptyValue, Product, Variant, Image, Media } from 'utils/LiquidSyntaxToTwig';
import { CollectionItem } from './Collection';

type Product_ExpectNumberButServerResponseIsString = 'id' | 'price' | 'price_max' | 'price_min';
type Product_DeepObjectHasUnexpectResponse =
  | 'variants'
  | 'selected_or_first_available_variant'
  | 'selected_variant'
  | 'first_available_variant'
  | 'featured_image'
  | 'images'
  | 'media'
  | 'featured_media';
// | 'collections'; // Bên api "collections" đang sai nên nếu có "collections" tại api này thì có lẽ cũng sẽ sai
type Collection_ExpectExistButServerResponseIsNonExist =
  | 'has_only_default_variant'
  | 'collections'
  | 'metafields' // Có lẽ sẽ không thể lấy đc
  | 'options_by_name'
  | 'requires_selling_plan' // Có lẽ sẽ không thể lấy đc
  | 'selected_or_first_available_selling_plan_allocation' // Có lẽ sẽ không thể lấy đc
  | 'selected_selling_plan' // Có lẽ sẽ không thể lấy đc
  | 'selected_selling_plan_allocation' // Có lẽ sẽ không thể lấy đc
  | 'selling_plan_groups' // Có lẽ sẽ không thể lấy đc
  | 'template_suffix';
type FeaturedImage_ExpectNumberButServerResponseIsString = 'id';
interface FeaturedImage_RedundantFieldInResponse {
  url?: string;
  variant_ids?: string[];
}
type FeaturedImageItem = Omit<NonEmptyValue<Image>, FeaturedImage_ExpectNumberButServerResponseIsString> &
  Record<FeaturedImage_ExpectNumberButServerResponseIsString, string> &
  FeaturedImage_RedundantFieldInResponse;

type FeaturedMedia_ExpectNumberButServerResponseIsString = 'id';
type FeaturedMedia_DeepObjectHasUnexpectResponse = 'preview_image';
type FeaturedMediaItem = Omit<
  NonEmptyValue<Media>,
  FeaturedMedia_ExpectNumberButServerResponseIsString | FeaturedMedia_DeepObjectHasUnexpectResponse
> &
  Record<FeaturedMedia_ExpectNumberButServerResponseIsString, string> &
  Partial<Record<Extract<FeaturedMedia_DeepObjectHasUnexpectResponse, 'preview_image'>, FeaturedImageItem>>;

type VariantItem_DeepObjectHasUnexpectResponse = 'featured_image' | 'image';
type Variant_ExpectNumberButServerResponseIsString = 'id';
type VariantItem = Omit<NonEmptyValue<Variant>, Variant_ExpectNumberButServerResponseIsString | VariantItem_DeepObjectHasUnexpectResponse> &
  Record<Variant_ExpectNumberButServerResponseIsString, string> &
  Partial<Record<Extract<VariantItem_DeepObjectHasUnexpectResponse, 'featured_image' | 'image'>, FeaturedImageItem>>;

export type ProductItem = Omit<
  NonEmptyValue<Product>,
  Product_ExpectNumberButServerResponseIsString | Product_DeepObjectHasUnexpectResponse | Collection_ExpectExistButServerResponseIsNonExist
> &
  Record<Product_ExpectNumberButServerResponseIsString, string> &
  Partial<Record<Extract<Product_DeepObjectHasUnexpectResponse, 'variants'>, Array<VariantItem> | undefined>> &
  Partial<
    Record<
      Extract<Product_DeepObjectHasUnexpectResponse, 'selected_or_first_available_variant' | 'selected_variant' | 'first_available_variant'>,
      VariantItem
    >
  > &
  Partial<Record<Extract<Product_DeepObjectHasUnexpectResponse, 'featured_image'>, FeaturedImageItem>> &
  Partial<Record<Extract<Product_DeepObjectHasUnexpectResponse, 'images'>, FeaturedImageItem[]>> &
  Partial<Record<Extract<Product_DeepObjectHasUnexpectResponse, 'featured_media'>, FeaturedMediaItem>> &
  Partial<Record<Extract<Product_DeepObjectHasUnexpectResponse, 'media'>, FeaturedMediaItem[]>> &
  Partial<Record<Extract<Product_DeepObjectHasUnexpectResponse, 'collections'>, Array<CollectionItem>>>;

const handleProductUrl = (handle: NonEmptyValue<Product>['url']) => `/products/${handle}`;

/**
 * function chuyển những dữ liệu mà BE trả về sai
 * ví dụ: "id" BE đang trả về string nhưng cái cần là number -> cần transform -> lúc đó function này sẽ đảm nhiệm
 */
export const normalizationProduct = (product: Partial<ProductItem>): Product => {
  return {
    ...product,
    has_only_default_variant: Array.isArray(product.options) ? at(product.options, 0) === 'Title' : true,
    id: Number(product.id),
    price: Number(product.price) * 100,
    price_max: Number(product.price_max) * 100,
    price_min: Number(product.price_min) * 100,
    compare_at_price: product.compare_at_price ? product.compare_at_price * 100 : null,
    compare_at_price_max: product.compare_at_price_max ? product.compare_at_price_max * 100 : null,
    compare_at_price_min: product.compare_at_price_min ? product.compare_at_price_min * 100 : null,
    url: product.url ? product.url : handleProductUrl(product.handle),
    // NOTE: những cái 2 access 2 cấp trở lên sẽ phải check trường hợp undefined hoặc null
    featured_image: {
      ...product.featured_image,
      id: product.featured_image ? Number(product.featured_image.id) : null,
    },
    // NOTE: những cái 2 access 2 cấp trở lên sẽ phải check trường hợp undefined hoặc null
    images: (product.images ?? [])?.map(image => ({
      ...image,
      id: image ? Number(image.id) : null,
    })),
    // NOTE: những cái 2 access 2 cấp trở lên sẽ phải check trường hợp undefined hoặc nul
    featured_media: !product.featured_media
      ? null
      : {
          ...product.featured_media,
          id: Number(product.featured_media.id),
          preview_image: !product.featured_media.preview_image
            ? null
            : {
                ...product.featured_media.preview_image,
                id: Number(product.featured_media.preview_image.id),
              },
        },
    // NOTE: những cái 2 access 2 cấp trở lên sẽ phải check trường hợp undefined hoặc null
    media: (product.media ?? []).map(media => ({
      ...media,
      id: Number(media.id),
      preview_image: {
        ...media.preview_image,
        id: media.preview_image ? Number(media.preview_image.id) : null,
      },
    })),
    collections: [], // product.collections?.map(normalizationCollection)
    // @ts-ignore
    variants: (product.variants ?? []).map<NonEmptyValue<Variant>>(variant => ({
      ...variant,
      id: variant?.id ? Number(variant.id) : (variant?.id as any),
      compare_at_price: variant?.compare_at_price ? Number(variant.compare_at_price) * 100 : (variant?.compare_at_price as any),
      price: variant?.price ? Number(variant.price) * 100 : variant?.price,
      featured_image: {
        ...variant.featured_image,
        id: variant.featured_image ? Number(variant.featured_image.id) : null,
      },
      image: {
        ...variant.image,
        id: variant.image ? Number(variant.image.id) : null,
      },
    })),
    // NOTE: những cái 2 access 2 cấp trở lên sẽ phải check trường hợp undefined hoặc null
    selected_or_first_available_variant: !product.selected_or_first_available_variant
      ? null
      : {
          ...product.selected_or_first_available_variant,
          id: Number(product.selected_or_first_available_variant.id),
          compare_at_price: product.selected_or_first_available_variant?.compare_at_price
            ? Number(product.selected_or_first_available_variant.compare_at_price) * 100
            : (product.selected_or_first_available_variant?.compare_at_price as any),
          price: product.selected_or_first_available_variant?.price
            ? Number(product.selected_or_first_available_variant.price) * 100
            : product.selected_or_first_available_variant?.price,
          featured_image: {
            ...product.selected_or_first_available_variant.featured_image,
            id: product.selected_or_first_available_variant.featured_image
              ? Number(product.selected_or_first_available_variant.featured_image.id)
              : null,
          },
          image: {
            ...product.selected_or_first_available_variant.image,
            id: Number(product.selected_or_first_available_variant.image),
          },
        },
    // NOTE: những cái 2 access 2 cấp trở lên sẽ phải check trường hợp undefined hoặc null
    first_available_variant: !product.first_available_variant
      ? null
      : {
          ...product.first_available_variant,
          id: Number(product.first_available_variant.id),
          compare_at_price: product.first_available_variant?.compare_at_price
            ? Number(product.first_available_variant.compare_at_price) * 100
            : (product.first_available_variant?.compare_at_price as any),
          price: product.first_available_variant?.price
            ? Number(product.first_available_variant.price) * 100
            : product.first_available_variant?.price,
          featured_image: {
            ...product.first_available_variant.featured_image,
            id: product.first_available_variant.featured_image ? Number(product.first_available_variant.featured_image.id) : null,
          },
          image: {
            ...product.first_available_variant.image,
            id: product.first_available_variant.image ? Number(product.first_available_variant.image.id) : null,
          },
        },
    // NOTE: những cái 2 access 2 cấp trở lên sẽ phải check trường hợp undefined hoặc null
    selected_variant: !product.selected_variant
      ? null
      : {
          ...product.selected_variant,
          id: Number(product.selected_variant.id),
          compare_at_price: product.selected_variant?.compare_at_price
            ? Number(product.selected_variant.compare_at_price) * 100
            : (product.selected_variant?.compare_at_price as any),
          price: product.selected_variant?.price ? Number(product.selected_variant.price) * 100 : product.selected_variant?.price,
          featured_image: {
            ...product.selected_variant.featured_image,
            id: product.selected_variant.featured_image ? Number(product.selected_variant.featured_image.id) : null,
          },
          image: {
            ...product.selected_variant.image,
            id: product.selected_variant.image ? Number(product.selected_variant.image.id) : null,
          },
        },
  };
};

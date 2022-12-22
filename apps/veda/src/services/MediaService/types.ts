import { ProductItem } from 'components/ChooseImage/reducers/reducerShopify';

export interface ShopifyMediaResponse {
  message: string;
  status: string;
  data: {
    items: ProductItem[];
    hasNextPage: boolean;
  };
}

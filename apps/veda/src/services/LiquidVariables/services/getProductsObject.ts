import { AxiosResponse } from 'axios';
import configureApp from 'configureApp';
import { without } from 'ramda';
import { GET_PRODUCT_PLACEHOLDER } from 'store/reducers/liquid/randomPlaceholderLiquidObject/GET_PRODUCT_PLACEHOLDER';
import { getCurrentVersion } from 'utils/CacheControl/CacheControl';
import fetchAPI from 'utils/functions/fetchAPI';
import { getShopName } from 'utils/functions/getUserInfo';
import { Product } from 'utils/LiquidSyntaxToTwig';
import { normalizationProduct, ProductItem } from '../utils/Product';

interface GetProductsObject {
  idOfProductsPicked: number[];
}

interface GetProductsObjectResponse {
  products: Record<string, Product>;
  failureIds: number[];
  successIds: number[];
}

interface BE_Response {
  products: ProductItem[];
}
interface BE_Params {
  shopName: string;
  ids: string;
}

const limitProductIdsPerRequest = 3;

export const getProductsObject = async ({ idOfProductsPicked }: GetProductsObject): Promise<GetProductsObjectResponse> => {
  if (!idOfProductsPicked.length) {
    return {
      products: {},
      failureIds: [],
      successIds: [],
    } as GetProductsObjectResponse;
  }
  if (configureApp.apiFake) {
    return {
      products: idOfProductsPicked.reduce<GetProductsObjectResponse['products']>(res => {
        const product = GET_PRODUCT_PLACEHOLDER();
        if (product && product.handle) {
          return {
            ...res,
            [product.handle]: product,
          };
        }
        return res;
      }, {}),
      failureIds: [],
      successIds: idOfProductsPicked,
    };
  } else {
    const idsForRequest = idOfProductsPicked.slice(0, limitProductIdsPerRequest);
    const response: AxiosResponse<BE_Response> = await fetchAPI.request({
      baseURL: '',
      url: `${configureApp.endpoint['shopify-connections']}/products/static`,
      params: {
        shopName: getShopName(),
        version: getCurrentVersion(),
        ids: idsForRequest.join(','),
      } as BE_Params,
    });
    const products = response.data.products.reduce<Record<string, Product>>((res, product) => {
      if (product && product.handle) {
        return {
          ...res,
          [product.handle]: normalizationProduct(product),
        };
      }
      return res;
    }, {});
    return {
      products,
      successIds: idsForRequest,
      failureIds: without(idsForRequest, idOfProductsPicked),
    };
  }
};

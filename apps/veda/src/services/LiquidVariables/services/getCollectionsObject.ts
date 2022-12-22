import { AxiosResponse } from 'axios';
import configureApp from 'configureApp';
import { without } from 'ramda';
import { GET_COLLECTION_ITEM_PLACEHOLDER } from 'store/reducers/liquid/randomPlaceholderLiquidObject';
import { getCurrentVersion } from 'utils/CacheControl/CacheControl';
import fetchAPI from 'utils/functions/fetchAPI';
import { getShopName } from 'utils/functions/getUserInfo';
import { Collection } from 'utils/LiquidSyntaxToTwig';
import { CollectionItem, normalizationCollection } from '../utils/Collection';

interface GetCollectionsObject {
  idOfCollectionsPicked: number[];
}

interface GetCollectionObjectResponse {
  collections: Record<string, Collection>;
  failureIds: number[];
  successIds: number[];
}

interface BE_Response {
  collections: CollectionItem[];
}
interface BE_ExpectParams {
  shopName: string;
  ids: string;
}

const limitCollectionIdsPerRequest = 1;

export const getCollectionsObject = async ({ idOfCollectionsPicked }: GetCollectionsObject): Promise<GetCollectionObjectResponse> => {
  if (!idOfCollectionsPicked.length) {
    return {
      collections: {},
      failureIds: [],
      successIds: [],
    };
  }
  if (configureApp.apiFake) {
    return {
      collections: idOfCollectionsPicked.reduce(res => {
        const collection = GET_COLLECTION_ITEM_PLACEHOLDER();
        if (collection && collection.handle) {
          return {
            ...res,
            [collection.handle]: collection,
          };
        }
        return res;
      }, {}),
      failureIds: [],
      successIds: idOfCollectionsPicked,
    };
  } else {
    const idsForRequest = idOfCollectionsPicked.slice(0, limitCollectionIdsPerRequest);

    const response: AxiosResponse<BE_Response> = await fetchAPI.request({
      baseURL: '',
      url: `${configureApp.endpoint['shopify-connections']}/collections/static`,
      params: {
        shopName: getShopName(),
        version: getCurrentVersion(),
        ids: idsForRequest.join(','),
      } as BE_ExpectParams,
    });

    const collections = response.data.collections.reduce<Record<string, Collection>>((res, collection) => {
      if (collection && collection.handle) {
        return {
          ...res,
          [collection.handle]: normalizationCollection(collection),
        };
      }
      return res;
    }, {});
    return {
      collections,
      failureIds: without(idsForRequest, idOfCollectionsPicked),
      successIds: idsForRequest,
    };
  }
};

import { retry, put, SagaReturnType, select, takeLeading } from 'redux-saga/effects';
import { shopifyConnectionService } from 'services/ShopifyConnection';
import { getMetafields } from 'store/actions/shopify/actionMetafields';
import { shopifySelector } from 'store/selectors';
import { filterUsableMetafields } from 'utils/functions/filterUsableMetafields';
import { getActionType } from 'wiloke-react-core/utils';
import { graphqlForGetMetafields } from './graphqls';

function* handleGetMetafields({ payload }: ReturnType<typeof getMetafields.request>) {
  const { ownerType } = payload;
  const metafieldsState: SagaReturnType<typeof shopifySelector.metafields> = yield select(shopifySelector.metafields);
  const { statusRequest, hasNextPage, data } = metafieldsState[ownerType];
  try {
    if (statusRequest !== 'success') {
      const response: SagaReturnType<typeof shopifyConnectionService.graphqlForMetafields> = yield retry(
        3,
        1000,
        shopifyConnectionService.graphqlForMetafields,
        graphqlForGetMetafields(ownerType),
      );
      yield put(
        getMetafields.success({
          ownerType,
          hasNextPage: response.hasNextPage,
          data: response.metafields.filter(item => filterUsableMetafields(item.type.name)),
        }),
      );
    } else {
      yield put(
        getMetafields.success({
          ownerType,
          hasNextPage,
          data,
        }),
      );
    }
  } catch (error) {
    yield put(getMetafields.failure({ ownerType }));
  }
}

export function* watchGetMetafields() {
  yield takeLeading(getActionType(getMetafields.request), handleGetMetafields);
}

import { retry, put, SagaReturnType, select, takeLeading } from 'redux-saga/effects';
import { shopifyConnectionService } from 'services/ShopifyConnection';
import { loadmoreMetafields } from 'store/actions/shopify/actionMetafields';
import { shopifySelector } from 'store/selectors';
import { at } from 'utils/at';
import { filterUsableMetafields } from 'utils/functions/filterUsableMetafields';
import { getActionType } from 'wiloke-react-core/utils';
import { graphqlForLoadmoreMetafields } from './graphqls';

function* handleLoadmoreMetafields({ payload }: ReturnType<typeof loadmoreMetafields.request>) {
  const { ownerType } = payload;
  const metafieldsState: SagaReturnType<typeof shopifySelector.metafields> = yield select(shopifySelector.metafields);
  const { hasNextPage, data } = metafieldsState[ownerType];
  try {
    const lastCursor = at(data, -1)?.cursor;
    if (hasNextPage && lastCursor) {
      const response: SagaReturnType<typeof shopifyConnectionService.graphqlForMetafields> = yield retry(
        3,
        1000,
        shopifyConnectionService.graphqlForMetafields,
        graphqlForLoadmoreMetafields(ownerType, lastCursor),
      );
      yield put(
        loadmoreMetafields.success({
          ownerType,
          hasNextPage: response.hasNextPage,
          data: response.metafields.filter(item => filterUsableMetafields(item.type.name)),
        }),
      );
    } else {
      yield put(
        loadmoreMetafields.success({
          ownerType,
          hasNextPage: false,
          data: [],
        }),
      );
    }
  } catch (error) {
    yield put(loadmoreMetafields.failure({ ownerType }));
  }
}

export function* watchLoadmoreMetafields() {
  yield takeLeading(getActionType(loadmoreMetafields.request), handleLoadmoreMetafields);
}

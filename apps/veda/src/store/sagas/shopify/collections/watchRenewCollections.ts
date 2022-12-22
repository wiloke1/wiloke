import { put, retry, select, takeLatest } from '@redux-saga/core/effects';
import { notification } from 'antd';
import { collectionService } from 'services/ShopifyServices/Collection';
import { renewCollections } from 'store/actions/shopify';
import { CollectionState } from 'store/reducers/shopify/reducerCollection';
import { shopifySelector } from 'store/selectors';
import { i18n } from 'translation';
import { renewVersion } from 'utils/CacheControl/CacheControl';
import { getActionType } from 'wiloke-react-core/utils';

function* handleRenewCollections() {
  renewVersion();
  try {
    const { searchKey }: CollectionState = yield select(shopifySelector.collections);
    const response: Awaited<ReturnType<typeof collectionService.getCollections>> = yield retry(3, 500, collectionService.getCollections, searchKey);
    yield put(renewCollections.success({ data: response.info, hasNextPage: response.hasNextPage }));
    notification.success({ message: i18n.t('general.renew_data_success') });
  } catch (error) {
    notification.error({ message: i18n.t('general.renew_data_failure') });
    const _err = error as Error;
    yield renewCollections.failure({ message: _err.message });
  }
}

export function* watchRenewCollections() {
  yield takeLatest(getActionType(renewCollections.request), handleRenewCollections);
}

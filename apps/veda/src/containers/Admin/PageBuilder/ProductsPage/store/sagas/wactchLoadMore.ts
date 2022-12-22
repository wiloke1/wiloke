import { all, call, put, retry, takeLatest } from '@redux-saga/core/effects';
import { AdminPageData } from 'containers/Admin/types';
import { shopifyConnectionService } from 'services/ShopifyConnection';
import { transformFilterType } from 'services/PagesBuilderService/utils/transformFilterType';
import { loadMorePagesClient } from 'services/PageService/Logic/loadMorePagesClient';
import { BE_PageClient } from 'services/PageService/VedaApplication/types';
import { at } from 'utils/at';
import { getActionType } from 'wiloke-react-core/utils';
import { actionLoadMoreProductPage } from '../actions';

function* handleGet({ payload }: ReturnType<typeof actionLoadMoreProductPage.request>) {
  const { s, pageType, filterType, lastCursor } = payload;
  try {
    const response: Awaited<ReturnType<typeof loadMorePagesClient>> = yield call(loadMorePagesClient, {
      pageType,
      enable: filterType === 'all' ? undefined : transformFilterType(filterType),
      label: s,
      lastCursor,
    });
    const responseData = response.info as BE_PageClient[];

    const additionOfProductPages: Awaited<ReturnType<typeof shopifyConnectionService.getAdditionalDataRelateToShopify>>[] = yield all(
      responseData.map(item => retry(3, 1000, shopifyConnectionService.getAdditionalDataRelateToShopify, { pageCommandId: item.commandId })),
    );
    const finalData = responseData.reduce<AdminPageData[]>((res, page, index) => {
      const additionData = at(additionOfProductPages, index);
      if (additionData?.info) {
        const { shopifyPages, shopifyRepresentPage, isApplyToAll } = additionData.info;
        return res.concat({ ...page, shopifyPages: isApplyToAll ? 'all' : shopifyPages, shopifyRepresentPage });
      }
      return res;
    }, []);

    yield put(actionLoadMoreProductPage.success({ data: finalData, hasNextPage: responseData.length > 0 ? true : false }));
  } catch (error) {
    yield put(actionLoadMoreProductPage.failure(undefined));
  }
}

export function* watchLoadMoreProductPages() {
  yield takeLatest(getActionType(actionLoadMoreProductPage.request), handleGet);
}

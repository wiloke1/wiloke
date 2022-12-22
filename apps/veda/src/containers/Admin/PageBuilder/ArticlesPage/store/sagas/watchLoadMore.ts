import { all, call, put, retry, takeLatest } from '@redux-saga/core/effects';
import { AdminPageData } from 'containers/Admin/types';
import { shopifyConnectionService } from 'services/ShopifyConnection';
import { transformFilterType } from 'services/PagesBuilderService/utils/transformFilterType';
import { loadMorePagesClient } from 'services/PageService/Logic/loadMorePagesClient';
import { BE_PageClient } from 'services/PageService/VedaApplication/types';
import { at } from 'utils/at';
import { getActionType } from 'wiloke-react-core/utils';
import { actionLoadMoreArticlePage } from '../actions';

function* handleGet({ payload }: ReturnType<typeof actionLoadMoreArticlePage.request>) {
  const { filterType, lastCursor, pageType, s } = payload;
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

    let _hasNextPage = true;
    if (finalData.length === 0) {
      _hasNextPage = false;
    } else {
      _hasNextPage = true;
    }

    yield put(actionLoadMoreArticlePage.success({ data: finalData, hasNextPage: _hasNextPage }));
  } catch (error) {
    yield put(actionLoadMoreArticlePage.failure(undefined));
  }
}

export function* watchLoadMoreArticlePages() {
  yield takeLatest(getActionType(actionLoadMoreArticlePage.request), handleGet);
}

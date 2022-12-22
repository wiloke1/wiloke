import { all, put, retry, takeLatest } from '@redux-saga/core/effects';
import { AdminPageData } from 'containers/Admin/types';
import { shopifyConnectionService } from 'services/ShopifyConnection';
import { transformFilterType } from 'services/PagesBuilderService/utils/transformFilterType';
import { getPagesClient } from 'services/PageService/Logic/getPagesClient';
import { BE_PageClient } from 'services/PageService/VedaApplication/types';
import { at } from 'utils/at';
import { getActionType } from 'wiloke-react-core/utils';
import { actionGetCollectionPages } from '../actions';

function* handleGet({ payload }: ReturnType<typeof actionGetCollectionPages.request>) {
  const { s, pageType, filterType } = payload;
  try {
    const response: Awaited<ReturnType<typeof getPagesClient>> = yield retry(3, 500, getPagesClient, {
      pageType,
      enable: filterType === 'all' ? undefined : transformFilterType(filterType),
      label: s,
    });
    const responseData = response.info as BE_PageClient[];

    const additionOfProductPages: Awaited<ReturnType<typeof shopifyConnectionService.getAdditionalDataRelateToShopify>>[] = yield all(
      responseData.map(item => retry(3, 1000, shopifyConnectionService.getAdditionalDataRelateToShopify, { pageCommandId: item.commandId })),
    );

    const finalData = responseData.reduce<AdminPageData[]>((res, page, index) => {
      const additionData = at(additionOfProductPages, index);
      if (additionData?.info) {
        const { shopifyPages, shopifyRepresentPage, isApplyToAll, isOverrideIndividualPages } = additionData.info;
        return res.concat({
          ...page,
          shopifyPages: isApplyToAll ? 'all' : shopifyPages,
          shopifyRepresentPage,
          isOverrideIndividualPages,
        });
      }
      return res;
    }, []);
    yield put(actionGetCollectionPages.success({ data: finalData }));
  } catch (error) {
    console.log('watchGetCollectionPages', error);
    yield put(actionGetCollectionPages.failure(undefined));
  }
}

export function* watchGetCollectionPages() {
  yield takeLatest(getActionType(actionGetCollectionPages.request), handleGet);
}

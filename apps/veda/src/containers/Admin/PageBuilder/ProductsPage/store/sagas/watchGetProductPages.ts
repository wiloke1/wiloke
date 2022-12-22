import { all, put, retry, takeLatest } from '@redux-saga/core/effects';
import { AxiosError } from 'axios';
import { AdminPageData } from 'containers/Admin/types';
import { shopifyConnectionService } from 'services/ShopifyConnection';
import { transformFilterType } from 'services/PagesBuilderService/utils/transformFilterType';
import { getPagesClient } from 'services/PageService/Logic/getPagesClient';
import { BE_PageClient } from 'services/PageService/VedaApplication/types';
import { at } from 'utils/at';
import customLog from 'utils/functions/log';
import { ErrorData } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { actionGetProductPages } from '../actions';

function* handleGet({ payload }: ReturnType<typeof actionGetProductPages.request>) {
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
        const { shopifyPages, shopifyRepresentPage, isApplyToAll } = additionData.info;
        return res.concat({ ...page, shopifyPages: isApplyToAll ? 'all' : shopifyPages, shopifyRepresentPage });
      }
      return res;
    }, []);

    yield put(actionGetProductPages.success({ data: finalData }));
  } catch (error) {
    customLog('watchGetProductPages', `${(error as AxiosError<ErrorData>).response?.data.message}`, error);
    yield put(actionGetProductPages.failure(undefined));
  }
}

export function* watchGetProductPages() {
  yield takeLatest(getActionType(actionGetProductPages.request), handleGet);
}

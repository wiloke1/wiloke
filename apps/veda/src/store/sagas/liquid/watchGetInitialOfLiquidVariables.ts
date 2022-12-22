import { all, delay, put, select, takeEvery } from '@redux-saga/core/effects';
import { getInitialOfLiquidVariables } from 'store/actions/liquid/actionLiquidVariables';
import { defaultPickerRelateShopifySelector, liquidVariablesSelector } from 'store/selectors';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { handleGetBlogsObject } from './watchGetBlogsObject';
import { handleGetCartObject } from './watchGetCartObject';
import { handleGetCollectionsObject } from './watchGetCollectionsObject';
import { handleGetCustomerObject } from './watchGetCustomerObject';
import { handleGetGlobalObjectFake } from './watchGetGlobalObjectFake';
import { handleGetLocalizationObject } from './watchGetLocalizationObject';
import { handleGetPagesObject } from './watchGetPagesObject';
import { handleGetProductsObject } from './watchGetProductsObject';
import { handleGetShopObject } from './watchGetShopObject';
import { handleGetThemeObjectNCss } from './watchGetThemeObjectNCss';
import { handleGetTranslationObject } from './watchGetTranslationsObject';

export const THRESHOLD = 100;

export function* handleGetInitialOfLiquidVariables() {
  const defaultPickerFieldRelateShopify: ReturnType<typeof defaultPickerRelateShopifySelector> = yield select(defaultPickerRelateShopifySelector);
  const liquidVariablesSelectors: ReturnType<typeof liquidVariablesSelector> = yield select(liquidVariablesSelector);
  const { statusGetInitialOfLiquidVariables } = liquidVariablesSelectors;

  const { product, collection, blog } = defaultPickerFieldRelateShopify.data;
  try {
    if (statusGetInitialOfLiquidVariables === 'failure') {
      yield delay(3000);
    }
    yield all([
      handleGetCartObject({ type: '@LiquidVariables/getCartObjectRequest', payload: undefined }),
      handleGetCustomerObject({ type: '@LiquidVariables/getCustomerObjectRequest', payload: undefined }),
      handleGetProductsObject({
        type: '@LiquidVariables/getProductsObjectRequest',
        payload: { products: product && product !== 'Không tồn tại' ? [product] : undefined },
      }),
      handleGetProductsObject({ type: '@LiquidVariables/getProductsObjectRequest', payload: {} }),
      handleGetCollectionsObject({
        type: '@LiquidVariables/getCollectionsObjectRequest',
        payload: { collections: collection && collection !== 'Không tồn tại' ? [collection] : undefined },
      }),
      handleGetCollectionsObject({ type: '@LiquidVariables/getCollectionsObjectRequest', payload: {} }),
      handleGetBlogsObject({
        type: '@LiquidVariables/getBlogsObjectRequest',
        payload: { blogs: blog && blog !== 'Không tồn tại' ? [blog] : undefined },
      }),
      handleGetBlogsObject({ type: '@LiquidVariables/getBlogsObjectRequest', payload: {} }),
      handleGetPagesObject({ type: '@LiquidVariables/getPagesObjectRequest', payload: {} }),
      handleGetGlobalObjectFake({ type: '@LiquidVariables/getGlobalObjectFakeRequest', payload: undefined }),
      handleGetTranslationObject({ type: '@LiquidVariables/getLiquidTranslationsObjectRequest', payload: {} }),
      handleGetThemeObjectNCss({
        type: '@LiquidVariables/getThemeObjectNCssRequest',
        payload: { variant: 'Action chạy khi vào build hoặc vào client theme manager' },
      }),
      handleGetShopObject({ type: '@LiquidVariables/getShopObjectRequest', payload: undefined }),
      handleGetLocalizationObject({ type: '@LiquidVariables/getLocalizationObjectRequest', payload: undefined }),
    ]);
    const liquidVariablesAfterRequests: ReturnType<typeof liquidVariablesSelector> = yield select(liquidVariablesSelector);
    const {
      statusRequestCartObject: statusRequestCartObjectAfterRequests,
      statusRequestCustomerObject: statusRequestCustomerObjectAfterRequests,
      statusRequestLocalizationObject: statusRequestLocalizationObjectAfterRequests,
      statusRequestShopObject: statusRequestShopObjectAfterRequests,
      statusRequestThemeCssObject: statusRequestThemeCssObjectAfterRequests,
      blogSlugsFailed,
      pageSlugsFailed,
      productIdsFailed,
      collectionIdsFailed,
      translationLocalesFailed,
    } = liquidVariablesAfterRequests;
    if (
      statusRequestCartObjectAfterRequests === 'success' &&
      statusRequestCustomerObjectAfterRequests === 'success' &&
      statusRequestLocalizationObjectAfterRequests === 'success' &&
      statusRequestShopObjectAfterRequests === 'success' &&
      statusRequestThemeCssObjectAfterRequests === 'success' &&
      !blogSlugsFailed.length &&
      !pageSlugsFailed.length &&
      !productIdsFailed.length &&
      !collectionIdsFailed.length &&
      !translationLocalesFailed.length
    ) {
      yield put(getInitialOfLiquidVariables.success(undefined));
    } else if (
      statusRequestCartObjectAfterRequests === 'failure' ||
      statusRequestCustomerObjectAfterRequests === 'failure' ||
      statusRequestLocalizationObjectAfterRequests === 'failure' ||
      statusRequestShopObjectAfterRequests === 'failure' ||
      statusRequestThemeCssObjectAfterRequests === 'failure' ||
      blogSlugsFailed.length ||
      pageSlugsFailed.length ||
      productIdsFailed.length ||
      collectionIdsFailed.length ||
      translationLocalesFailed.length
    ) {
      yield put(getInitialOfLiquidVariables.failure(undefined));
    }
  } catch (error) {
    console.log('watchGetInitialOfLiquidVariables', error);
    notifyAxiosHandler.handleError(error as Error);
    yield put(getInitialOfLiquidVariables.failure(undefined));
  }
}

export function* watchGetInitialOfLiquidVariables() {
  yield takeEvery(getActionType(getInitialOfLiquidVariables.request), handleGetInitialOfLiquidVariables);
}

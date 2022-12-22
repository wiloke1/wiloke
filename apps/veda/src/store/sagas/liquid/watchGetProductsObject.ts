import { put, retry, select, takeEvery } from '@redux-saga/core/effects';
import { difference } from 'lodash';
import { uniq } from 'ramda';
import { liquidVariables } from 'services/LiquidVariables';
import { getProductsObject, setSlugsRequest } from 'store/actions/liquid/actionLiquidVariables';
import { liquidVariablesSelector, pagesSelector } from 'store/selectors';
import { ProductPageLiquidVariable } from 'types/Page';
import { SettingSingleProductPicker } from 'types/Schema';
import getPageInfo from 'utils/functions/getInfo';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';

type SettingProductPickerResult = Exclude<SettingSingleProductPicker['children'], undefined>;

/** NOTE: Nếu update function này thì xem xét việc update PageLiquidVariable tại src/types/Page.ts để code có thể clean hơn */
export function* handleGetProductsObject({ payload }: ReturnType<typeof getProductsObject.request>) {
  const liquidVariablesSelectors: ReturnType<typeof liquidVariablesSelector> = yield select(liquidVariablesSelector);
  const pageId = getPageInfo('id');
  const { data: page }: ReturnType<typeof pagesSelector> = yield select(pagesSelector);
  const { sections, shopifyRepresentPage, type } = page[pageId];

  const { productIdsLoaded, productIdsLoading, productIdsFailed, data } = liquidVariablesSelectors;
  const { all_products, product } = data;

  const _shopifyRepresentPage = shopifyRepresentPage as ProductPageLiquidVariable;
  const isProductPage = Boolean(_shopifyRepresentPage && _shopifyRepresentPage.handle && _shopifyRepresentPage.itemId && type === 'product');

  const productsPicked =
    payload.products ??
    (sections ?? [])
      .reduce<SettingProductPickerResult[]>((res, section) => {
        if (!section.enable) {
          return res;
        }
        const productsPicked: SettingProductPickerResult[] = [];
        section.data.settings.forEach(setting => {
          if (setting.type === 'productPicker' && setting.children) {
            const _children = setting.children as SettingProductPickerResult;
            productsPicked.push(_children);
          }
          if (setting.type === 'object') {
            setting.children.forEach(({ children, type }) => {
              if (type === 'productPicker' && children) {
                const _children = children as SettingProductPickerResult;
                productsPicked.push(_children);
              }
            });
          }
          if (setting.type === 'array') {
            setting.children.forEach(arrayItem => {
              arrayItem.children.forEach(({ children, type }) => {
                if (type === 'productPicker' && children) {
                  const _children = children as SettingProductPickerResult;
                  productsPicked.push(_children);
                }
              });
            });
          }
        });
        return res.concat(productsPicked);
      }, [])
      .concat(isProductPage && _shopifyRepresentPage ? _shopifyRepresentPage : []);
  const productIdsUniq = uniq(
    payload.products
      ? productsPicked.map(product => product.itemId)
      : difference(productsPicked.map(product => product.itemId).concat(productIdsFailed), productIdsLoading.concat(productIdsLoaded)),
  );

  if (!productIdsUniq.length) {
    const payloadForAction = {
      products: all_products,
      // @tuong -> Tất cả products liên quan đến page đã được fetch về và cache lại kết quả
      // -> Nếu product được apply cho page tồn tại thì nó thực sự sẽ có data ("products[_shopifyRepresentPage.handle]" là có)
      // -> Nếu product được apply cho page là không tồn tại thì lấy cái trước đó (cái trước đó chắc chắn sẽ là product placeholder)
      product: isProductPage && _shopifyRepresentPage ? all_products[_shopifyRepresentPage.handle] ?? product : null,
    };
    yield put(getProductsObject.success(payloadForAction));
    payload.onSuccess?.(payloadForAction);
    return;
  }
  // Đánh dấu các slug đang trạng thái loading
  yield put(setSlugsRequest.request({ products: productIdsUniq }));

  try {
    const { products: productsResponse, successIds, failureIds }: Awaited<ReturnType<typeof liquidVariables.getProductsObject>> = yield retry(
      3,
      1000,
      liquidVariables.getProductsObject,
      {
        idOfProductsPicked: productIdsUniq,
      },
    );
    const payloadForAction = {
      products: productsResponse,
      product:
        isProductPage && _shopifyRepresentPage
          ? productsResponse[_shopifyRepresentPage.handle] ??
            productsResponse[_shopifyRepresentPage.itemId] ??
            all_products[_shopifyRepresentPage.handle]
          : null,
    };

    yield put(getProductsObject.success(payloadForAction));
    // Đánh dấu những slug đã được load
    if (successIds.length) {
      yield put(setSlugsRequest.success({ products: successIds }));
    }
    if (failureIds.length) {
      yield put(setSlugsRequest.failure({ products: failureIds }));
    }
    payload.onSuccess?.(payloadForAction);
  } catch (error) {
    yield put(getProductsObject.failure(undefined));
    payload.onFailure?.();
    if (notifyAxiosHandler.isAxiosError(error)) {
      // Đánh dấu những slug load bị lỗi
      yield put(setSlugsRequest.failure({ products: productIdsUniq }));
    } else {
      yield put(setSlugsRequest.otherException({ products: productIdsUniq }));
      notifyAxiosHandler.handleError(error as Error);
    }
  }
}

export function* watchGetProductsObject() {
  yield takeEvery(getActionType(getProductsObject.request), handleGetProductsObject);
}

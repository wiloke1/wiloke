import { put, retry, takeEvery } from '@redux-saga/core/effects';
import { uniq } from 'ramda';
import { select } from 'redux-saga/effects';
import { liquidVariables } from 'services/LiquidVariables';
import { getCollectionsObject, getProductsObject, setSlugsRequest } from 'store/actions/liquid/actionLiquidVariables';
import { liquidVariablesSelector, pageDataSelector } from 'store/selectors';
import { SettingCollectionPicker } from 'types/Schema';
import { Product } from 'utils/LiquidSyntaxToTwig';
import { getActionType } from 'wiloke-react-core/utils';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { CollectionPageLiquidVariable } from 'types/Page';
import { difference } from 'lodash';

type SettingCollectionPickerResult = Exclude<SettingCollectionPicker['children'], undefined>;

/** NOTE: Nếu update function này thì xem xét việc update PageLiquidVariable tại src/types/Page.ts để code có thể clean hơn */
export function* handleGetCollectionsObject({ payload }: ReturnType<typeof getCollectionsObject.request>) {
  const liquidVariablesSelectors: ReturnType<typeof liquidVariablesSelector> = yield select(liquidVariablesSelector);
  const { sections, shopifyRepresentPage, type }: ReturnType<typeof pageDataSelector> = yield select(pageDataSelector);
  const { collectionIdsLoaded, collectionIdsLoading, collectionIdsFailed, data } = liquidVariablesSelectors;
  const { collections, collection } = data;

  const _shopifyRepresentPage = shopifyRepresentPage as CollectionPageLiquidVariable;
  const isCollectionPage = _shopifyRepresentPage && _shopifyRepresentPage.handle && _shopifyRepresentPage.itemId && type === 'collection';
  const collectionsPicked = (
    payload.collections ??
    (sections ?? []).reduce<SettingCollectionPickerResult[]>((res, section) => {
      if (!section.enable) {
        return res;
      }
      const collectionIds: SettingCollectionPickerResult[] = [];
      section.data.settings.forEach(setting => {
        if (setting.type === 'collectionPicker' && setting.children) {
          const _children = setting.children as SettingCollectionPickerResult;
          collectionIds.push(_children);
        }
        if (setting.type === 'object') {
          setting.children.forEach(({ children, type }) => {
            if (type === 'collectionPicker') {
              const _children = children as SettingCollectionPickerResult;
              collectionIds.push(_children);
            }
          });
        }
        if (setting.type === 'array') {
          setting.children.forEach(arrayItem => {
            arrayItem.children.forEach(({ children, type }) => {
              if (type === 'collectionPicker' && children) {
                const _children = children as SettingCollectionPickerResult;
                collectionIds.push(_children);
              }
            });
          });
        }
      });
      return res.concat(collectionIds);
    }, [])
  ).concat(isCollectionPage ? (_shopifyRepresentPage as SettingCollectionPickerResult) : []);
  const collectionIdsUniq = uniq(
    payload.collections
      ? collectionsPicked.map(collection => collection.itemId)
      : difference(
          collectionsPicked.map(collection => collection.itemId).concat(collectionIdsFailed),
          collectionIdsLoading.concat(collectionIdsLoaded),
        ),
  );

  if (!collectionIdsUniq.length) {
    const actionForPayload = {
      collections,
      // @tuong -> Tất cả collections liên quan đến page đã được fetch về và cache lại kết quả
      // -> Nếu collection được apply cho page tồn tại thì nó thực sự sẽ có data ("collections[_shopifyRepresentPage.handle]" là có)
      // -> Nếu collection được apply cho page là không tồn tại thì lấy cái trước đó (cái trước đó chắc chắn sẽ là collection placeholder)
      collection: isCollectionPage && _shopifyRepresentPage ? collections[_shopifyRepresentPage.handle] ?? collection : null,
    };
    yield put(getCollectionsObject.success(actionForPayload));
    payload.onSuccess?.(actionForPayload);
    return;
  }

  // Đánh dấu các slug đang trạng thái loading
  yield put(setSlugsRequest.request({ collections: collectionIdsUniq }));

  try {
    const {
      collections: collectionsResponse,
      failureIds,
      successIds,
    }: Awaited<ReturnType<typeof liquidVariables.getCollectionsObject>> = yield retry(3, 1000, liquidVariables.getCollectionsObject, {
      idOfCollectionsPicked: collectionIdsUniq,
    });

    const products = Object.values(collectionsResponse).reduce<Record<string, Product>>((obj, collection) => {
      let productsOfCollection: Record<string, Product> = {};
      collection?.products?.forEach(product => {
        if (product && product?.handle) {
          productsOfCollection = {
            ...productsOfCollection,
            // @ts-ignore
            [product.handle]: product as Product,
          };
        }
      });
      return { ...obj, ...productsOfCollection };
    }, {});

    yield put(getProductsObject.success({ products, product: undefined }));
    yield put(
      getCollectionsObject.success({
        collections: collectionsResponse,
        collection:
          isCollectionPage && _shopifyRepresentPage
            ? collectionsResponse[_shopifyRepresentPage.handle] ?? collections[_shopifyRepresentPage.handle]
            : null,
      }),
    );
    // Đánh dấu những slug đã được load
    if (successIds.length) {
      yield put(
        setSlugsRequest.success({
          collections: successIds,
          products: Object.values(products).reduce<number[]>((ids, product) => {
            if (product?.id) {
              return ids.concat(product.id);
            }
            return ids;
          }, []),
        }),
      );
    }
    if (failureIds.length) {
      yield put(setSlugsRequest.failure({ collections: failureIds }));
    }

    payload.onSuccess?.({
      collections: collectionsResponse,
      collection:
        isCollectionPage && _shopifyRepresentPage
          ? collectionsResponse[_shopifyRepresentPage.handle] ?? collections[_shopifyRepresentPage.handle]
          : null,
    });
  } catch (error) {
    yield put(getCollectionsObject.failure(undefined));
    payload.onFailure?.();
    if (notifyAxiosHandler.isAxiosError(error)) {
      // Đánh dấu những slug load bị lỗi
      yield put(setSlugsRequest.failure({ collections: collectionIdsUniq }));
    } else {
      yield put(setSlugsRequest.otherException({ collections: collectionIdsUniq }));
      notifyAxiosHandler.handleError(error as Error);
    }
  }
}

export function* watchGetCollectionsObject() {
  yield takeEvery(getActionType(getCollectionsObject.request), handleGetCollectionsObject);
}

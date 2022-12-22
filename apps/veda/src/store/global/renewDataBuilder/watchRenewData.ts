import { notification } from 'antd';
import { all, put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { liquidVariables } from 'services/LiquidVariables';
import { shopifyBlogService } from 'services/ShopifyServices/Blog';
import { collectionService } from 'services/ShopifyServices/Collection';
import { productService } from 'services/ShopifyServices/ProductService';
import { getDefaultPickerFieldRelateShopify } from 'store/actions/liquid/actionDefaultPickerFieldRelateShopify';
import {
  getInitialOfLiquidVariables,
  getLocalizationObject,
  getThemeObjectNCss,
  renewLiquidVariables,
} from 'store/actions/liquid/actionLiquidVariables';
import { i18n } from 'translation';
import { at } from 'utils/at';
import { renewVersion } from 'utils/CacheControl/CacheControl';
import { Theme } from 'utils/LiquidSyntaxToTwig';
import { getActionType } from 'wiloke-react-core/utils';
import { renewData } from './actions';

function* handleRenewData() {
  try {
    renewVersion();
    const [productResponse, collectionResponse, blogResponse, localizationResponse, { theme }]: [
      SagaReturnType<typeof productService.getProducts>,
      SagaReturnType<typeof collectionService.getCollections>,
      SagaReturnType<typeof shopifyBlogService.getBlogStatic>,
      SagaReturnType<typeof liquidVariables.getLocalizationObject>,
      SagaReturnType<typeof liquidVariables.getThemeObject>,
    ] = yield all([
      retry(3, 1000, productService.getProducts, ''),
      retry(3, 1000, collectionService.getCollections, ''),
      retry(3, 1000, shopifyBlogService.getBlogStatic),
      retry(3, 1000, liquidVariables.getLocalizationObject),
      retry(3, 1000, liquidVariables.getThemeObject),
    ]);
    const { url }: Awaited<ReturnType<typeof liquidVariables.getThemeCss>> = yield retry(3, 1000, liquidVariables.getThemeCss, {
      themeId: theme.id,
    });

    // Lấy về các defaultPicker mới
    const firstProduct = at(productResponse.info, 0);
    const firstCollection = at(collectionResponse.info, 0);
    const firstBlog = at(blogResponse.info, 0);
    yield put(
      getDefaultPickerFieldRelateShopify.success({
        product: firstProduct
          ? { featuredImg: firstProduct.featuredImage?.src, handle: firstProduct.handle, itemId: Number(firstProduct.id) }
          : 'Không tồn tại',
        collection: firstCollection
          ? { featuredImg: firstCollection.image?.src, handle: firstCollection.handle, itemId: Number(firstCollection.id) }
          : 'Không tồn tại',
        blog: firstBlog ? { featuredImg: undefined, handle: firstBlog.handle, id: firstBlog.id } : 'Không tồn tại',
        article: undefined,
      }),
    );
    yield put(getLocalizationObject.success({ localization: localizationResponse.localization }));
    yield put(getThemeObjectNCss.success({ themeCss: url, theme: theme as Theme }));

    // Lấy về giá trị mới của các biến shopify nằm trong page đang build
    yield put(renewLiquidVariables());
    yield put(getInitialOfLiquidVariables.request(undefined));

    yield put(renewData.success(undefined));
    notification.success({ message: i18n.t('general.renew_data_success') });
  } catch (error) {
    notification.error({ message: i18n.t('general.renew_data_failure') });
    yield put(renewData.failure(undefined));
  }
}

export function* watchRenewData() {
  yield takeLatest(getActionType(renewData.request), handleRenewData);
}

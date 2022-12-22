import { addAddons } from 'containers/ChooseTemplate/store/actions';
import { setTemplateBoardVisible } from 'containers/ChooseTemplate/store/actions/actionTemplateBoardVisible';
import { put, retry, select, takeLatest } from 'redux-saga/effects';
import { addonService } from 'services/AddonService';
import { setAddonToPages } from 'store/actions/actionPages';
import { setSidebarTabActive } from 'store/actions/actionSidebarTabActive';
import { setThemeAddon } from 'store/global/themeAddons';
import { defaultPickerRelateShopifySelector } from 'store/selectors';
import { ProductAddon } from 'types/Addons';
import { ProductSection } from 'types/Sections';
import { adapterSectionHadShopifyData } from 'utils/adapterSectionHadShopifyData';
import { getActionType } from 'wiloke-react-core/utils';

/**
 * note: luồng saga
 * 1. Bấm vào add addon ở modal choose template
 * 2. Lấy được response là ThemeTemplate -> set response vào themeAddons và
 * set tiếp response vào cuối mảng của từng pages
 * 3. Chuyển tab và đóng modal
 */

function* handleInstall({ payload }: ReturnType<typeof addAddons.request>) {
  const { commandId } = payload;
  try {
    const response: Awaited<ReturnType<typeof addonService.addons.installClientAddon>> = yield retry(
      3,
      1000,
      addonService.addons.installClientAddon,
      commandId,
    );
    yield put(addAddons.success({ commandId }));

    const { data: defaultPickerRelateShopifyData }: ReturnType<typeof defaultPickerRelateShopifySelector> = yield select(
      defaultPickerRelateShopifySelector,
    );
    const { article, blog, collection, product } = defaultPickerRelateShopifyData;

    const responseAdapted = {
      ...response,
      body: {
        ...response.body,
        // NOTE: @tuong -> Có thể sử dụng những thứ khác để check (ví dụ: userId) thay vì check cứng theo nghiệp vụ như hiện tại
        // Nghiệp vụ hiện tại: Thêm Addons = chức năng "Thêm thành phần" tại trang builder => Chắc chắn sẽ phải tranform data shopify => Không check gì cả
        ...(adapterSectionHadShopifyData({ section: response.body, article, blog, collection, product, isImportAction: true }) as ProductSection),
      },
    };

    yield put(setThemeAddon({ addon: responseAdapted as ProductAddon }));
    yield put(setAddonToPages(responseAdapted.body));
    yield put(setSidebarTabActive('add-ons'));
    yield put(setTemplateBoardVisible({ visible: false, navKeys: ['addons'] }));
  } catch (error) {
    console.log({ error });
    yield put(addAddons.failure({ commandId }));
  }
}

export function* watchInstallAddons() {
  yield takeLatest(getActionType(addAddons.request), handleInstall);
}

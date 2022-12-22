import { put, retry, select, takeLatest } from 'redux-saga/effects';
import { megaMenuService } from 'services/MegaMenuService';
import { defaultPickerRelateShopifySelector, megaMenuSelector } from 'store/selectors';
import { ProductSection } from 'types/Sections';
import { adapterSectionsHadShopifyData } from 'utils/adapterSectionHadShopifyData';
import { getActionType } from 'wiloke-react-core/utils';
import { getSectionsMegaMenu } from '../actions';

function* handleGetSections(_: ReturnType<typeof getSectionsMegaMenu.request>) {
  try {
    const { data: defaultPickerRelateShopifyData }: ReturnType<typeof defaultPickerRelateShopifySelector> = yield select(
      defaultPickerRelateShopifySelector,
    );
    const { article, blog, collection, product } = defaultPickerRelateShopifyData;
    const { getSectionsStatus, megaSections }: ReturnType<typeof megaMenuSelector.userMegaMenu> = yield select(megaMenuSelector.userMegaMenu);
    if (getSectionsStatus === 'success') {
      yield put(getSectionsMegaMenu.success({ data: megaSections }));
    } else {
      const response: Awaited<ReturnType<typeof megaMenuService.mega_menu.getProductSections>> = yield retry(
        3,
        500,
        megaMenuService.mega_menu.getProductSections,
        '',
      );

      const dataSection = response;

      const adapt_sections = adapterSectionsHadShopifyData({
        sections: dataSection,
        article,
        blog,
        collection,
        product,
        isImportAction: false,
      }) as ProductSection[];
      yield put(getSectionsMegaMenu.success({ data: adapt_sections }));
    }
  } catch (error) {
    yield put(getSectionsMegaMenu.failure(undefined));
  }
}

export function* watchGetMegaMenuSections() {
  yield takeLatest(getActionType(getSectionsMegaMenu.request), handleGetSections);
}

import { AxiosError } from 'axios';
import setScrollTo from 'containers/IframePage/setScrollTo';
import { select, retry, put, takeLatest, delay } from 'redux-saga/effects';
import { sectionService } from 'services/SectionService';
import { addMegaMenusToPage, addSection, changeSection } from 'store/actions/actionPages';
import { chooseTemplateVisibleSelector, defaultPickerRelateShopifySelector } from 'store/selectors';
import { ProductSection } from 'types/Sections';
import { adapterSectionHadShopifyData } from 'utils/adapterSectionHadShopifyData';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { getSection, setTemplateBoardVisible } from '../../actions';

// get 1
function* handleGetOneSection({ payload }: ReturnType<typeof getSection.request>) {
  const { categoryId, sectionId } = payload;
  try {
    const { index, isChange, sectionType }: ReturnType<typeof chooseTemplateVisibleSelector> = yield select(chooseTemplateVisibleSelector);
    const { data: defaultPickerRelateShopifyData }: ReturnType<typeof defaultPickerRelateShopifySelector> = yield select(
      defaultPickerRelateShopifySelector,
    );
    const { article, blog, collection, product } = defaultPickerRelateShopifyData;

    const { data, message }: Awaited<ReturnType<typeof sectionService.sections.installClientSection>> = yield retry(
      3,
      1000,
      sectionService.sections.installClientSection,
      sectionId,
    );
    if (data) {
      if (data.megaMenuCommandIds && data.megaMenuCommandIds.length > 0) {
        const responseMegaMenu: Awaited<ReturnType<typeof sectionService.megaMenus.searchMegaMenusOfPublish>> = yield retry(
          3,
          1000,
          sectionService.megaMenus.searchMegaMenusOfPublish,
          data.megaMenuCommandIds,
        );
        // khi cài mega menu atom thì phải xóa commandId
        const _megaMenus = responseMegaMenu.map(item => ({ ...item, commandId: '' }));
        yield put(addMegaMenusToPage(_megaMenus));
      }

      const _section = {
        ...data,
        ...(adapterSectionHadShopifyData({ section: data, article, blog, collection, product, isImportAction: true }) as ProductSection),
        type: sectionType || data.type,
      };

      if (isChange) {
        yield put(changeSection(index, _section));
      } else {
        yield put(addSection(index, _section));
      }
      yield put(setTemplateBoardVisible({ visible: false, navKeys: ['sections'] }));

      yield put(
        getSection.success({
          sectionId: sectionId,
          data: _section,
          category: categoryId,
        }),
      );

      yield delay(100);
      setScrollTo(`[data-id="${_section.id}"]`, { timeout: 100 });
    } else {
      notifyAxiosHandler.handleErrorDetail({ error: message });
      yield put(getSection.failure({ message, sectionId }));
    }
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || '';
    notifyAxiosHandler.handleError(err);
    yield put(getSection.failure({ message, sectionId }));
  }
}

export function* watchSection() {
  yield takeLatest(getActionType(getSection.request), handleGetOneSection);
}

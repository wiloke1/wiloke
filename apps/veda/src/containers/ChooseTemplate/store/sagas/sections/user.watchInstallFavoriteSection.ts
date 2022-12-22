import { AxiosError } from 'axios';
import setScrollTo from 'containers/IframePage/setScrollTo';
import { delay, put, retry, SagaReturnType, select, takeLatest } from 'redux-saga/effects';
import { sectionService } from 'services/SectionService';
import { addMegaMenusToPage, addSection, changeSection } from 'store/actions/actionPages';
import { chooseTemplateVisibleSelector, defaultPickerRelateShopifySelector } from 'store/selectors';
import { ProductSection } from 'types/Sections';
import { adapterSectionHadShopifyData } from 'utils/adapterSectionHadShopifyData';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { installFavoriteSection, setTemplateBoardVisible } from '../../actions';

function* handleAction({ payload }: ReturnType<typeof installFavoriteSection.request>) {
  const { parentCommandId } = payload;
  try {
    const { index, isChange, sectionType }: ReturnType<typeof chooseTemplateVisibleSelector> = yield select(chooseTemplateVisibleSelector);
    const { data: defaultPickerRelateShopifyData }: ReturnType<typeof defaultPickerRelateShopifySelector> = yield select(
      defaultPickerRelateShopifySelector,
    );
    const { article, blog, collection, product } = defaultPickerRelateShopifyData;

    const { data, message }: SagaReturnType<typeof sectionService.sections.installClientSection> = yield retry(
      3,
      1000,
      sectionService.sections.installClientSection,
      parentCommandId,
    );

    if (data) {
      if (data.megaMenuCommandIds && data.megaMenuCommandIds.length > 0) {
        const responseMegaMenu: SagaReturnType<typeof sectionService.megaMenus.searchMegaMenusOfPublish> = yield retry(
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
        megaMenuCommandIds: [],
      };

      if (isChange) {
        yield put(changeSection(index, { ..._section, type: sectionType }));
      } else {
        yield put(addSection(index, _section));
      }

      yield put(setTemplateBoardVisible({ visible: false, navKeys: ['my_sections'] }));

      yield put(installFavoriteSection.success({ data: _section, parentCommandId }));

      yield delay(100);
      setScrollTo(`[data-id="${_section.id}"]`, { timeout: 100 });
    } else {
      notifyAxiosHandler.handleErrorDetail({ error: message });
      yield put(installFavoriteSection.failure({ parentCommandId }));
    }
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    notifyAxiosHandler.handleError(err);
    yield put(installFavoriteSection.failure({ parentCommandId }));
  }
}

export function* watchInstallFavoriteSection() {
  yield takeLatest(getActionType(installFavoriteSection.request), handleAction);
}

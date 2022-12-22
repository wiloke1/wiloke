import setScrollTo from 'containers/IframePage/setScrollTo';
import { delay, put, retry, select, takeLatest } from 'redux-saga/effects';
import { sectionService } from 'services/SectionService';
import { addMegaMenusToPage, addSection, changeSection } from 'store/actions/actionPages';
import { chooseTemplateVisibleSelector, defaultPickerRelateShopifySelector } from 'store/selectors';
import { adapterSectionHadShopifyData } from 'utils/adapterSectionHadShopifyData';
import { getActionType } from 'wiloke-react-core/utils';
import { installAdminSection, setTemplateBoardVisible } from '../../actions';

function* handleAdd({ payload: { commandId } }: ReturnType<typeof installAdminSection.request>) {
  try {
    const { index, isChange, sectionType }: ReturnType<typeof chooseTemplateVisibleSelector> = yield select(chooseTemplateVisibleSelector);
    const {
      data: { article, blog, collection, product },
    }: ReturnType<typeof defaultPickerRelateShopifySelector> = yield select(defaultPickerRelateShopifySelector);

    const response: Awaited<ReturnType<typeof sectionService.sections.installAtomSection>> = yield retry(
      3,
      1000,
      sectionService.sections.installAtomSection,
      commandId,
    );

    if (response.megaMenuCommandIds && response.megaMenuCommandIds.length > 0) {
      const responseMegaMenu: Awaited<ReturnType<typeof sectionService.megaMenus.searchMegaMenusOfAtom>> = yield retry(
        3,
        1000,
        sectionService.megaMenus.searchMegaMenusOfAtom,
        response.megaMenuCommandIds,
      );
      // khi cài mega menu atom thì phải xóa commandId
      const _megaMenus = responseMegaMenu.map(item => ({ ...item, commandId: '' }));
      yield put(addMegaMenusToPage(_megaMenus));
    }

    const _section = {
      ...response,
      ...adapterSectionHadShopifyData({ section: response, article, blog, collection, product, isImportAction: true }),
      type: sectionType || response.type,
    };

    if (isChange) {
      yield put(changeSection(index, _section));
    } else {
      yield put(addSection(index, _section));
    }

    yield put(setTemplateBoardVisible({ visible: false, navKeys: ['admin', 'Sections'] }));
    yield put(installAdminSection.success({ commandId }));
    yield delay(100);
    setScrollTo(`[data-id="${_section.id}"]`, { timeout: 100 });
  } catch (error) {
    yield put(installAdminSection.failure({ commandId }));
  }
}

export function* watchInstallAdminSection() {
  yield takeLatest(getActionType(installAdminSection.request), handleAdd);
}

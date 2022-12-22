import setScrollTo from 'containers/IframePage/setScrollTo';
import { put, retry, select, takeLatest } from 'redux-saga/effects';
import { sectionService } from 'services/SectionService';
import { addMegaMenusToPage, addSection } from 'store/actions/actionPages';
import { defaultPickerRelateShopifySelector } from 'store/selectors';
import { adapterSectionHadShopifyData } from 'utils/adapterSectionHadShopifyData';
import { getActionType } from 'wiloke-react-core/utils';
import { setTemplateBoardVisible } from '../../actions';
import { addAtomSectionNoRequestFlow } from '../../actions/flows/sections';

function* handleAddSection({ payload: { index, section } }: ReturnType<typeof addAtomSectionNoRequestFlow>) {
  const {
    data: { article, blog, collection, product },
  }: ReturnType<typeof defaultPickerRelateShopifySelector> = yield select(defaultPickerRelateShopifySelector);

  yield put(
    addSection(index, { ...section, ...adapterSectionHadShopifyData({ section, article, blog, collection, product, isImportAction: false }) }),
  );

  if (section.megaMenuCommandIds && section.megaMenuCommandIds.length > 0) {
    const megaMenuResponse: Awaited<ReturnType<typeof sectionService.megaMenus.searchMegaMenusOfAtom>> = yield retry(
      3,
      1000,
      sectionService.megaMenus.searchMegaMenusOfAtom,
      section.megaMenuCommandIds,
    );
    yield put(addMegaMenusToPage(megaMenuResponse));
  }

  setScrollTo(`[data-id="${section.id}"]`, { timeout: 100 });
  yield put(
    setTemplateBoardVisible({
      visible: false,
    }),
  );
}

export function* watchAddAtomSectionNoRequest() {
  yield takeLatest(getActionType(addAtomSectionNoRequestFlow), handleAddSection);
}

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { addMegaMenuToPage, changeMegaMenuSection, changeSection } from 'store/actions/actionPages';
import {
  addSectionToMegaMenuOfHeaderFooter,
  changeSectionToMegaMenuOfHeaderFooter,
  megaMenusOfHeaderFooterSelector,
} from 'store/global/megaMenusOfHeaderFooter';
import { pageSectionsSelector } from 'store/selectors';
import { deepFind } from 'utils/functions/deepFind';
import { removeDuplicate } from 'utils/functions/removeDuplicate';
import { getActionType } from 'wiloke-react-core/utils';
import { addUserMegaMenuFlow } from '../actions';

// hàm xử lý remove các mega menu không dùng đến nữa của section cha
function* handleRemoveUnusedMegaMenu({ sectionParentId }: { sectionParentId: string }) {
  const pageSections: ReturnType<typeof pageSectionsSelector> = yield select(pageSectionsSelector);
  const indexParent = pageSections.findIndex(section => section.id === sectionParentId);
  const sectionParentOfMegaMenu = pageSections.find(section => section.id === sectionParentId);

  if (sectionParentOfMegaMenu) {
    const megaMenusIds = deepFind(sectionParentOfMegaMenu, 'megaMenuId');
    const megaMenus = pageSections.filter(section => megaMenusIds.includes(section.id));
    const megaMenusCommandIds = megaMenus.map(megaMenu => megaMenu.commandId ?? '').filter(Boolean);

    yield put(
      changeSection(indexParent, {
        ...sectionParentOfMegaMenu,
        megaMenuCommandIds: megaMenusCommandIds,
      }),
    );
  }
}

function* handleAddMegaMenuFlow({ payload: { megaMenu, node, sectionParentId, onDone } }: ReturnType<typeof addUserMegaMenuFlow>) {
  const pageSections: ReturnType<typeof pageSectionsSelector> = yield select(pageSectionsSelector);
  const { megaMenusOfHeaderFooter }: ReturnType<typeof megaMenusOfHeaderFooterSelector> = yield select(megaMenusOfHeaderFooterSelector);

  // Nếu node hiện tại có mega menu thì thế mega menu mới vào mega menu cũ
  // Nếu node hiện tại không có mega menu thì add mới
  if (node.megaMenuId !== '') {
    const currentMegaMenuIndex = pageSections.findIndex(section => section.id === node.megaMenuId);
    // Check thêm trường hợp không tìm thấy index của mega menu cũ thì add mới
    if (currentMegaMenuIndex > -1) {
      yield put(changeMegaMenuSection(currentMegaMenuIndex, megaMenu));
    } else {
      yield put(addMegaMenuToPage(megaMenu));
    }

    // mega menu của theme
    const indexInMegaMenusOfHeaderFooter = megaMenusOfHeaderFooter.findIndex(section => section.id === node.megaMenuId);
    if (indexInMegaMenusOfHeaderFooter > -1) {
      yield put(
        changeSectionToMegaMenuOfHeaderFooter({
          index: indexInMegaMenusOfHeaderFooter,
          megaMenu,
        }),
      );
    } else {
      yield put(addSectionToMegaMenuOfHeaderFooter({ megaMenu }));
    }
  } else {
    yield put(addMegaMenuToPage(megaMenu));
    yield put(addSectionToMegaMenuOfHeaderFooter({ megaMenu }));
  }

  // thêm mega menu commandId được install vào section cha đang active
  if (sectionParentId) {
    const indexParent = pageSections.findIndex(section => section.id === sectionParentId);
    const sectionParentOfMegaMenu = pageSections.find(section => section.id === sectionParentId);
    if (sectionParentOfMegaMenu) {
      const megaMenuCommandIds = removeDuplicate([...(sectionParentOfMegaMenu.megaMenuCommandIds ?? []), megaMenu.commandId].filter(Boolean));

      yield put(
        changeSection(indexParent, {
          ...sectionParentOfMegaMenu,
          megaMenuCommandIds,
        }),
      );
    }
  }
  onDone?.();

  yield call(handleRemoveUnusedMegaMenu, { sectionParentId });
}

export function* watchAddUserMegaMenuFlow() {
  yield takeLatest(getActionType(addUserMegaMenuFlow), handleAddMegaMenuFlow);
}

import { head, last } from 'ramda';
import { call, put, SagaReturnType, select, takeLatest } from 'redux-saga/effects';
import { sortableSection } from 'store/actions/actionPages';
import { footerSectionsSelector, headerSectionsSelector, mainSectionsSelector } from 'store/selectors';
import { PageSectionType } from 'types/Sections';
import { isFooter, isHeader } from 'utils/functions/checkSectionType';
import getPageInfo from 'utils/functions/getInfo';
import { getActionType } from 'wiloke-react-core/utils';
import { sortSectionsFlow } from './action';

function* sortHeaders(sectionId: string, direction?: 'up' | 'down') {
  const headerSections: ReturnType<typeof headerSectionsSelector> = yield select(headerSectionsSelector);
  const lastHeader = last(headerSections);
  // khi bấm vào section cuối cùng của header thì sẽ chuyển xuống main
  if (lastHeader && lastHeader.id === sectionId) {
    if (direction === 'down') {
      return 'default';
    } else {
      return 'header';
    }
  } else {
    return 'header';
  }
}

function* sortMains(sectionId: string, direction?: 'up' | 'down') {
  const mainSections: ReturnType<typeof mainSectionsSelector> = yield select(mainSectionsSelector);

  // nếu main có length = 1 thì lúc bấm xuống thì thành footer, ngược lại thành header
  if (mainSections.length === 1) {
    if (direction === 'down') {
      return 'footer';
    } else {
      return 'header';
    }
  } else {
    // Nếu là section đầu tiên thì lúc bấm lên sẽ chuyển thành header, ngược lại là thành phần cuối cùng thì bấm xuống sẽ thành footer
    const lastMain = last(mainSections);
    const firstMain = head(mainSections);

    if (lastMain && lastMain.id === sectionId) {
      if (direction === 'down') {
        return 'footer';
      } else {
        return 'default';
      }
    } else if (firstMain && firstMain.id === sectionId) {
      if (direction === 'up') {
        return 'header';
      } else {
        return 'default';
      }
    } else {
      return 'default';
    }
  }
}

function* sortFooters(sectionId: string, direction?: 'up' | 'down') {
  const footerSections: ReturnType<typeof footerSectionsSelector> = yield select(footerSectionsSelector);
  const firstFooter = head(footerSections);
  // khi bấm vào section đầu tiên của footer thì sẽ chuyển lên main
  if (firstFooter && firstFooter.id === sectionId) {
    if (direction === 'up') {
      return 'default';
    } else {
      return 'footer';
    }
  } else {
    return 'footer';
  }
}

function* handleSortSections({ payload: { srcIndex, desIndex, sectionId, sectionType, direction } }: ReturnType<typeof sortSectionsFlow>) {
  const themeId = getPageInfo('themeId');

  let finalSectionType: undefined | PageSectionType;

  if (!!themeId) {
    console.log({
      srcIndex,
      desIndex,
      sectionId,
      currentType: sectionType,
      direction,
    });
    if (isHeader(sectionType)) {
      const newSectionType: SagaReturnType<typeof sortHeaders> = yield call(sortHeaders, sectionId, direction);
      finalSectionType = newSectionType;
    } else if (isFooter(sectionType)) {
      const newSectionType: SagaReturnType<typeof sortFooters> = yield call(sortFooters, sectionId, direction);
      finalSectionType = newSectionType;
    } else {
      const newSectionType: SagaReturnType<typeof sortMains> = yield call(sortMains, sectionId, direction);
      finalSectionType = newSectionType;
    }
    // Nếu type đầu vào khác với finalType - tức section đã đổi type thì desIndex = srcIndex => giữ nguyên vị trí chỉ đổi section type
    const finalDesIndex = sectionType !== finalSectionType ? srcIndex : desIndex;
    console.log({ srcIndex, finalDesIndex, finalSectionType });
    yield put(sortableSection(srcIndex, finalDesIndex, finalSectionType));
  } else {
    yield put(sortableSection(srcIndex, desIndex));
  }
}

export function* watchSortSectionsFlow() {
  yield takeLatest(getActionType(sortSectionsFlow), handleSortSections);
}

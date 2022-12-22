import { put, select, takeLatest } from 'redux-saga/effects';
import { setDeletedSectionAddonMegaMenuCommandIds, setSections } from 'store/actions/actionPages';
import { pageSectionsSelector } from 'store/selectors';
import { isSectionAddons } from 'utils/functions/checkSectionType';
import { pmParent } from 'utils/functions/postMessage';
import { getActionType } from 'wiloke-react-core/utils';
import { deleteAllSectionsFlow } from './action';

function* handleAction(_: ReturnType<typeof deleteAllSectionsFlow>) {
  const pageSections: ReturnType<typeof pageSectionsSelector> = yield select(pageSectionsSelector);

  const defaultOrMegaMenuSections = pageSections.filter(section => !isSectionAddons(section.type));
  const addonSections = pageSections.filter(section => isSectionAddons(section.type));

  for (const section of defaultOrMegaMenuSections) {
    if (section.commandId) {
      yield put(
        setDeletedSectionAddonMegaMenuCommandIds({
          ...(section.type === 'megamenu' ? { deletedMegaMenuCommandId: section.commandId } : { deletedSectionCommandId: section.commandId }),
        }),
      );
    }
    pmParent.emit('@section/delete', { sectionId: section.id });
  }

  yield put(setSections(addonSections));
}

export function* watchDeleteAllSectionsFlow() {
  yield takeLatest(getActionType(deleteAllSectionsFlow), handleAction);
}

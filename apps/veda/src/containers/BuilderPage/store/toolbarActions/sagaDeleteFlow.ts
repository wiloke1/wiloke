import { unhideSingleAddons } from 'containers/ChooseTemplate/store/reducers/addons/user.sliceAddons';
import { delay, put, select, takeLatest } from 'redux-saga/effects';
import { deleteSection, setDeletedSectionAddonMegaMenuCommandIds } from 'store/actions/actionPages';
import { setSectionIdActive } from 'store/actions/actionSectionIdActive';
import { setSectionEdittingId } from 'store/global/sectionEdittingId/actions';
import { deleteAddon, ThemeAddonsState } from 'store/global/themeAddons';
import { themeAddonsSelector } from 'store/selectors';
import { PageSection } from 'types/Sections';
import { isSectionAddons } from 'utils/functions/checkSectionType';
import { pmParent } from 'utils/functions/postMessage';
import { getActionType } from 'wiloke-react-core/utils';
import { sectionDeleteFlow } from './action';
import getSectionActive from './getSectionActiveForSaga';

function* handleSectionDelete(action: ReturnType<typeof sectionDeleteFlow>) {
  const { sectionIdActive, goBack } = action.payload;
  const { data }: ThemeAddonsState = yield select(themeAddonsSelector);
  // const sections: ReturnType<typeof pageSectionsSelector> = yield select(pageSectionsSelector);
  const currentAddon = data.find(addon => addon.sectionId === sectionIdActive);
  const sectionActive: PageSection = yield getSectionActive(sectionIdActive);

  // delete addon
  if (!!sectionActive.type && isSectionAddons(sectionActive.type)) {
    yield put(
      setDeletedSectionAddonMegaMenuCommandIds({
        deletedAddonCommandId: currentAddon?.commandId ?? '',
      }),
    );
    yield put(deleteAddon({ addonsSectionId: sectionIdActive, addonCommandId: currentAddon?.commandId ?? '', addonId: currentAddon?.id ?? '' }));
    yield put(unhideSingleAddons(currentAddon?.commandId ?? ''));
    yield put(deleteSection(sectionIdActive));
  } else {
    // delete section
    yield put(
      setDeletedSectionAddonMegaMenuCommandIds({
        deletedSectionCommandId: sectionActive?.commandId ?? '',
      }),
    );
    if (sectionActive?.megaMenuCommandIds && sectionActive?.megaMenuCommandIds.length > 0) {
      for (const megaMenuId of sectionActive.megaMenuCommandIds) {
        yield put(
          setDeletedSectionAddonMegaMenuCommandIds({
            deletedMegaMenuCommandId: megaMenuId,
          }),
        );
      }
    }
    yield put(deleteSection(sectionIdActive));
  }
  yield put(setSectionIdActive(''));
  yield delay(0);
  yield put(setSectionEdittingId(''));
  goBack();

  pmParent.emit('@section/sectionIdActive', '');
  pmParent.emit('@section/delete', { sectionId: sectionIdActive ?? '' });

  // const sectionIdsHasAddonDeleted = sections.filter(section => section.addonIds?.includes(sectionIdActive)).map(section => section.id);
  // pmParent.emit('@rerender', { sectionId: sectionIdsHasAddonDeleted, action: 'sagaDeleteFlow.ts' });
}

export function* watchSectionDeleteFlow() {
  yield takeLatest(getActionType(sectionDeleteFlow), handleSectionDelete);
}

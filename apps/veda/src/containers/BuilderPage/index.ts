import { combineReducers } from 'redux';
import BuilderPage from './BuilderPage';
import { watchUpdateVersionAddonFlow } from './components/UpdateVersion/flows/watchUpdateVersionAddonFlow';
import { watchUpdateVersionSectionFlow } from './components/UpdateVersion/flows/watchUpdateVersionSectionFlow';
import { watchAddonPositionStart } from './store/addonPosition/saga';
import { sliceAddonPositionStart } from './store/addonPosition/slice';
import { sliceAddonsTopBarMounted } from './store/addonsTopbarMounted/slice';
import { sliceFullScreen } from './store/fullScreen/slice';
import { sliceIframeLoaded } from './store/iframeLoaded/slice';
import { slicePreviewLoaded } from './store/previewLoaded/slice';
import { sliceResponsive } from './store/responsive/slice';
import {
  watchSaveAtomAddon,
  watchSaveAtomMegaMenu,
  watchSaveAtomSection,
  watchSaveDraftAddon,
  watchSaveDraftSection,
  watchSavePageAtom,
  watchSavePageDraft,
  watchSaveTheme,
  watchSaveDraftMegaMenu,
  watchSavePageClient,
  watchCancelSaveAtomSection,
  watchCancelAtomAddon,
  watchCancelAtomMegaMenu,
  watchCancelDraftAddon,
  watchCancelDraftMegaMenu,
  watchCancelSaveDraftSection,
  watchCancelSavePageAtom,
  watchCancelSavePageClient,
  watchCancelSavePageDraft,
} from './store/saveForBuilder/saga';
import { sliceSaveForBuilder } from './store/saveForBuilder/slice';
import { watchSelectPage } from './store/selectPage/saga';
import { sliceSelectPage } from './store/selectPage/slice';
import { sliceSettingsVisible } from './store/settingsVisible/slice';
import { watchDeleteAllSectionsFlow } from './store/toolbarActions/sagaDeleteAllSectionsFlow';
import { watchSectionDeleteFlow } from './store/toolbarActions/sagaDeleteFlow';
import { watchCancelModalDuplicateFlow, watchSectionDuplicateFlow, watchSectionModalDuplicateFlow } from './store/toolbarActions/sagaDuplicateFlow';
import { watchSortSectionsFlow } from './store/toolbarActions/sagaSortSectionsFlow';
import { sliceAddonsToKeep } from './store/toolbarActions/sliceAddonsToKeep';
import { sliceModalDeleteVisible } from './store/toolbarActions/sliceModalDeleteVisible';
import { sliceModalDuplicateVisible } from './store/toolbarActions/sliceModalDuplicateVisible';
import { sliceTwigLoading } from './store/twigLoading/slice';

const reducersBuilderPage = combineReducers({
  responsive: sliceResponsive.reducer,
  fullScreen: sliceFullScreen.reducer,
  addonPositionStart: sliceAddonPositionStart.reducer,
  addonsTopBarMounted: sliceAddonsTopBarMounted.reducer,
  toolbarActions: combineReducers({
    modalDeleteVisible: sliceModalDeleteVisible.reducer,
    modalDuplicateVisible: sliceModalDuplicateVisible.reducer,
    addonsToKeep: sliceAddonsToKeep.reducer,
  }),
  iframeLoaded: sliceIframeLoaded.reducer,
  previewLoaded: slicePreviewLoaded.reducer,
  selectPage: sliceSelectPage.reducer,
  twigLoading: sliceTwigLoading.reducer,
  saveForBuilder: sliceSaveForBuilder.reducer,
  settingsVisible: sliceSettingsVisible.reducer,
});

const sagasBuilderPage = [
  watchAddonPositionStart,
  watchSectionDuplicateFlow,
  watchSectionModalDuplicateFlow,
  watchCancelModalDuplicateFlow,
  watchSectionDeleteFlow,
  watchSelectPage,
  watchSaveAtomSection,
  watchSaveTheme,
  watchSavePageDraft,
  watchSavePageAtom,
  watchSaveAtomMegaMenu,
  watchSaveDraftSection,
  watchSaveDraftAddon,
  watchSaveAtomAddon,
  watchSaveDraftMegaMenu,
  watchSavePageClient,
  watchUpdateVersionSectionFlow,
  watchUpdateVersionAddonFlow,
  watchCancelSaveAtomSection,
  watchCancelAtomAddon,
  watchCancelAtomMegaMenu,
  watchCancelDraftAddon,
  watchCancelDraftMegaMenu,
  watchCancelSaveDraftSection,
  watchCancelSavePageAtom,
  watchCancelSavePageClient,
  watchCancelSavePageDraft,
  watchDeleteAllSectionsFlow,
  watchSortSectionsFlow,
];

export { BuilderPage, reducersBuilderPage, sagasBuilderPage };
export default BuilderPage;

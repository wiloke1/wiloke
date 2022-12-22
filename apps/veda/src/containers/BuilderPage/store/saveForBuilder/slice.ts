import { ActionTypes, createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';
import {
  saveAtomAddon,
  savePageForBuilder,
  savePageForUser,
  saveAtomSection,
  saveTheme,
  resyncPage,
  savePageForDev,
  saveAtomMegaMenu,
  saveDraftSection,
  saveDraftMegaMenu,
  saveDraftAddon,
  savePageForAdmin,
} from './actions';

export interface SaveForBuilderState {
  modalPageVisible: boolean;
  modalThemeVisible: boolean;

  modalDevSectionVisible: boolean;
  modalAdminSectionVisible: boolean;

  modalDevAddonsVisible: boolean;
  modalAdminAddonsVisible: boolean;

  modalDevPageVisible: boolean;
  modalAdminPageVisible: boolean;

  modalDevMegaMenuVisible: boolean;
  modalAdminMegaMenuVisible: boolean;

  saveSectionStatus: Status;
  savePageStatus: Status;
  saveAddonStatus: Status;
  saveThemeStatus: Status;
  resyncPageStatus: Status;
  updateScopeAddonStatus: Record<string, Status>;
  updateScopeSectionStatus: Record<string, Status>;
}

type SaveForBuilderExtraActions = ActionTypes<
  | typeof savePageForBuilder
  | typeof saveAtomSection
  | typeof saveAtomAddon
  | typeof savePageForUser
  | typeof saveTheme
  | typeof resyncPage
  | typeof savePageForDev
  | typeof saveAtomMegaMenu
  | typeof saveDraftSection
  | typeof saveDraftMegaMenu
  | typeof saveDraftAddon
  | typeof savePageForAdmin
>;

export type SaveForBuilderAction =
  | {
      type: 'setModalPageVisible';
      payload: boolean;
    }
  | {
      type: 'setModalDevSectionVisible';
      payload: boolean;
    }
  | {
      type: 'setModalDevAddonsVisible';
      payload: boolean;
    }
  | {
      type: 'setModalThemeVisible';
      payload: boolean;
    }
  | {
      type: 'setModalAdminSectionVisible';
      payload: boolean;
    }
  | {
      type: 'setModalAdminAddonsVisible';
      payload: boolean;
    }
  | {
      type: 'setModalAdminPageVisible';
      payload: boolean;
    }
  | {
      type: 'setModalDevPageVisible';
      payload: boolean;
    }
  | {
      type: 'setModalAdminMegaMenuVisible';
      payload: boolean;
    }
  | {
      type: 'setModalDevMegaMenuVisible';
      payload: boolean;
    };

export const sliceSaveForBuilder = createSlice<SaveForBuilderState, SaveForBuilderAction, SaveForBuilderExtraActions>({
  name: '@BuilderPage',
  initialState: {
    modalPageVisible: false,
    modalThemeVisible: false,

    modalDevSectionVisible: false,
    modalAdminSectionVisible: false,

    modalDevAddonsVisible: false,
    modalAdminAddonsVisible: false,

    modalDevPageVisible: false,
    modalAdminPageVisible: false,

    modalDevMegaMenuVisible: false,
    modalAdminMegaMenuVisible: false,

    savePageStatus: 'idle',
    saveSectionStatus: 'idle',
    saveAddonStatus: 'idle',
    saveThemeStatus: 'idle',
    resyncPageStatus: 'idle',
    updateScopeAddonStatus: {},
    updateScopeSectionStatus: {},
  },
  reducers: [
    handleAction('setModalPageVisible', ({ state, action }) => {
      state.modalPageVisible = action.payload;
    }),
    handleAction('setModalDevSectionVisible', ({ state, action }) => {
      state.modalDevSectionVisible = action.payload;
    }),
    handleAction('setModalDevAddonsVisible', ({ state, action }) => {
      state.modalDevAddonsVisible = action.payload;
    }),
    handleAction('setModalThemeVisible', ({ state, action }) => {
      state.modalThemeVisible = action.payload;
    }),
    handleAction('setModalAdminSectionVisible', ({ state, action }) => {
      state.modalAdminSectionVisible = action.payload;
    }),
    handleAction('setModalAdminAddonsVisible', ({ state, action }) => {
      state.modalAdminAddonsVisible = action.payload;
    }),
    handleAction('setModalDevPageVisible', ({ state, action }) => {
      state.modalDevPageVisible = action.payload;
    }),
    handleAction('setModalAdminPageVisible', ({ state, action }) => {
      state.modalAdminPageVisible = action.payload;
    }),
    handleAction('setModalAdminMegaMenuVisible', ({ state, action }) => {
      state.modalAdminMegaMenuVisible = action.payload;
    }),
    handleAction('setModalDevMegaMenuVisible', ({ state, action }) => {
      state.modalDevMegaMenuVisible = action.payload;
    }),
  ],
  extraReducers: [
    // save page
    handleAction('@BuilderPage/savePageForBuilder/request', ({ state }) => ({ ...state, savePageStatus: 'loading' })),
    handleAction('@BuilderPage/savePageForBuilder/success', ({ state }) => ({ ...state, savePageStatus: 'success' })),
    handleAction('@BuilderPage/savePageForBuilder/failure', ({ state }) => ({ ...state, savePageStatus: 'failure' })),
    handleAction('@BuilderPage/savePageForBuilder/cancel', ({ state }) => ({ ...state, savePageStatus: 'idle' })),

    handleAction('@BuilderPage/savePageForUser/request', ({ state }) => ({ ...state, savePageStatus: 'loading' })),
    handleAction('@BuilderPage/savePageForUser/success', ({ state }) => ({ ...state, savePageStatus: 'success' })),
    handleAction('@BuilderPage/savePageForUser/failure', ({ state }) => ({ ...state, savePageStatus: 'failure' })),
    handleAction('@BuilderPage/savePageForUser/cancel', ({ state }) => ({ ...state, savePageStatus: 'idle' })),

    handleAction('@BuilderPage/savePageForDev/request', ({ state }) => ({ ...state, savePageStatus: 'loading' })),
    handleAction('@BuilderPage/savePageForDev/success', ({ state }) => ({ ...state, savePageStatus: 'success' })),
    handleAction('@BuilderPage/savePageForDev/failure', ({ state }) => ({ ...state, savePageStatus: 'failure' })),
    handleAction('@BuilderPage/savePageForDev/cancel', ({ state }) => ({ ...state, savePageStatus: 'idle' })),

    handleAction('@BuilderPage/savePageForAdmin/request', ({ state }) => ({ ...state, savePageStatus: 'loading' })),
    handleAction('@BuilderPage/savePageForAdmin/success', ({ state }) => ({ ...state, savePageStatus: 'success' })),
    handleAction('@BuilderPage/savePageForAdmin/failure', ({ state }) => ({ ...state, savePageStatus: 'failure' })),
    handleAction('@BuilderPage/savePageForAdmin/cancel', ({ state }) => ({ ...state, savePageStatus: 'idle' })),

    // save section
    handleAction('@BuilderPage/saveAtomSection/request', ({ state }) => ({ ...state, saveSectionStatus: 'loading' })),
    handleAction('@BuilderPage/saveAtomSection/success', ({ state }) => ({ ...state, saveSectionStatus: 'success' })),
    handleAction('@BuilderPage/saveAtomSection/failure', ({ state }) => ({ ...state, saveSectionStatus: 'failure' })),
    handleAction('@BuilderPage/saveAtomSection/cancel', ({ state }) => ({ ...state, saveSectionStatus: 'idle' })),

    handleAction('@BuilderPage/saveDraftSection/request', ({ state }) => ({ ...state, saveSectionStatus: 'loading' })),
    handleAction('@BuilderPage/saveDraftSection/success', ({ state }) => ({ ...state, saveSectionStatus: 'success' })),
    handleAction('@BuilderPage/saveDraftSection/failure', ({ state }) => ({ ...state, saveSectionStatus: 'failure' })),
    handleAction('@BuilderPage/saveDraftSection/cancel', ({ state }) => ({ ...state, saveSectionStatus: 'idle' })),

    handleAction('@BuilderPage/saveAtomMegaMenu/request', ({ state }) => ({ ...state, saveSectionStatus: 'loading' })),
    handleAction('@BuilderPage/saveAtomMegaMenu/success', ({ state }) => ({ ...state, saveSectionStatus: 'success' })),
    handleAction('@BuilderPage/saveAtomMegaMenu/failure', ({ state }) => ({ ...state, saveSectionStatus: 'failure' })),
    handleAction('@BuilderPage/saveAtomMegaMenu/cancel', ({ state }) => ({ ...state, saveSectionStatus: 'idle' })),

    handleAction('@BuilderPage/saveDraftMegaMenu/request', ({ state }) => ({ ...state, saveSectionStatus: 'loading' })),
    handleAction('@BuilderPage/saveDraftMegaMenu/success', ({ state }) => ({ ...state, saveSectionStatus: 'success' })),
    handleAction('@BuilderPage/saveDraftMegaMenu/failure', ({ state }) => ({ ...state, saveSectionStatus: 'failure' })),
    handleAction('@BuilderPage/saveDraftMegaMenu/cancel', ({ state }) => ({ ...state, saveSectionStatus: 'idle' })),

    // save addons
    handleAction('@BuilderPage/saveAtomAddon/request', ({ state }) => ({ ...state, saveAddonStatus: 'loading' })),
    handleAction('@BuilderPage/saveAtomAddon/success', ({ state }) => ({ ...state, saveAddonStatus: 'success' })),
    handleAction('@BuilderPage/saveAtomAddon/failure', ({ state }) => ({ ...state, saveAddonStatus: 'failure' })),
    handleAction('@BuilderPage/saveAtomAddon/cancel', ({ state }) => ({ ...state, saveAddonStatus: 'idle' })),

    handleAction('@BuilderPage/saveDraftAddon/request', ({ state }) => ({ ...state, saveAddonStatus: 'loading' })),
    handleAction('@BuilderPage/saveDraftAddon/success', ({ state }) => ({ ...state, saveAddonStatus: 'success' })),
    handleAction('@BuilderPage/saveDraftAddon/failure', ({ state }) => ({ ...state, saveAddonStatus: 'failure' })),
    handleAction('@BuilderPage/saveDraftAddon/cancel', ({ state }) => ({ ...state, saveAddonStatus: 'idle' })),

    // save theme
    handleAction('@BuilderPage/saveTheme/request', ({ state }) => ({ ...state, saveThemeStatus: 'loading' })),
    handleAction('@BuilderPage/saveTheme/success', ({ state }) => ({ ...state, saveThemeStatus: 'success' })),
    handleAction('@BuilderPage/saveTheme/failure', ({ state }) => ({ ...state, saveThemeStatus: 'failure' })),

    // resync page
    handleAction('@BuilderPage/resyncPage/request', ({ state }) => ({ ...state, resyncPageStatus: 'loading' })),
    handleAction('@BuilderPage/resyncPage/success', ({ state }) => ({ ...state, resyncPageStatus: 'success' })),
    handleAction('@BuilderPage/resyncPage/failure', ({ state }) => ({ ...state, resyncPageStatus: 'failure' })),
  ],
});

export const {
  setModalPageVisible,
  setModalDevSectionVisible,
  setModalDevAddonsVisible,
  setModalThemeVisible,
  setModalAdminSectionVisible,
  setModalAdminAddonsVisible,
  setModalAdminPageVisible,
  setModalDevPageVisible,
  setModalAdminMegaMenuVisible,
  setModalDevMegaMenuVisible,
} = sliceSaveForBuilder.actions;

export const useSetModalPageVisible = createDispatchAction(setModalPageVisible);
export const useSetModalThemeVisible = createDispatchAction(setModalThemeVisible);

export const useSetModalDevSectionVisible = createDispatchAction(setModalDevSectionVisible);
export const useSetModalAdminSectionVisible = createDispatchAction(setModalAdminSectionVisible);

export const useSetModalDevAddonsVisible = createDispatchAction(setModalDevAddonsVisible);
export const useSetModalAdminAddonsVisible = createDispatchAction(setModalAdminAddonsVisible);

export const useSetModalDevPageVisible = createDispatchAction(setModalDevPageVisible);
export const useSetModalAdminPageVisible = createDispatchAction(setModalAdminPageVisible);

export const useSetModalAdminMegaMenuVisible = createDispatchAction(setModalAdminMegaMenuVisible);
export const useSetModalDevMegaMenuVisible = createDispatchAction(setModalDevMegaMenuVisible);

// selectors
export const modalPageVisibleSelector = (state: AppState) => state.builderPage.saveForBuilder.modalPageVisible;
export const modalThemeVisibleSelector = (state: AppState) => state.builderPage.saveForBuilder.modalThemeVisible;

export const modalDevSectionVisibleSelector = (state: AppState) => state.builderPage.saveForBuilder.modalDevSectionVisible;
export const modalAdminSectionVisibleSelector = (state: AppState) => state.builderPage.saveForBuilder.modalAdminSectionVisible;

export const modalDevAddonsVisibleSelector = (state: AppState) => state.builderPage.saveForBuilder.modalDevAddonsVisible;
export const modalAdminAddonsVisibleSelector = (state: AppState) => state.builderPage.saveForBuilder.modalAdminAddonsVisible;

export const modalDevPageVisibleSelector = (state: AppState) => state.builderPage.saveForBuilder.modalDevPageVisible;
export const modalAdminPageVisibleSelector = (state: AppState) => state.builderPage.saveForBuilder.modalAdminPageVisible;

export const modalMegaMenuVisibleSelector = (state: AppState) => state.builderPage.saveForBuilder.modalAdminMegaMenuVisible;

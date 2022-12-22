import { isEmpty } from 'ramda';
import { ProductSection } from 'types/Sections';
import { ActionTypes, createDispatchAction, createDispatchAsyncAction, createSlice, handleAction } from 'wiloke-react-core/utils';
import { getSectionsMegaMenu, installUserMegaMenu, SetVisibleModalStyles } from './actions';

type Actions = SetVisibleModalStyles;

type ExtraActionsMenu = ActionTypes<typeof getSectionsMegaMenu | typeof installUserMegaMenu>;

interface MegaMenuState {
  visible: boolean;

  getSectionsStatus: Status;
  megaSections: ProductSection[];
  installStatus: Record<string, Status>;
}

export const sliceMegaMenu = createSlice<MegaMenuState, Actions, ExtraActionsMenu>({
  name: '@Global',
  initialState: {
    getSectionsStatus: 'idle',
    visible: false,
    megaSections: [],
    installStatus: {},
  },
  reducers: [
    handleAction('setVisibleModalStyles', ({ state, action }) => {
      state.visible = action.payload;
    }),
  ],
  extraReducers: [
    handleAction('@Global/getSectionsMegaMenu/request', ({ state }) => {
      state.getSectionsStatus = isEmpty(state.megaSections) ? 'loading' : 'success';
    }),
    handleAction('@Global/getSectionsMegaMenu/success', ({ state, action }) => {
      state.getSectionsStatus = 'success';
      state.megaSections = action.payload.data;
    }),
    handleAction('@Global/getSectionsMegaMenu/failure', ({ state }) => {
      state.getSectionsStatus = 'failure';
    }),
    handleAction('@Global/installUserMegaMenu/request', ({ state, action }) => {
      return {
        ...state,
        installStatus: {
          [action.payload.commandId]: 'loading',
        },
      };
    }),
    handleAction('@Global/installUserMegaMenu/success', ({ state, action }) => {
      return {
        ...state,
        installStatus: {
          [action.payload.commandId]: 'success',
        },
      };
    }),
    handleAction('@Global/installUserMegaMenu/failure', ({ state, action }) => {
      return {
        ...state,
        installStatus: {
          [action.payload.commandId]: 'failure',
        },
      };
    }),
  ],
});

export const { setVisibleModalStyles } = sliceMegaMenu.actions;

export const useSetVisibleModalStyles = createDispatchAction(setVisibleModalStyles);
export const useGetSectionsMegaMenu = createDispatchAsyncAction(getSectionsMegaMenu);
export const useInstallUserMegaMenu = createDispatchAsyncAction(installUserMegaMenu);

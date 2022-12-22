import { isEmpty } from 'ramda';
import { updateAddonVersion } from 'store/actions/versions/actionSectionVersion';
import { updateSection } from 'store/reducers/utils/updateSection';
import { AddonOfTheme_Atom_N_Client, ThemeAddon } from 'types/Addons';
import { SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client, PageSection } from 'types/Sections';
import { v4 } from 'uuid';
import { ActionTypes, createDispatchAction, createDispatchAsyncAction, createSlice, handleAction } from 'wiloke-react-core/utils';
import {
  AddMultiAddonsAction,
  DeleteAddon,
  DuplicateAddon,
  getThemeAddons,
  SetActiveAddon,
  SetThemeAddon,
  UpdateActiveAddons,
  UpdateAddonAction,
  updateThemeAddonsToPage,
} from './actions';

type ExtraAddonsActions = ActionTypes<typeof getThemeAddons | typeof updateAddonVersion | typeof updateThemeAddonsToPage>;

type SliceThemeAddonsActions =
  | AddMultiAddonsAction
  | UpdateAddonAction
  | SetThemeAddon
  | DuplicateAddon
  | DeleteAddon
  | SetActiveAddon
  | UpdateActiveAddons;

export interface ThemeAddonsState {
  status: Status;
  updateVersionStatus: Status;
  updateAddonsToPageStatus: Status;

  data: ThemeAddon[];
  message: string;
  activeAddon: undefined | ThemeAddon;
  deletedAddons: Array<{ commandId: string; id: string }>;
}

export const defaultThemeAddonState: ThemeAddonsState = {
  status: 'idle',
  updateVersionStatus: 'idle',
  data: [],
  message: '',
  activeAddon: undefined,
  deletedAddons: [],
  updateAddonsToPageStatus: 'idle',
};

export const sliceThemeAddons = createSlice<ThemeAddonsState, SliceThemeAddonsActions, ExtraAddonsActions>({
  initialState: defaultThemeAddonState,
  name: '@Global',
  reducers: [
    handleAction('updateActiveAddons', ({ state, action }) => {
      const { addons } = action.payload;
      state.data = state.data.map(item => {
        if (item.id === addons.id) {
          return {
            ...addons,
            enable: addons.body.enable,
          };
        }
        return item;
      });
    }),
    handleAction('addMultiAddons', ({ state, action }) => {
      state.data = action.payload.addons; // action set addons vào reducer
    }),
    handleAction('updateAddon', ({ state, action }) => {
      const { section } = action.payload;
      state.data.forEach(item => {
        if (item.sectionId === section.id) {
          item.label = section.label;
          item.sectionId = section.id;
          item.body = section as Exclude<PageSection, SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client>;
          item.isNew = true;
          item.enable = section.enable;
        }
      });
    }),
    handleAction('duplicateAddon', ({ state, action }) => {
      const { addonsSectionId, newId } = action.payload;
      state.data = state.data.reduce<ThemeAddon[]>((arr, item) => {
        if (item.sectionId === addonsSectionId) {
          const newItem: any = {
            ...item,
            id: `id_${v4()}`,
            isNew: true,
            sectionId: newId,
            body: {
              ...item.body,
              id: newId,
            },
          };
          return [...arr, ...[item, newItem]];
        }
        return [...arr, item];
      }, []);
    }),
    handleAction('deleteAddon', ({ state, action }) => {
      const { addonsSectionId, addonCommandId, addonId } = action.payload;
      state.data = state.data.filter(item => item.sectionId !== addonsSectionId);
      state.deletedAddons = [...state.deletedAddons, { commandId: addonCommandId, id: addonId }].filter(item => Boolean(item.commandId));
    }),
    handleAction('setThemeAddon', ({ state, action }) => {
      const { addon } = action.payload;
      state.data.push(addon);
    }),
    handleAction('setActiveAddon', ({ state, action }) => {
      return {
        ...state,
        activeAddon:
          action.payload.addon === undefined
            ? undefined
            : {
                ...action.payload.addon,
                enable: action.payload.addon.body.enable,
              },
      };
    }),
  ],
  extraReducers: [
    handleAction('@Global/getThemeAddons/request', ({ state }) => {
      state.status = isEmpty(state.data) ? 'loading' : 'success';
    }),
    handleAction('@Global/getThemeAddons/success', ({ state, action }) => {
      state.status = 'success';
      state.data = action.payload.addons;
    }),
    handleAction('@Global/getThemeAddons/failure', ({ state }) => {
      state.status = 'failure';
    }),
    handleAction('@BuilderPage/updateAddonVersion/request', ({ state }) => {
      state.updateVersionStatus = 'loading';
    }),
    handleAction('@BuilderPage/updateAddonVersion/success', ({ state, action }) => {
      const { updatedAddon } = action.payload;
      state.updateVersionStatus = 'success';
      state.data = state.data.map(item => {
        if ((item as AddonOfTheme_Atom_N_Client).parentCommandId === updatedAddon.commandId) {
          return {
            ...updatedAddon,
            body: updateSection(item.body, updatedAddon.body),
          } as ThemeAddon;
        }
        return item;
      });
    }),
    handleAction('@BuilderPage/updateAddonVersion/failure', ({ state }) => {
      state.updateVersionStatus = 'failure';
    }),
    handleAction('@Global/updateAddonsToPage/request', ({ state }) => {
      state.updateAddonsToPageStatus = 'idle';
    }),
    handleAction('@Global/updateAddonsToPage/success', ({ state, action }) => {
      state.updateAddonsToPageStatus = 'success';
      state.data = action.payload.addons;
    }),
    handleAction('@Global/updateAddonsToPage/failure', ({ state }) => {
      state.updateAddonsToPageStatus = 'failure';
    }),
  ],
});

export const {
  addMultiAddons,
  setThemeAddon,
  updateAddon,
  duplicateAddon,
  deleteAddon,
  setActiveAddon,
  updateActiveAddons,
} = sliceThemeAddons.actions;

export const useGetThemeAddons = createDispatchAsyncAction(getThemeAddons);
export const useAddMultiAddons = createDispatchAction(addMultiAddons);
export const useUpdateAddon = createDispatchAction(updateAddon);
export const useSetThemeAddon = createDispatchAction(setThemeAddon);
export const useDuplicateAddon = createDispatchAction(duplicateAddon);
export const useDeleteAddon = createDispatchAction(deleteAddon);
export const useSetActiveAddon = createDispatchAction(setActiveAddon);
export const useUpdateActiveAddons = createDispatchAction(updateActiveAddons);
export const useUpdateThemeAddonsToPage = createDispatchAsyncAction(updateThemeAddonsToPage);

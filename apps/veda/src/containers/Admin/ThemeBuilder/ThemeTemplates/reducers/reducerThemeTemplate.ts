import { ThemeServiceData } from 'types/Theme';
import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { actionGetCurrentTheme, actionGetThemeTemplates, deleteProductTheme, importThemeAtomToClient } from '../actions';

type ActionsTheme = ActionTypes<
  typeof actionGetThemeTemplates | typeof actionGetCurrentTheme | typeof importThemeAtomToClient | typeof deleteProductTheme
>;

export interface ThemeState {
  templates: ThemeServiceData[];
  requestStatus: Status;
  // get current theme status
  getThemeStatus: Status;
  message: string;
  maxPages: number;
  importStatus: Record<string, Status>;
  deleteStatus: Record<string, Status>;
}

export const defaultThemeTemplateState: ThemeState = {
  templates: [],
  maxPages: 1,
  message: '',
  requestStatus: 'idle',
  getThemeStatus: 'idle',
  importStatus: {},
  deleteStatus: {},
};

export const reducerThemeTemplates = createReducer<ThemeState, ActionsTheme>(defaultThemeTemplateState, [
  handleAction('@ThemeBuilder/getThemeTemplates/request', ({ state }) => {
    return {
      ...state,
      requestStatus: 'loading',
    };
  }),
  handleAction('@ThemeBuilder/getThemeTemplates/success', ({ state, action }) => {
    const { data, maxPages } = action.payload;
    return {
      ...state,
      requestStatus: 'success',
      templates: data,
      maxPages,
    };
  }),
  handleAction('@ThemeBuilder/getThemeTemplates/failure', ({ state }) => {
    return {
      ...state,
      requestStatus: 'failure',
    };
  }),
  handleAction('@ThemeBuilder/actionGetCurrentTheme/request', ({ state }) => {
    return {
      ...state,
      getThemeStatus: 'loading',
    };
  }),
  handleAction('@ThemeBuilder/actionGetCurrentTheme/success', ({ state }) => {
    return {
      ...state,
      getThemeStatus: 'success',
    };
  }),
  handleAction('@ThemeBuilder/actionGetCurrentTheme/failure', ({ state }) => {
    return {
      ...state,
      getThemeStatus: 'failure',
    };
  }),
  handleAction('@ThemeBuilder/importThemeAtomToClient/request', ({ state, action }) => {
    return {
      ...state,
      importStatus: {
        [action.payload.themeAtomCommandId]: 'loading',
      },
    };
  }),
  handleAction('@ThemeBuilder/importThemeAtomToClient/success', ({ state, action }) => {
    return {
      ...state,
      importStatus: {
        [action.payload.themeAtomCommandId]: 'success',
      },
    };
  }),
  handleAction('@ThemeBuilder/importThemeAtomToClient/failure', ({ state, action }) => {
    return {
      ...state,
      importStatus: {
        [action.payload.themeAtomCommandId]: 'failure',
      },
    };
  }),
  handleAction('@ThemeBuilder/deleteProductTheme/request', ({ state, action }) => {
    return {
      ...state,
      deleteStatus: {
        [action.payload.commandId]: 'loading',
      },
    };
  }),
  handleAction('@ThemeBuilder/deleteProductTheme/success', ({ state, action }) => {
    return {
      ...state,
      deleteStatus: {
        [action.payload.commandId]: 'success',
      },
      templates: state.templates.filter(item => item.commandId !== action.payload.commandId),
    };
  }),
  handleAction('@ThemeBuilder/deleteProductTheme/failure', ({ state, action }) => {
    return {
      ...state,
      deleteStatus: {
        [action.payload.commandId]: 'failure',
      },
    };
  }),
]);

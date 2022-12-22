import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

type FileName = string;
type TranslationJSON = string;

type GlobalThemeTranslationAction =
  | SetGlobalThemeTranslation
  | SetLanguageActive
  | DeleteFileTranslation
  | EditGlobalThemeTransition
  | EditLanguageActive;

interface SetGlobalThemeTranslation {
  type: 'setGlobalThemeTranslation';
  payload: {
    [fileName: FileName]: TranslationJSON | undefined;
  };
}

interface EditGlobalThemeTransition {
  type: 'editGlobalThemeTransition';
  payload: TranslationJSON;
}

interface SetLanguageActive {
  type: 'setFileLanguageActive';
  payload: FileName;
}

interface EditLanguageActive {
  type: 'editFileLanguageActive';
  payload: FileName;
}

interface DeleteFileTranslation {
  type: 'deleteFileTranslation';
  payload: {
    fileName: string;
  };
}

export interface GlobalThemeTranslationState {
  translation: {
    [fileName: FileName]: TranslationJSON | undefined;
  };
  languageActive: FileName;
}
/*
  Example:
    "en": {
      "hello": "hello"
    },
    "vi": {
      "hello": "Chào"
    }
*/
export const sliceGlobalThemeTranslation = createSlice<GlobalThemeTranslationState, GlobalThemeTranslationAction>({
  name: '@Global',
  initialState: {
    translation: {},
    languageActive: '',
  },
  reducers: [
    handleAction('setGlobalThemeTranslation', ({ state, action }) => {
      return {
        ...state,
        translation: {
          ...state.translation,
          ...action.payload,
        },
      };
    }),
    handleAction('setFileLanguageActive', ({ state, action }) => {
      state.languageActive = action.payload;
    }),
    handleAction('deleteFileTranslation', ({ state, action }) => {
      const { fileName } = action.payload;
      return {
        ...state,
        translation: Object.fromEntries(Object.entries(state.translation).filter(([key]) => key != fileName)),
        languageActive: state.languageActive === fileName ? '' : state.languageActive,
      };
    }),
    handleAction('editGlobalThemeTransition', ({ state, action }) => {
      return {
        ...state,
        translation: {
          ...state.translation,
          [state.languageActive]: action.payload,
        },
      };
    }),
    handleAction('editFileLanguageActive', ({ state, action }) => {
      return {
        ...state,
        translation: Object.fromEntries(
          Object.entries(state.translation).map(([key, value]) => {
            if (key === state.languageActive) {
              return [action.payload, value];
            }
            return [key, value];
          }),
        ),
        languageActive: action.payload,
      };
    }),
  ],
});

export const {
  setGlobalThemeTranslation,
  setFileLanguageActive,
  deleteFileTranslation,
  editGlobalThemeTransition,
  editFileLanguageActive,
} = sliceGlobalThemeTranslation.actions;

export const useSetGlobalThemeTranslation = createDispatchAction(setGlobalThemeTranslation);
export const useSetFileLanguageActive = createDispatchAction(setFileLanguageActive);
export const useDeleteFileTranslation = createDispatchAction(deleteFileTranslation);
export const useEditGlobalThemeTransition = createDispatchAction(editGlobalThemeTransition);
export const useEditFileLanguageActive = createDispatchAction(editFileLanguageActive);

export const globalThemeTranslationSelector = (state: AppState) => state.global.themeSettings.globalTranslations;

import { CssVariables } from 'types/Result';
import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';
import initialState, { defaultColorNames, defaultFontNames } from './initialState';
import {
  DeleteCssVariablesAction,
  SetCssVariablesAction,
  UpdateCssVariableAction,
  UpdateCssVariablesAction,
  UpdateCssVariableValueAction,
} from './types';

type CssVariablesAction =
  | SetCssVariablesAction
  | UpdateCssVariableAction
  | UpdateCssVariableValueAction
  | DeleteCssVariablesAction
  | UpdateCssVariablesAction;

export const sliceCssVariables = createSlice<CssVariables, CssVariablesAction>({
  name: '@Global',
  initialState,
  reducers: [
    handleAction('setCssVariables', ({ state, action }) => {
      state.colors = action.payload.colors;
      state.fonts = action.payload.fonts;
    }),
    handleAction('updateCssVariables', ({ state, action }) => {
      state.colors = [...(action.payload.colors ?? []), ...state.colors.filter(item => !defaultColorNames.includes(item.name))];
      state.fonts = [...(action.payload.fonts ?? []), ...state.fonts.filter(item => !defaultFontNames.includes(item.name))];
    }),
    handleAction('updateCssVariable', ({ state, action }) => {
      if (action.payload.key === 'fonts') {
        state[action.payload.key].push(action.payload.fonts);
      } else {
        state[action.payload.key].push(action.payload.colors);
      }
    }),
    handleAction('updateCssVariableValue', ({ state, action }) => {
      return {
        ...state,
        [action.payload.key]: state[action.payload.key].map(item => {
          if (action.payload.key === 'fonts') {
            if (item.id === action.payload.fonts.id) {
              return action.payload.fonts;
            }
            return item;
          } else {
            if (item.id === action.payload.colors.id) {
              return action.payload.colors;
            }
            return item;
          }
        }),
      };
    }),
    handleAction('deleteCssVariable', ({ state, action }) => {
      return {
        ...state,
        // action.payload.key as 'fonts' | 'colors'
        [action.payload.key]: state[action.payload.key as 'fonts'].filter(item => item.id !== action.payload.id),
      };
    }),
  ],
});

export const { setCssVariables, updateCssVariable, updateCssVariables, updateCssVariableValue, deleteCssVariable } = sliceCssVariables.actions;

export const useSetCssVariables = createDispatchAction(setCssVariables);
export const useUpdateCssVariable = createDispatchAction(updateCssVariable);
export const useUpdateCssVariableValue = createDispatchAction(updateCssVariableValue);
export const useDeleteCssVariable = createDispatchAction(deleteCssVariable);

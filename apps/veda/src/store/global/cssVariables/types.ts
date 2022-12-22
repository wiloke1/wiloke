import { CssColorVariable, CssFontVariable } from 'types/PresetStyles';

export interface SetCssVariablesAction {
  type: 'setCssVariables';
  payload: {
    colors: CssColorVariable[];
    fonts: CssFontVariable[];
  };
}

export interface UpdateCssVariablesAction {
  type: 'updateCssVariables';
  payload: {
    colors?: CssColorVariable[];
    fonts?: CssFontVariable[];
  };
}

interface UpdateCssColorVariableInput {
  key: 'colors';
  colors: CssColorVariable;
}

interface UpdateCssFontVariableInput {
  key: 'fonts';
  fonts: CssFontVariable;
}

export type CssVariablesKey = 'colors' | 'fonts';

export interface UpdateCssVariableAction {
  type: 'updateCssVariable';
  payload: UpdateCssColorVariableInput | UpdateCssFontVariableInput;
}

export interface UpdateCssVariableValueAction {
  type: 'updateCssVariableValue';
  payload: UpdateCssColorVariableInput | UpdateCssFontVariableInput;
}

export interface DeleteCssVariablesAction {
  type: 'deleteCssVariable';
  payload: {
    key: CssVariablesKey;
    id: string;
  };
}

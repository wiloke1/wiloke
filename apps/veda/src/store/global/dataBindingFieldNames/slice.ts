import { createSelector } from 'reselect';
import { SectionId } from 'types/Sections';
import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

export interface DataBindingFieldNamesSave {
  type: 'dataBindingFieldNamesSave';
  payload: {
    sectionId: SectionId;
    fieldNames: string[];
  };
}

export interface DataBindingFieldNamesClear {
  type: 'dataBindingFieldNamesClear';
  payload: {
    sectionId: SectionId;
  };
}

export type DataBindingFieldNamesAction = DataBindingFieldNamesSave | DataBindingFieldNamesClear;
export type DataBindingFieldNamesState = Record<SectionId, string[]>;

export const sliceDataBindingFieldNames = createSlice<DataBindingFieldNamesState, DataBindingFieldNamesAction>({
  name: '@Global',
  initialState: {},
  reducers: [
    handleAction('dataBindingFieldNamesSave', ({ state, action }) => {
      const { sectionId, fieldNames } = action.payload;
      state[sectionId] = fieldNames;
    }),
    handleAction('dataBindingFieldNamesClear', ({ state, action }) => {
      const { sectionId } = action.payload;
      state[sectionId] = [];
    }),
  ],
});

export const { dataBindingFieldNamesSave, dataBindingFieldNamesClear } = sliceDataBindingFieldNames.actions;
export const useDataBindingFieldNamesSave = createDispatchAction(dataBindingFieldNamesSave);
export const useDataBindingFieldNamesClear = createDispatchAction(dataBindingFieldNamesClear);

export const dataBindingFieldNamesSelector = createSelector(
  (state: AppState) => state.global,
  global => {
    const result = global.dataBindingFieldNames[global.sectionIdActive];
    return result ?? [];
  },
);

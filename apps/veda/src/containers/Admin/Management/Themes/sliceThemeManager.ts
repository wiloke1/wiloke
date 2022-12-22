import { FilterTypePage } from 'containers/Admin/types';
import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

interface Actions {
  type: 'changeFilterType';
  payload: FilterTypePage;
}

interface ThemeManagerState {
  filterType: FilterTypePage;
}

export const sliceThemeManager = createSlice<ThemeManagerState, Actions>({
  name: '@ThemeManager',
  initialState: {
    filterType: 'draft',
  },
  reducers: [
    handleAction('changeFilterType', ({ state, action }) => {
      state.filterType = action.payload;
    }),
  ],
});

export const { changeFilterType } = sliceThemeManager.actions;

export const useChangeFilterType = createDispatchAction(changeFilterType);

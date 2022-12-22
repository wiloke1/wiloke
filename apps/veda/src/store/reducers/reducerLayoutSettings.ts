import { setLayoutSettings } from 'store/actions/actionLayoutSettings';
import { LayoutSettings } from 'types/Result';
import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';

type LayoutSettingsAction = ActionTypes<typeof setLayoutSettings>;
export type LayoutSettingsState = LayoutSettings;

const initialState: LayoutSettingsState = {
  containerWidth: 1300,
  containerGap: 15,
  columnGapX: 20,
  columnGapY: 20,
};

export const reducerLayoutSettings = createReducer<LayoutSettingsState, LayoutSettingsAction>(initialState, [
  handleAction('@Global/setLayoutSettings', ({ state, action }) => {
    return {
      ...state,
      ...action.payload,
    };
  }),
]);

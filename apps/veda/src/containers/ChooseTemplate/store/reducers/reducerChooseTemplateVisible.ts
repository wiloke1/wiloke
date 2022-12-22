import { PageSectionType } from 'types/Sections';
import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { setTemplateBoardVisible } from 'containers/ChooseTemplate/store/actions/actionTemplateBoardVisible';

type ChooseTemplateVisibleAction = ActionTypes<typeof setTemplateBoardVisible>;

interface ChooseTemplateVisibleState {
  visible: boolean;
  index: number;
  isChange: boolean;
  sectionType?: PageSectionType;
  navKeys: string[];
}

const initialState: ChooseTemplateVisibleState = {
  visible: false,
  index: -1,
  isChange: false,
  navKeys: [],
};

export const reducerChooseTemplateVisible = createReducer<ChooseTemplateVisibleState, ChooseTemplateVisibleAction>(initialState, [
  handleAction('@ChooseTemplate/setTemplateBoardVisible', ({ state, action }) => {
    state.visible = action.payload.visible ?? state.visible;
    state.index = action.payload.index ?? state.index;
    state.isChange = action.payload.isChange ?? state.isChange;
    state.sectionType = action.payload.sectionType ?? state.sectionType;
    state.navKeys = action.payload.navKeys ?? state.navKeys;
  }),
]);

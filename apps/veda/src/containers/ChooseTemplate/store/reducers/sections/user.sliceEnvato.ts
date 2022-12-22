import { SectionEnvatoCategory } from 'types/Sections';
import { ActionTypes, createSlice, handleAction } from 'wiloke-react-core/utils';
import { createEnvatoCategory, getEnvatoCategories } from '../../actions/sections/user.actionEnvato';

type Actions = any;

type ExtraActions = ActionTypes<typeof getEnvatoCategories | typeof createEnvatoCategory>;

interface State {
  categories: SectionEnvatoCategory[];
  getAllStatus: Status;
  createStatus: Status;
}

export const sliceEnvato = createSlice<State, Actions, ExtraActions>({
  name: '@ChooseTemplate',
  initialState: {
    categories: [],
    getAllStatus: 'idle',
    createStatus: 'idle',
  },
  reducers: [],
  extraReducers: [
    handleAction('@ChooseTemplate/getEnvatoCategories/request', ({ state }) => {
      state.getAllStatus = 'loading';
    }),
    handleAction('@ChooseTemplate/getEnvatoCategories/success', ({ state, action }) => {
      state.getAllStatus = 'success';
      state.categories = action.payload.data;
    }),
    handleAction('@ChooseTemplate/getEnvatoCategories/failure', ({ state }) => {
      state.getAllStatus = 'failure';
    }),
    handleAction('@ChooseTemplate/createEnvatoCategory/request', ({ state }) => {
      state.createStatus = 'loading';
    }),
    handleAction('@ChooseTemplate/createEnvatoCategory/success', ({ state, action }) => {
      state.createStatus = 'success';
      state.categories = state.categories.concat(action.payload);
    }),
    handleAction('@ChooseTemplate/createEnvatoCategory/failure', ({ state }) => {
      state.createStatus = 'failure';
    }),
  ],
});

export const envatoSelector = (state: AppState) => state.chooseTemplate.envato;

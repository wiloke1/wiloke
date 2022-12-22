import { Action, ActionTypes, createSlice, handleAction } from 'wiloke-react-core/utils';
import { globalMount } from './action';

type ExtraActions = ActionTypes<typeof globalMount>;

interface GlobalMountState {
  status: Status;
}

const sliceGlobalMount = createSlice<GlobalMountState, Action, ExtraActions>({
  initialState: {
    status: 'idle',
  },
  name: '',
  reducers: [],
  extraReducers: [
    handleAction('@Root/globalMount/request', ({ state }) => {
      state.status = 'loading';
    }),
    handleAction('@Root/globalMount/success', ({ state }) => {
      state.status = 'success';
    }),
    handleAction('@Root/globalMount/failure', ({ state }) => {
      state.status = 'failure';
    }),
  ],
});

export { sliceGlobalMount };

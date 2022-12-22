import { UserPlan } from 'types/Plan';
import { ActionTypes, createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';
import { createUserPlan, deleteUserPlan, downgradeToFreePlan, getUserPlans, goToShopifyPayment, updateUserPlan } from './actions';

type Actions =
  | {
      type: 'setVisibleModalCreatePlan';
      payload: boolean;
    }
  | {
      type: 'setEditPlan';
      payload: UserPlan | undefined;
    };

type ExtraActions = ActionTypes<
  typeof createUserPlan | typeof deleteUserPlan | typeof getUserPlans | typeof updateUserPlan | typeof goToShopifyPayment | typeof downgradeToFreePlan
>;

interface State {
  createStatus: Status;
  deleteStatus: Record<string, Status>;
  getStatus: Status;
  plans: UserPlan[];
  visible: boolean;
  updateStatus: Record<string, Status>;
  getShopifyUrlStatus: Record<string, Status>;
  editPlan: UserPlan | undefined;
}

export const slicePlan = createSlice<State, Actions, ExtraActions>({
  name: '@Manager',
  initialState: {
    plans: [],
    createStatus: 'idle',
    deleteStatus: {},
    updateStatus: {},
    getStatus: 'idle',
    visible: false,
    getShopifyUrlStatus: {},
    editPlan: undefined,
  },
  reducers: [
    handleAction('setVisibleModalCreatePlan', ({ state, action }) => {
      state.visible = action.payload;
    }),
    handleAction('setEditPlan', ({ state, action }) => {
      state.editPlan = action.payload;
    }),
  ],
  extraReducers: [
    handleAction('@Manager/createUserPlan/request', ({ state }) => {
      state.createStatus = 'loading';
    }),
    handleAction('@Manager/createUserPlan/success', ({ state, action }) => {
      state.createStatus = 'success';
      state.plans = state.plans.concat(action.payload);
    }),
    handleAction('@Manager/createUserPlan/failure', ({ state }) => {
      state.createStatus = 'failure';
    }),
    handleAction('@Manager/getUserPlans/request', ({ state }) => {
      state.getStatus = state.plans.length > 0 ? 'success' : 'loading';
    }),
    handleAction('@Manager/getUserPlans/success', ({ state, action }) => {
      state.getStatus = 'success';
      state.plans = action.payload.data;
    }),
    handleAction('@Manager/getUserPlans/failure', ({ state }) => {
      state.getStatus = 'failure';
    }),
    handleAction('@Manager/deleteUserPlan/request', ({ state, action }) => {
      state.deleteStatus[action.payload.commandId] = 'loading';
    }),
    handleAction('@Manager/deleteUserPlan/success', ({ state, action }) => {
      state.deleteStatus[action.payload.commandId] = 'success';
      state.plans = state.plans.filter(item => item.commandId !== action.payload.commandId);
    }),
    handleAction('@Manager/deleteUserPlan/failure', ({ state, action }) => {
      state.deleteStatus[action.payload.commandId] = 'failure';
    }),
    handleAction('@Manager/updateUserPlan/request', ({ state, action }) => {
      state.updateStatus[action.payload.commandId] = 'loading';
    }),
    handleAction('@Manager/updateUserPlan/success', ({ state, action }) => {
      state.updateStatus[action.payload.commandId] = 'success';
      state.plans = state.plans.map(item => {
        if (item.commandId === action.payload.commandId) {
          return action.payload;
        }
        return item;
      });
    }),
    handleAction('@Manager/updateUserPlan/failure', ({ state, action }) => {
      state.updateStatus[action.payload.commandId] = 'failure';
    }),
    handleAction('@Plan/goToShopifyPayment/request', ({ state, action }) => {
      state.getShopifyUrlStatus = {
        [action.payload.planHandle]: 'loading',
      };
    }),
    handleAction('@Plan/goToShopifyPayment/success', ({ state, action }) => {
      state.getShopifyUrlStatus = {
        [action.payload.planHandle]: 'success',
      };
    }),
    handleAction('@Plan/goToShopifyPayment/failure', ({ state, action }) => {
      state.getShopifyUrlStatus = {
        [action.payload.planHandle]: 'failure',
      };
    }),
    handleAction('@Plan/downgradeToFreePlan/request', ({ state, action }) => {
      state.getShopifyUrlStatus = {
        [action.payload.planHandle]: 'loading',
      };
    }),
    handleAction('@Plan/downgradeToFreePlan/success', ({ state, action }) => {
      state.getShopifyUrlStatus = {
        [action.payload.planHandle]: 'success',
      };
    }),
    handleAction('@Plan/downgradeToFreePlan/failure', ({ state, action }) => {
      state.getShopifyUrlStatus = {
        [action.payload.planHandle]: 'failure',
      };
    }),
  ],
});

export const { setVisibleModalCreatePlan, setEditPlan } = slicePlan.actions;

export const planSelector = (state: AppState) => state.plan;

export const useSetVisibleModalCreatePlan = createDispatchAction(setVisibleModalCreatePlan);
export const useSetEditPlan = createDispatchAction(setEditPlan);

import { Coupon } from 'types/Coupon';
import { ActionTypes, createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';
import { createCoupon, deleteCoupon, getCoupons, updateCoupon, validateCoupon } from './actions';

type Actions =
  | {
      type: 'setVisibleModalCoupon';
      payload: boolean;
    }
  | {
      type: 'editCoupon';
      payload: Coupon | undefined;
    }
  | {
      type: 'setValidateCouponVisible';
      payload: boolean;
    }
  | {
      type: 'setMyCoupon';
      payload: Coupon;
    }
  | {
      type: 'setVisibleModalCampaign';
      payload: boolean;
    };

type ExtraActions = ActionTypes<typeof getCoupons | typeof createCoupon | typeof updateCoupon | typeof deleteCoupon | typeof validateCoupon>;

interface State {
  coupons: Coupon[];
  visible: boolean;
  visibleValidate: boolean;
  visibleMyCampaign: boolean;

  updateStatus: Record<string, Status>;
  createStatus: Status;
  deleteStatus: Record<string, Status>;
  getStatus: Status;
  validateStatus: Status;
  myCoupon: Coupon | undefined;
  editCoupon: Coupon | undefined;
}

export const sliceCoupon = createSlice<State, Actions, ExtraActions>({
  name: '@Plan',
  initialState: {
    coupons: [],
    visible: false,
    visibleValidate: false,
    visibleMyCampaign: false,

    createStatus: 'idle',
    getStatus: 'idle',
    validateStatus: 'idle',
    deleteStatus: {},
    updateStatus: {},
    myCoupon: undefined,
    editCoupon: undefined,
  },
  reducers: [
    handleAction('setVisibleModalCoupon', ({ state, action }) => {
      state.visible = action.payload;
    }),
    handleAction('editCoupon', ({ state, action }) => {
      state.editCoupon = action.payload;
    }),
    handleAction('setValidateCouponVisible', ({ state, action }) => {
      state.visibleValidate = action.payload;
    }),
    handleAction('setMyCoupon', ({ state, action }) => {
      state.myCoupon = action.payload;
    }),
    handleAction('setVisibleModalCampaign', ({ state, action }) => {
      state.visibleMyCampaign = action.payload;
    }),
  ],
  extraReducers: [
    // get all
    handleAction('@Plan/getCoupons/request', ({ state }) => {
      state.getStatus = state.coupons.length > 0 ? 'success' : 'loading';
    }),
    handleAction('@Plan/getCoupons/success', ({ state, action }) => {
      state.getStatus = 'success';
      state.coupons = action.payload;
    }),
    handleAction('@Plan/getCoupons/failure', ({ state }) => {
      state.getStatus = 'failure';
    }),
    // create
    handleAction('@Plan/createCoupon/request', ({ state }) => {
      state.createStatus = 'loading';
    }),
    handleAction('@Plan/createCoupon/success', ({ state, action }) => {
      state.createStatus = 'success';
      state.coupons = state.coupons.concat(action.payload);
    }),
    handleAction('@Plan/createCoupon/failure', ({ state }) => {
      state.createStatus = 'failure';
    }),
    // update
    handleAction('@Plan/updateCoupon/request', ({ state, action }) => {
      state.updateStatus[action.payload.commandId] = 'loading';
    }),
    handleAction('@Plan/updateCoupon/success', ({ state, action }) => {
      state.updateStatus[action.payload.commandId] = 'success';
      state.coupons = state.coupons.map(item => {
        if (item.commandId === action.payload.commandId) {
          return {
            ...action.payload,
          };
        }
        return item;
      });
    }),
    handleAction('@Plan/updateCoupon/failure', ({ state, action }) => {
      state.updateStatus[action.payload.commandId] = 'failure';
    }),
    // delete
    handleAction('@Plan/deleteCoupon/request', ({ state, action }) => {
      state.deleteStatus[action.payload.commandId] = 'loading';
    }),
    handleAction('@Plan/deleteCoupon/success', ({ state, action }) => {
      state.deleteStatus[action.payload.commandId] = 'success';
      state.coupons = state.coupons.filter(item => item.commandId !== action.payload.commandId);
    }),
    handleAction('@Plan/deleteCoupon/failure', ({ state, action }) => {
      state.deleteStatus[action.payload.commandId] = 'failure';
    }),
    // validate coupon
    handleAction('@Plan/validateCoupon/request', ({ state }) => {
      state.validateStatus = 'loading';
    }),
    handleAction('@Plan/validateCoupon/success', ({ state }) => {
      state.validateStatus = 'success';
    }),
    handleAction('@Plan/validateCoupon/failure', ({ state }) => {
      state.validateStatus = 'failure';
    }),
  ],
});

export const { setVisibleModalCoupon, editCoupon, setValidateCouponVisible, setMyCoupon, setVisibleModalCampaign } = sliceCoupon.actions;

export const couponSelector = (state: AppState) => state.coupon;

export const useSetVisibleModalCoupon = createDispatchAction(setVisibleModalCoupon);
export const useEditCoupon = createDispatchAction(editCoupon);
export const useSetValidateCouponVisible = createDispatchAction(setValidateCouponVisible);
export const useSetMyCoupon = createDispatchAction(setMyCoupon);
export const useSetVisibleModalCampaign = createDispatchAction(setVisibleModalCampaign);

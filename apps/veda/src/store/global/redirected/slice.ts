import { Middleware } from 'redux';
import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';
import { createTransform } from 'redux-persist';
import LZ from 'lz-string';
import stringify from 'json-stringify-safe';
import { objectKeys } from 'utils/functions/objectKeys';
import { omit } from 'ramda';
import { sliceAuth } from '../auth';

interface RedirectedAction {
  type: 'redirected';
  payload: boolean;
}
type RedirectedState = boolean;

export const sliceRedirected = createSlice<RedirectedState, RedirectedAction>({
  name: '@Global',
  initialState: false,
  reducers: [handleAction('redirected', ({ action }) => action.payload)],
});

/** @tuong -> "redirect" sẽ được set thành "false" khi và chỉ khi "Skeleton loading biến mất" */
export const useSetRedirected = createDispatchAction(sliceRedirected.actions.redirected);

export const redirectedSelector = (state: AppState) => state.global.redirected;

/**
   * @tuong -> Tại thời điểm comment này được viết ngữ cảnh đang có như sau:
   - "Veda builder" cần thêm 1 tính năng để làm addon instagram -> Cần redirect để lấy token
   -> Khi đó cần "lưu lại dữ liệu builder" tại thời điểm "redirect sang insta để lấy token"
   -> Khi redirect lại trang sẽ không thực hiện request để "lấy lại dữ liệu của builder" nữa
   -> Mà các "redux action" liên quan đến "Builder Page" đều có "prefix: @Global/"
   -> Dùng middleware redux để check là nhanh nhất

   =====> Giải pháp: Bằng cách check "redirect đã hoàn thành" và "action đang được thực hiện phải liên quan đến dữ liệu build" thì "action đó mới được thực hiện"
   */
export const redirectReduxMiddleware: Middleware = store => next => action => {
  try {
    const state = store.getState() as AppState;
    const actionDispatching = action;
    if (!actionDispatching) {
      return;
    }
    /** Nếu không phải "redirect" mà là thứ khác -> Cần xoá cache đi */
    if (actionDispatching.type === 'persist/REHYDRATE' && !action.payload.global.redirected) {
      return next({
        ...omit(['payload'], actionDispatching),
        type: 'persist/REHYDRATE',
        payload: omit(['global'], actionDispatching.payload),
      });
    }
    if (
      (actionDispatching.type.includes('@Global') && !state.global.redirected) ||
      actionDispatching.type === 'persist/PERSIST' ||
      !actionDispatching.type.includes('@Global') ||
      objectKeys(sliceRedirected.actions).some(redirectedActionsType => actionDispatching.type.includes(redirectedActionsType)) ||
      objectKeys(sliceAuth.actions).some(authActionsType => actionDispatching.type.includes(authActionsType))
    ) {
      return next(action);
    }
  } catch (err) {
    console.log(err);
    return next(action);
  }
};
const CACHE_KEY = 'global';
const CONFIG: Parameters<typeof createTransform>[2] = { whitelist: [CACHE_KEY] };
export function reduxPersistCompress() {
  const NODE_ENV = typeof process !== 'undefined' ? process.env.NODE_ENV : 'production';
  return createTransform(
    state => {
      const state_ = state as AppState[typeof CACHE_KEY];
      if (state_.redirected) {
        return LZ.compressToUTF16(stringify(state));
      }
      return state_;
    },
    state => {
      if (typeof state !== 'string') {
        if (NODE_ENV !== 'production') {
          console.error('redux-persist-transform-compress: expected outbound state to be a string');
        }
        return state;
      }

      try {
        const decompress = LZ.decompressFromUTF16(state);
        return decompress ? JSON.parse(decompress) : decompress;
      } catch (err) {
        if (NODE_ENV !== 'production') {
          console.error('redux-persist-transform-compress: error while decompressing state', err);
        }
        return null;
      }
    },
    CONFIG,
  );
}

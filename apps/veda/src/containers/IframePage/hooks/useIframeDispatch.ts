import { Dispatch } from 'redux';

export const useIframeDispatch = <TDispatch extends Dispatch = Dispatch<any>>() => {
  return window.parent.window.store.dispatch as TDispatch;
};

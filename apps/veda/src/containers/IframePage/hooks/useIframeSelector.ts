import { useDebugValue } from 'react';
import { useSelector } from 'react-redux';
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/shim/with-selector';
import { isIframePage } from 'utils/isFramePage';

type Selector<TState, TSelected> = (state: TState) => TSelected;
type EqualityFn<TSelected> = ((left: TSelected, right: TSelected) => boolean) | undefined;

const _useSelector = <TState extends AppState = AppState, TSelected = unknown>(
  selector: Selector<TState, TSelected>,
  equalityFn?: EqualityFn<TSelected>,
): TSelected => {
  const getState: () => TState = window.parent.window.store.getState as any;

  const selectedState = useSyncExternalStoreWithSelector<TState, TSelected>(
    window.parent.window.store.subscribe,
    getState,
    getState,
    selector,
    equalityFn,
  );

  useDebugValue(selectedState);

  return selectedState;
};

export const useIframeSelector = isIframePage() ? _useSelector : useSelector;

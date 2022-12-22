import { omit } from 'ramda';
import { useEffect, useState } from 'react';
import { combineReducers, createStore } from 'redux';
import { cancelCode } from 'store/actions/actionPages';
import { Reducers, store } from 'store/configureStore';
import rootReducers from 'store/rootReducers';
import { createAction, getActionType } from 'wiloke-react-core/utils';

export type ReduxAction = ReturnType<ReturnType<typeof createAction>>;

export interface HistoryState {
  past: ReduxAction[][];
  present: ReduxAction[];
  future: ReduxAction[][];
}

const ACTIONS = {
  REDO: '@History/Redo',
  UNDO: '@History/Undo',
};

const useUndoRedoForRedux = () => {
  const [initialState, setInitialState] = useState<Reducers | undefined>(undefined);
  const [history, setHistoryState] = useState<HistoryState>({ past: [], present: [], future: [] });

  const getSnapshot = (actions: ReduxAction[]) => {
    const _combineReducers = combineReducers({
      ...rootReducers,
    });
    const cloneStore = createStore(_combineReducers, omit(['_persist'], initialState));
    actions.forEach(action => {
      cloneStore.dispatch(action);
    });
    return cloneStore.getState();
  };

  const handleUndo = () => {
    const { past, present, future } = history;
    if (past.length > 0) {
      const newPast = past.slice(0, past.length - 1);
      const newPresent = past[past.length - 1];
      const newFuture = !!present ? [present, ...future] : future;
      const newHistory = {
        past: newPast,
        present: newPresent,
        future: newFuture,
      };
      setHistoryState(newHistory);

      const snapshot = getSnapshot(newPast.flat(1).concat(newPresent));
      store.dispatch({
        type: ACTIONS.UNDO,
        payload: snapshot,
      });

      return snapshot;
    }
  };

  const handleRedo = () => {
    const { past, present, future } = history;
    if (future.length > 0) {
      const newFuture = future.slice(1);
      const newPresent = future[0];
      const newPast = !!present ? [...past, present] : past;
      const newHistory = {
        future: newFuture,
        present: newPresent,
        past: newPast,
      };
      setHistoryState(newHistory);

      const snapshot = getSnapshot(newPast.flat(1).concat(newPresent));
      store.dispatch({
        type: ACTIONS.REDO,
        payload: snapshot,
      });
      return snapshot;
    }
  };

  const handleInit = () => {
    setInitialState(store.getState());
  };

  const handleReset = () => {
    setInitialState(undefined);
    setHistoryState({
      past: [],
      present: [],
      future: [],
    });
  };

  const setCheckMark = () => {
    if (!useUndoRedoForRedux.IS_UNDO_REDO && initialState !== undefined) {
      const value = useUndoRedoForRedux.___SESSION_UNDO_REDO___;
      // Nếu có cancel code thì không chấp nhận đó là 1 checkmark vì edit code là 1 đống thay đổi trong "sections" để render preview
      if (!value.find(action => action.type === getActionType(cancelCode))) {
        setHistoryState(state => {
          const { past, present } = state;
          return {
            past: !!present ? [...past, present] : past,
            present: value,
            future: [],
          };
        });
      }
      useUndoRedoForRedux.___RESET_SESISION_UNDO_REDO___();
    }
  };

  useEffect(() => {
    useUndoRedoForRedux.reset = handleReset;
  }, []);

  return {
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
    onUndo: handleUndo,
    onRedo: handleRedo,
    onReset: handleReset,
    onInit: handleInit,
    setCheckMark,
  };
};

// Để capture lại các redux actions của 1 phiên thay đổi history
useUndoRedoForRedux.___SESSION_UNDO_REDO___ = [] as ReduxAction[];
useUndoRedoForRedux.___RESET_SESISION_UNDO_REDO___ = function() {
  this.___SESSION_UNDO_REDO___ = [];
};
useUndoRedoForRedux.addReduxAction = function(reduxAction: ReduxAction) {
  this.___SESSION_UNDO_REDO___.push(reduxAction);
};

useUndoRedoForRedux.ACTIONS = ACTIONS;

useUndoRedoForRedux.IS_UNDO_REDO = false;

useUndoRedoForRedux.reset = undefined as undefined | (() => void);

window.useUndoRedoForRedux = useUndoRedoForRedux;

export { useUndoRedoForRedux };

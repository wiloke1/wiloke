import { AnyAction, Dispatch, Middleware } from 'redux';
import { isBuilderPage } from 'utils/isBuilderPage';
import { useUndoRedoForRedux, ReduxAction } from './useUndoRedoForRedux';

export const trackingActionMiddleware: Middleware = () => (next: Dispatch<AnyAction>) => (action: AnyAction | undefined) => {
  if (isBuilderPage()) {
    const actionType = action?.type as string | undefined;
    if (actionType && Object.values(useUndoRedoForRedux.ACTIONS).includes(actionType)) {
      useUndoRedoForRedux.IS_UNDO_REDO = true;
    } else {
      useUndoRedoForRedux.IS_UNDO_REDO = false;
    }
    if (action && actionType?.includes('@Global/')) {
      useUndoRedoForRedux.addReduxAction(action as ReduxAction);
    }
    return next(action as AnyAction);
  } else {
    return next(action as AnyAction);
  }
};

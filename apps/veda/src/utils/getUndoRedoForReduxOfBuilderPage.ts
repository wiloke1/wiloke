import { isIframePage } from './isFramePage';

export const getUndoRedoForReduxOfBuilderPage = () => {
  if (isIframePage()) {
    return window.parent.window.useUndoRedoForRedux;
  }
  return window.useUndoRedoForRedux;
};

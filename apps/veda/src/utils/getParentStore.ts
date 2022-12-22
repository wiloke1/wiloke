import { isIframePage } from './isFramePage';

export const getBuilderPageReduxStore = () => {
  if (isIframePage()) {
    return window.parent.window.store;
  } else {
    return window.store;
  }
};

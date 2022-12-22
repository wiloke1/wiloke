import { isIframePage } from 'utils/isFramePage';

export const useGlobalSidebarNavigation = () => {
  if (isIframePage()) {
    return window.parent.window.vedaNavigation;
  }
  return window.vedaNavigation;
};

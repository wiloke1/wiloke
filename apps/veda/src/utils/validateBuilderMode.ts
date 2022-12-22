import getPageInfo from './functions/getInfo';

export const isThemeBuilder = () => {
  const themeId = getPageInfo('themeId');
  return window.location.pathname === '/builder' && !!themeId;
};

export const isPageBuilder = () => {
  const themeId = getPageInfo('themeId');
  return window.location.pathname === '/builder' && !themeId;
};

import { Heights, ResponsiveItem } from './types';

export const getColumn = (defaultColumn: number, responsive: ResponsiveItem[]) => {
  const windowWidth = window.innerWidth;
  if (!responsive.length) {
    return defaultColumn;
  }
  let nextIndex = 0;
  let columnResponsive = defaultColumn;
  responsive.forEach(({ breakpoint, column }, index) => {
    nextIndex = Math.min(index + 1, responsive.length);
    const nextBreakpoint = responsive[nextIndex] ? responsive[nextIndex].breakpoint : Infinity;
    if (breakpoint <= windowWidth && nextBreakpoint - 1 >= windowWidth) {
      columnResponsive = column;
    }
  });
  return columnResponsive;
};

export const getMaxHeight = (heights: Heights) => {
  return Math.max(...heights);
};

export const getMinHeight = (heights: Heights) => {
  return Math.min(...heights);
};

export const getIndexSelected = (heights: Heights) => {
  return heights.findIndex(item => item === getMinHeight(heights));
};

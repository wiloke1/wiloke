import { CSSProperties } from 'react';

export interface ResponsiveItem {
  breakpoint: number;
  column: number;
}

export type Heights = number[];
export interface State {
  columnHeights: Heights;
  itemStyles: CSSProperties[];
}

export interface MasonryProps {
  defaultColumn: number;
  gap?: number;
  responsive?: ResponsiveItem[];
}

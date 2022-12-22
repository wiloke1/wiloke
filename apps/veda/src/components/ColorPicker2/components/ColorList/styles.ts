import { MeasureKey } from 'hooks/useMeasure';
import { css, Theme } from 'wiloke-react-core';

export const portal = (measure: Record<MeasureKey, number>, hasColor: boolean) => ({ colors }: Theme) => css`
  debug: ColorList_portal;
  position: absolute;
  left: ${measure.left}px;
  z-index: 14;
  overflow: hidden;
  border-radius: 6px;
  width: ${hasColor ? 250 + 300 : 250}px;
  background-color: ${colors.light};
  border: 1px solid ${colors.gray3};
  box-shadow: 0 5px 10px rgba(${colors.rgbGray9}, 0.1);
  min-height: ${hasColor ? '280px' : 'auto'};
`;

export const left = css`
  debug: ColorList_left;
  width: 250px;
  padding: 15px;
`;

export const right = ({ colors }: Theme) => css`
  debug: ColorList_right;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  width: 298px;
  border-left: 1px solid ${colors.gray2};
  padding: 15px;
`;

export const row = css`
  debug: ColorList_row;
  margin-left: -5px;
  margin-right: -5px;
`;

export const col = css`
  debug: ColorList_col;
  padding-left: 5px;
  padding-right: 5px;
`;

export const item = (active: boolean, color: string) => css`
  debug: ColorList_item;
  position: relative;
  display: block;
  margin-bottom: 10px;
  border-radius: 50%;
  cursor: pointer;
  width: 100%;
  padding-top: 100%;
  outline: 1px solid ${active ? color : 'transparent'};
`;

export const itemInner = ({ colors }: Theme) => css`
  debug: ColorList_itemInner;
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 3px;
  width: calc(100% - 6px);
  height: calc(100% - 6px);
  border: 1px solid ${colors.gray3};
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

export const clear = css`
  margin-right: 10px;
  cursor: pointer;
`;

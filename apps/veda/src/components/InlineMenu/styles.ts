import { Styles, Theme } from 'wiloke-react-core';

export const container: Styles = {
  className: 'InlineMenu-container',
};

export const inner = (width?: number): Styles => ({
  className: 'InlineMenu-inner',
  position: 'relative',
  height: '100%',
  ...(width ? { width: `${width}px` } : {}),
});

export const item = (width?: number): Styles => ({
  className: 'InlineMenu-item',
  ...(width ? { width: `${width}px` } : {}),
});

export const subMenu = (width?: number, titleWidth?: number) => ({ colors }: Theme): Styles => ({
  className: 'InlineMenu-subMenu',
  position: 'absolute',
  top: 0,
  left: `${titleWidth}px`,
  width: `${width}px`,
  height: '100%',
  borderLeft: `1px solid ${colors.gray3}`,
  borderRight: `1px solid ${colors.gray3}`,
});

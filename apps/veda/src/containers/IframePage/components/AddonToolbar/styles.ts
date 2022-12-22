import { Styles, Theme } from 'wiloke-react-core';

export type Position = 'left' | 'right';

export const container = (top: number, left: number, width: number, height: number) => ({ colors }: Theme): Styles => ({
  position: 'absolute',
  top: `${top}px`,
  left: `${left}px`,
  zIndex: 9999,
  width: `${width}px`,
  height: `${height}px`,
  boxShadow: `inset 0 0 0 2px ${colors.tertiary}`,
  pointerEvents: 'none',
});

export const title = (position: Position) => ({ colors, fonts }: Theme): Styles => ({
  position: 'absolute',
  top: '2px',
  ...(position === 'left' ? { left: 0 } : { right: 0 }),
  transform: 'translateY(-100%)',
  backgroundColor: colors.tertiary,
  color: colors.light,
  fontFamily: fonts.secondary,
  fontSize: '13px',
  padding: '2px 8px',
  borderRadius: '4px 4px 0 0',
  whiteSpace: 'nowrap',
});

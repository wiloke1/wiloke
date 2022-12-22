import { Styles, Theme } from 'wiloke-react-core';

export const container = (top: number, left: number, width: number, height: number) => ({ colors }: Theme): Styles => ({
  position: 'absolute',
  top: `${top}px`,
  left: `${left}px`,
  zIndex: 999999,
  width: `${width}px`,
  height: `${height}px`,
  boxShadow: `inset 0 0 0 1px ${colors.secondary}`,
  pointerEvents: 'none',
});

export const title = ({ colors, fonts }: Theme): Styles => ({
  position: 'absolute',
  top: '1px',
  left: 0,
  transform: 'translateY(-100%)',
  backgroundColor: colors.secondary,
  color: colors.light,
  fontFamily: fonts.secondary,
  fontSize: '13px',
  padding: '2px 8px',
  borderRadius: '4px 4px 0 0',
  whiteSpace: 'nowrap',
});

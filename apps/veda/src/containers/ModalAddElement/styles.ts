import { Styles, Theme } from 'wiloke-react-core';

export const inner = ({ colors }: Theme): Styles => ({
  position: 'relative',
  display: 'flex',
  backgroundColor: colors.light,
  overflow: 'hidden',
  height: '100%',
});

export const left = ({ colors }: Theme): Styles => ({
  width: '250px !important',
  backgroundColor: colors.light,
  padding: '10px 0',
});

export const right = ({ colors }: Theme): Styles => ({
  width: '100%',
  backgroundColor: colors.gray2,
  padding: '20px',
});

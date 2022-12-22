import { Styles, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme): Styles => ({
  position: 'relative',
  zIndex: 9,
  display: 'flex',
  alignItems: 'center',
  border: `1px solid ${colors.gray3}`,
  padding: '5px 10px',
  borderRadius: '4px',
  height: '36px',
  cursor: 'pointer',
});

export const item = (color: string, index: number) => ({ colors }: Theme): Styles => ({
  borderRadius: '50%',
  width: '22px',
  height: '22px',
  backgroundColor: color,
  marginLeft: index > 0 ? '-12px' : 0,
  position: 'relative',
  zIndex: index * -1,
  border: `2px solid ${colors.light}`,
});

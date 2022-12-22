import { Styles, Theme } from 'wiloke-react-core';

export const item = ({ colors }: Theme): Styles => ({
  border: `1px solid ${colors.gray3}`,
  borderRadius: '4px',
  padding: '5px 12px',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  fontSize: '13px',
  color: colors.gray8,
  userSelect: 'none',
});

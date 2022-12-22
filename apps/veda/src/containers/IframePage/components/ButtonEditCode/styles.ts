import { Styles, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme): Styles => ({
  border: `2px dashed ${colors.gray3}`,
  padding: '30px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
});

export const inner: Styles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

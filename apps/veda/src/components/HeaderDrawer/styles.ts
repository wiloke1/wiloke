import { Styles, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme): Styles => ({
  className: 'HeaderDrawer-container',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: colors.light,
  height: '54px',
  padding: '10px',
  borderBottom: `1px solid ${colors.gray3}`,
});

export const back: Styles = {
  className: 'HeaderDrawer-back',
  padding: '10px',
  marginLeft: '-5px',
  marginRight: '6px',
  cursor: 'pointer',
};

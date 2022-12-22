import { Styles, Theme } from 'wiloke-react-core';

export const preview = ({ colors }: Theme): Styles => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: `1px solid ${colors.gray3}`,
  backgroundColor: colors.light,
  height: '44px',
  padding: '0 15px',
  cursor: 'pointer',
  borderRadius: '6px',
});

export const tabItem = (tabActive: boolean) => ({ colors }: Theme): Styles => ({
  width: '50%',
  textAlign: 'center',
  backgroundColor: tabActive ? colors.light : colors.transparent,
  border: 0,
  height: '40px',
  borderRadius: '4px',
});

export const tab = ({ colors }: Theme): Styles => ({
  marginBottom: '10px',
  backgroundColor: colors.gray3,
  height: '46px',
  borderRadius: '4px',
  padding: '3px',
});

import { Styles, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme): Styles => ({
  className: 'ShowCssVariables-container',
  width: '480px',
  backgroundColor: colors.light,
  borderLeft: `1px solid ${colors.gray3}`,
});

export const row = ({ colors }: Theme): Styles => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  padding: '10px',
  borderRadius: '6px',
  '&:hover': {
    backgroundColor: colors.gray2,
  },
});

export const color = (color: string) => ({ colors }: Theme): Styles => ({
  backgroundColor: color,
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  border: `2px solid ${colors.light}`,
});

export const tab = ({ colors }: Theme): Styles => ({
  margin: '10px 0',
  borderBottom: `1px solid ${colors.gray3}`,
});

export const tabItem: Styles = {
  fontSize: '12px',
  width: '50%',
  height: '42px',
  textAlign: 'center',
};

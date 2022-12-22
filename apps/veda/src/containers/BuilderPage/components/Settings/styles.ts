import { Styles, Theme } from 'wiloke-react-core';

export const body: Styles = {
  display: 'flex',
  height: '100%',
};

export const navItem = ({ colors }: Theme): Styles => ({
  borderBottom: `1px solid ${colors.gray3}`,
});

export const content: Styles = {
  width: '100%',
};

export const settingBtn = ({ colors }: Theme): Styles => ({
  width: '36px',
  height: '36px',
  borderRadius: '4px',
  border: `1px solid ${colors.gray3}`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
});

export const tr: Styles = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '12px',
};

export const tdItem: Styles = {
  width: '100%',
  padding: '0 6px',
};

export const tdAction: Styles = {
  padding: '0 6px',
  marginBottom: '12px',
  marginTop: '23px',
};

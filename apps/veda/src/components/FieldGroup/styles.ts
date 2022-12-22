import { Styles, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme): Styles => ({
  backgroundColor: colors.light,
  borderRadius: '6px',
  marginBottom: '10px',
  border: `1px solid ${colors.gray3}`,
  userSelect: 'none',
});

export const title = (visible: boolean) => ({ colors }: Theme): Styles => ({
  border: 0,
  borderRadius: visible ? '6px 6px 0 0' : '6px',
  borderBottom: `1px solid ${visible ? colors.gray3 : colors.transparent} !important`,
});

export const icon = (visible: boolean): Styles => ({
  transition: 'all 0.2s',
  ...(visible ? { transform: 'rotate(90deg)' } : {}),
});

export const content: Styles = {
  padding: '10px',
};

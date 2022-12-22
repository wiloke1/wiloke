import { Styles, Theme } from 'wiloke-react-core';

export const header: Styles = {
  display: 'flex',
  alignItems: 'center',
  paddingBottom: '10px',
};

export const select: Styles = {
  width: '140px',
  marginLeft: '5px',
};

export const btnUpload: Styles = {
  width: '44px',
  height: '44px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const content: Styles = {
  padding: '10px',
  height: '100%',
};

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

export const iconWrap = (height: number) => ({ colors }: Theme): Styles => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: colors.light,
  width: '100%',
  height: `${height}px`,
});

export const icon = (active: boolean) => ({ colors }: Theme): Styles => ({
  color: active ? colors.secondary : colors.gray8,
  fontSize: active ? '28px' : '18px',
});

export const h100: Styles = {
  height: '100%',
};

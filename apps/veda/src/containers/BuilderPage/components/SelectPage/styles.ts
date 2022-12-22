import { Styles, Theme } from 'wiloke-react-core';

export const container: Styles = {
  width: '300px',
  userSelect: 'none',
};

export const button = (visible: boolean) => ({ colors }: Theme): Styles => ({
  border: `1px solid ${colors.gray3}`,
  padding: '10px',
  height: '36px',
  borderRadius: visible ? '4px 4px 0 0' : '4px',
  backgroundColor: colors.light,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
  color: colors.gray8,
  boxShadow: visible ? `0 5px 10px rgba(${colors.rgbGray8}, 0.2)` : undefined,
});

export const dropdown = (top: number, left: number) => ({ colors }: Theme): Styles => ({
  position: 'absolute',
  top: `${top - 1}px`,
  left: `${left}px`,
  backgroundColor: colors.light,
  border: `1px solid ${colors.gray3}`,
  boxShadow: `0 5px 10px rgba(${colors.rgbGray8}, 0.2)`,
  width: '300px',
  borderRadius: '0 0 4px 4px',
  overflow: 'hidden',
});

export const dropdownItem = (active: boolean) => ({ colors }: Theme): Styles => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: active ? colors.gray1 : colors.light,
  padding: '10px',
  cursor: 'pointer',
  color: active ? colors.primary : colors.gray7,
  '&:hover': {
    color: colors.primary,
  },
});

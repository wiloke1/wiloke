import { Styles, Theme } from 'wiloke-react-core';

export const container = (top: number, left: number, width: number, height: number, isMegamenu = false) => ({ colors, fonts }: Theme): Styles => ({
  position: 'absolute',
  top: `${top}px`,
  left: `${left}px`,
  zIndex: 99999,
  width: `${width}px`,
  height: `${height}px`,
  boxShadow: `inset 0 0 0 2px ${isMegamenu ? colors.tertiary : colors.primary}`,
  pointerEvents: 'none',
  fontFamily: fonts.primary,
});

export const title = ({ colors, fonts }: Theme): Styles => ({
  color: colors.light,
  fontFamily: fonts.secondary,
  fontSize: '13px',
  marginTop: '2px',
});

const BTN_ADD_SIZE = 40;

export const addWrap = (variant: 'top' | 'bottom', inset: boolean): Styles => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: `${BTN_ADD_SIZE}px`,
  height: `${BTN_ADD_SIZE}px`,
  borderRadius: '50%',
  position: 'absolute',
  left: '50%',
  zIndex: 999,
  pointerEvents: 'auto',
  marginLeft: `-${BTN_ADD_SIZE / 2}px`,
  ...(variant === 'top' ? { top: inset ? 0 : `-${BTN_ADD_SIZE / 2}px` } : { bottom: `-${BTN_ADD_SIZE / 2}px` }),
});

export const add = ({ colors }: Theme): Styles => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: `${BTN_ADD_SIZE - 8}px`,
  height: `${BTN_ADD_SIZE - 8}px`,
  borderRadius: '50%',
  cursor: 'pointer',
  backgroundColor: colors.primary,
});

export const actions = (clickActive: boolean, inset: boolean, isMegamenu = false) => ({ colors }: Theme): Styles => ({
  position: 'absolute',
  top: '1px',
  left: 0,
  display: 'flex',
  alignItems: 'center',
  pointerEvents: 'auto',
  backgroundColor: isMegamenu ? colors.tertiary : colors.primary,
  padding: `${clickActive ? 5 : 2}px 8px`,
  ...(inset
    ? {
        borderRadius: '0 0 6px 0',
      }
    : {
        transform: 'translateY(-100%)',
        borderRadius: '6px 6px 0 0',
      }),
});

export const actionsContent = ({ colors }: Theme): Styles => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: colors.primary,
  pointerEvents: 'auto',
  marginLeft: '10px',
});

export const action = (disabled: boolean) => ({ colors }: Theme): Styles => ({
  width: '28px',
  height: '28px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  transition: 'all 0.3s',
  cursor: disabled ? 'not-allowed' : 'pointer',
  opacity: disabled ? '0.6' : '1',
  '&:hover': {
    backgroundColor: `rgba(${colors.rgbLight}, 0.1)`,
  },
});

import { Styles, Theme } from 'wiloke-react-core';

export type TourPlacement = 'right-top' | 'right-bottom' | 'top-right';

export const container = (
  topProp: number,
  leftProp: number,
  placement: TourPlacement,
  moveFreely: boolean,
  rightProp?: number,
  offsetTop = 0,
  offsetLeft = 0,
  offsetWidth = 0,
  offsetHeight = 0,
) => ({ colors }: Theme): Styles => {
  let placementStyles: Styles = {
    top: `${offsetTop + topProp}px`,
  };
  if (placement === 'right-bottom') {
    placementStyles = {
      top: `${offsetTop + topProp + offsetHeight}px`,
      transform: 'translateY(-100%)',
    };
  }
  return {
    position: 'absolute',
    left: rightProp === undefined ? `${offsetLeft + offsetWidth + 10 + leftProp}px` : 'auto',
    ...(rightProp === undefined ? {} : { right: `${rightProp}px` }),
    zIndex: 9999,
    backgroundColor: colors.secondary,
    padding: '25px',
    borderRadius: '10px',
    boxShadow: `0 5px 18px 0 rgba(${colors.rgbSecondary}, 0.6)`,
    width: '360px',
    ...placementStyles,
    ...(moveFreely ? { top: `${topProp}px`, ...(rightProp === undefined ? { left: `${leftProp}px` } : { right: `${rightProp}px` }) } : {}),
  };
};

export const triangle = (placement: TourPlacement) => ({ colors }: Theme): Styles => {
  if (placement === 'top-right') {
    return {
      position: 'absolute',
      top: 0,
      right: '30px',
      border: 'solid transparent',
      borderWidth: '10px',
      borderBottomColor: colors.secondary,
      transform: 'translateY(-100%)',
    };
  }
  return {
    position: 'absolute',
    left: 0,
    ...(placement === 'right-top' ? { top: '30px' } : { bottom: '30px' }),
    border: 'solid transparent',
    borderWidth: '10px',
    borderRightColor: colors.secondary,
    transform: 'translateX(-100%)',
  };
};

export const footer: Styles = {
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '15px',
};

export const close = ({ colors }: Theme): Styles => ({
  backgroundColor: `rgba(${colors.rgbLight}, 0.1)`,
  marginRight: '8px',
  fontWeight: 500,
  fontSize: '13px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: `rgba(${colors.rgbLight}, 0.2)`,
  },
});

export const skip = ({ colors }: Theme): Styles => ({
  backgroundColor: `rgba(${colors.rgbDanger}, 0.7)`,
  fontWeight: 500,
  fontSize: '13px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: `rgba(${colors.rgbDanger}, 1)`,
  },
});

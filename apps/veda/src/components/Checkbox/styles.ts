import { css, Size, Theme } from 'wiloke-react-core';

const controlSizeMapping: Record<Size, number> = {
  large: 36,
  medium: 30,
  small: 20,
  'extra-small': 18,
};

export const container = (disabled: boolean, size: Size) => css`
  font-size: ${size === 'extra-small' ? 12 : 14}px;
  cursor: ${disabled ? 'not-allowed' : 'pointer'};
  opacity: ${disabled ? 0.4 : 1};
`;

export const control = (size: Size) => css`
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  width: ${controlSizeMapping[size]}px;
  height: ${controlSizeMapping[size]}px;
`;

export const icon = css`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const bgIcon = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const bgInActive = ({ colors }: Theme) => css`
  debug: InActive;
  background-color: rgba(${colors.rgbLight}, 0.6);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const text = css`
  margin-left: 7px;
  display: inline-block;
  vertical-align: middle;
`;

export const innerWrap = css`
  position: relative;
  display: inline-block;
  vertical-align: middle;
`;

export const input = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 4;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

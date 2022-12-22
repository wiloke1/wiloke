import { ColorNames, css, Theme } from 'wiloke-react-core';

export type Variant = 'style1' | 'style2' | 'style3';

export const container = css`
  debug: Active_container;
  position: relative;
  cursor: pointer;
  overflow: hidden;
`;

export const icon = ({ colors }: Theme) => css`
  debug: Active_icon;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  z-index: 9;
  background-color: ${colors.primary};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const overlay = ({ colors }: Theme) => css`
  debug: Active_overlay;
  background-color: ${colors.gray9};
  opacity: 0.5;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
`;

export const container2 = (active: boolean, variant: Variant, colorDefault: ColorNames, colorActive: ColorNames) => ({ colors }: Theme) => {
  if (variant === 'style1') {
    return css`
      border-radius: 6px;
      overflow: hidden;
    `;
  }
  return css`
    background-color: ${colors.light};
    border: 1px solid ${active ? colors[colorActive] : colors[colorDefault]};
    border-radius: 6px;
    overflow: hidden;
  `;
};

export const icon2 = css`
  width: 26px;
  height: 26px;
  top: 4px;
  right: 4px;
  bottom: auto;
  left: auto;
`;

export const num = (active: boolean, colorActive: ColorNames, colorDefault: ColorNames) => ({ colors }: Theme) => css`
  position: absolute;
  top: 6px;
  right: 6px;
  z-index: 9;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${active ? colors[colorActive] : colors[colorDefault]};
  background-color: ${active ? colors[colorActive] : `rgba(${colors.rgbLight}, 0.4)`};
  color: ${colors.light};
  font-size: 14px;
`;

export const checkbox = css`
  debug: Active-checkbox;
  position: absolute;
  inset: 0;
  z-index: 10;
  border-radius: 6px;
  opacity: 0;
`;

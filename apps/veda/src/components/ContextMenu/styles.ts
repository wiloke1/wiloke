import { css, Theme } from 'wiloke-react-core';

export const contextMenu = (top: number, left: number) => ({ colors }: Theme) => css`
  position: absolute;
  top: ${top}px;
  left: ${left}px;
  z-index: 99999999;
  min-width: 150px !important;
  padding: 6px 0;
  border-radius: 6px;
  background-color: ${colors.light};
  border: 1px solid ${colors.gray3};
  box-shadow: 0 5px 10px rgba(${colors.rgbGray8}, 0.2);
`;

export const subMenu = css`
  position: absolute;
  top: -4px;
  left: 100%;
  padding-left: 4px;
`;

export const subMenuInner = ({ colors }: Theme) => css`
  border: 1px solid ${colors.gray4};
  background-color: ${colors.light};
  box-shadow: 0 5px 14px rgba(${colors.rgbDark}, 0.1);
  padding: 4px 0;
  border-radius: 10px;
`;

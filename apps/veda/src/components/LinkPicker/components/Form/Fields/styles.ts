import { css } from 'wiloke-react-core';

export const drawerContainerCss = (drawerActive: boolean) => css`
  margin: -8px -14px;
  padding: 8px 14px;
  height: ${!drawerActive ? 'auto !important' : undefined};
`;

export const drawerCss = (drawerActive: boolean) => css`
  & ~ * {
    height: ${!drawerActive ? 'auto !important' : undefined};
  }
`;

export const icon = css`
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left-width: inherit;
  width: 36px;
  height: 36px;
`;

export const box = css`
  display: flex;
  align-items: center;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  flex: 1;
  width: 80%;
  padding-left: 10px !important;
  padding-right: 10px !important;
`;

export const radioButton = css`
  width: 100%;
  position: absolute;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  left: 0;
  top: 0;
`;

export const tooltip = css`
  display: block;
  width: 100%;
  height: 100%;
`;

import { css, Theme } from 'wiloke-react-core';

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

export const button = ({ colors }: Theme) => css`
  width: 35px;
  height: 35px;
  border: 1px solid ${colors.gray3};
  border-radius: 6px;
  padding: 10px 16px;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 5px;
`;

export const buttonContainer = css`
  margin-top: 5px;
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

import { css, Theme } from 'wiloke-react-core';

export const container = ({ colors, fonts }: Theme) => css`
  debug: TopBar_container;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.light};
  border-bottom: 1px solid ${colors.gray3};
  height: 54px;
  padding: 12px;
  font-family: ${fonts.primary};
`;

export const iconWrap = ({ colors }: Theme) => css`
  debug: TopBar_iconWrap;
  background-color: ${colors.light};
  min-width: 36px;
  height: 36px;
  text-align: center;
  border-radius: 4px;
  border: 1px solid ${colors.gray3};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const icon = css`
  debug: TopBar_icon;
  width: 36px;
  vertical-align: middle;
`;

export const divider = ({ colors }: Theme) => css`
  debug: TopBar_divider;
  width: 1px;
  height: 100%;
  background-color: ${colors.gray3};
`;

export const left = css`
  debug: TopBar_left;
  display: flex;
  flex-direction: row;
`;

export const right = css`
  debug: TopBar_right;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const itemFull = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

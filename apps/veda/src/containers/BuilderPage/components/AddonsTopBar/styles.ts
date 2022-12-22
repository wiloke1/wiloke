import { css, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.gray9};
  height: 54px;
  padding: 12px;
`;

export const right = css`
  debug: TopBar_right;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

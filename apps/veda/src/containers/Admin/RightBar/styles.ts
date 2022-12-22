import { css, Theme } from 'wiloke-react-core';

export const container = css`
  debug: RightBar-container;
  border-radius: 6px;
  margin-left: 20px;
  padding: 0;
`;

export const box = css`
  width: 100%;
  padding: 20px;
  border-radius: 6px;
  margin: 0 auto 20px;
`;

export const boxCursor = css`
  cursor: pointer;
  border-radius: 6px;
`;

export const boxHeader = () => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

export const boxBody = css``;

export const boxBodyItem = css`
  padding: 10px;
  text-align: left;
`;

export const button = ({ colors }: Theme) => css`
  background-color: rgba(${colors.rgbGray5}, 0.2);
  margin-bottom: 10px;
`;

export const buttonFlex = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

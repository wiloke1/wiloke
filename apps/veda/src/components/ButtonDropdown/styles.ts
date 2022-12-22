import { css, Theme } from 'wiloke-react-core';

export const container = css`
  position: relative;
  padding: 0 0 0 16px;
  height: 36px;
  font-weight: 500;
  font-size: 13px;
  display: inline-flex;
  align-items: center;
`;

export const inner = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const icon = ({ colors }: Theme) => css`
  width: 34px;
  height: 36px;
  margin-left: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid rgba(${colors.rgbLight}, 0.3);
`;

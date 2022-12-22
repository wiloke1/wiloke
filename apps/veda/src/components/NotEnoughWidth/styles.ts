import { css, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme) => css`
  debug: NotEnoughWidth-container;
  position: fixed;
  inset: 0;
  z-index: 10;
  background-color: rgba(${colors.rgbLight}, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 150px;
  text-align: center;
`;

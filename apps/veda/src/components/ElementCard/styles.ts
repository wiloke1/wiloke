import { css, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme) => css`
  debug: ElementCard_container;
  position: relative;
  border: 2px solid;
  border-color: ${colors.gray3};
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
`;

export const front = css`
  debug: ElementCard_front;
  position: absolute;
  inset: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const back = ({ colors }: Theme) => css`
  debug: ElementCard_back;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: ${colors.light};
  display: flex;
  justify-content: center;
  align-items: center;
`;

import { css } from 'wiloke-react-core';

export const container = css`
  debug: BoxModel-container;
  position: relative;
  width: 280px;
  height: 200px;
  overflow: hidden;
  border-radius: 6px;
`;

export const innerDiv = css`
  debug: BoxModel-innerDiv;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 155px;
  height: 115px;
  overflow: hidden;
  border-radius: 6px;
`;

export const item = css`
  debug: BoxModel-item;
  position: absolute;
  width: 50px;
`;

export const top = css`
  debug: BoxModel-item--top;
  top: 5px;
  left: 50%;
  transform: translateX(calc(50% - 50px));
`;

export const bottom = css`
  debug: BoxModel-item--bottom;
  bottom: 5px;
  left: 50%;
  transform: translateX(calc(50% - 50px));
`;

export const left = css`
  debug: BoxModel-item--left;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
`;

export const right = css`
  debug: BoxModel-item--right;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
`;

export const reset = css`
  width: 20px;
  height: 20px;
  cursor: pointer;
  border-radius: 20px;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

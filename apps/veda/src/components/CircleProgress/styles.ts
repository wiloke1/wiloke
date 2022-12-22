import { css } from 'wiloke-react-core';

export const checkmark__circle = css`
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #7ac142;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
`;

export const checkmark = css`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: block;
  stroke-width: 3px;
  stroke: rgb(255, 255, 255);
  stroke-miterlimit: 10;
  margin: 10% auto;
  box-shadow: rgb(122 193 66) 0px 0px 0px inset;
  animation: 0.4s ease-in-out 0.4s 1 normal forwards running fill, 0.3s ease-in-out 0.9s 1 normal both running scale;
  stroke-linecap: round;
`;

export const checkmark__check = css`
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
`;

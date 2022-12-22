import { css } from 'wiloke-react-core';

export const container = (backgroundColor: string) => css`
  position: relative !important;
  z-index: 1;
  background-color: ${backgroundColor};
`;

export const preloader = (backgroundColor: string, color: string) => css`
  --veda-preloader-background-color: ${backgroundColor};
  --veda-preloader-color: ${color};
  position: absolute !important;
  width: 100%;
  height: 100%;
`;

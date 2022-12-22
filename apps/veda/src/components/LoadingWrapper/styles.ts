import { css } from 'wiloke-react-core';

export const container = css`
  position: relative;
`;

export const loading = css`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

export const children = (loading: boolean) => css`
  opacity: ${loading ? '0.5' : '1'};
`;

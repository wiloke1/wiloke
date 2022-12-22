import { css, Theme } from 'wiloke-react-core';

export const container = (active: boolean) => ({ colors }: Theme) => css`
  debug: Collapse_container;
  background-color: ${colors.light};
  border: 1px solid ${colors.gray3};
  border-radius: 6px;
  box-shadow: ${active ? `0 2px 10px rgba(${colors.rgbGray9}, 0.15)` : 'none'};
`;

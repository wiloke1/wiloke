import { css, Theme } from 'wiloke-react-core';

export const container = (active: boolean) => ({ colors }: Theme) => css`
  padding: 20px;
  border: 2px solid ${active ? colors.primary : colors.gray2};
  cursor: pointer;
  @media (max-width: 1200px) {
    zoom: 110%;
  }
`;

export const icon = css`
  margin-bottom: 16px;
  width: 80px;
`;
